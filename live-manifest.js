// Public playlist compatibility endpoint. No database, account tokens or video relay.
// Only the Pluto playlist paths below may be fetched. Never an arbitrary URL proxy.
const origins = new Set(['https://brnmadalena.github.io', 'null', 'http://127.0.0.1:4178', 'http://localhost:4178']);
const channelPattern = /^[a-f0-9]{24}$/;
function allowed(value) {
  try {
    const u = new URL(value);
    if (u.protocol !== 'https:' || u.username || u.password || u.port || u.hash || u.href.length > 12000) return false;
    if (u.hostname === 'jmp2.uk') return /^\/plu-[a-f0-9]{24}\.m3u8$/.test(u.pathname) && !u.search;
    return u.hostname === 'ipv4.pluto.tv' && /^\/api\/tn\/video\/playout\/v2\/stitch\/hls\/channel\/[a-f0-9]{24}\/[A-Za-z0-9_./-]+\.(m3u8|vtt)$/.test(u.pathname) && !u.pathname.includes('..');
  } catch (_) { return false; }
}
function target(params) {
  const channel = params.get('channel'), url = params.get('url');
  if (channel && !url && channelPattern.test(channel)) return 'https://jmp2.uk/plu-' + channel + '.m3u8';
  if (!channel && url && allowed(url)) return url;
  throw Error('invalid_request');
}
function rewrite(text, base, endpoint) {
  function uri(value) {
    const u = new URL(value, base);
    if (u.protocol !== 'https:' || u.username || u.password || u.port || u.href.length > 12000) throw Error('invalid_playlist');
    if (allowed(u.href)) return endpoint + '?url=' + encodeURIComponent(u.href);
    // Video fragments stay between the viewer and the provider CDN.
    if (!u.hostname.endsWith('.plutotv.net') && u.hostname !== 'plutotv.net') throw Error('invalid_playlist');
    return u.href;
  }
  if (!text.startsWith('#EXTM3U')) throw Error('invalid_playlist');
  return text.split(/\r?\n/).map(line => {
    if (!line.trim()) return line;
    return line.startsWith('#') ? line.replace(/URI="([^"]+)"/g, (_, value) => 'URI="' + uri(value) + '"') : uri(line.trim());
  }).join('\n');
}
async function playlist(url, fetcher = fetch) {
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 15000);
  try {
    for (let hop = 0; hop < 4; hop++) {
      if (!allowed(url)) throw Error('invalid_request');
      const response = await fetcher(url, {redirect:'manual', credentials:'omit', signal:controller.signal});
      if ([301,302,303,307,308].includes(response.status)) {
        const next = response.headers.get('location'); await response.body?.cancel();
        if (!next) throw Error('provider_unavailable');
        url = new URL(next, url).href; continue;
      }
      if (!response.ok || +response.headers.get('content-length') > 524288) {await response.body?.cancel();throw Error('provider_unavailable');}
      const reader = response.body.getReader(), chunks = []; let size = 0;
      try {while (true) {const {done,value} = await reader.read();if (done) break;size += value.length;if (size > 524288) {await reader.cancel();throw Error('invalid_playlist');}chunks.push(value);}} finally {reader.releaseLock();}
      const all = new Uint8Array(size);let offset = 0;for (const chunk of chunks) {all.set(chunk,offset);offset += chunk.length;}
      return {url, text:new TextDecoder().decode(all)};
    }
    throw Error('provider_unavailable');
  } finally {clearTimeout(timer);}
}
const recent = new Map();
async function handler(req) {
  const origin = req.headers.get('origin');
  const headers = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Allow-Headers':'authorization, x-region, apikey, content-type','Cache-Control':'no-store','Content-Type':'application/json','X-Content-Type-Options':'nosniff'};
  if (origin && !origins.has(origin)) return new Response('{"error":"origin_not_allowed"}',{status:403,headers});
  if (req.method === 'OPTIONS') return new Response(null,{status:204,headers});
  if (req.method !== 'GET') return new Response('{"error":"method_not_allowed"}',{status:405,headers});
  const key = req.headers.get('x-forwarded-for')?.split(',')[0] || 'anonymous', now = Date.now();
  for (const [k,v] of recent) if (now-v.at > 60000) recent.delete(k);
  const hit = recent.get(key) || {at:now,n:0};hit.n++;recent.set(key,hit);
  if (hit.n > 180 || recent.size > 4096) return new Response('{"error":"rate_limited"}',{status:429,headers});
  try {
    const requestURL = new URL(req.url), upstream = target(requestURL.searchParams);
    const result = await playlist(upstream);
    if (new URL(result.url).pathname.endsWith('.vtt')) {
      if (!result.text.startsWith('WEBVTT')) throw Error('invalid_playlist');
      return new Response(result.text,{headers:{...headers,'Content-Type':'text/vtt; charset=utf-8'}});
    }
    // The gateway's internal request URL omits /functions/v1 and may use HTTP.
    const body = rewrite(result.text,result.url,'https://yydmiokoumoljzvbqtjy.supabase.co/functions/v1/live-manifest');
    return new Response(body,{headers:{...headers,'Content-Type':'application/vnd.apple.mpegurl; charset=utf-8'}});
  } catch (error) {
    const invalid = error.message === 'invalid_request';
    return new Response(JSON.stringify({error:invalid?'invalid_request':'provider_unavailable'}),{status:invalid?400:502,headers});
  }
}
if (typeof Deno !== 'undefined') Deno.serve(handler);
if (typeof module !== 'undefined') module.exports = {allowed,target,rewrite,playlist,handler};

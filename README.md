# Minha TV

[Abrir site](https://brnmadalena.github.io/minha-tv/) · [APK direto para o Downloader](https://brnmadalena.github.io/minha-tv/tv.apk) · [Versões e fontes](https://github.com/brnmadalena/minha-tv/releases)

## Reprodução dos canais — versão 1.6.1

Corrigida a reprodução da Pluto no navegador, incluindo os canais Pluto distribuídos pelo iptv-org. O servidor responde aos links, mas seus manifestos não permitem leitura direta pelo site. Uma função de compatibilidade no Supabase atende exclusivamente os caminhos de playlists da Pluto; os fragmentos de vídeo continuam vindo diretamente do CDN do provedor. A função mantém validação de acesso, HTTPS, limites de tamanho/tempo e uma lista exata de destinos. Não recebe credenciais de contas, não consulta o banco e não retransmite vídeo. O código está em live-manifest.js; implantar como live-manifest no projeto configurado em app-config.json, mantendo a verificação JWT ativa.

Doze referências antigas do iptv-org foram substituídas por playlists HTTPS verificadas nos endereços atuais: Auge TV, Bem Melhor, Líder TV, Demais TV, Rede Premium TV, Series Classic, Canal START, TV Adorar, TV Mon, TV Gazin, TV Meio e TV Carioca. O endereço da Líder TV foi conferido no próprio player da emissora. As correções também se aplicam à última lista salva no aparelho e às próximas atualizações. Não foram trocadas afiliadas ou identificadores de favoritos.

Quando todas as fontes falham, o player encerra as tentativas, remove o carregamento e mostra Tentar novamente. Fontes alternativas continuam sendo tentadas antes desse estado. No APK, Play/Pause permite repetir a tentativa após uma falha definitiva.

Validação real no navegador: CSI: Miami BR, Grachi, MasterChef, Líder TV e +MaisUm, com quadros de vídeo e reprodução em andamento. No emulador Android TV API36: CSI: Miami BR no player nativo, com a lista de canais por cima do vídeo. Regressões de contas/addons, biblioteca, legendas/tela cheia e testes do parser/manifestos aprovados. Esta versão ainda não foi testada fisicamente no Fire TV Stick ou na Xiaomi Box; fontes independentes indisponíveis continuam dependendo dos provedores.

Atualize a página com Ctrl+F5, reabra o arquivo local ou, na TV, use Minha conta > Verificar atualização. APK 1.6.1, versionCode 10, assinado com a mesma chave. Nenhuma nova permissão, exceção HTTP ou alteração de certificados.

## Grade ampliada — APK 1.6.0, site e página local

Fontes brasileiras iptv-org, Free-TV e Pluto/Llorchico integradas à grade existente. A cópia inicial contém 497 fontes HTTPS, reunidas em 411 canais antes de combinar com a API Rei dos Canais. Nomes/identificadores existentes são preservados para manter os favoritos; canais novos recebem identificadores estáveis. Versões do mesmo canal são agrupadas quando há correspondência de identificador ou nome normalizado, sem juntar automaticamente afiliadas diferentes.

Em **Canais > Fontes de canais** ou **Minha conta > Canais ao vivo**, ative/desative listas e atualize manualmente. As listas também são atualizadas ao abrir o app e a cada 6 horas enquanto ele está aberto. Se uma lista falhar, a última cópia permanece disponível. Essa seleção fica neste aparelho; favoritos continuam sincronizados pela conta. Nenhuma lista privada ou cadastro em outro serviço é necessário.

Transmissões diretas usam HLS/vídeo no navegador e Media3/ExoPlayer no APK, mantendo o guia e a navegação pelo controle sobre o vídeo nativo. Falhas ou demora no carregamento tentam outras fontes do canal, sem repetir as que falharam naquela sessão. Os players incorporados já existentes continuam disponíveis como alternativas. O vídeo depende da conectividade, região e disponibilidade dos provedores; não se garante que toda entrada de lista reproduza em toda rede.

Guia XMLTV da Pluto associado pelos identificadores dos canais; validado com programação atual/seguinte de 186 canais. A API anterior mantém sua programação quando disponível. Fontes sem guia correspondente mostram “Programação não informada”. URLs HTTP das novas listas são filtradas; nenhuma nova exceção HTTP, alteração de certificados ou nova permissão Android foi adicionada.

Validação: parser M3U, união/deduplicação, favoritos existentes, filtros de endereços e XMLTV; regressões de contas, biblioteca e player sob demanda. Navegador: fallback de fonte 404 para HLS e configuração de listas. Emulador Android TV API36: vídeo nativo visível, guia lateral com vídeo contínuo, troca pelo controle, fonte inválida seguida de alternativa automática e canal real +MaisUm. Ainda sem teste físico desta versão no Fire TV Stick ou Xiaomi Box.

## Tela cheia no navegador — 24/11/2026

Corrigido o botão Tela cheia e o atalho F nos filmes e séries do site e da página local. A expansão usa um contêiner que reúne vídeo, legendas e controles, compatível com a API de tela cheia. Esc ou o próprio botão sai da tela cheia. A troca de versão/fonte mantém o contêiner e a posição do vídeo. Validado no navegador com MP4 e HLS; o APK permanece na versão 1.5.1.

## Player no computador e no site — atualização web

Os filmes e episódios agora usam os mesmos grupos de controles do aplicativo de TV: Legendas, Áudio, Fontes, Episódios, próximo episódio, ajuste de tela, velocidade, recomeçar e tentar novamente. A troca de fonte preserva a posição e a pausa. Atalhos: Espaço pausa/reproduz, setas esquerda/direita buscam 10 segundos, F abre tela cheia e Esc retorna.

Legendas reúne faixas embutidas expostas pelo navegador, legendas da fonte e addons instalados na conta, incluindo OpenSubtitles. As consultas usam o identificador do filme/episódio e os dados do arquivo quando disponíveis. Também é possível carregar SRT, WebVTT e ASS/SSA do computador, inclusive gzip/ZIP de até 4 MB. O estilo original de ASS é substituído pelo estilo escolhido.

Em **Legendas > Preferências**, escolha idioma principal/secundário, tipo normal/SDH/forçadas, prioridade embutida/addons, aparência, tamanho, posição e sincronização. Também há acesso em **Minha conta > Reprodução e legendas**. Os padrões ficam por conta neste navegador; cada TV mantém seus próprios padrões. Addons, favoritos e progresso continuam acompanhando a conta.

O site e o arquivo local usam o motor do navegador. Faixas de áudio/legendas precisam ser expostas por ele; CORS, conteúdo HTTP em páginas HTTPS, cabeçalhos especiais e codecs podem limitar fontes que funcionam no APK nativo. Esses controles não removem as restrições do navegador. A página local abre com dois cliques, mas precisa de internet para catálogos, vídeos, addons e legendas remotas. O APK permanece na versão 1.5.1.

Validação: reprodução MP4 e HLS, troca real de áudio entre seis faixas e legenda HLS em português do Brasil, fallback HLS nativo quando necessário, consulta real ao OpenSubtitles v3, seleção de legenda externa, renderização de faixa embutida e de arquivo local, aparência amarela, troca de fonte mantendo posição/pausa e próximo episódio. Testes automatizados de SRT/WebVTT/ASS, codificações, sincronização, gzip/ZIP e limites de descompactação; regressão de contas e catálogos. Bibliotecas web verificadas pelo npm audit sem vulnerabilidades conhecidas.

## Correção de reprodução — APK 1.5.1

Diagnóstico feito diretamente na TV Android 12 do proprietário, com fontes da conta já instalada. O player passa a seguir os redirecionamentos de mídia preservando os links assinados. HTTP é permitido somente para os destinos exatos ultrap.top e 23.158.40.171, após autorização explícita do proprietário; não há liberação global nem para subdomínios. Nesses destinos, endereços e tokens dos vídeos podem ser observados na rede. Login, consultas de addons e legendas continuam em HTTPS e certificados inválidos continuam bloqueados.

Fontes sem faixa de vídeo decodificável e carregamentos sem primeiro quadro passam à próxima alternativa. Ao trocar automaticamente, o app prioriza uma opção diferente da que falhou. Uma falha definitiva pausa o player e mantém os controles disponíveis.

Imagem confirmada pelo proprietário na TV durante Homem de Ferro/BestCine. O menu retornou 65 legendas dos addons, com OpenSubtitles v3 em português do Brasil selecionado automaticamente. Capturas ADB dessa TV podem omitir a imagem do vídeo devido à camada de hardware. Falhas de servidor, incluindo 502, ainda dependem do provedor.

## Player nativo e legendas — APK 1.5.0

Os filmes e episódios dos addons usam Media3/ExoPlayer, com MP4, MKV, HLS e DASH HTTPS conforme os codecs da TV. Fontes marcadas notWebReady e cabeçalhos informados pelo addon são tratados no APK. Consultas nativas aos addons evitam restrições CORS; uma falha tenta automaticamente outras fontes disponíveis. O Saimo e a TV ao vivo mantêm seus caminhos de reprodução.

- OK pausa/reproduz; esquerda/direita busca 10 segundos; baixo entra nos controles; Menu abre opções.
- Legendas reúne faixas embutidas e addons de legendas instalados, incluindo OpenSubtitles. A consulta usa o filme ou episódio e, quando fornecidos, nome, hash e tamanho do arquivo.
- Em Legendas > Preferências: idioma principal/secundário, tipo normal/SDH/forçadas, prioridade, aparência, tamanho, posição e sincronização externa. Os padrões ficam por conta nesta TV; também há acesso em Minha conta.
- Fontes, áudio, temporadas e episódios são escolhidos no player. A troca de fonte preserva a posição; o progresso continua integrado à conta.

Validado com fontes de teste no emulador Android TV e resposta real do OpenSubtitles v3. Ainda sem teste físico no Fire TV Stick ou Xiaomi Box. O app depende da disponibilidade dos provedores e dos codecs do aparelho. Torrents sem URL de vídeo, DRM e arquivos compactados continuam sem suporte.

## APK 1.3.1

Removido o logo fixo de canal que o app exibia no canto superior direito durante a transmissão.

## Controle da TV — versão 1.3.0

O canal abre em tela cheia, com reprodução automática nos players compatíveis. **OK** abre a lista no canal atual; **cima/baixo** percorre os canais sem interromper o vídeo; **OK** confirma a troca e fecha a lista. Com a lista fechada, **cima/baixo** troca diretamente de canal e **direita** abre as opções de transmissão. Play/Pause respeita a pausa.

Nos catálogos, a seta direita entra no conteúdo. **Menu** abre Favoritar ou Remover de Continuar assistindo. Busca e campos abrem o teclado com **OK**. Voltar retorna ao item anterior.

Testado no emulador Android TV com Globo, ESPN e SBT. A reprodução automática usa AndroidX WebKit e depende do suporte DOCUMENT_START_SCRIPT no WebView do aparelho; WebViews antigos mantêm o comportamento do provedor. Ainda sem validação física no Fire TV Stick 4K e na Xiaomi TV Box S.

## Biblioteca dos addons — versão 1.2.0

1. No computador ou celular, entre na sua conta e abra **Minha conta > Meus addons > Adicionar addon**.
2. Cole o link HTTPS `manifest.json` de um addon compatível e confirme a instalação.
3. Abra **Filmes** ou **Séries**: os catálogos aparecem em fileiras por addon, com busca, seleção de catálogo, gênero quando oferecido e paginação.
4. Na TV, entre **na mesma conta**, inclusive por QR Code, e use **Sincronizar addons**, disponível em Filmes, Séries e Minha conta. Os addons, sua ordem e seu estado ativado/desativado acompanham a conta; não é necessário reinstalá-los no aparelho.

Minha conta reúne a configuração. Os títulos são explorados nas telas de Filmes, Séries e início. O catálogo Saimo continua disponível na seleção de origem, e o modo visitante mantém seu funcionamento anterior.

O botão de sincronização busca a configuração salva da conta e atualiza os manifestos. Se um provedor falhar, o app preserva a última configuração e os outros catálogos continuam disponíveis. Addons não são instalados automaticamente por este projeto.

## Atualizar o APK

Na versão 1.1.0 ou superior: **Minha conta > Verificar atualização**. O app baixa o APK oficial, verifica SHA-256, identidade e assinatura, e abre o instalador para confirmação. Versões anteriores precisam usar o link do Downloader uma vez. Instale sobre a versão anterior para preservar os dados locais.

Compatibilidade pretendida: Fire TV Stick 4K com Fire OS e Xiaomi TV Box S, Android 6 ou superior. Modelos com Vega OS não instalam APKs.

## Limites atuais

- No navegador/Saimo, o suporte depende do WebView. No APK, addons usam Media3 e codecs do aparelho. Torrents sem URL de vídeo, DRM e arquivos compactados não são reproduzidos.
- Cadastro sem confirmação de e-mail por escolha do proprietário. Recuperação por e-mail depende de configurar SMTP.
- A reprodução depende dos servidores, dos codecs do aparelho e da conectividade dos provedores. Ainda é necessário validar fisicamente nos aparelhos.

## Referências de comportamento

O fluxo foi estudado nos repositórios [Stremio Web](https://github.com/Stremio/stremio-web), incluindo `Board` e `Discover`, e [NuvioTV](https://github.com/NuvioMedia/NuvioTV), incluindo o pipeline de catálogos e `AddonSyncService`. A implementação desta página foi escrita para a estrutura própria da Minha TV; não é o aplicativo oficial desses projetos.

Os arquivos de fontes Android e completos estão anexos às releases. As senhas e a chave privada de assinatura não fazem parte dos arquivos públicos. A configuração pública do Supabase usa RLS para separar os dados de cada conta.

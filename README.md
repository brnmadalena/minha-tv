# Minha TV

[Abrir site](https://brnmadalena.github.io/minha-tv/) · [APK direto para o Downloader](https://brnmadalena.github.io/minha-tv/tv.apk) · [Versões e fontes](https://github.com/brnmadalena/minha-tv/releases)

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

- Reprodução de fontes MP4/HLS HTTPS compatíveis com o WebView. Fontes torrent, DRM, arquivos compactados e fontes que exigem cabeçalhos especiais precisam de outro motor e não são reproduzidas por esta versão.
- Cadastro sem confirmação de e-mail por escolha do proprietário. Recuperação por e-mail depende de configurar SMTP.
- A reprodução depende dos servidores, dos codecs do aparelho e da conectividade dos provedores. Ainda é necessário validar fisicamente nos aparelhos.

## Referências de comportamento

O fluxo foi estudado nos repositórios [Stremio Web](https://github.com/Stremio/stremio-web), incluindo `Board` e `Discover`, e [NuvioTV](https://github.com/NuvioMedia/NuvioTV), incluindo o pipeline de catálogos e `AddonSyncService`. A implementação desta página foi escrita para a estrutura própria da Minha TV; não é o aplicativo oficial desses projetos.

Os arquivos de fontes Android e completos estão anexos às releases. As senhas e a chave privada de assinatura não fazem parte dos arquivos públicos. A configuração pública do Supabase usa RLS para separar os dados de cada conta.

# IRONPEAK Strength System — versão de revisão

Pacote estático preparado para publicação de teste no GitHub Pages.

## Conteúdo
- `index.html`: aplicativo atualizado em revisão.
- `manifest.webmanifest`: configuração de instalação PWA.
- `sw.js`: service worker com cache versionado e atualização de navegação pela rede.
- `logo-team-gabriel-castro.png`: logotipo original recuperado do pacote anterior, sem redesenho.
- `RELATORIO_REVISAO.md`: alterações, verificações e limitações conhecidas.

## Publicação
Envie os arquivos desta pasta para a raiz do repositório GitHub Pages, substituindo os arquivos da versão de teste somente depois de fazer backup do conteúdo atual. Não publique por cima da versão em uso sem antes validar em uma URL de teste.

## Avisos importantes
- Esta versão continua usando `localStorage` (`ironpeak_v1`) como armazenamento principal.
- Não possui autenticação individual, banco de dados remoto, sincronização entre celulares ou isolamento seguro de dados por atleta.
- O cadastro de colaboradores é informativo e não concede permissões reais.
- Os módulos originais estão incorporados no HTML e suas cópias são locais ao navegador.
- Fórmulas Excel são mantidas como texto de referência; não há mecanismo geral de recálculo Excel.
- O módulo de competição registra resultados manualmente; não certifica resultados oficiais nem implementa regras de federações.
- Não usar esta versão para armazenar dados sensíveis de vários atletas como se houvesse controle de acesso.

## Segurança
Nunca inserir chaves privadas, `service_role`, senhas ou segredos no HTML/JavaScript publicado.

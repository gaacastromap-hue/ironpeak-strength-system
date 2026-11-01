# IRONPEAK Strength System · V5

Protótipo web progressivo exclusivo da Team Gabriel Castro.

## O que foi atualizado nesta versão
- Mantém o núcleo da V4: calculadora de cargas/anilhas, programa de treinamento, cadastro de atletas, evolução, biblioteca e identidade visual original.
- Perfil próprio do treinador como atleta, com referências de Squat, Bench, Deadlift e Training Max.
- Diário local de saúde e recuperação: pressão arterial, frequência cardíaca de repouso, SpO₂, sono e observações.
- Cadastro de competições com data, federação, categoria/modalidade e local.
- Área IRONPEAK AI COACH com alertas locais simples sobre divergências de carga e repetições registradas.
- Biblioteca de referências de regulamentos por federação e versão.
- Registro de colaboradores e funções previstas.
- Histórico local de algumas alterações e ações.
- Atualização do cache do aplicativo para V5.

## Instalação no GitHub Pages
1. Extraia o ZIP.
2. Envie os cinco arquivos para a raiz do repositório, substituindo os arquivos de mesmo nome.
3. Faça commit diretamente na branch `main`.
4. Aguarde o GitHub Pages publicar e atualize o app no iPhone. Se continuar mostrando a versão antiga, feche o app e abra novamente; o cache do service worker também será renovado.

## Limitações importantes
Esta versão continua sendo um protótipo com armazenamento local no navegador. Não possui autenticação real, contas individuais, permissões efetivas, isolamento de dados entre atletas, sincronização entre aparelhos, banco de dados em nuvem ou backup automático. O módulo de equipe não cria convites ou logins. O AI Coach ainda não usa um modelo de IA conectado; os alertas são regras simples e não modificam prescrições. O diário de saúde não faz diagnóstico e não deve ser usado para armazenar dados sensíveis de terceiros. Referências de federações precisam ser preenchidas e conferidas pelo usuário com os documentos oficiais vigentes.

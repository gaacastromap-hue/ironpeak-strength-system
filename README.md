# IRONPEAK Strength System — versão inicial

## O que esta versão já faz
- Interface responsiva em português.
- Calculadora de porcentagens e distribuição de anilhas por lado.
- Cadastro local de alunos e suas marcas informadas.
- Registro de exercícios/sessões e cargas realizadas.
- Gráfico simples e tabela do histórico registrado.
- Biblioteca de links e dicas educativas.
- Exportação CSV e backup/importação JSON.
- Base de PWA para instalação quando hospedado por HTTPS.

## Como testar
1. Extraia o ZIP.
2. Abra `index.html` no navegador para testar a interface e os dados locais.
3. Para testar a instalação PWA e o modo offline, hospede a pasta em um endereço HTTPS ou rode um servidor local. Service workers não funcionam diretamente por `file://`.

## Limitações importantes
Esta é uma primeira versão local, não um sistema multiusuário pronto para alunos acessarem remotamente.
- Os dados ficam no armazenamento local do navegador/dispositivo.
- Não há autenticação nem sincronização entre dispositivos.
- Não há upload real de vídeos; a biblioteca salva links.
- O gráfico mostra registros recentes, sem análise avançada por exercício.
- Não há controle de quantidade física de cada anilha, apenas tipos de anilhas informados.
- O backup deve ser exportado pelo usuário.
- Antes de usar com dados reais de alunos, será necessário implementar backend, banco de dados online, autenticação, permissões, armazenamento de vídeos e políticas de privacidade.

## Próxima etapa recomendada
Validar a experiência e a calculadora. Depois conectar um backend com banco de dados e autenticação, mantendo isolamento rigoroso entre treinador e alunos.

# IRONPEAK Strength System | revisão técnica

## Alteração feita nesta etapa

- A importação de backup agora valida o tamanho do arquivo (limite de 15 MB), a estrutura principal e os tipos dos campos opcionais antes de substituir os dados.
- Se a gravação no armazenamento local falhar, o estado anterior em memória é restaurado.
- Mensagens de erro informam que os dados atuais foram mantidos; o seletor de arquivo é limpo ao final.

## Segunda etapa: gravação transacional local

- Criada a rotina `commitDbMutation()`: guarda uma cópia do estado antes da alteração e restaura o estado em memória se a gravação falhar.
- Aplicada à inclusão de atletas, edição de células dos presets, renomeação e exclusão de cópias, duração do programa, exercícios do programa, nome do dia e gravação do último cálculo.
- Na edição de célula, a interface também volta ao valor anterior quando o navegador não consegue salvar.
- A gravação do cálculo agora informa quando o resultado foi calculado, mas não pôde ser persistido.

## Testes executados

- JavaScript incorporado em `index.html`: `node --check` aprovado após a alteração.
- Teste automatizado isolado de importação: aprovado para backup válido, arquivo com estrutura inválida e falha de gravação simulada.
- Teste isolado da rotina transacional: aprovado para gravação normal, falha simulada por falta de espaço, restauração do estado anterior e nova gravação após a falha.
- Busca estática após a alteração: não restaram gravações diretas em `localStorage` fora da função central `persist()`.

## Problemas ainda existentes, sem mascarar

1. A aplicação ainda usa `localStorage` como armazenamento principal. Isso não oferece login individual, sincronização entre aparelhos, isolamento real de dados ou backup automático.
2. A gravação transacional foi aplicada aos fluxos críticos listados nesta etapa, mas ainda é necessário revisar individualmente todos os formulários e ações de exclusão/edição restantes.
3. As fórmulas importadas dos módulos permanecem como texto. Não há mecanismo geral de cálculo compatível com Excel.
4. Não há autenticação real nem papéis de treinador/atleta conectados a um servidor. Portanto, não é tecnicamente possível declarar os dois perfis testados nesta versão.
5. Teste completo de interface em navegador não foi executado nesta sessão: o Chromium disponível bloqueou a navegação local com `ERR_BLOCKED_BY_ADMINISTRATOR`.
6. Migrações SQL e políticas de segurança precisam ser aplicadas e testadas em um projeto Supabase de teste antes de qualquer uso com dados reais.

## Proteção da versão publicada

Esta revisão está somente na pasta de trabalho. Não foi publicada e não altera o endereço atualmente usado pelos atletas.

## Próximos testes obrigatórios

- Fluxo completo do treinador e do atleta com contas separadas.
- Tentativas de acesso cruzado entre atletas e elevação indevida de permissões.
- Criação, edição, cópia e exclusão de programação sem alterar os modelos originais.
- Backup, restauração, arquivo corrompido, arquivo grande e falta de espaço.
- Cálculo de percentuais, arredondamento, barra e anilhas com cargas de referência.
- Uso offline, retorno da conexão, sincronização e conflito de edição.
- Instalação e atualização PWA em iPhone e Android.

**Conclusão:** alteração pontual aprovada nos testes isolados. Aplicativo completo ainda não aprovado para produção ou para armazenar dados sensíveis de atletas.

## Terceira etapa: calculadora de cargas e gravação da programação

- A calculadora agora valida limites de referência (0,5 a 1.000 kg), percentual (0 a 200%), barra (0,5 a 100 kg) e tipos de anilhas (até 12 tipos, cada um até 100 kg).
- Entradas de anilhas inválidas deixam de ser silenciosamente ignoradas; o sistema mostra uma mensagem específica.
- O cálculo usa precisão de 0,01 kg e limite superior de busca para evitar consumo descontrolado de memória/processamento em entradas absurdas.
- O modo "não ultrapassar" não excede a carga teórica. O modo "exato" só aceita montagem exata. No modo "mais próxima", em empate, prefere a carga abaixo da teórica.
- O resultado salvo inclui o critério de arredondamento e horário do cálculo.
- A gravação do cálculo passou a usar a rotina transacional central.
- A programação agora trabalha com cópia dos exercícios antes da edição. Isso evita que uma alteração feita em memória contamine o estado anterior antes de a rotina transacional criar o snapshot.
- Duração do programa, exercícios e nome do dia passaram a salvar pela rotina transacional. Foi removido o acesso direto ao localStorage dessas funções.

### Testes desta etapa

- `node --check` no JavaScript incorporado: aprovado.
- Testes isolados do algoritmo: combinação exata, modo para baixo sem ultrapassar, rejeição de combinação impossível no modo exato, modo mais próximo, carga zero e bloqueio de carga excessiva: aprovados.
- Busca estática: a única chamada direta a `localStorage.setItem` restante está dentro da função central `persist()`.

### Limites desta validação

- Os testes do algoritmo são testes isolados em Node, não testes de interação real na interface do iPhone.
- A calculadora considera a mesma combinação em cada lado da barra, mas ainda não controla o estoque físico de cada anilha. A própria tela informa essa limitação.
- Não foi validado ainda o conjunto completo de formulários e ações do app. O navegador de teste local segue bloqueado neste ambiente.

## Etapa adicional: integridade dos presets (2026-11-06)

### Alterações implementadas
- A criação de cópias individuais dos presets agora valida a estrutura antes de alterar o banco local: exige 16 abas, nome e linhas válidas, limite de 100 células por linha e tipos de célula primitivos.
- A cópia usa serialização profunda, para que células editadas na cópia não alterem as estruturas dos módulos originais.
- A inclusão da cópia e o respectivo evento de auditoria passaram a ocorrer dentro de `commitDbMutation`, evitando evento de auditoria órfão ou cópia parcialmente registrada quando a persistência falha.
- A geração do identificador verifica a disponibilidade de `crypto.randomUUID` e mantém fallback local; também verifica colisão antes de inserir.
- A cópia registra `schemaVersion: 1`.

### Verificações executadas
- `node --check` no JavaScript embutido: aprovado.
- Leitura da biblioteca embutida: Básico, Intermediário e Avançado encontrados, cada um com 16 abas.
- Contagem de linhas por módulo: Básico 737; Intermediário 757; Avançado 927.
- Teste de isolamento de cópia profunda: alteração de célula na cópia não alterou a origem: aprovado.

### Limitações
- A contagem e a estrutura interna foram verificadas contra os dados embutidos no próprio HTML. Não foi feita comparação célula a célula com os arquivos Excel originais nesta etapa.
- Não foi possível executar a interface em navegador neste ambiente. Os testes acima são estáticos e isolados, não substituem teste manual de treinador e atleta.
- Os presets e cópias ainda são armazenados apenas no navegador atual. Não existe autenticação real nem sincronização em nuvem até a integração com backend.

## Etapa adicional: cadastros de competições, regulamentos e colaboradores

### Alterações implementadas
- Cadastro de competição agora valida formato e existência real da data (evita datas como 31/02), limita o tamanho dos campos e gera identificador próprio.
- Cadastro de competição passou a usar `commitDbMutation`; campos só são limpos após confirmação da gravação.
- Cadastro de referência de regulamento valida a URL com o parser nativo, aceitando somente HTTP/HTTPS e hostname válido. Os campos têm limites de tamanho e a gravação é transacional.
- Cadastro de colaborador valida função por lista permitida, limita o nome, evita duplicidade sem diferenciar maiúsculas/minúsculas e grava identificador/data. A gravação e auditoria são transacionais.
- Mantido aviso explícito na interface: o cadastro de colaborador é apenas um registro informativo, não cria conta, autenticação nem permissão real.

### Verificações executadas
- JavaScript inline extraído do HTML e validado com `node --check`: aprovado.
- Busca estática confirmou que a única chamada direta a `localStorage.setItem` continua dentro da função central `persist()`.

### Limitações desta etapa
- Não foram executados testes de clique em navegador, porque o ambiente de navegador local está bloqueado.
- Não há ainda fluxo de edição/exclusão de colaborador com papéis de autorização; esses papéis não existem como controle de segurança nesta versão local.
- Cadastro local não equivale a conta de colaborador nem a permissão. Essa separação depende do backend e de políticas testadas.

## Etapa: integridade do histórico, recordes e base de ranking (2026-11-07)

### Problemas encontrados e corrigidos
- A lista de treinos exibia a carga prescrita como se fosse carga executada quando `actualLoad` ainda estava vazio. Agora mostra explicitamente a carga prescrita e o estado pendente; só mostra carga executada após registro concluído.
- A tabela de evolução também apresentava a carga prescrita na coluna de execução. Agora exibe `Não registrado` até haver execução concluída.
- O gráfico de evolução incluía sessões pendentes e podia produzir progresso fictício. Agora considera somente sessões concluídas com carga realmente executada.
- Ao abrir o registro de uma sessão pendente, o campo de carga executada começa vazio, em vez de sugerir a carga prescrita como se tivesse sido levantada.

### Base de recordes individuais
- Adicionadas funções para apurar as melhores cargas concluídas de agachamento, supino e terra por atleta, reconhecendo nomes comuns em português e inglês.
- O total de powerlifting só é calculado quando existem registros dos três movimentos.
- Sessões pendentes, registros de outro atleta, cargas nulas ou inválidas não entram nos recordes.

### Testes executados
- `node --check` no JavaScript inline: aprovado.
- 5 testes isolados de recordes: melhor marca por movimento, exclusão de sessão pendente, isolamento entre atletas, total quando os três movimentos existem e ausência de total quando faltam movimentos: aprovados.
- Verificação estática confirmou que lista, tabela e gráfico não usam mais carga prescrita como carga executada.

### Limitações restantes
- As funções de recorde são a base de cálculo; a tela de ranking comparativo e filtros ainda precisam ser construídos.
- A identificação dos movimentos depende do nome do exercício conter termos reconhecidos (agachamento/agach/squat, supino/bench, terra/deadlift). Um catálogo com IDs de exercícios será mais confiável.
- O total é soma das melhores cargas registradas em sessões, não é automaticamente um total oficial de competição. Para total oficial, será necessário módulo de tentativas válidas por competição e regras da federação.
- Interface completa em navegador, iPhone, autenticação e sincronização ainda não foram testadas.

## Etapa: registro de resultados de competição (2026-11-10)

### Implementação
- A tela de competições ganhou formulário para registrar as três tentativas de agachamento, supino e terra para um atleta e uma competição selecionados.
- Cada tentativa possui carga e estado: não realizada, válida ou inválida.
- A apuração considera apenas tentativas marcadas como válidas e seleciona a maior carga válida de cada movimento.
- O total só é calculado quando existe pelo menos uma tentativa válida em cada um dos três movimentos.
- Resultado é associado ao atleta e à competição; salvar novamente substitui o registro anterior daquele atleta naquela competição, sem apagar resultados de outros atletas.
- O registro usa `commitDbMutation` e gera evento de auditoria.
- A interface informa que o lançamento é manual e não substitui a conferência do resultado oficial da federação.

### Testes executados
- `node --check` no JavaScript inline: aprovado.
- 7 testes isolados: melhor tentativa válida; nenhuma tentativa válida; escolha entre válidas e pendentes; rejeição de carga zero; rejeição de status inválido; rejeição de carga acima de 1.000 kg; rejeição de carga atribuída a tentativa pendente: todos aprovados.
- Verificação estática: nenhum ID duplicado no HTML; nenhum handler `onclick` sem função declarada.

### Limitações
- Não foi possível executar teste de clique e fluxo visual em navegador/iPhone neste ambiente. Os campos de tentativas são criados dinamicamente, portanto a contagem de IDs no HTML estático não os inclui.
- Ainda não há importação automática de resultados, validação de regras específicas de federação, weigh-in, tentativas de abertura/ordem de chamada, nem ranking público.
- O total registrado é uma apuração local baseada nos estados escolhidos pelo usuário; não é certificado como resultado oficial.
- Persistência ainda é localStorage. Não há login nem sincronização multiaparelho.

## Preparação do pacote de teste para publicação (2026-11-10)

### Arquivos incluídos e ajustes
- Incluído `manifest.webmanifest` para instalação PWA.
- Incluído `sw.js` com nome de cache versionado para esta revisão. A navegação tenta buscar a versão atual pela rede e usa a cópia em cache apenas quando offline. O service worker remove apenas caches antigos com prefixo `ironpeak-shell-`, sem apagar caches genéricos de outros aplicativos.
- Recuperado o logotipo original `logo-team-gabriel-castro.png` do pacote anterior do IRONPEAK, sem redesenho.
- README atualizado com instruções e limitações de publicação.

### Testes executados nesta preparação
- JavaScript inline do HTML: validação de sintaxe com `node --check`.
- `sw.js`: validação de sintaxe com `node --check`.
- Manifesto: parse JSON válido.
- Referências locais do HTML: manifest, logotipo e service worker presentes no pacote.
- Biblioteca embutida: três presets (Básico, Intermediário e Avançado), cada um com 16 abas.

### Limitações e bloqueios antes de uso real
- Não foi possível executar a interface em navegador real neste ambiente. Teste visual e de interação em iPhone/Android continua pendente.
- Sem Supabase/backend: sem login, papéis reais, sincronização, isolamento multiusuário ou backup remoto.
- O pacote é uma versão de teste do front-end local, não uma versão final de produção multiatleta.
- Antes de publicar na URL usada pelos alunos, testar em repositório/branch ou URL separada e manter backup da versão atual.

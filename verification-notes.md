# Verificação visual do protótipo CYPHER

- Dashboard inicial confirmado com sidebar fixa, cabeçalho, hero assimétrico, métricas, eventos, pessoas e ciclo CYPHER.
- Busca confirmada com campo funcional, filtros visuais, cartões profissionais e ação de conexão.
- Obras e créditos confirmada com catálogo, métricas, tabela, Menção Fantasma e modal de nova obra.
- Banco de Beats confirmado com cards de demonstração, filtros e modal de detalhes/player visual.
- Cypher Central confirmada com busca, FAQ expansível e artigos recentes.
- Login confirmado com composição dividida, formulário, visitante e link de cadastro.
- Paleta aplicada: verde-lima #c8f22b, amarelo #ffd529, preto #10140f, branco/papel #f4f2eb.
- TypeScript e build de produção passaram sem erros; aviso restante é apenas sobre tamanho do chunk e configuração pnpm legada do scaffold.
- Correção aplicada: rota `/` agora usa o AppShell para exibir navegação completa desde a home.

## Verificação da edição de 17/09/2026

A sidebar aparece com a nova cor verde profunda #001403 e mantém o contraste adequado com links, reputação e avatar. A navegação foi extraída para `client/src/components/SidebarNav.tsx`, deixando o `AppShell` responsável apenas por estado de abertura/fechamento e layout geral; o partial possui `overflow-y: auto` para permitir rolagem independente quando o menu crescer.

A busca rápida foi reposicionada para acompanhar a descrição do dashboard, formando um grupo contextual no cabeçalho em vez de ficar solta no canto superior direito. A tela de busca de pessoas permaneceu estável e visualmente alinhada. TypeScript, build de produção e integração estrutural passaram.

## Verificação da edição de 17/09/2026 — workspace

O workspace deixou de ser um `div` estático e agora é um `<select>` controlado com opções Espaço de trabalho, Coletivo Linha 5 e Estudos Cypher. O botão de fechar foi ajustado no cabeçalho da sidebar com alinhamento e área de clique mais previsíveis. A captura desktop confirmou o novo visual sem regressões; TypeScript e build continuam aprovados.

## Verificação da edição de 17/09/2026 — perfil e busca

A home mostra o botão `Buscar` com lupa no header contextual, mantendo o alinhamento do texto introdutório e o estilo geral escuro/lima. O bloco Marina Costa na sidebar agora é clicável e leva à página Meu perfil; a captura confirmou o estado ativo do item de navegação e o carregamento correto do perfil.

## Verificação da edição de 17/09/2026 — busca no header

A captura desktop confirmou o botão `Buscar` no topbar, com fundo bege levemente mais escuro, lupa e atalho. Na captura mobile, o header ainda funcionou, mas `Visão geral` quebrou em duas linhas e o atalho ocupou espaço excessivo; foi identificado um ajuste responsivo necessário para compactar o breadcrumb e esconder o atalho em telas estreitas.

## Verificação da edição de 17/09/2026 — ajuste mobile do header

O header mobile foi compactado: o breadcrumb agora mantém uma linha truncada sem quebra, o botão `Buscar` permanece legível com lupa e o atalho `⌘ K` é ocultado apenas em telas estreitas para evitar compressão. A nova captura mobile confirmou o resultado; TypeScript e build de produção passaram.

## Verificação da edição de 17/09/2026 — limpeza do header

O span de atalho foi removido completamente do botão Buscar. Também foram removidos os estilos inline indevidos que haviam sido aplicados ao container, ícone, notificações e avatar; a aparência volta a ser controlada pelas classes CSS. A captura desktop confirmou o botão bege compacto sem atalho visual, e TypeScript/build passaram.

## Verificação da edição de 17/09/2026 — padding do botão Buscar

A edição gerou atributos `style` duplicados e foi corrigida. O padding solicitado foi aplicado de forma sustentável via `.topbar-search`: 10px à esquerda e 70px à direita no desktop, com override para 10px em telas de até 560px. A captura desktop confirmou o espaço ampliado; a captura mobile confirmou o botão compacto e o header sem quebra. TypeScript, build e validação de JSX passaram.

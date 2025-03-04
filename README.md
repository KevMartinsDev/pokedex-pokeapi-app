![Pokédex Logo](./src/assets/img/logo.png)

## Propósito da Aplicação

O **Pokédex React** é uma aplicação web desenvolvida para explorar e exibir informações detalhadas sobre Pokémon, utilizando a API pública PokeAPI. A aplicação permite aos usuários navegar por uma lista de Pokémon, pesquisar por nome ou ID, filtrar por tipo, ordenar os resultados e visualizar informações detalhadas em um modal interativo.

## Funcionalidades

- **Lista de Pokémon**: Exibição inicial de Pokémon em formato de grade, com imagem, nome, ID e tipos.
- **Carregar Mais**: Botão para carregar mais Pokémon dinamicamente, com suporte a rolagem infinita simulada.
- **Pesquisa**: Campo de busca para encontrar Pokémon por nome ou ID, com debounce para otimizar requisições.
- **Filtro por Tipo**: Dropdown para filtrar Pokémon por tipo (ex.: "fire", "water").
- **Ordenação**: Opções para ordenar por ID (crescente/decrescente) ou nome (A-Z/Z-A).
- **Modal de Detalhes**: Exibe informações detalhadas ao clicar em um Pokémon, incluindo estatísticas, habilidades, movimentos e fraquezas/resistências.
- **Troca de Tema**: Alternância entre temas claro e escuro com um toggle.
- **Responsividade**: Design adaptável para diferentes tamanhos de tela (mobile, tablet, desktop).
- **Cache Local**: Armazena dados básicos no localStorage para reduzir requisições iniciais.

## Ferramentas Utilizadas e Justificativas

- **React**: Biblioteca principal para construção de interfaces dinâmicas e reutilizáveis, escolhida por sua eficiência e popularidade em projetos web.
- **Styled-Components**: Utilizado para estilização com CSS-in-JS, oferecendo escopo local, suporte a temas e facilidade de manutenção.
- **PokeAPI**: API gratuita e rica em dados sobre Pokémon, ideal para o propósito da aplicação.
- **React Router**: Gerencia rotas para suportar navegação e URLs específicas para cada Pokémon.
- **Lodash (debounce)**: Implementa debounce na busca para evitar requisições excessivas durante a digitação.
- **LocalStorage**: Armazena dados em cache para melhorar a performance na inicialização.
- **Jest e React Testing Library**: Ferramentas de teste para garantir a funcionalidade dos componentes e hooks.

Essas ferramentas foram escolhidas por sua robustez, comunidade ativa e adequação ao escopo do projeto, equilibrando performance e experiência do desenvolvedor.

## Decisões Adotadas e Justificativas

1. **Carregamento Incremental**: 
   - Pokémon são carregados em lotes (200 por vez) e exibidos em páginas de 10 itens, equilibrando performance e usabilidade.
   - Justificativa: Evita sobrecarga na rede e melhora a experiência em conexões lentas.

2. **Cache no LocalStorage**: 
   - Dados básicos são salvos localmente após o primeiro carregamento.
   - Justificativa: Reduz tempo de carregamento em usos subsequentes e suporta uso offline parcial.

3. **Lazy Loading no Modal**: 
   - O componente `PokemonModal` é carregado sob demanda com `React.lazy` e `Suspense`.
   - Justificativa: Otimiza o carregamento inicial, carregando apenas o necessário.

4. **Limitação de Pokémon**: 
   - Suporte apenas aos 1025 Pokémon da API (até Generation 9), evitando IDs inválidos.
   - Justificativa: Mantém consistência com a PokeAPI e evita erros em dados ausentes.

5. **Design Responsivo**: 
   - Uso de media queries e grid layout para adaptar a interface.
   - Justificativa: Garante usabilidade em dispositivos variados, como smartphones e desktops.

6. **Temas Claro/Escuro**: 
   - Implementação com `ThemeProvider` e `styled-components`.
   - Justificativa: Melhora a acessibilidade e preferência do usuário.

## Passo a Passo para Rodar o Projeto

1. **Pré-requisitos**:
   - Node.js (versão 18 ou superior)
   - npm (ou yarn, opcional)

2. **Clone o Repositório**:
   ```bash
   git clone https://github.com/KevMartinsDev/pokedex-pokeapi-app.git
   cd pokedex-react
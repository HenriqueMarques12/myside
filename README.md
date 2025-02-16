# MySide E-commerce

Uma aplicação moderna de e-commerce construída com Next.js, Redux e Styled Components.

🌐 [Demo ao Vivo](https://myside-three.vercel.app/)

## Funcionalidades

- 🛍️ Catálogo de produtos com busca e filtros
- 🛒 Carrinho de compras com atualizações em tempo real
- 🌙 Suporte a tema claro/escuro
- 🚚 Calculadora de frete
- 🏷️ Sistema de cupons
- 📱 Design totalmente responsivo
- ⚡ Otimizado para performance
- 🧪 Suite completa de testes

## Tecnologias Utilizadas

- Next.js 13
- TypeScript
- Redux Toolkit
- Styled Components
- Framer Motion
- Jest & React Testing Library

## Pré-requisitos

- Node.js 16.x ou superior
- npm 7.x ou superior

## Como Iniciar

1. Clone o repositório:
```bash
git clone https://github.com/HenriqueMarques12/myside
cd myside
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia o servidor de produção
- `npm run lint` - Executa a verificação de código
- `npm run test` - Executa os testes
- `npm run test:watch` - Executa os testes em modo de observação
- `npm run check` - Executa lint e testes
- `npm run check:start` - Executa verificações, build e inicia o servidor

## Testes

O projeto inclui uma suite completa de testes usando Jest e React Testing Library. Para executar os testes:

```bash
# Executar testes uma vez
npm run test

# Executar testes em modo de observação
npm run test:watch
```

## Estrutura do Projeto

```
├── app/                  # Diretório Next.js
├── components/          # Componentes React
├── lib/                 # Utilitários, hooks e serviços
│   ├── hooks/          # Hooks personalizados
│   ├── services/       # Serviços de API
│   ├── store/          # Store Redux e slices
│   ├── theme/          # Configuração de tema
│   └── types/          # Tipos TypeScript
├── __tests__/          # Arquivos de teste
└── public/             # Arquivos estáticos
```

## Detalhes das Funcionalidades

### Carrinho de Compras
- Adicionar/remover produtos
- Atualizar quantidades
- Aplicar cupons de desconto
- Calcular frete
- Estado persistente do carrinho

### Catálogo de Produtos
- Funcionalidade de busca
- Filtro por categorias
- Paginação
- Layout responsivo em grid

### Sistema de Temas
- Suporte a modo claro/escuro
- Detecção de preferência do sistema
- Preferência de tema persistente
- Transições suaves

### Performance
- Imagens otimizadas
- Code splitting
- Monitoramento de performance
- Carregamento lazy
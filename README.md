# Auto Confiança

Catálogo de veículos seminovos e empreendimentos imobiliários da Auto Confiança.

## Tecnologias

- Next.js 15 com App Router
- React 19 e TypeScript
- Tailwind CSS 4
- Lucide React para ícones
- Exportação estática para HTML

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação ficará disponível em [http://localhost:3001](http://localhost:3001).

## Build e publicação

Gere a versão estática:

```bash
npm run build
```

O resultado será criado na pasta `out/`. Para servir essa pasta localmente:

```bash
npm run serve
```

## Rotas principais

- `/` - página inicial
- `/veiculos` - catálogo com busca e filtros
- `/veiculos/[codVeiculo]` - detalhe de um veículo
- `/imoveis` - catálogo de empreendimentos
- `/imoveis/[codImovel]` - detalhe de um empreendimento
- `/triu1722` - apresentação especial do TRIU 1722
- `/quaddra-lorena` - apresentação especial do Quaddra Lorena

## Dados e imagens

- Veículos: `data/veiculos.json`
- Imóveis: `data/imoveis.json`
- Imagens: `public/img/`

Os catálogos e páginas de detalhe usam dados locais dos arquivos JSON. Para adicionar ou atualizar itens, altere o JSON correspondente e inclua as imagens relacionadas em `public/img/`.

## Scripts

- `npm run dev` - inicia o desenvolvimento na porta 3001
- `npm run build` - gera a exportação estática
- `npm run start` - inicia o servidor Next em produção
- `npm run serve` - serve a pasta `out/` na porta 3000

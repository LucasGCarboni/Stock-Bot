<p align="center">
  <img src="./docs/figures/Banner.jpg" alt="Stock Bot Banner" width="100%">
</p>

<p align="center">Dados do Mercado Financeiro no Discord.</p>

<p align="center">

  <!-- Badges de tecnologias -->
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white"/>
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/>

</p>

---

# StockBot API

Uma API simples e automatizada que envia cotações de ações diretamente para um canal do Discord. Ideal para quem deseja acompanhar o mercado financeiro de forma prática e integrada.

---

## Funcionalidades

- Consulta de cotação de ações via API
- Envio diário de cotações para o Discord
- Pipeline CI/CD com GitHub Actions
- Deploy automatizado em ambiente cloud
- Fácil expansão para alertas e histórico de preços

# Comandos do Bot

Abaixo estão todos os comandos disponíveis atualmente no **Stock-Bot**, com suas descrições e exemplos.

---

## `/ping`

Verifica se o bot está online e responde com **Pong!**  
Útil para testar se o bot está funcionando corretamente.

## `/botinfo`

Mostra informações básicas sobre o bot, incluindo:

- Nome do bot
- ID
- Data de criação

## `/quote <ticker>`

O bot responde com:

- Preço atual
- Percentual de variação
- Código da ação consultada

## `/summary <ticker>`

O bot responde com indicadores fundamentalistas, sendo:

- Preço atual
- Preço sob lucro (P/L)
- Setor
- Resumo sobre a empresa
- Número de funcionários
- Site da empresa

## `/commands`

Lista todos os comandos disponíveis no bot, com uma breve descrição de cada um.

É útil para novos usuários entenderem rapidamente as funcionalidades do **Stock-Bot**.

---

## Services

O **StockBot** utiliza uma camada de serviços para centralizar a lógica de acesso a dados externos, garantindo:

- Melhor organização do código
- Facilidade de manutenção
- Testes unitários mais simples
- Reutilização de lógica entre comandos

Atualmente, os principais serviços são:

- `MarketService` — responsável por dados de mercado
- `LogoService` — responsável por resolução inteligente de logos

### MarketService

O **MarketService** centraliza o acesso à API da **Brapi**, sendo responsável por buscar dados de mercado financeiro da B3.

#### Principais responsabilidades

- Consultar cotações de ações
- Obter dados resumidos de empresas
- Isolar o acesso à API externa dos comandos do bot

#### Métodos disponíveis

##### `getQuote(ticker)`

Busca a cotação atual de uma ação.

**Retorna:**

- Preço atual
- Variação percentual
- Nome curto da empresa
- Horário da última atualização

```js
const quote = await getQuote("PETR4");
```

##### `getSummary(ticker)`

Busca informações resumidas e fundamentalistas da empresa.

```js
const summary = await getSummary("VALE3");
```

Inclui dados como:

- Setor
- Descrição da empresa
- Website oficial
- Número de funcionários

Observações

- O serviço lança erro caso o ticker não seja encontrado
- Toda autenticação via API Key é centralizada neste serviço

---

### LogoService

O **LogoService** é responsável por resolver automaticamente a logo de uma empresa, garantindo compatibilidade com **embeds do Discord**.

Ele foi projetado para lidar com inconsistências comuns em APIs públicas, como:

- Logos ausentes
- Formatos incompatíveis (SVG, WEBP)
- Falhas intermitentes de serviços externos

#### Estratégia de resolução (ordem de prioridade)

1. **Logo fornecida pela Brapi**

   - Utiliza `logourl` quando disponível
   - Ignora SVGs genéricos

2. **Cache em memória**

   - Evita múltiplas requisições externas
   - Chave: símbolo da ação (`PETR4`, `BBDC3`)

3. **Brandfetch API**

   - Busca baseada no nome da empresa (`longName`)
   - Remove sufixos como `S.A.` para melhorar assertividade

4. **Logo.dev (fallback)**
   - Tentativa final usando inferência de domínio a partir do ticker

#### Fluxo simplificado

Brapi → Cache → Brandfetch → Logo.dev

#### Exemplo de uso

```js
const logoUrl = await logoService.resolveLogo(stockData);

if (logoUrl) {
  embed.setThumbnail(logoUrl);
}
```

Cache

- Cache em memória baseado no ticker
- Reduz latência e consumo de APIs externas

---

## Tecnologias Utilizadas

- Node.js
- JavaScript
- GitHub Actions (CI/CD)
- Discord.js
- Axios

---

## Instalação e Uso

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/Stock-Bot.git
cd Stock-Bot

# Instalar dependências
npm install

# Implementar comandos criados
npm run register:commands

# Executar localmente
npm run dev
```

## Documentação

A documentação adicional do projeto está disponível na pasta [`docs/`](./docs).

- [Guia de Contribuição](./docs/CONTRIBUTING.md)

## Qualidade de Código

Este projeto utiliza **Prettier** e **ESLint** para manter a consistência e a qualidade do código.

### Prettier

Usado para formatação automática do código.

- Verificar se os arquivos estão formatados:

  ```bash
  npm run lint:prettier:check
  ```

- Corrigir automaticamente a formatação:
  ```bash
  npm run lint:prettier:fix
  ```

### ESlint

Usado para identificar problemas de código e boas práticas em arquivos .js.

- Verificar problemas de lint:
  ```bash
  npm run lint:eslint:check
  ```

### Integração Prettier + ESLint

O projeto está configurado para que o ESLint e o Prettier funcionem em conjunto sem conflitos.

- O `eslint-config-prettier` garante que regras de formatação do ESLint não entrem em conflito com as do **Prettier**.
- O `eslint-plugin-jest` adiciona boas práticas e regras para testes escritos com **Jest**.

Recomenda-se rodar os linters antes de abrir um Pull Request, garantindo que o código esteja limpo e padronizado.

## Código de Conduta

Este projeto adota o [Contributor Covenant](docs/CODE_OF_CONDUCT.md) como seu Código de Conduta.  
Todos os participantes devem segui-lo para garantir um ambiente acolhedor e respeitoso.

## Licença

Este projeto está sob a licença [MIT](./LICENSE).

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

## `/fundamentals <ticker>`

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

## Tecnologias Utilizadas

- Node.js
- JavaScript
- GitHub Actions (CI/CD)
- Discord.js
- Railway ou Render (deploy)
- Axios (requisições HTTP)

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

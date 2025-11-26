# 📈 StockBot API

Uma API simples e automatizada que envia cotações de ações diretamente para um canal do Discord. Ideal para quem deseja acompanhar o mercado financeiro de forma prática e integrada.

---

## 🚀 Funcionalidades

- Consulta de cotação de ações via API
- Envio diário de cotações para o Discord
- Pipeline CI/CD com GitHub Actions
- Deploy automatizado em ambiente cloud
- Fácil expansão para alertas e histórico de preços

# 🧠 Comandos do Bot

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

---

## 🛠️ Tecnologias Utilizadas

- Node.js
- JavaScript
- GitHub Actions (CI/CD)
- Discord.js
- Railway ou Render (deploy)
- Axios (requisições HTTP)

---

## 📦 Instalação e Uso

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/stockbot-api.git
cd stockbot-api

# Instalar dependências
npm install

# Executar localmente
npm start
```

## 📂 Documentação

A documentação adicional do projeto está disponível na pasta [`docs/`](./docs).

- [Guia de Contribuição](./docs/CONTRIBUTING.md)

## 🛠️ Qualidade de Código

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

## 📜 Licença

Este projeto está sob a licença [MIT](./LICENSE).

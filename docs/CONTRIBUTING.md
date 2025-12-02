# Contributing to StockBot API

Obrigado por querer contribuir com o StockBot API!
Siga estas orientações para manter o projeto organizado e facilitar o trabalho de todos.

---

## 1. Fluxo de Branches

- Todo desenvolvimento deve ser feito em **branches separadas**.
- Não é permitido commitar diretamente no `main`.
- Use nomes de branches claros, por exemplo:
  - `feat/nova-funcionalidade`
  - `chore/issue-templates`
  - `fix/corrigir-bug`

---

## 2. Commits

- Siga o padrão **Conventional Commits**:
  - `feat:` → novas funcionalidades
  - `fix:` → correção de bugs
  - `chore:` → manutenção, configs, templates
  - `docs:` → documentação
  - `test:` → testes
  - `ci:` → configuração de pipelines
- Evite commits genéricos como “update” ou “fix”.

---

## 3. Pull Requests

- Abra **PRs para o `main`** apenas quando a branch estiver pronta.
- Todo PR deve:
  - Passar na **pipeline de CI**.
  - Ser revisado e aprovado (se houver regra de revisão).
  - Ter um título e descrição claros.

---

## 4. Issues

- Sempre verifique se já não existe uma issue relacionada.
- Escolha o template correto ao abrir uma nova issue:
  - **Bug report** → erro ou comportamento inesperado.
  - **CI/CD** → pipelines, testes, GitHub Actions, workflows, automações.
  - **Documentation** → criação de documentos no projeto.
  - **Feature request** → sugestão de nova funcionalidade.
  - **Refactoring** → novas melhorias e refatoração de código.
  - **Task** → tarefas técnicas ou de infraestrutura.
  - **Blank issue** → caso não se encaixe em nenhum template.
- Preencha todos os campos obrigatórios do template.

---

# Guia de Templates de Issues e Pull Requests

Este documento explica como utilizar os **templates de Issues** e **Pull Requests** disponíveis neste repositório.  
Eles foram criados para padronizar a comunicação e facilitar o trabalho em equipe.

---

## Templates de Issues

Os templates estão localizados em `.github/ISSUE_TEMPLATE/`.  
Sempre escolha o template que melhor descreve sua solicitação.

### Tipos disponíveis:

- **Bug Report (`bug_report.md`)**  
  Para reportar erros ou comportamentos inesperados.  
  Label padrão: `bug`.

- **CI/CD (`ci.md`)**
  Para mudanças relacionadas a pipelines, testes, GitHub Actions, workflows, automações, etc.
  Label padrão: `CI/CD`.

- **Documentation (`documentation.md`)**
  Para criação de documentos no projeto.
  Label padrão: `documentation`.

- **Feature Request (`feature_request.md`)**  
  Para sugerir novas funcionalidades.  
  Label padrão: `enhancement`.

- **Refactoring (`refactor.md`)**  
  Para sugerir novas melhorias internas no código sem alterar comportamento externo.  
  Label padrão: `refactor`.

- **Task (`task.md`)**  
  Para atividades técnicas ou não funcionais.  
  Label padrão: `task`.

- **Black Issue (`black_issue.md`)** _(se aplicável)_  
  Para casos especiais definidos pela equipe.

> ⚠️ Issues que não seguirem o template podem ser solicitadas novamente para manter a organização do projeto.

---

## Templates de Pull Requests

O template está localizados em `.github/PULL_REQUEST_TEMPLATE.md`.  
Sempre escolha o template que corresponda ao tipo de PR que você está abrindo.

### Tipos disponíveis:

- **Bugfix** – Correções de bugs.
- **Nova funcionalidade** – Implementação de novas funcionalidades.
- **Task técnica)** – Atividades técnicas ou de manutenção.
- **Refatoração** – Refatorações de código sem mudança de comportamento.
- **Documentação** – Atualizações na documentação.
- **Outros (especificar)** – Para PRs que abrangem múltiplos aspectos.

---

## Boas práticas

- Sempre descreva claramente o **objetivo da Issue ou PR**.
- Utilize o **checklist** presente em cada template para garantir qualidade.
- Relacione Issues aos PRs usando a sintaxe `Closes #<número_da_issue>`.
- Revise seu PR antes de abrir para a equipe.

---

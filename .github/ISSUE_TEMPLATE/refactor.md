---
name: Refactoring
about: Solicitar melhorias internas no código sem alterar comportamento externo.
title: "[REFACTOR] Descreva o escopo da refatoração"
labels: [refactor]
---

## Objetivo da refatoração

Explique o que será refatorado e por quê.  
Exemplos:

- "Refatorar o módulo de comandos para reduzir duplicação de código."
- "Melhorar a organização das pastas do projeto."
- "Simplificar funções complexas no service de mercado."

---

## Problema atual

Descreva o que está ruim, confuso ou difícil de manter no código.  
Exemplos:

- "A função está muito longa."
- "Há lógica duplicada entre os comandos."
- "Configuração espalhada em múltiplos arquivos."

---

## Proposta de solução (opcional)

Explique como pretende melhorar o código.  
Exemplos:

- "Extrair funções auxiliares para um utils."
- "Separar responsabilidades em módulos independentes."
- "Implementar um padrão de projeto específico (ex.: Strategy, Factory)."

---

## Escopo da refatoração

Liste o que **faz parte** e o que **não faz parte** desta refatoração.

### Inclui:

- ...

### Não inclui:

- ...

---

## Impacto nos testes

Explique se os testes precisarão ser modificados ou se apenas precisam garantir que nada mudou no comportamento.

Exemplos:

- "Nenhuma mudança no comportamento esperado."
- "Atualizar mocks devido à nova estrutura."

---

## Checklist

- [ ] Código analisado antes da refatoração
- [ ] Solução planejada
- [ ] Refatoração aplicada
- [ ] Testes ajustados (se necessário)
- [ ] Projeto compila e todas as suites passam
- [ ] Documentação atualizada (se necessário)

---

## Observações adicionais

Use este espaço para anotações extras, referências, links ou discussões relacionadas.

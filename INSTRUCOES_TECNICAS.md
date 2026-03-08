# Guia de Integração e Testes Técnicos

Este documento fornece as instruções essenciais para configurar, manter e testar a integração entre este aplicativo (Product Copilot IA) e os serviços externos (n8n, Databricks).

---

## 1. Como Conectar ao n8n

A comunicação entre o frontend e o n8n é feita através de um proxy seguro para evitar problemas de CORS e proteger a URL do webhook.

**Onde inserir a URL do n8n:**

1.  Abra o arquivo `server.ts` na raiz do projeto.
2.  Localize a constante `N8N_WEBHOOK_URL` no topo do arquivo.
3.  **Substitua o valor da constante** pela URL do seu webhook de produção do n8n.

```typescript
// server.ts

// INSTRUÇÃO: Substitua a URL abaixo pela sua URL de produção do n8n.
const N8N_WEBHOOK_URL = 'SUA_URL_DO_N8N_VAI_AQUI'; 
```

Após alterar a URL, reinicie o servidor de backend para que a mudança tenha efeito.

---

## 2. Como Alternar para Dados Dinâmicos (Dropdowns)

Atualmente, os campos de seleção (dropdowns) do formulário são alimentados por dados fixos (mock). A estrutura está pronta para que você possa facilmente mudar para dados dinâmicos vindos do seu sistema (n8n/Databricks/PostgreSQL).

**Passos para ativar os dados dinâmicos:**

1.  **Implemente a Lógica no Backend:**
    *   Crie uma nova rota no `server.ts`, por exemplo, `/api/dropdown-options`.
    *   Nesta rota, implemente a lógica para buscar os dados do seu banco de dados (PostgreSQL, que será alimentado pelo Databricks).
    *   A rota deve retornar um objeto JSON no mesmo formato que a função `getMockDropdownOptions` no arquivo `src/services/dataService.ts`.

2.  **Atualize o Frontend:**
    *   Abra o arquivo `src/services/dataService.ts`.
    *   Modifique a função `getDynamicDropdownOptions` para fazer a chamada à nova rota de API que você criou (ex: `fetch('/api/dropdown-options')`).
    *   Vá até os componentes de formulário (`src/components/EstiloForm/index.tsx` e `src/components/ComprasForm/index.tsx`) e altere a chamada `getMockDropdownOptions()` para `getDynamicDropdownOptions()`.

```typescript
// Exemplo em dataService.ts

export const getDynamicDropdownOptions = async () => {
  console.log("Buscando dados de dropdowns do n8n/Databricks...");
  const response = await fetch('/api/dropdown-options'); // Chame sua nova rota aqui
  const data = await response.json();
  return data;
};
```

---

## 3. Como Testar o Fluxo de Ponta a Ponta

Use as ferramentas de emulação do ambiente de desenvolvimento para validar todo o fluxo de categorização.

**Guia de Teste:**

1.  **Inicie os Servidores:**
    *   Abra dois terminais.
    *   No **Terminal 1**, inicie o servidor de backend (que inclui o proxy para o n8n):
      ```bash
      npm run server
      ```
      *Espere pela mensagem `Backend server rodando em http://localhost:3000`.*
    *   No **Terminal 2**, inicie o servidor de frontend (Vite):
      ```bash
      npm run dev
      ```

2.  **Acesse a Aplicação:**
    *   Abra o seu navegador e acesse `http://localhost:5173` (ou a porta que o Vite indicar).

3.  **Teste a Categorização com n8n:**
    *   Faça login como usuário **Estilo**.
    *   Clique no botão **"+ Novo Produto"** para abrir o formulário.
    *   Aguarde o card **"Descreva o Produto"** aparecer.
    *   No campo de texto, insira uma descrição detalhada do produto que você deseja cadastrar.
    *   Clique no botão **"Preencher com IA"**.

4.  **Verifique os Resultados:**
    *   **Observe o Terminal 1 (Backend):** Você deverá ver as mensagens de log indicando que a rota de proxy foi acionada e que a comunicação com o n8n foi bem-sucedida.
      ```
      [PROXY] Recebida requisição para https://SUA_URL_DO_N8N...
      [PROXY] Resposta recebida do n8n e enviada ao cliente.
      ```
    *   **Observe a Interface do Usuário:** Os campos do formulário (como `Linha`, `Grupo`, `Modelagem`, etc.) devem ser preenchidos automaticamente com os valores categorizados que o n8n retornou.
    *   Se ocorrer um erro, um alerta será exibido na tela, e os detalhes técnicos aparecerão no console do navegador e no log do terminal de backend.

Seguindo estes passos, você pode validar a integração de ponta a ponta e garantir que a comunicação com o n8n está funcionando perfeitamente.

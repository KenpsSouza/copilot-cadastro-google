
import express from "express";
import fs from "fs-extra";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

// =========================================================================
// VARIÁVEIS DE AMBIENTE E PLACEHOLDERS
// =========================================================================
// INSTRUÇÃO: Substitua a URL abaixo pela sua URL de produção do n8n.
const N8N_WEBHOOK_URL = 'https://zt-n8ndev.aramis.com.br/webhook-test/1d86cf58-5405-4ef8-8a10-4be53f0bfd77'; 
// =========================================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);
  const dbPath = path.join(__dirname, './db.json');

  app.use(cors());
  app.use(express.json());

  // Rota para obter todos os produtos
  app.get("/api/products", async (req, res) => {
    try {
      await fs.ensureFile(dbPath);
      const db = await fs.readJson(dbPath).catch(() => ({ products: [] }));
      res.json(db.products || []);
    } catch (error) {
      console.error("GET /api/products error:", error);
      res.status(500).json({ error: 'Failed to retrieve products' });
    }
  });

  // Rota para criar/atualizar um produto
  app.post("/api/products", async (req, res) => {
    try {
      const productToSave = req.body;
      if (!productToSave || !productToSave.id) {
        return res.status(400).json({ error: "Invalid product data provided." });
      }

      let products = [];
      try {
        await fs.ensureFile(dbPath);
        const db = await fs.readJson(dbPath);
        if (db && Array.isArray(db.products)) {
          products = db.products;
        }
      } catch (error) {
        // Arquivo vazio ou inválido, começa com array vazio
      }

      const productIndex = products.findIndex(p => p.id === productToSave.id);
      if (productIndex !== -1) {
        products[productIndex] = productToSave;
      } else {
        products.push(productToSave);
      }

      await fs.writeJson(dbPath, { products }, { spaces: 2 });
      res.status(200).json(productToSave);

    } catch (error: any) {
      console.error("POST /api/products error:", error);
      res.status(500).json({ error: `Failed to save product: ${error.message}` });
    }
  });

  // Rota de PROXY para o webhook do n8n (Ação de Categorização)
  app.post("/api/webhook/case_produto", async (req, res) => {
    console.log(`[PROXY] Recebida requisição para ${N8N_WEBHOOK_URL}`);
    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[PROXY] Erro do n8n: ${response.status} - ${errorText}`);
        return res.status(response.status).json({ error: errorText });
      }

      const data = await response.json();

      // O n8n pode retornar um array com um objeto. Extraímos o primeiro elemento se for o caso.
      let responseData = data;
      if (Array.isArray(data) && data.length > 0) {
        console.log("[PROXY] Resposta do n8n é um array, extraindo o primeiro elemento.");
        responseData = data[0];
      }
      
      console.log("[PROXY] Resposta processada enviada ao cliente.");
      res.json(responseData);

    } catch (error: any) {
      console.error("[PROXY] Falha na comunicação com o n8n:", error);
      res.status(500).json({ error: `Proxy request failed: ${error.message}` });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../client');
    app.use(express.static(clientDistPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server rodando em http://localhost:${PORT}`);
  });
}

startServer();

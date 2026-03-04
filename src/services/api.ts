import { AIValidationResult, FormData, UserRole, DadosEstilo, DadosCompras } from '../types';

// ============================================================================
// FUNÇÕES AUXILIARES DE VALIDAÇÃO
// ============================================================================

const calcularScore = (preenchidos: number, total: number): number => {
  if (total === 0) return 0;
  return Math.round((preenchidos / total) * 100);
};

const contarCamposPreenchidos = (obj: Record<string, any>): number => {
  return Object.values(obj).filter(v => v !== undefined && v !== null && v.toString().trim() !== '').length;
};

// ============================================================================
// VALIDAÇÃO PROFUNDA (Ao clicar no botão "Validar com IA")
// ============================================================================

export const validarEstilo = async (formData: FormData): Promise<AIValidationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { dadosEstilo } = formData;
      const alertas: AIValidationResult['alertas'] = [];
      const sugestoes: string[] = [];
      const checklist: AIValidationResult['checklist'] = [];
      
      const totalCampos = Object.keys(dadosEstilo).length;
      const camposPreenchidos = contarCamposPreenchidos(dadosEstilo);
      const score = calcularScore(camposPreenchidos, totalCampos);

      // Checklist
      checklist.push({ texto: 'Classificação Básica', ok: !!(dadosEstilo.grupo && dadosEstilo.subgrupo && dadosEstilo.nomeProduto) });
      checklist.push({ texto: 'Características', ok: !!(dadosEstilo.linha && dadosEstilo.colecao && dadosEstilo.modelagem) });
      checklist.push({ texto: 'Detalhamento Técnico', ok: !!(dadosEstilo.descricao && dadosEstilo.descricao.length > 20) });
      checklist.push({ texto: 'Conceito e Inspiração', ok: !!(dadosEstilo.conceito && dadosEstilo.conceito.length > 10) });

      // Análise profunda mockada
      if (!dadosEstilo.conceito) {
        alertas.push({ tipo: 'warning', campo: 'Conceito / Inspiração', mensagem: 'O conceito do produto está vazio.', sugestao: 'Descreva a inspiração por trás da peça para guiar o marketing e vendas.' });
      }

      if (dadosEstilo.grupo === 'CAMISARIA' && dadosEstilo.descricao && !dadosEstilo.descricao.toLowerCase().includes('algodão')) {
        sugestoes.push('A descrição técnica não menciona o tipo de tecido. Para camisaria, é crucial especificar se é Algodão Pima, Egípcio, Linho, etc.');
      }

      if (score === 100) {
        alertas.push({ tipo: 'success', mensagem: 'Análise profunda concluída. O cadastro de estilo está excelente e alinhado com o DNA da marca.' });
      }

      resolve({ score, alertas, sugestoes, checklist, camposPreenchidos, totalCampos });
    }, 1500); // Delay maior para simular processamento pesado
  });
};

export const validarCompras = async (formData: FormData): Promise<AIValidationResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { dadosCompras } = formData;
      const alertas: AIValidationResult['alertas'] = [];
      const sugestoes: string[] = [];
      const checklist: AIValidationResult['checklist'] = [];
      
      const totalCampos = Object.keys(dadosCompras).length;
      const camposPreenchidos = contarCamposPreenchidos(dadosCompras);
      const score = calcularScore(camposPreenchidos, totalCampos);

      // Checklist
      checklist.push({ texto: 'Dados do Fornecedor', ok: !!(dadosCompras.comprador && dadosCompras.fornecedor && dadosCompras.fabricante) });
      checklist.push({ texto: 'Precificação', ok: !!(dadosCompras.custo && dadosCompras.preco && dadosCompras.margem) });
      checklist.push({ texto: 'Planejamento', ok: !!(dadosCompras.quantidade && dadosCompras.coresAtivas && dadosCompras.categoriaFinal) });

      // Análise profunda mockada
      if (dadosCompras.custo && dadosCompras.preco && !dadosCompras.margem) {
        const custo = parseFloat(dadosCompras.custo);
        const preco = parseFloat(dadosCompras.preco);
        const margemCalculada = ((preco - custo) / preco) * 100;
        sugestoes.push(`Com base no custo (R$${custo}) e preço (R$${preco}), a margem calculada é de ${margemCalculada.toFixed(2)}%. Deseja preencher automaticamente?`);
      }

      if (dadosCompras.fornecedor && dadosCompras.fornecedor.toLowerCase().includes('china') && dadosCompras.quantidade && parseInt(dadosCompras.quantidade) < 500) {
        alertas.push({ tipo: 'warning', campo: 'Quantidade', mensagem: 'Quantidade muito baixa para importação da China.', sugestao: 'O MOQ (Minimum Order Quantity) ideal para este fornecedor costuma ser acima de 500 peças.' });
      }

      if (score === 100) {
        alertas.push({ tipo: 'success', mensagem: 'Análise profunda concluída. A precificação e o planejamento de compras estão viáveis e dentro da meta.' });
      }

      resolve({ score, alertas, sugestoes, checklist, camposPreenchidos, totalCampos });
    }, 1500); // Delay maior para simular processamento pesado
  });
};

// ============================================================================
// PARSING DE TEXTO LIVRE (Descreva o Produto com IA)
// ============================================================================

const MODO_APRESENTACAO = false;

export const parseDescricaoIA = async (texto: string): Promise<{ dadosEstilo: Partial<DadosEstilo>, dadosCompras: Partial<DadosCompras> }> => {
  if (!MODO_APRESENTACAO) {
    try {
      const response = await fetch('/api/webhook/case_produto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ textoLivre: texto }),
      });

      if (response.ok) {
        alert('✅ SUCESSO (n8n): Conexão perfeita!\n\nO n8n devolveu os dados corretamente. Verifique se os campos preencheram no formulário.');
        const data = await response.json();
        return {
          dadosEstilo: data.dadosEstilo || {},
          dadosCompras: data.dadosCompras || {}
        };
      } else {
        alert('⚠️ ERRO DE ROTA (n8n):\nO webhook foi encontrado, mas devolveu um erro de servidor.\nStatus: ' + response.status + ' - ' + response.statusText + '\n\nCaindo para o Mock de segurança...');
      }
    } catch (error: any) {
      console.warn('Falha ao conectar com a IA (n8n). Usando fallback mockado.', error);
      alert('❌ ERRO DE CONEXÃO (n8n):\nFalha total ao tentar falar com o webhook. O n8n está rodando? O CORS está liberado?\n\nErro técnico: ' + error.message + '\n\nCaindo para o Mock de segurança...');
    }
  }

  // Fallback (Mock de Segurança)
  return new Promise((resolve) => {
    setTimeout(() => {
      const textoLower = texto.toLowerCase();
      const dadosEstilo: Partial<DadosEstilo> = {};
      const dadosCompras: Partial<DadosCompras> = {};

      // Lógica mockada simples baseada em palavras-chave no texto
      
      // Grupo e Subgrupo
      if (textoLower.includes('camisa') || textoLower.includes('camisaria')) {
        dadosEstilo.grupo = 'CAMISARIA';
        if (textoLower.includes('manga longa') || textoLower.includes('ml')) dadosEstilo.subgrupo = 'Manga Longa';
        if (textoLower.includes('manga curta') || textoLower.includes('mc')) dadosEstilo.subgrupo = 'Manga Curta';
      } else if (textoLower.includes('calça') || textoLower.includes('calca')) {
        dadosEstilo.grupo = 'CALCA';
        if (textoLower.includes('jeans')) dadosEstilo.subgrupo = 'Jeans';
        if (textoLower.includes('alfaiataria')) dadosEstilo.subgrupo = 'Alfaiataria';
      } else {
        dadosEstilo.grupo = 'CAMISARIA';
        dadosEstilo.subgrupo = 'Manga Longa';
      }

      // Modelagem
      if (textoLower.includes('slim')) dadosEstilo.modelagem = 'Slim Fit';
      if (textoLower.includes('regular')) dadosEstilo.modelagem = 'Regular Fit';
      if (textoLower.includes('oversized')) dadosEstilo.modelagem = 'Oversized';

      // Linha
      if (textoLower.includes('social')) dadosEstilo.linha = 'Social';
      if (textoLower.includes('casual')) dadosEstilo.linha = 'Casual';
      if (textoLower.includes('premium')) dadosEstilo.linha = 'Premium';

      // Coleção
      if (textoLower.includes('inverno')) dadosEstilo.colecao = 'Inverno 2026';
      if (textoLower.includes('verão') || textoLower.includes('verao')) dadosEstilo.colecao = 'Verão 2026';

      // Cores
      if (textoLower.includes('azul') || textoLower.includes('marinho')) dadosEstilo.coresSugeridas = 'Azul Marinho';
      if (textoLower.includes('preto') || textoLower.includes('branco')) dadosEstilo.coresSugeridas = 'Preto & Branco';

      // Descrição
      dadosEstilo.descricao = texto;
      
      // Nome sugerido
      if (dadosEstilo.grupo && dadosEstilo.subgrupo) {
        dadosEstilo.nomeProduto = `${dadosEstilo.grupo === 'CAMISARIA' ? 'Camisa' : dadosEstilo.grupo} ${dadosEstilo.subgrupo} ${dadosEstilo.modelagem || ''}`.trim();
      } else {
        dadosEstilo.nomeProduto = 'Produto Gerado por IA';
      }

      resolve({ dadosEstilo, dadosCompras });
    }, 1500); // Delay para simular chamada de API de IA (LLM)
  });
};

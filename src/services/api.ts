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
      checklist.push({ texto: 'Características', ok: !!(dadosEstilo.linha && dadosEstilo.colecaoOrigem && dadosEstilo.modelagem) });
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

export const parseDescricaoIA = async (texto: string): Promise<{ dadosEstilo: Partial<DadosEstilo>, dadosCompras: Partial<DadosCompras> }> => {
  try {
    const response = await fetch('/api/webhook/case_produto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ textoLivre: texto }),
    });

    if (!response.ok) {
      // Lança um erro que será capturado pelo bloco catch no App.tsx
      throw new Error(`O serviço de IA respondeu com status ${response.status}.`);
    }

    const data = await response.json();
    return {
      dadosEstilo: data.dadosEstilo || {},
      dadosCompras: data.dadosCompras || {}
    };

  } catch (error: any) {
    // Loga o erro detalhado no console para depuração
    console.warn('Falha ao processar descrição com IA (n8n). Detalhes:', error.message);

    // Lança um novo erro com uma mensagem amigável para a UI
    throw new Error('Não foi possível analisar a descrição. O serviço de IA pode estar indisponível.');
  }
};

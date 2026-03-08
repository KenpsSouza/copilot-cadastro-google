import {
  BU_OPTIONS, GRIFFE_OPTIONS, LINHA_OPTIONS, SEXO_OPTIONS, COLECAO_OPTIONS, GRADE_OPTIONS,
  MODELAGEM_OPTIONS, TIPO_OPTIONS, SELO_OPTIONS, BENEFICIAMENTO_OPTIONS, COLLAB_OPTIONS,
  PIRAMIDE_OPTIONS, PRODUTO_ORIGEM_OPTIONS, TIPO_AMOSTRA_OPTIONS, RESTRICAO_LAVAGEM_OPTIONS,
  CONTINUIDADE_OPTIONS, PASSADORIA_OPTIONS, LAVAGEM_SIMB_OPTIONS, ALVEJAMENTO_OPTIONS,
  LIMPEZA_OPTIONS, SECADORA_OPTIONS, SECAGEM_OPTIONS, CORES_SUGERIDAS_OPTIONS,
  FAIXA_PRECO_OPTIONS, CATEGORIA_FINAL_OPTIONS
} from '../types';

// =========================================================================
// AÇÃO DE ALIMENTAÇÃO DE DADOS (DROPDOWNS)
// =========================================================================

/**
 * Retorna os dados fixos (mock) para todos os campos de seleção do formulário.
 * Esta é a função usada por padrão.
 */
export const getMockDropdownOptions = () => ({
  bu: BU_OPTIONS,
  griffe: GRIFFE_OPTIONS,
  linha: LINHA_OPTIONS,
  sexo: SEXO_OPTIONS,
  colecaoOrigem: COLECAO_OPTIONS,
  grade: GRADE_OPTIONS,
  modelagem: MODELAGEM_OPTIONS,
  tipo: TIPO_OPTIONS,
  selo: SELO_OPTIONS,
  beneficiamento: BENEFICIAMENTO_OPTIONS,
  collab: COLLAB_OPTIONS,
  piramideOriginal: PIRAMIDE_OPTIONS,
  produtoOrigem: PRODUTO_ORIGEM_OPTIONS,
  tipoAmostra: TIPO_AMOSTRA_OPTIONS,
  restricaoLavagem: RESTRICAO_LAVAGEM_OPTIONS,
  continuidade: CONTINUIDADE_OPTIONS,
  passadoria: PASSADORIA_OPTIONS,
  lavagem: LAVAGEM_SIMB_OPTIONS,
  alvejamento: ALVEJAMENTO_OPTIONS,
  limpeza: LIMPEZA_OPTIONS,
  secadora: SECADORA_OPTIONS,
  secagem: SECAGEM_OPTIONS,
  coresModelo: CORES_SUGERIDAS_OPTIONS,
  faixaPreco: FAIXA_PRECO_OPTIONS,
  categoriaFinal: CATEGORIA_FINAL_OPTIONS,
});

/**
 * INSTRUÇÃO FUTURA: Esta função irá buscar os dados dinâmicos do n8n/Databricks.
 * Para ativar, substitua a chamada de `getMockDropdownOptions` no `EstiloForm` e `ComprasForm`
 * por `getDynamicDropdownOptions`.
 */
export const getDynamicDropdownOptions = async () => {
  console.log("Buscando dados de dropdowns do n8n/Databricks... (ainda não implementado)");
  // Exemplo de como seria a chamada:
  // const response = await fetch('/api/dropdowns'); 
  // const data = await response.json();
  // return data;
  
  // Por enquanto, retorna os dados mockados para não quebrar a aplicação.
  return getMockDropdownOptions(); 
};

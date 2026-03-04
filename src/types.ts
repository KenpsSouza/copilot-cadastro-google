// ========================
// TIPOS DO SISTEMA DE CADASTRO DE PRODUTOS
// Aramis - Product Copilot IA
// ========================

// Perfil do usuário
export type UserRole = 'estilo' | 'compras';

// Status do produto no fluxo
export type ProductStatus =
  | 'EM_DESENVOLVIMENTO'
  | 'CADASTRADO_AGUARDANDO_COMPRAS'
  | 'EM_COMPLEMENTO_COMPRAS'
  | 'FINALIZADO';



// Dados preenchidos pelo Estilo
export interface DadosEstilo {
  grupo: string;
  subgrupo: string;
  nomeProduto: string;
  linha: string;
  colecao: string;
  modelagem: string;
  descricao: string;
  conceito: string;
  observacoes: string;
  coresSugeridas: string;
}

// Dados preenchidos por Compras
export interface DadosCompras {
  comprador: string;
  fornecedor: string;
  fabricante: string;
  custo: string;
  preco: string;
  faixaPreco: string;
  margem: string;
  quantidade: string;
  coresAtivas: string;
  categoriaFinal: string;
}

// Form data centralizado
export interface FormData {
  id?: string;
  dadosEstilo: DadosEstilo;
  dadosCompras: DadosCompras;
  status: ProductStatus;
  criadoEm?: string;
  atualizadoEm?: string;
}

// Alerta da IA
export interface AIAlert {
  tipo: 'info' | 'warning' | 'error' | 'success';
  campo?: string;
  mensagem: string;
  sugestao?: string;
}

// Resultado da validação IA
export interface AIValidationResult {
  score: number;
  alertas: AIAlert[];
  sugestoes: string[];
  checklist: { texto: string; ok: boolean }[];
  camposPreenchidos: number;
  totalCampos: number;
}

// Estado inicial vazio para Estilo
export const INITIAL_DADOS_ESTILO: DadosEstilo = {
  grupo: '',
  subgrupo: '',
  nomeProduto: '',
  linha: '',
  colecao: '',
  modelagem: '',
  descricao: '',
  conceito: '',
  observacoes: '',
  coresSugeridas: '',
};

// Estado inicial vazio para Compras
export const INITIAL_DADOS_COMPRAS: DadosCompras = {
  comprador: '',
  fornecedor: '',
  fabricante: '',
  custo: '',
  preco: '',
  faixaPreco: '',
  margem: '',
  quantidade: '',
  coresAtivas: '',
  categoriaFinal: '',
};

// Estado inicial do formulário
export const INITIAL_FORM_DATA: FormData = {
  dadosEstilo: { ...INITIAL_DADOS_ESTILO },
  dadosCompras: { ...INITIAL_DADOS_COMPRAS },
  status: 'EM_DESENVOLVIMENTO',
};

// ========================
// OPÇÕES DE DROPDOWNS
// ========================

export const LINHA_OPTIONS = [
  'Casual', 'Social', 'Esportivo', 'Premium', 'Night',
  'Weekend', 'Work', 'Resort', 'Athleisure',
];

export const COLECAO_OPTIONS = [
  'Verão 2026', 'Inverno 2026', 'Alto Verão 2026',
  'Meia Estação 2026', 'Primavera/Verão 2026',
  'Outono/Inverno 2026', 'Cápsula Especial',
];

export const MODELAGEM_OPTIONS = [
  'Slim Fit', 'Regular Fit', 'Comfort Fit', 'Super Slim',
  'Oversized', 'Relaxed Fit', 'Alfaiataria',
];

export const CORES_SUGERIDAS_OPTIONS = [
  'Tons Terrosos', 'Verão Vibrante', 'Neutros Clássicos',
  'Azul Marinho', 'Tons de Verde', 'Preto & Branco',
  'Cinza Urbano', 'Borgonha & Vinho', 'Mostarda & Caramelo',
  'Pastel Suave', 'Índigo & Denim', 'Tons de Bege',
];

export const FAIXA_PRECO_OPTIONS = [
  'Econômico (até R$99)', 'Básico (R$100-199)',
  'Intermediário (R$200-399)', 'Premium (R$400-699)',
  'Luxo (R$700+)',
];

export const CATEGORIA_FINAL_OPTIONS = [
  'Básico', 'Fashion', 'Premium', 'Luxury',
  'Acessório', 'Coleção Especial',
];

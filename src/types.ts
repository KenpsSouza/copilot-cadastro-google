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
  // ── Identificação ──
  bu: string;
  griffe: string;
  linha: string;
  sexo: string;
  colecaoOrigem: string;

  // ── Referência ──
  referencia: string;
  refLacreFornecedor: string;
  modeloAra: string;
  modelo: string;

  // ── Classificação ──
  grade: string;
  grupo: string;
  subgrupo: string;
  modelagem: string;
  baseMP: string;
  tipo: string;

  // ── Atributos ──
  selo: string;
  beneficiamento: string;
  collab: string;

  // ── Origem ──
  fabricanteOriginal: string;
  fornecedorOriginal: string;
  piramideOriginal: string;
  produtoOrigem: string;

  // ── Amostra ──
  tipoAmostra: string;
  tamanhoPiloto: string;
  restricaoLavagem: string;

  // ── Responsáveis ──
  gerente: string;
  estilista: string;
  analista: string;
  corPrincipal: string;
  continuidade: string;

  // ── Detalhes Técnicos ──
  composicao: string;
  composicaoTraducao: string;
  ncm: string;
  descricaoFiscal: string;
  materialPrincipal: string;
  medidasProdutoAcabado: string;
  coresModelo: string;

  // ── Simbologia / Conservação ──
  passadoria: string;
  lavagem: string;
  alvejamento: string;
  limpeza: string;
  secadora: string;
  secagem: string;

  // ── Materiais ──
  tecidos: string;
  aviamentos: string;

  // ── Observações / Extras ──
  nomeProduto: string;
  descricao: string;
  conceito: string;
  observacoes: string;
  pedidoAmostras: string;
}

// Ficha de Coleção (Compras)
export interface FichaColecao {
  id: string;
  colecao: string;
  cores: string;
  fornecedor: string;
  fabricante: string;
  comprador: string;
  precoPlanejado: string;
  precoVenda: string;
  cluster: string;
  categorias: string[];
  cartelaCor: string;
  nacionalImportado: string;
  piramide: string;
  campanha: string;
  observacoes: string;
  criadoEm?: string;
  atualizadoEm?: string;
}

// Dados preenchidos por Compras (campos gerais)
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
  fichasColecao: FichaColecao[];
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
  bu: '',
  griffe: '',
  linha: '',
  sexo: 'Masculino',
  colecaoOrigem: '',
  referencia: '',
  refLacreFornecedor: '',
  modeloAra: '',
  modelo: '',
  grade: '',
  grupo: '',
  subgrupo: '',
  modelagem: '',
  baseMP: '',
  tipo: '',
  selo: '',
  beneficiamento: '',
  collab: '',
  fabricanteOriginal: '',
  fornecedorOriginal: '',
  piramideOriginal: '',
  produtoOrigem: '',
  tipoAmostra: '',
  tamanhoPiloto: '',
  restricaoLavagem: '',
  gerente: '',
  estilista: '',
  analista: '',
  corPrincipal: '',
  continuidade: '',
  composicao: '',
  composicaoTraducao: '',
  ncm: '',
  descricaoFiscal: '',
  materialPrincipal: '',
  medidasProdutoAcabado: '',
  coresModelo: '',
  passadoria: '',
  lavagem: '',
  alvejamento: '',
  limpeza: '',
  secadora: '',
  secagem: '',
  tecidos: '',
  aviamentos: '',
  nomeProduto: '',
  descricao: '',
  conceito: '',
  observacoes: '',
  pedidoAmostras: '',
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

// Estado inicial ficha de coleção
export const INITIAL_FICHA_COLECAO: FichaColecao = {
  id: '',
  colecao: '',
  cores: '',
  fornecedor: '',
  fabricante: '',
  comprador: '',
  precoPlanejado: '',
  precoVenda: '',
  cluster: '',
  categorias: [],
  cartelaCor: '',
  nacionalImportado: '',
  piramide: '',
  campanha: '',
  observacoes: '',
  criadoEm: '',
  atualizadoEm: '',
};

// Estado inicial do formulário
export const INITIAL_FORM_DATA: FormData = {
  dadosEstilo: { ...INITIAL_DADOS_ESTILO },
  dadosCompras: { ...INITIAL_DADOS_COMPRAS },
  fichasColecao: [],
  status: 'EM_DESENVOLVIMENTO',
};

export const ALL_ESTILO_FIELDS = Object.keys(INITIAL_DADOS_ESTILO) as (keyof DadosEstilo)[];

// ========================
// OPÇÕES DE DROPDOWNS
// ========================

export const BU_OPTIONS = [
  'Aramis', 'Aramis Next', 'Urban',
];

export const GRIFFE_OPTIONS = [
  'Aramis', 'Aramis Next', 'Urban',
];

export const LINHA_OPTIONS = [
  'Casual', 'Social', 'Esportivo', 'Premium', 'Night',
  'Weekend', 'Work', 'Resort', 'Athleisure',
];

export const SEXO_OPTIONS = [
  'Masculino', 'Feminino', 'Unissex',
];

export const COLECAO_OPTIONS = [
  'Verão 2026', 'Inverno 2026', 'Alto Verão 2026',
  'Meia Estação 2026', 'Primavera/Verão 2026',
  'Outono/Inverno 2026', 'Cápsula Especial',
];

export const GRADE_OPTIONS = [
  'PP-P-M-G-GG', 'P-M-G-GG-XG', '36-38-40-42-44',
  '38-40-42-44-46', '40-42-44-46-48', 'Único',
];

export const MODELAGEM_OPTIONS = [
  'Slim Fit', 'Regular Fit', 'Comfort Fit', 'Super Slim',
  'Oversized', 'Relaxed Fit', 'Alfaiataria',
];

export const TIPO_OPTIONS = [
  'Básico', 'Fashion', 'Premium', 'Luxury', 'Coleção Especial',
];

export const SELO_OPTIONS = [
  'Nenhum', 'Sustentável', 'Premium', 'Eco', 'Orgânico', 'Reciclado',
];

export const BENEFICIAMENTO_OPTIONS = [
  'Nenhum', 'Lavagem', 'Tingimento', 'Estamparia',
  'Bordado', 'Aplique', 'Laser', 'Stone Wash',
  'Amaciamento', 'Mercerização',
];

export const COLLAB_OPTIONS = [
  'Nenhum', 'Artista', 'Marca Parceira', 'Designer Convidado',
  'Coleção Cápsula', 'Institucional',
];

export const PIRAMIDE_OPTIONS = [
  'Premium', 'Core', 'Básico', 'Entry', 'Super Premium',
];

export const PRODUTO_ORIGEM_OPTIONS = [
  'Nacional', 'Importado',
];

export const TIPO_AMOSTRA_OPTIONS = [
  'Proto', 'Fit Sample', 'PP Sample', 'TOP Sample',
  'Size Set', 'Produção',
];

export const RESTRICAO_LAVAGEM_OPTIONS = [
  'Nenhuma', 'Não lavar à máquina', 'Somente lavagem a seco',
  'Lavar à mão', 'Água fria', 'Não torcer',
];

export const CONTINUIDADE_OPTIONS = [
  'Sim', 'Não',
];

// Opções de Simbologia / Conservação
export const PASSADORIA_OPTIONS = [
  'Ferro quente', 'Ferro morno', 'Ferro frio', 'Não passar',
];

export const LAVAGEM_SIMB_OPTIONS = [
  'Lavagem normal', 'Lavagem delicada', 'Lavagem à mão',
  'Não lavar', 'Lavagem a seco',
];

export const ALVEJAMENTO_OPTIONS = [
  'Permitido', 'Não alvejante', 'Alvejante sem cloro',
];

export const LIMPEZA_OPTIONS = [
  'Limpeza a seco permitida', 'Não limpar a seco',
  'Limpeza profissional', 'Limpeza com solvente',
];

export const SECADORA_OPTIONS = [
  'Secar na secadora', 'Secadora temperatura baixa',
  'Não usar secadora',
];

export const SECAGEM_OPTIONS = [
  'Secar na horizontal', 'Secar na sombra',
  'Secar pendurado', 'Não centrifugar',
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

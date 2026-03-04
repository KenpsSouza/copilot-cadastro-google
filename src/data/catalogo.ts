export const GRUPO_LABELS: Record<string, string> = {
  'CAMISETA': 'Camiseta',
  'CAMISA': 'Camisa',
  'POLO': 'Polo',
  'CALCA': 'Calça',
  'JEANS': 'Jeans',
  'BERMUDA': 'Bermuda',
  'JAQUETA': 'Jaqueta / Casaco',
  'SUETER': 'Suéter / Tricot',
  'BLAZER': 'Blazer',
  'TERNO': 'Costume / Terno',
  'CALCADO': 'Calçado',
  'ACESSORIOS': 'Acessórios',
  'UNDERWEAR': 'Underwear / Pijama',
};

// Estrutura de subgrupos por grupo
export const CATALOGO: Record<string, string[]> = {
  'CAMISETA': ['Manga Curta', 'Manga Longa', 'Regata', 'Henley'],
  'CAMISA': ['Manga Longa', 'Manga Curta', 'Linho', 'Sobrecamisa'],
  'POLO': ['Piquet', 'Malha', 'Pima', 'Sustentável'],
  'CALCA': ['Sarja/Color', 'Moletom', 'Alfaiataria', 'Linho'],
  'JEANS': ['Calça Jeans', 'Jaqueta Jeans', 'Bermuda Jeans', 'Camisa Jeans'],
  'BERMUDA': ['Color/Sarja', 'Água/Praia', 'Moletom', 'Alfaiataria esportiva'],
  'JAQUETA': ['Couro', 'PU/Sintético', 'Nylon/Bobojaco', 'Windbreaker'],
  'SUETER': ['Decote V', 'Gola Careca', 'Cardigan', 'Gola Alta / Turtleneck'],
  'BLAZER': ['Linho', 'Sarja', 'Malha', 'Super 120'],
  'TERNO': ['Terno 2 peças', 'Terno 3 peças', 'Smoking'],
  'CALCADO': ['Tênis / Sneaker', 'Sapato Social', 'Bota', 'Mocassim / Loafer', 'Sandália / Chinelo'],
  'ACESSORIOS': ['Cinto', 'Carteira', 'Gravata', 'Mochila / Bolsa', 'Boné / Chapéu', 'Meia'],
  'UNDERWEAR': ['Cueca Boxer', 'Cueca Slip', 'Samba Canção', 'Pijama', 'Roupão'],
};

export function getGrupos() {
  return Object.entries(GRUPO_LABELS).map(([value, label]) => ({
    value,
    label,
  }));
}

export function getSubgrupos(grupoId: string) {
  if (!grupoId || !CATALOGO[grupoId]) return [];
  return CATALOGO[grupoId].map(sub => ({
    value: sub,
    label: sub,
  }));
}

import { DadosEstilo, ALL_ESTILO_FIELDS } from '../types';

/**
 * Calcula a contagem de campos preenchidos em dadosEstilo.
 * @param dados O objeto dadosEstilo a ser verificado.
 * @returns Um objeto com a contagem de campos preenchidos e o total de campos.
 */
export function getEstiloProgress(dados: DadosEstilo): { preenchidos: number; total: number } {
  const total = ALL_ESTILO_FIELDS.length;
  const preenchidos = ALL_ESTILO_FIELDS.reduce((acc, key) => {
    const value = dados[key as keyof DadosEstilo];
    if (value != null && String(value).trim() !== '') {
      return acc + 1;
    }
    return acc;
  }, 0);

  return { preenchidos, total };
}

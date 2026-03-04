import React from 'react';
import { FormData, DadosCompras, FAIXA_PRECO_OPTIONS, CATEGORIA_FINAL_OPTIONS } from '../../types';
import { FormContainer, SectionTitle, FormGrid, ButtonGroup, ActionButton } from './styles';
import { Input, Select } from '../common';
import { Zap, CheckCircle } from 'react-feather';

interface ComprasFormProps {
  formData: FormData;
  onChange: (section: 'dadosEstilo' | 'dadosCompras', field: keyof DadosCompras, value: string) => void;
  onValidarIA: () => void;
  onFinalizar: () => void;
  isValidating: boolean;
}

const ComprasForm: React.FC<ComprasFormProps> = ({
  formData,
  onChange,
  onValidarIA,
  onFinalizar,
  isValidating
}) => {
  const { dadosCompras } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange('dadosCompras', name as keyof DadosCompras, value);
  };

  return (
    <FormContainer>
      <div>
        <SectionTitle>Fornecimento</SectionTitle>
        <FormGrid>
          <Input
            label="Comprador"
            name="comprador"
            value={dadosCompras.comprador}
            onChange={handleChange}
            placeholder="Nome do Comprador"
          />
          <Input
            label="Fornecedor"
            name="fornecedor"
            value={dadosCompras.fornecedor}
            onChange={handleChange}
            placeholder="Nome do Fornecedor"
          />
          <Input
            label="Fabricante"
            name="fabricante"
            value={dadosCompras.fabricante}
            onChange={handleChange}
            placeholder="Nome do Fabricante"
          />
        </FormGrid>
      </div>

      <div>
        <SectionTitle>Precificação e Custos</SectionTitle>
        <FormGrid>
          <Input
            label="Custo (R$)"
            name="custo"
            type="number"
            value={dadosCompras.custo}
            onChange={handleChange}
            placeholder="0.00"
          />
          <Input
            label="Preço de Venda (R$)"
            name="preco"
            type="number"
            value={dadosCompras.preco}
            onChange={handleChange}
            placeholder="0.00"
          />
          <Input
            label="Margem (%)"
            name="margem"
            type="number"
            value={dadosCompras.margem}
            onChange={handleChange}
            placeholder="0"
          />
          <Select
            label="Faixa de Preço"
            name="faixaPreco"
            value={dadosCompras.faixaPreco}
            onChange={handleChange}
            options={FAIXA_PRECO_OPTIONS}
          />
        </FormGrid>
      </div>

      <div>
        <SectionTitle>Planejamento</SectionTitle>
        <FormGrid>
          <Input
            label="Quantidade"
            name="quantidade"
            type="number"
            value={dadosCompras.quantidade}
            onChange={handleChange}
            placeholder="0"
          />
          <Input
            label="Cores Ativas"
            name="coresAtivas"
            value={dadosCompras.coresAtivas}
            onChange={handleChange}
            placeholder="Ex: Azul, Preto, Branco"
          />
          <Select
            label="Categoria Final"
            name="categoriaFinal"
            value={dadosCompras.categoriaFinal}
            onChange={handleChange}
            options={CATEGORIA_FINAL_OPTIONS}
          />
        </FormGrid>
      </div>

      <ButtonGroup>
        <ActionButton $variant="secondary" onClick={onValidarIA} disabled={isValidating}>
          <Zap size={18} color="rgb(255, 51, 51)" />
          {isValidating ? 'Validando...' : 'Validar Inteligência'}
        </ActionButton>
        
        <ActionButton $variant="primary" onClick={onFinalizar}>
          <CheckCircle size={18} />
          Finalizar
        </ActionButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default ComprasForm;

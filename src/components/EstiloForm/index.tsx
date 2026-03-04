import React, { useMemo } from 'react';
import { Zap, Send, X } from 'react-feather';
import { FormData, DadosEstilo, LINHA_OPTIONS, COLECAO_OPTIONS, MODELAGEM_OPTIONS, CORES_SUGERIDAS_OPTIONS } from '../../types';
import { getGrupos, getSubgrupos } from '../../data/catalogo';
import Select from '../common/Select';
import { Input } from '../common/Input';
import { InputWrapper, Label, StyledTextArea } from '../common/Input.styles';
import { FormContainer, SectionTitle, FormGrid, FullWidthField, ButtonGroup, ActionButton } from './styles';

interface EstiloFormProps {
  formData: FormData;
  onChange: (section: 'dadosEstilo', field: keyof DadosEstilo, value: string) => void;
  onValidarIA: () => void;
  onEnviarCompras: () => void;
  onCancelar: () => void;
  isValidating: boolean;
}

const EstiloForm: React.FC<EstiloFormProps> = ({
  formData, onChange, onValidarIA, onEnviarCompras, onCancelar, isValidating,
}) => {
  const dados = formData.dadosEstilo;

  const grupos = useMemo(() => getGrupos(), []);
  const subgruposFiltrados = useMemo(() => getSubgrupos(dados.grupo), [dados.grupo]);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = e.target.name as keyof DadosEstilo;
    const value = e.target.value;

    if (field === 'grupo') {
      // Reset subgrupo ao alterar grupo
      onChange('dadosEstilo', 'grupo', value);
      onChange('dadosEstilo', 'subgrupo', '');
      return;
    }
    onChange('dadosEstilo', field, value);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = (e.target.name || e.target.id) as keyof DadosEstilo;
    onChange('dadosEstilo', field, e.target.value);
  };

  const camposObrigatoriosPreenchidos = dados.grupo && dados.subgrupo && dados.nomeProduto;

  return (
    <FormContainer>
      <SectionTitle>Identificação do Produto</SectionTitle>
      <FormGrid>
        <Select
          label="Grupo *"
          name="grupo"
          value={dados.grupo}
          onChange={handleSelect}
          options={grupos}
          placeholder="Selecione o grupo"
        />

        <Select
          label="Subgrupo *"
          name="subgrupo"
          value={dados.subgrupo}
          onChange={handleSelect}
          options={subgruposFiltrados}
          disabled={!dados.grupo}
          placeholder={dados.grupo ? 'Selecione o subgrupo' : 'Selecione um grupo primeiro'}
        />

        <Input
          label="Nome do Produto *"
          id="nomeProduto"
          name="nomeProduto"
          value={dados.nomeProduto}
          onChange={handleInput}
          placeholder="Ex: Camisa Social Slim Premium"
        />
      </FormGrid>

      <SectionTitle>Classificação Estratégica</SectionTitle>
      <FormGrid>
        <Select label="Linha" name="linha" value={dados.linha} onChange={handleSelect} options={LINHA_OPTIONS} />
        <Select label="Coleção" name="colecao" value={dados.colecao} onChange={handleSelect} options={COLECAO_OPTIONS} />
        <Select label="Modelagem" name="modelagem" value={dados.modelagem} onChange={handleSelect} options={MODELAGEM_OPTIONS} />
        <Select label="Cores Sugeridas" name="coresSugeridas" value={dados.coresSugeridas} onChange={handleSelect} options={CORES_SUGERIDAS_OPTIONS} />
      </FormGrid>

      <SectionTitle>Conceito e Descrição</SectionTitle>
      <FormGrid>
        <FullWidthField>
          <InputWrapper>
            <Label htmlFor="descricao">Descrição do Produto</Label>
            <StyledTextArea
              id="descricao"
              name="descricao"
              value={dados.descricao}
              onChange={handleInput}
              placeholder="Descreva detalhes do produto: materiais, acabamentos, diferenciais, estampas, aviamentos..."
              style={{ minHeight: 120 }}
            />
          </InputWrapper>
        </FullWidthField>

        <FullWidthField>
          <InputWrapper>
            <Label htmlFor="conceito">Conceito Criativo</Label>
            <StyledTextArea
              id="conceito"
              name="conceito"
              value={dados.conceito}
              onChange={handleInput}
              placeholder="Qual a proposta criativa? Tendências de referência, inspiração, narrativa da peça..."
              style={{ minHeight: 100 }}
            />
          </InputWrapper>
        </FullWidthField>

        <FullWidthField>
          <InputWrapper>
            <Label htmlFor="observacoes">Observações</Label>
            <StyledTextArea
              id="observacoes"
              name="observacoes"
              value={dados.observacoes}
              onChange={handleInput}
              placeholder="Observações gerais, notas internas, requisitos especiais..."
              style={{ minHeight: 80 }}
            />
          </InputWrapper>
        </FullWidthField>
      </FormGrid>

      <ButtonGroup>
        <ActionButton variant="secondary" onClick={onValidarIA} disabled={isValidating}>
          <Zap size={16} />
          {isValidating ? 'Validando...' : 'Validar com IA'}
        </ActionButton>
        <ActionButton variant="primary" onClick={onEnviarCompras} disabled={!camposObrigatoriosPreenchidos}>
          <Send size={16} />
          Cadastrar
        </ActionButton>
        <ActionButton variant="danger" onClick={onCancelar}>
          <X size={16} />
          Cancelar
        </ActionButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default EstiloForm;

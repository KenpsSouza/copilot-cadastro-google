import React, { useMemo } from 'react';
import { Zap, Send, X } from 'react-feather';
import {
  FormData, DadosEstilo,
  BU_OPTIONS, GRIFFE_OPTIONS, LINHA_OPTIONS, SEXO_OPTIONS, COLECAO_OPTIONS,
  GRADE_OPTIONS, MODELAGEM_OPTIONS, TIPO_OPTIONS,
  SELO_OPTIONS, BENEFICIAMENTO_OPTIONS, COLLAB_OPTIONS,
  PIRAMIDE_OPTIONS, PRODUTO_ORIGEM_OPTIONS,
  TIPO_AMOSTRA_OPTIONS, RESTRICAO_LAVAGEM_OPTIONS,
  CONTINUIDADE_OPTIONS, CORES_SUGERIDAS_OPTIONS,
  PASSADORIA_OPTIONS, LAVAGEM_SIMB_OPTIONS, ALVEJAMENTO_OPTIONS,
  LIMPEZA_OPTIONS, SECADORA_OPTIONS, SECAGEM_OPTIONS,
} from '../../types';
import { getGrupos, getSubgrupos } from '../../data/catalogo';
import Select from '../common/Select';
import { Input } from '../common/Input';
import { InputWrapper, Label, StyledTextArea } from '../common/Input.styles';
import {
  FormContainer, SectionTitle, FormGrid, FullWidthField,
  ButtonGroup, ActionButton, FormSection, TwoColGrid, RequiredMark
} from './styles';

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

  const camposObrigatoriosPreenchidos = dados.bu && dados.griffe && dados.grupo && dados.subgrupo;

  return (
    <FormContainer>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 1 - IDENTIFICAÇÃO
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>
          Identificação<RequiredMark>*</RequiredMark>
        </SectionTitle>
        <FormGrid>
          <Select label={<>BU<RequiredMark>*</RequiredMark></>} name="bu" value={dados.bu} onChange={handleSelect} options={BU_OPTIONS} placeholder="Selecione a BU" />
          <Select label={<>Griffe<RequiredMark>*</RequiredMark></>} name="griffe" value={dados.griffe} onChange={handleSelect} options={GRIFFE_OPTIONS} placeholder="Selecione a Griffe" />
          <Select label="Linha" name="linha" value={dados.linha} onChange={handleSelect} options={LINHA_OPTIONS} />
          <Select label="Sexo" name="sexo" value={dados.sexo} onChange={handleSelect} options={SEXO_OPTIONS} />
          <Select label="Coleção de Origem" name="colecaoOrigem" value={dados.colecaoOrigem} onChange={handleSelect} options={COLECAO_OPTIONS} />
          <Input label="Ano" id="ano" name="ano" value={dados.ano} onChange={handleInput} placeholder="Ano da coleção" />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 2 - REFERÊNCIA
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Referência</SectionTitle>
        <FormGrid>
          <Input label="Referência" id="referencia" name="referencia" value={dados.referencia} onChange={handleInput} placeholder="Código de referência" />
          <Input label="Ref / Lacre Fornecedor" id="refLacreFornecedor" name="refLacreFornecedor" value={dados.refLacreFornecedor} onChange={handleInput} placeholder="Ref. ou lacre do fornecedor" />
          <Input label="Modelo (Aramis)" id="modeloAra" name="modeloAra" value={dados.modeloAra} onChange={handleInput} placeholder="Modelo Aramis" />
          <Input label="Modelo" id="modelo" name="modelo" value={dados.modelo} onChange={handleInput} placeholder="Código do modelo" />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 3 - CLASSIFICAÇÃO
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>
          Classificação<RequiredMark>*</RequiredMark>
        </SectionTitle>
        <FormGrid>
          <Select label="Grade" name="grade" value={dados.grade} onChange={handleSelect} options={GRADE_OPTIONS} placeholder="Selecione a grade" />
          <Select label={<>Grupo<RequiredMark>*</RequiredMark></>} name="grupo" value={dados.grupo} onChange={handleSelect} options={grupos} placeholder="Selecione o grupo" />
          <Select label={<>Subgrupo<RequiredMark>*</RequiredMark></>} name="subgrupo" value={dados.subgrupo} onChange={handleSelect} options={subgruposFiltrados} disabled={!dados.grupo} placeholder={dados.grupo ? 'Selecione o subgrupo' : 'Selecione um grupo primeiro'} />
          <Select label="Modelagem" name="modelagem" value={dados.modelagem} onChange={handleSelect} options={MODELAGEM_OPTIONS} />
          <Input label="Base MP" id="baseMP" name="baseMP" value={dados.baseMP} onChange={handleInput} placeholder="Base matéria-prima" />
          <Select label="Tipo" name="tipo" value={dados.tipo} onChange={handleSelect} options={TIPO_OPTIONS} />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 4 - ATRIBUTOS
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Atributos</SectionTitle>
        <FormGrid>
          <Select label="Selo" name="selo" value={dados.selo} onChange={handleSelect} options={SELO_OPTIONS} />
          <Select label="Beneficiamento" name="beneficiamento" value={dados.beneficiamento} onChange={handleSelect} options={BENEFICIAMENTO_OPTIONS} />
          <Select label="Collab" name="collab" value={dados.collab} onChange={handleSelect} options={COLLAB_OPTIONS} />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 5 - ORIGEM
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Origem</SectionTitle>
        <FormGrid>
          <Input label="Fabricante Original" id="fabricanteOriginal" name="fabricanteOriginal" value={dados.fabricanteOriginal} onChange={handleInput} placeholder="Nome do fabricante" />
          <Input label="Fornecedor Original" id="fornecedorOriginal" name="fornecedorOriginal" value={dados.fornecedorOriginal} onChange={handleInput} placeholder="Nome do fornecedor" />
          <Select label="Pirâmide Original" name="piramideOriginal" value={dados.piramideOriginal} onChange={handleSelect} options={PIRAMIDE_OPTIONS} />
          <Select label="Produto Origem" name="produtoOrigem" value={dados.produtoOrigem} onChange={handleSelect} options={PRODUTO_ORIGEM_OPTIONS} placeholder="Nacional ou Importado" />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 6 - AMOSTRA
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Amostra</SectionTitle>
        <FormGrid>
          <Select label="Tipo de Amostra" name="tipoAmostra" value={dados.tipoAmostra} onChange={handleSelect} options={TIPO_AMOSTRA_OPTIONS} />
          <Input label="Tamanho do Piloto" id="tamanhoPiloto" name="tamanhoPiloto" value={dados.tamanhoPiloto} onChange={handleInput} placeholder="Ex: M, 40, 42..." />
          <Select label="Restrição à Lavagem" name="restricaoLavagem" value={dados.restricaoLavagem} onChange={handleSelect} options={RESTRICAO_LAVAGEM_OPTIONS} />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 7 - RESPONSÁVEIS
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Responsáveis</SectionTitle>
        <FormGrid>
          <Input label="Gerente" id="gerente" name="gerente" value={dados.gerente} onChange={handleInput} placeholder="Nome do gerente" />
          <Input label="Estilista" id="estilista" name="estilista" value={dados.estilista} onChange={handleInput} placeholder="Nome do estilista" />
          <Input label="Analista" id="analista" name="analista" value={dados.analista} onChange={handleInput} placeholder="Nome do analista" />
          <Select label="Cor Principal" name="corPrincipal" value={dados.corPrincipal} onChange={handleSelect} options={CORES_SUGERIDAS_OPTIONS} />
          <Select label="Continuidade" name="continuidade" value={dados.continuidade} onChange={handleSelect} options={CONTINUIDADE_OPTIONS} />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 8 - DETALHES TÉCNICOS
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Detalhes Técnicos</SectionTitle>
        <FormGrid>
          <Input label="Nome do Produto" id="nomeProduto" name="nomeProduto" value={dados.nomeProduto} onChange={handleInput} placeholder="Ex: Camisa Social Slim Premium" />
          <Input label="Material Principal" id="materialPrincipal" name="materialPrincipal" value={dados.materialPrincipal} onChange={handleInput} placeholder="Ex: Algodão Pima, Linho..." />
          <Input label="Composição" id="composicao" name="composicao" value={dados.composicao} onChange={handleInput} placeholder="Ex: 97% Algodão, 3% Elastano" />
          <Input label="Composição Tradução" id="composicaoTraducao" name="composicaoTraducao" value={dados.composicaoTraducao} onChange={handleInput} placeholder="Ex: 97% Cotton, 3% Elastane" />
          <Input label="NCM" id="ncm" name="ncm" value={dados.ncm} onChange={handleInput} placeholder="Código NCM" />
          <Input label="Descrição Fiscal" id="descricaoFiscal" name="descricaoFiscal" value={dados.descricaoFiscal} onChange={handleInput} placeholder="Descrição fiscal do produto" />
        </FormGrid>

        <TwoColGrid style={{ marginTop: '1.2rem' }}>
          <InputWrapper>
            <Label htmlFor="medidasProdutoAcabado">Medidas do Produto Acabado</Label>
            <StyledTextArea
              id="medidasProdutoAcabado"
              name="medidasProdutoAcabado"
              value={dados.medidasProdutoAcabado}
              onChange={handleInput}
              placeholder="Descreva as medidas por tamanho..."
              style={{ minHeight: 80 }}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="coresModelo">Cores do Modelo</Label>
            <StyledTextArea
              id="coresModelo"
              name="coresModelo"
              value={dados.coresModelo}
              onChange={handleInput}
              placeholder="Liste as cores previstas para o modelo..."
              style={{ minHeight: 80 }}
            />
          </InputWrapper>
        </TwoColGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 9 - SIMBOLOGIA / CONSERVAÇÃO
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Simbologia / Conservação</SectionTitle>
        <FormGrid>
          <Select label="Passadoria" name="passadoria" value={dados.passadoria} onChange={handleSelect} options={PASSADORIA_OPTIONS} />
          <Select label="Lavagem" name="lavagem" value={dados.lavagem} onChange={handleSelect} options={LAVAGEM_SIMB_OPTIONS} />
          <Select label="Alvejamento" name="alvejamento" value={dados.alvejamento} onChange={handleSelect} options={ALVEJAMENTO_OPTIONS} />
          <Select label="Limpeza" name="limpeza" value={dados.limpeza} onChange={handleSelect} options={LIMPEZA_OPTIONS} />
          <Select label="Secadora" name="secadora" value={dados.secadora} onChange={handleSelect} options={SECADORA_OPTIONS} />
          <Select label="Secagem" name="secagem" value={dados.secagem} onChange={handleSelect} options={SECAGEM_OPTIONS} />
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 10 - MATERIAIS
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Materiais</SectionTitle>
        <TwoColGrid>
          <InputWrapper>
            <Label htmlFor="tecidos">Tecidos</Label>
            <StyledTextArea
              id="tecidos"
              name="tecidos"
              value={dados.tecidos}
              onChange={handleInput}
              placeholder="Liste os tecidos utilizados, com fornecedor e referência..."
              style={{ minHeight: 80 }}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="aviamentos">Aviamentos</Label>
            <StyledTextArea
              id="aviamentos"
              name="aviamentos"
              value={dados.aviamentos}
              onChange={handleInput}
              placeholder="Liste os aviamentos: botões, zíperes, etiquetas..."
              style={{ minHeight: 80 }}
            />
          </InputWrapper>
        </TwoColGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          SEÇÃO 11 - CONCEITO E OBSERVAÇÕES
      ═══════════════════════════════════════════════ */}
      <FormSection>
        <SectionTitle>Conceito e Observações</SectionTitle>
        <FormGrid>
          <FullWidthField>
            <InputWrapper>
              <Label htmlFor="descricao">Descrição do Produto</Label>
              <StyledTextArea
                id="descricao"
                name="descricao"
                value={dados.descricao}
                onChange={handleInput}
                placeholder="Descreva detalhes do produto: materiais, acabamentos, diferenciais, estampas..."
                style={{ minHeight: 100 }}
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
                style={{ minHeight: 80 }}
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
                style={{ minHeight: 70 }}
              />
            </InputWrapper>
          </FullWidthField>

          <FullWidthField>
            <InputWrapper>
              <Label htmlFor="pedidoAmostras">Pedido de Amostras</Label>
              <StyledTextArea
                id="pedidoAmostras"
                name="pedidoAmostras"
                value={dados.pedidoAmostras}
                onChange={handleInput}
                placeholder="Descreva o pedido de amostras: quantidades, cores, tamanhos..."
                style={{ minHeight: 70 }}
              />
            </InputWrapper>
          </FullWidthField>
        </FormGrid>
      </FormSection>

      {/* ═══════════════════════════════════════════════
          BOTÕES DE AÇÃO
      ═══════════════════════════════════════════════ */}
      <ButtonGroup>
        <ActionButton $variant="secondary" onClick={onValidarIA} disabled={isValidating}>
          <Zap size={16} />
          {isValidating ? 'Validando...' : 'Validar com IA'}
        </ActionButton>
        <ActionButton $variant="primary" onClick={onEnviarCompras} disabled={!camposObrigatoriosPreenchidos}>
          <Send size={16} />
          Cadastrar
        </ActionButton>
        <ActionButton $variant="danger" onClick={onCancelar}>
          <X size={16} />
          Cancelar
        </ActionButton>
      </ButtonGroup>
    </FormContainer>
  );
};

export default EstiloForm;

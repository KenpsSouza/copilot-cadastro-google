import React, { useState, useEffect, useMemo } from 'react';
import {
  FormData, DadosCompras, DadosEstilo, FichaColecao, INITIAL_FICHA_COLECAO,
  FAIXA_PRECO_OPTIONS, CATEGORIA_FINAL_OPTIONS, COLECAO_OPTIONS, ALL_ESTILO_FIELDS
} from '../../types';
import {
  FormContainer, SectionTitle, FormGrid, ButtonGroup, ActionButton,
  ReadOnlySection, ReadOnlySectionHeader, ReadOnlyHeaderLeft, ReadOnlyHeaderIcon,
  ReadOnlyHeaderTitle, ReadOnlyHeaderBadge, ReadOnlyChevron, ReadOnlyBody,
  ReadOnlyGroupTitle, ReadOnlyField, ReadOnlyLabel, ReadOnlyValue,
  SectionDivider, SectionDividerLabel, EditableSection,
} from './styles';
import { Input, Select, TextArea } from '../common';
import { Zap, CheckCircle, Eye, EyeOff, ChevronDown, Edit3, Lock } from 'react-feather';

interface ComprasFormProps {
  formData: FormData;
  onChange: (section: 'dadosCompras', field: keyof DadosCompras | '__fichasColecao', value: any) => void;
  onValidarIA: () => void;
  onFinalizar: () => void;
  isValidating: boolean;
}

const ESTILO_GROUPS: { title: string; fields: { key: keyof DadosEstilo; label: string }[] }[] = [
  {
    title: 'Identificação',
    fields: [
      { key: 'bu', label: 'BU' },
      { key: 'griffe', label: 'Griffe' },
      { key: 'linha', label: 'Linha' },
      { key: 'sexo', label: 'Sexo' },
      { key: 'colecaoOrigem', label: 'Coleção' },
    ],
  },
  {
    title: 'Referência',
    fields: [
      { key: 'referencia', label: 'Referência' },
      { key: 'refLacreFornecedor', label: 'Ref / Lacre Forn.' },
      { key: 'modeloAra', label: 'Modelo (Aramis)' },
      { key: 'modelo', label: 'Modelo' },
    ],
  },
  {
    title: 'Classificação',
    fields: [
      { key: 'grade', label: 'Grade' },
      { key: 'grupo', label: 'Grupo' },
      { key: 'subgrupo', label: 'Subgrupo' },
      { key: 'modelagem', label: 'Modelagem' },
      { key: 'baseMP', label: 'Base MP' },
      { key: 'tipo', label: 'Tipo' },
    ],
  },
  {
    title: 'Atributos',
    fields: [
      { key: 'selo', label: 'Selo' },
      { key: 'beneficiamento', label: 'Beneficiamento' },
      { key: 'collab', label: 'Collab' },
    ],
  },
  {
    title: 'Origem',
    fields: [
      { key: 'fabricanteOriginal', label: 'Fabricante' },
      { key: 'fornecedorOriginal', label: 'Fornecedor' },
      { key: 'piramideOriginal', label: 'Pirâmide' },
      { key: 'produtoOrigem', label: 'Produto Origem' },
    ],
  },
  {
    title: 'Produto',
    fields: [
      { key: 'nomeProduto', label: 'Nome do Produto' },
      { key: 'materialPrincipal', label: 'Material Principal' },
      { key: 'composicao', label: 'Composição' },
      { key: 'ncm', label: 'NCM' },
      { key: 'corPrincipal', label: 'Cor Principal' },
      { key: 'coresModelo', label: 'Cores do Modelo' },
    ],
  },
  {
    title: 'Conservação',
    fields: [
      { key: 'passadoria', label: 'Passadoria' },
      { key: 'lavagem', label: 'Lavagem' },
      { key: 'alvejamento', label: 'Alvejamento' },
      { key: 'secagem', label: 'Secagem' },
    ],
  },
];

const ComprasForm: React.FC<ComprasFormProps> = ({
  formData,
  onChange,
  onValidarIA,
  onFinalizar,
  isValidating
}) => {
  const { dadosCompras, dadosEstilo, fichasColecao } = formData;
  const [estiloOpen, setEstiloOpen] = useState(false);
  const [fichaSelecionada, setFichaSelecionada] = useState<FichaColecao | null>(null);
  const [fichaDraft, setFichaDraft] = useState<FichaColecao | null>(null);

  useEffect(() => {
    function handleEvent() {
      handleNovaFicha();
    }
    window.addEventListener('novaFichaColecao', handleEvent);
    return () => window.removeEventListener('novaFichaColecao', handleEvent);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange('dadosCompras', name as keyof DadosCompras, value);
  };

  const { camposEstiloPreenchidos, totalCamposEstilo } = useMemo(() => {
    const total = ALL_ESTILO_FIELDS.length;
    const preenchidos = ALL_ESTILO_FIELDS.reduce((acc, key) => {
      const value = dadosEstilo[key];
      if (value && String(value).trim() !== '') {
        return acc + 1;
      }
      return acc;
    }, 0);
    return { camposEstiloPreenchidos: preenchidos, totalCamposEstilo: total };
  }, [dadosEstilo]);


  const handleNovaFicha = () => {
    setFichaSelecionada(null);
    setFichaDraft({ ...INITIAL_FICHA_COLECAO, id: `FICHA-${Date.now()}` });
  };

  const handleEditarFicha = (ficha: FichaColecao) => {
    setFichaSelecionada(ficha);
    setFichaDraft({ ...ficha });
  };

  const handleSalvarFicha = () => {
    if (!fichaDraft) return;
    let novasFichas: FichaColecao[];
    if (fichaSelecionada) {
      novasFichas = fichasColecao.map(f => f.id === fichaDraft.id ? { ...fichaDraft, atualizadoEm: new Date().toISOString() } : f);
    } else {
      novasFichas = [
        ...fichasColecao,
        { ...fichaDraft, criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString() }
      ];
    }
    onChange('dadosCompras', '__fichasColecao' as any, novasFichas as any);
    setFichaSelecionada(null);
    setFichaDraft(null);
  };

  const handleCancelarFicha = () => {
    setFichaSelecionada(null);
    setFichaDraft(null);
  };

  const handleExcluirFicha = () => {
    if (!fichaDraft) return;
    if (!window.confirm('Tem certeza que deseja excluir esta ficha de coleção?')) return;
    const novasFichas = fichasColecao.filter(f => f.id !== fichaDraft.id);
    onChange('dadosCompras', '__fichasColecao' as any, novasFichas as any);
    setFichaSelecionada(null);
    setFichaDraft(null);
  };

  const renderFichaForm = () => {
    if (!fichaDraft) return null;
    return (
      <div style={{
        border: '1.5px solid #23242c',
        borderRadius: 14,
        background: '#181a20',
        padding: 24,
        marginBottom: 32,
        marginTop: -16,
        boxShadow: '0 4px 18px #0006',
      }}>
        <SectionTitle>{fichaSelecionada ? 'Editar Ficha de Coleção' : 'Nova Ficha de Coleção'}</SectionTitle>
        <FormGrid style={{ gridTemplateColumns: '1fr 1fr' }}>
          <Select
            label="Coleção"
            name="colecao"
            value={fichaDraft.colecao}
            onChange={e => setFichaDraft({ ...fichaDraft, colecao: e.target.value })}
            options={COLECAO_OPTIONS}
          />
          <Input
            label="Cores"
            name="cores"
            value={fichaDraft.cores}
            onChange={e => setFichaDraft({ ...fichaDraft, cores: e.target.value })}
            placeholder="Ex: Azul, Branco, Rosa"
          />
          <Input
            label="Fornecedor"
            name="fornecedor"
            value={fichaDraft.fornecedor}
            onChange={e => setFichaDraft({ ...fichaDraft, fornecedor: e.target.value })}
            placeholder="Fornecedor"
          />
          <Input
            label="Fabricante"
            name="fabricante"
            value={fichaDraft.fabricante}
            onChange={e => setFichaDraft({ ...fichaDraft, fabricante: e.target.value })}
            placeholder="Fabricante"
          />
          <Input
            label="Comprador"
            name="comprador"
            value={fichaDraft.comprador}
            onChange={e => setFichaDraft({ ...fichaDraft, comprador: e.target.value })}
            placeholder="Comprador"
          />
          <Input
            label="Preço Planejado (R$)"
            name="precoPlanejado"
            type="number"
            value={fichaDraft.precoPlanejado}
            onChange={e => setFichaDraft({ ...fichaDraft, precoPlanejado: e.target.value })}
            placeholder="0.00"
          />
          <Input
            label="Preço de Venda (R$)"
            name="precoVenda"
            type="number"
            value={fichaDraft.precoVenda}
            onChange={e => setFichaDraft({ ...fichaDraft, precoVenda: e.target.value })}
            placeholder="0.00"
          />
          <Input
            label="Cluster"
            name="cluster"
            value={fichaDraft.cluster}
            onChange={e => setFichaDraft({ ...fichaDraft, cluster: e.target.value })}
            placeholder="Ex: Sul, Sudeste"
          />
          <Input
            label="Cartela de Cor"
            name="cartelaCor"
            value={fichaDraft.cartelaCor}
            onChange={e => setFichaDraft({ ...fichaDraft, cartelaCor: e.target.value })}
            placeholder="Cartela"
          />
          <Input
            label="Nacional/Importado"
            name="nacionalImportado"
            value={fichaDraft.nacionalImportado}
            onChange={e => setFichaDraft({ ...fichaDraft, nacionalImportado: e.target.value })}
            placeholder="Nacional ou Importado"
          />
          <Input
            label="Pirâmide"
            name="piramide"
            value={fichaDraft.piramide}
            onChange={e => setFichaDraft({ ...fichaDraft, piramide: e.target.value })}
            placeholder="Pirâmide"
          />
          <Input
            label="Campanha"
            name="campanha"
            value={fichaDraft.campanha}
            onChange={e => setFichaDraft({ ...fichaDraft, campanha: e.target.value })}
            placeholder="Campanha"
          />
          <Input
            label="Categorias"
            name="categorias"
            value={fichaDraft.categorias.join(', ')}
            onChange={e => setFichaDraft({ ...fichaDraft, categorias: e.target.value.split(',').map(s => s.trim()) })}
            placeholder="Ex: Premium, Camisa"
          />
        </FormGrid>
        <div style={{ marginTop: 16 }}>
          <TextArea
            label="Observações"
            name="observacoes"
            value={fichaDraft.observacoes}
            onChange={e => setFichaDraft({ ...fichaDraft, observacoes: e.target.value })}
            placeholder="Observações da ficha"
            style={{ minHeight: 48 }}
          />
        </div>
        <ButtonGroup style={{ marginTop: 18 }}>
          <ActionButton $variant="primary" type="button" onClick={handleSalvarFicha}>
            Salvar Ficha
          </ActionButton>
          <ActionButton $variant="secondary" type="button" onClick={handleCancelarFicha}>
            Cancelar
          </ActionButton>
          {fichaSelecionada && (
            <ActionButton $variant="danger" type="button" onClick={handleExcluirFicha}>
              Excluir Ficha
            </ActionButton>
          )}
        </ButtonGroup>
      </div>
    );
  };

  return (
    <FormContainer>
      {renderFichaForm()}

      <ReadOnlySection>
        <ReadOnlySectionHeader onClick={() => setEstiloOpen(!estiloOpen)}>
          <ReadOnlyHeaderLeft>
            <ReadOnlyHeaderIcon>
              {estiloOpen ? <Eye size={14} /> : <EyeOff size={14} />}
            </ReadOnlyHeaderIcon>
            <ReadOnlyHeaderTitle>Dados do Estilo</ReadOnlyHeaderTitle>
            <ReadOnlyHeaderBadge>
              <Lock size={9} style={{ marginRight: 3, verticalAlign: 'middle' }} />
              {camposEstiloPreenchidos}/{totalCamposEstilo} preenchidos
            </ReadOnlyHeaderBadge>
          </ReadOnlyHeaderLeft>
          <ReadOnlyChevron $open={estiloOpen}>
            <ChevronDown size={16} />
          </ReadOnlyChevron>
        </ReadOnlySectionHeader>

        <ReadOnlyBody $open={estiloOpen}>
          {ESTILO_GROUPS.map(group => {
            const hasValues = group.fields.some(f => dadosEstilo[f.key] && dadosEstilo[f.key].trim() !== '');
            if (!hasValues) return null;

            return (
              <React.Fragment key={group.title}>
                <ReadOnlyGroupTitle>{group.title}</ReadOnlyGroupTitle>
                {group.fields.map(f => {
                  const val = dadosEstilo[f.key];
                  if (!val || val.trim() === '') return null;
                  return (
                    <ReadOnlyField key={f.key}>
                      <ReadOnlyLabel>{f.label}</ReadOnlyLabel>
                      <ReadOnlyValue>{val}</ReadOnlyValue>
                    </ReadOnlyField>
                  );
                })}
              </React.Fragment>
            );
          })}
        </ReadOnlyBody>
      </ReadOnlySection>

      <SectionDivider>
        <SectionDividerLabel>
          <Edit3 size={12} />
          Seus campos editáveis
        </SectionDividerLabel>
      </SectionDivider>

      <EditableSection>
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
      </EditableSection>

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

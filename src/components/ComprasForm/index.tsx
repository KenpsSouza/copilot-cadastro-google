import React, { useState } from 'react';
import { FormData, DadosCompras, DadosEstilo, FichaColecao, INITIAL_FICHA_COLECAO, FAIXA_PRECO_OPTIONS, CATEGORIA_FINAL_OPTIONS, COLECAO_OPTIONS } from '../../types';
import {
  FormContainer, SectionTitle, FormGrid, ButtonGroup, ActionButton,
  ReadOnlySection, ReadOnlySectionHeader, ReadOnlyHeaderLeft, ReadOnlyHeaderIcon,
  ReadOnlyHeaderTitle, ReadOnlyHeaderBadge, ReadOnlyChevron, ReadOnlyBody,
  ReadOnlyGroupTitle, ReadOnlyField, ReadOnlyLabel, ReadOnlyValue,
  SectionDivider, SectionDividerLabel, EditableSection,
} from './styles';
import { Input, Select } from '../common';
import { Zap, CheckCircle, Eye, EyeOff, ChevronDown, Edit3, Lock } from 'react-feather';

interface ComprasFormProps {
  formData: FormData;
  onChange: (section: 'dadosEstilo' | 'dadosCompras', field: keyof DadosCompras, value: string) => void;
  onValidarIA: () => void;
  onFinalizar: () => void;
  isValidating: boolean;
}

/* Mapeamento legível dos campos do Estilo agrupados */
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange('dadosCompras', name as keyof DadosCompras, value);
  };

  // Conta campos preenchidos do estilo
  const camposEstiloPreenchidos = Object.values(dadosEstilo).filter(v => v && v.trim() !== '').length;
  const totalCamposEstilo = Object.keys(dadosEstilo).length;



  // Inicia criação de nova ficha
  const handleNovaFicha = () => {
    setFichaSelecionada(null);
    setFichaDraft({ ...INITIAL_FICHA_COLECAO, id: `FICHA-${Date.now()}` });
  };

  // Inicia edição de ficha existente
  const handleEditarFicha = (ficha: FichaColecao) => {
    setFichaSelecionada(ficha);
    setFichaDraft({ ...ficha });
  };

  // Salva ficha (nova ou edição)
  const handleSalvarFicha = () => {
    if (!fichaDraft) return;
    let novasFichas: FichaColecao[];
    if (fichaSelecionada) {
      // Edição
      novasFichas = fichasColecao.map(f => f.id === fichaDraft.id ? { ...fichaDraft, atualizadoEm: new Date().toISOString() } : f);
    } else {
      // Nova
      novasFichas = [
        ...fichasColecao,
        { ...fichaDraft, criadoEm: new Date().toISOString(), atualizadoEm: new Date().toISOString() }
      ];
    }
    // Atualiza no formData (via onChange, hack: campo especial)
    onChange('dadosCompras', '__fichasColecao' as any, novasFichas as any);
    setFichaSelecionada(null);
    setFichaDraft(null);
  };

  // Cancela edição/criação
  const handleCancelarFicha = () => {
    setFichaSelecionada(null);
    setFichaDraft(null);
  };

  // Renderiza lista de fichas de coleção
  const renderFichasColecao = () => (
    <div style={{ marginBottom: 32 }}>
      <SectionTitle>Fichas de Coleção</SectionTitle>
      {(!fichasColecao || fichasColecao.length === 0) && (
        <div style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>Nenhuma ficha cadastrada para este produto.</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {fichasColecao && fichasColecao.map(ficha => (
          <div
            key={ficha.id}
            style={{
              border: fichaSelecionada?.id === ficha.id ? '2px solid #e5182d' : '1.5px solid #23242c',
              borderRadius: 14,
              padding: '18px 20px 14px 20px',
              background: fichaSelecionada?.id === ficha.id ? 'rgba(229,24,45,0.08)' : '#181a20',
              cursor: 'pointer',
              boxShadow: fichaSelecionada?.id === ficha.id ? '0 4px 18px #e5182d33' : '0 2px 8px #0006',
              transition: 'box-shadow 0.2s, border 0.2s, background 0.2s',
              position: 'relative',
              minHeight: 70,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
            onClick={() => handleEditarFicha(ficha)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 2 }}>
              <span style={{
                background: 'linear-gradient(90deg, #e5182d 60%, #ff3333 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                borderRadius: 7,
                padding: '2px 12px',
                letterSpacing: 0.5,
                boxShadow: '0 1px 4px #e5182d22',
                minWidth: 90,
                textAlign: 'center',
              }}>{ficha.colecao || 'Coleção'}</span>
              <span style={{ color: '#1a1d27', fontWeight: 600, fontSize: 16 }}>{ficha.comprador || 'Comprador'}</span>
              <span style={{ color: '#b3b3b3', fontSize: 13, marginLeft: 8 }}>{ficha.criadoEm ? new Date(ficha.criadoEm).toLocaleDateString() : ''}</span>
            </div>
            <div style={{ fontSize: 14.5, color: '#444', marginBottom: 1 }}>
              <b>Cores:</b> {ficha.cores || '-'}
              <span style={{ margin: '0 10px' }}>|</span>
              <b>Fornecedor:</b> {ficha.fornecedor || '-'}
              <span style={{ margin: '0 10px' }}>|</span>
              <b>Preço Planejado:</b> <span style={{ color: '#e5182d', fontWeight: 700 }}>{ficha.precoPlanejado ? `R$ ${ficha.precoPlanejado}` : '-'}</span>
            </div>
            <div style={{ fontSize: 13.5, color: '#888', marginTop: 2 }}>
              <b>Cluster:</b> {ficha.cluster || '-'}
              <span style={{ margin: '0 10px' }}>|</span>
              <b>Cartela:</b> {ficha.cartelaCor || '-'}
              <span style={{ margin: '0 10px' }}>|</span>
              <b>Pirâmide:</b> {ficha.piramide || '-'}
            </div>
            <div style={{ fontSize: 13, color: '#b3b3b3', marginTop: 2 }}>
              <b>Categorias:</b> {ficha.categorias && ficha.categorias.length > 0 ? ficha.categorias.join(', ') : '-'}
              <span style={{ margin: '0 10px' }}>|</span>
              <b>Campanha:</b> {ficha.campanha || '-'}
              <span style={{ margin: '0 10px' }}>|</span>
              <b>Nacional/Importado:</b> {ficha.nacionalImportado || '-'}
            </div>
            {ficha.observacoes && (
              <div style={{ fontSize: 13, color: '#e5182d', marginTop: 4, fontStyle: 'italic' }}>
                {ficha.observacoes}
              </div>
            )}
            <div style={{ position: 'absolute', top: 12, right: 18, display: 'flex', gap: 8 }}>
              <button
                type="button"
                style={{
                  background: 'none', border: 'none', color: '#e5182d', cursor: 'pointer', fontWeight: 600, fontSize: 13, padding: '2px 6px', borderRadius: 5, transition: 'background 0.15s',
                }}
                onClick={e => { e.stopPropagation(); handleEditarFicha(ficha); }}
                title="Editar ficha"
              >Editar</button>
              {/**
               * Botão de exclusão de ficha (desabilitado/comentado)
               * Para ativar, remova os comentários e implemente handleExcluirFicha
               */}
              {/**
                Para ativar o botão de exclusão, remova os comentários e implemente handleExcluirFicha
                Exemplo:
                <button
                  type="button"
                  style={{ ... }}
                  onClick={e => { e.stopPropagation(); handleExcluirFicha(ficha.id); }}
                  title="Excluir ficha"
                >Excluir</button>
              */}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <ActionButton $variant="secondary" type="button" onClick={handleNovaFicha}>
          + Nova Ficha de Coleção
        </ActionButton>
      </div>
    </div>
  );

  // Renderiza formulário de ficha de coleção
  // Excluir ficha de coleção
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
          <Input
            label="Observações"
            name="observacoes"
            value={fichaDraft.observacoes}
            onChange={e => setFichaDraft({ ...fichaDraft, observacoes: e.target.value })}
            placeholder="Observações da ficha"
            as="textarea"
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
      {renderFichasColecao()}
      {renderFichaForm()}

      {/* ═══════════════════════════════════════════════
          SEÇÃO READ-ONLY — Dados preenchidos pelo Estilo
      ═══════════════════════════════════════════════ */}
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
            // Só mostra grupo se tem pelo menos 1 campo preenchido
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

      {/* ═══════════════════════════════════════════════
          SEPARADOR VISUAL
      ═══════════════════════════════════════════════ */}
      <SectionDivider>
        <SectionDividerLabel>
          <Edit3 size={12} />
          Seus campos editáveis
        </SectionDividerLabel>
      </SectionDivider>

      {/* ═══════════════════════════════════════════════
          SEÇÃO EDITÁVEL — Campos do Compras
      ═══════════════════════════════════════════════ */}
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

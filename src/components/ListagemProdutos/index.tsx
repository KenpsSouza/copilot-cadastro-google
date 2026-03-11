import React, { useState, useMemo } from 'react';
import { FormData, UserRole, ProductStatus } from '../../types';
import { getEstiloProgress } from '../../utils/formData';
import {
  ListContainer, ListHeader, Title, Grid, Card, CardHeader,
  ProductInfo, ProductName, ProductCategory, StatusTag,
  CardBody, InfoRow, CardFooter, ActionButton,
  FiltersContainer, SearchWrapper, SearchInput, FilterButton, FilterSelect,
  ProgressContainer, ProgressBar, ProgressLabel, 
  FooterActions, FooterActionText, FooterIconButton
} from './styles';
import { Plus, Clock, Edit3, ShoppingBag, Search, CheckCircle, Trash2, XCircle } from 'react-feather';

interface ListagemProdutosProps {
  products: FormData[];
  userRole: UserRole;
  onNewProduct: () => void;
  onSelectProduct: (product: FormData) => void;
  onDeleteProduct: (productId: string) => void;
}

type FilterStatus = 'TODOS' | ProductStatus;

const MESES = [
  { value: 0, label: 'Janeiro' }, { value: 1, label: 'Fevereiro' }, { value: 2, label: 'Março' }, 
  { value: 3, label: 'Abril' }, { value: 4, label: 'Maio' }, { value: 5, label: 'Junho' }, 
  { value: 6, label: 'Julho' }, { value: 7, label: 'Agosto' }, { value: 8, label: 'Setembro' }, 
  { value: 9, label: 'Outubro' }, { value: 10, label: 'Novembro' }, { value: 11, label: 'Dezembro' }
];

const ListagemProdutos: React.FC<ListagemProdutosProps> = ({
  products,
  userRole,
  onNewProduct,
  onSelectProduct,
  onDeleteProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('TODOS');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [groupFilter, setGroupFilter] = useState('');

  const getStatusLabel = (status: ProductStatus) => {
    switch (status) {
      case 'EM_DESENVOLVIMENTO': return 'Em Construção';
      case 'ESTILO_CONCLUIDO': return 'Aguardando Compras';
      case 'FINALIZADO': return 'Finalizado';
      default: return status;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const uniqueCollections = useMemo(() => 
    [...new Set(products.map(p => p.dadosEstilo.colecaoOrigem).filter(Boolean))].sort(), 
    [products]
  );
  
  const uniqueYears = useMemo(() => 
    [...new Set(products.map(p => p.dadosEstilo.ano).filter(Boolean))].sort((a, b) => b.localeCompare(a)),
    [products]
  );

  const uniqueGroups = useMemo(() => 
    [...new Set(products.map(p => p.dadosEstilo.grupo).filter(Boolean))].sort(), 
    [products]
  );

  const filteredAndSortedProdutos = useMemo(() => {
    // 1. Create a base list of products the user is allowed to see, based on their role.
    const accessibleProducts = products.filter(p => {
      if (userRole === 'compras') {
        return p.status === 'ESTILO_CONCLUIDO' || p.status === 'FINALIZADO';
      }
      // 'estilo' user can see all products
      return true;
    });

    // 2. Apply the UI filters on top of that accessible list.
    let filtered = accessibleProducts.filter(p => {
      if (statusFilter !== 'TODOS' && p.status !== statusFilter) {
        return false;
      }
      if (collectionFilter && p.dadosEstilo.colecaoOrigem !== collectionFilter) {
        return false;
      }
      if (groupFilter && p.dadosEstilo.grupo !== groupFilter) {
        return false;
      }
      if (yearFilter && p.dadosEstilo.ano !== yearFilter) {
        return false;
      }
      if (monthFilter && p.atualizadoEm) {
        const productMonth = new Date(p.atualizadoEm).getMonth();
        if (productMonth !== parseInt(monthFilter)) {
          return false;
        }
      }
          if (searchTerm) {
            const term = searchTerm.toLowerCase();
            const refMatch = p.dadosEstilo.referencia?.toLowerCase().includes(term);
            const nameMatch = p.dadosEstilo.nomeProduto?.toLowerCase().includes(term);
            const idMatch = p.id?.toLowerCase().includes(term);
            if (!refMatch && !nameMatch && !idMatch) return false;
      }
      return true;
    });

    // 3. Sort the final list
    return filtered.sort((a, b) => {
      const dateA = a.atualizadoEm ? new Date(a.atualizadoEm).getTime() : 0;
      const dateB = b.atualizadoEm ? new Date(b.atualizadoEm).getTime() : 0;
      return dateB - dateA;
    });
  }, [products, userRole, statusFilter, collectionFilter, monthFilter, yearFilter, groupFilter, searchTerm]);

  const handleCardClick = (e: React.MouseEvent, product: FormData) => {
    if ((e.target as HTMLElement).closest('button, select')) return;
    onSelectProduct(product);
  };

  const handleDeleteClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    onDeleteProduct(productId);
  }

  return (
    <ListContainer>
      <ListHeader>
        <Title>Meus Produtos</Title>
        {userRole === 'estilo' && (
          <ActionButton onClick={onNewProduct}>
            <Plus size={16} />
            Novo Produto
          </ActionButton>
        )}
      </ListHeader>

      <FiltersContainer style={{ flexWrap: 'wrap', alignItems: 'center', gap: '1rem', position: 'relative' }}>
        <SearchWrapper>
          <Search size={16} />
              <SearchInput
                placeholder="Buscar por Referência, Nome ou ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>

        <FilterSelect value={collectionFilter} onChange={e => setCollectionFilter(e.target.value)} $active={collectionFilter !== ""}>
          <option value="">Todas as Coleções</option>
          {uniqueCollections.map(c => <option key={c} value={c}>{c}</option>)}
        </FilterSelect>

        <FilterSelect value={groupFilter} onChange={e => setGroupFilter(e.target.value)} $active={groupFilter !== ""}>
          <option value="">Todos os Grupos</option>
          {uniqueGroups.map(g => <option key={g} value={g}>{g}</option>)}
        </FilterSelect>

        <FilterSelect value={yearFilter} onChange={e => setYearFilter(e.target.value)} $active={yearFilter !== ""}>
          <option value="">Todos os Anos</option>
          {uniqueYears.map(y => <option key={y} value={y}>{y}</option>)}
        </FilterSelect>

        <FilterSelect value={monthFilter} onChange={e => setMonthFilter(e.target.value)} $active={monthFilter !== ""}>
          <option value="">Todos os Meses</option>
          {MESES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </FilterSelect>

        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            setCollectionFilter('');
            setGroupFilter('');
            setYearFilter('');
            setMonthFilter('');
            setStatusFilter('TODOS');
          }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            fontWeight: 500,
            fontSize: '1rem',
            cursor: 'pointer',
            marginLeft: 'auto',
            padding: '0.5rem 1rem',
            borderRadius: 20,
            transition: 'color 0.18s, background 0.18s',
          }}
          title="Limpar Filtros"
          onMouseOver={e => (e.currentTarget.style.color = '#fff')}
          onMouseOut={e => (e.currentTarget.style.color = '#9ca3af')}
        >
          <XCircle size={18} color="#9ca3af" style={{ marginRight: 4 }} /> Limpar filtros
        </button>
      </FiltersContainer>
      
      <FiltersContainer>
        <FilterButton 
          $active={statusFilter === 'TODOS'} 
          onClick={() => setStatusFilter('TODOS')}
        >
          Todos
        </FilterButton>
        {userRole === 'estilo' ? (
          <>
            <FilterButton 
              $active={statusFilter === 'EM_DESENVOLVIMENTO'} 
              onClick={() => setStatusFilter('EM_DESENVOLVIMENTO')}
            >
              Em Construção
            </FilterButton>
            <FilterButton 
              $active={statusFilter === 'ESTILO_CONCLUIDO'} 
              onClick={() => setStatusFilter('ESTILO_CONCLUIDO')}
            >
              <span style={{ color: statusFilter === 'ESTILO_CONCLUIDO' ? '#111827' : undefined }}>Estilo</span>
              <CheckCircle size={16} color="#22c55e" strokeWidth={2} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </FilterButton>
            <FilterButton 
              $active={statusFilter === 'FINALIZADO'} 
              onClick={() => setStatusFilter('FINALIZADO')}
            >
              <span style={{ color: statusFilter === 'FINALIZADO' ? '#fff' : undefined }}>Finalizado</span>
              <CheckCircle size={16} color="#22c55e" strokeWidth={2} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </FilterButton>
          </>
        ) : (
          <>
            <FilterButton 
              $active={statusFilter === 'ESTILO_CONCLUIDO'} 
              onClick={() => setStatusFilter('ESTILO_CONCLUIDO')}
            >
              <span style={{ color: statusFilter === 'ESTILO_CONCLUIDO' ? '#111827' : undefined }}>Estilo</span>
              <CheckCircle size={16} color="#22c55e" strokeWidth={2} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </FilterButton>
            <FilterButton 
              $active={statusFilter === 'FINALIZADO'} 
              onClick={() => setStatusFilter('FINALIZADO')}
            >
              <span style={{ color: statusFilter === 'FINALIZADO' ? '#fff' : undefined }}>Finalizado</span>
              <CheckCircle size={16} color="#22c55e" strokeWidth={2} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
            </FilterButton>
          </>
        )}
      </FiltersContainer>

      <Grid>
        {filteredAndSortedProdutos.map((product) => {
          const { preenchidos, total } = getEstiloProgress(product.dadosEstilo);
          const progress = total > 0 ? (preenchidos / total) * 100 : 0;
          const isFinalizado = product.status === 'FINALIZADO';

          return (
            <Card key={product.id} onClick={(e) => handleCardClick(e, product)}>
              <CardHeader>
                <ProductInfo>
                  <ProductName>
                    {product.dadosEstilo.nomeProduto || 'Produto sem nome'}
                  </ProductName>
                  <ProductCategory>
                    {product.dadosEstilo.grupo || 'Sem grupo'} {product.dadosEstilo.subgrupo ? `> ${product.dadosEstilo.subgrupo}` : ''}
                  </ProductCategory>
                </ProductInfo>
                <StatusTag $status={product.status}>
                  {product.status === 'ESTILO_CONCLUIDO' ? (
                    <>
                      <span style={{ color: '#111827' }}>Estilo</span>
                      <CheckCircle size={16} color="#22c55e" strokeWidth={2} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                    </>
                  ) : product.status === 'FINALIZADO' ? (
                    <>
                      <span style={{ color: '#fff' }}>Finalizado</span>
                      <CheckCircle size={16} color="#22c55e" strokeWidth={2} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                    </>
                  ) : (
                    getStatusLabel(product.status)
                  )}
                </StatusTag>
              </CardHeader>

              <CardBody>
                {userRole === 'estilo' && product.status === 'EM_DESENVOLVIMENTO' && (
                  <ProgressContainer>
                    <ProgressLabel>{preenchidos} de {total} campos preenchidos</ProgressLabel>
                    <ProgressBar progress={progress} />
                  </ProgressContainer>
                )}
                
                <InfoRow>
                  <span className="label">Coleção:</span>
                  <span className="value">{product.dadosEstilo.colecaoOrigem || '-'}</span>
                </InfoRow>
                 <InfoRow>
                  <span className="label">Ano:</span>
                  <span className="value">{product.dadosEstilo.ano || '-'}</span>
                </InfoRow>
                <InfoRow>
                  <span className="label">Linha:</span>
                  <span className="value">{product.dadosEstilo.linha || '-'}</span>
                </InfoRow>

                {/* Preço removido da pré-visualização */}
              </CardBody>

              <CardFooter>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, opacity: 0.8 }}>
                  <Clock size={12} />
                  <span>{formatDate(product.atualizadoEm)}</span>
                </div>
                
                <FooterActions>
                  <FooterActionText>
                    {userRole === 'estilo' && product.status === 'EM_DESENVOLVIMENTO' && <><Edit3 size={14} /><span>Editar</span></>}
                    {userRole === 'compras' && product.status !== 'FINALIZADO' && <><ShoppingBag size={14} /><span>Complementar</span></>}
                    {product.status === 'ESTILO_CONCLUIDO' && userRole === 'estilo' && <><CheckCircle size={14} /><span>Enviado</span></>}
                    {product.status === 'FINALIZADO' && <><Edit3 size={14} /><span>Detalhes</span></>}
                  </FooterActionText>

                  {userRole === 'estilo' && (
                    <FooterIconButton 
                      disabled={isFinalizado}
                      title={isFinalizado ? "Produtos finalizados não podem ser excluídos" : "Excluir produto"}
                      onClick={(e) => product.id && handleDeleteClick(e, product.id)}
                    >
                      <Trash2 size={16} />
                    </FooterIconButton>
                  )}
                </FooterActions>
              </CardFooter>
            </Card>
          );
        })}
      </Grid>
    </ListContainer>
  );
};

export default ListagemProdutos;

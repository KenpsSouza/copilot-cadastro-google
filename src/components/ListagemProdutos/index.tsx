import React, { useState, useMemo } from 'react';
import { FormData, UserRole } from '../../types';
import {
  ListContainer, ListHeader, Title, Grid, Card, CardHeader,
  ProductInfo, ProductName, ProductCategory, StatusTag,
  CardBody, InfoRow, CardFooter, ActionButton,
  FiltersContainer, SearchWrapper, SearchInput, FilterButton
} from './styles';
import { Plus, Clock, Edit3, ShoppingBag, Search } from 'react-feather';

interface ListagemProdutosProps {
  products: FormData[];
  userRole: UserRole;
  onNewProduct: () => void;
  onSelectProduct: (product: FormData) => void;
}

type FilterStatus = 'TODOS' | 'EM_DESENVOLVIMENTO' | 'CADASTRADO_AGUARDANDO_COMPRAS' | 'FINALIZADO';

const ListagemProdutos: React.FC<ListagemProdutosProps> = ({
  products,
  userRole,
  onNewProduct,
  onSelectProduct
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('TODOS');

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'EM_DESENVOLVIMENTO': return 'Em Construção';
      case 'CADASTRADO_AGUARDANDO_COMPRAS': return 'Aguardando Compras';
      case 'FINALIZADO': return 'Finalizado';
      default: return status;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const filteredAndSortedProdutos = useMemo(() => {
    let filtered = products.filter(p => {
      // Role based filtering
      if (userRole === 'compras') {
        if (p.status !== 'CADASTRADO_AGUARDANDO_COMPRAS' && p.status !== 'FINALIZADO') {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'TODOS' && p.status !== statusFilter) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const nameMatch = p.dadosEstilo.nomeProduto.toLowerCase().includes(term);
        const idMatch = p.id?.toLowerCase().includes(term);
        if (!nameMatch && !idMatch) return false;
      }

      return true;
    });

    // Sort by atualizadoEm descending
    return filtered.sort((a, b) => {
      const dateA = a.atualizadoEm ? new Date(a.atualizadoEm).getTime() : 0;
      const dateB = b.atualizadoEm ? new Date(b.atualizadoEm).getTime() : 0;
      return dateB - dateA;
    });
  }, [products, userRole, statusFilter, searchTerm]);

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

      <FiltersContainer>
        <SearchWrapper>
          <Search size={16} />
          <SearchInput 
            placeholder="Buscar por nome ou ID..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchWrapper>
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
              Em Construção (Estilo)
            </FilterButton>
            <FilterButton 
              $active={statusFilter === 'CADASTRADO_AGUARDANDO_COMPRAS'} 
              onClick={() => setStatusFilter('CADASTRADO_AGUARDANDO_COMPRAS')}
            >
              Aguardando Compras
            </FilterButton>
          </>
        ) : (
          <>
            <FilterButton 
              $active={statusFilter === 'CADASTRADO_AGUARDANDO_COMPRAS'} 
              onClick={() => setStatusFilter('CADASTRADO_AGUARDANDO_COMPRAS')}
            >
              Em Construção (Compras)
            </FilterButton>
            <FilterButton 
              $active={statusFilter === 'FINALIZADO'} 
              onClick={() => setStatusFilter('FINALIZADO')}
            >
              Finalizado
            </FilterButton>
          </>
        )}
      </FiltersContainer>

      <Grid>
        {filteredAndSortedProdutos.map((product) => (
          <Card key={product.id} onClick={() => onSelectProduct(product)}>
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
                {getStatusLabel(product.status)}
              </StatusTag>
            </CardHeader>

            <CardBody>
              <InfoRow>
                <span className="label">Coleção:</span>
                <span className="value">{product.dadosEstilo.colecaoOrigem || '-'}</span>
              </InfoRow>
              <InfoRow>
                <span className="label">Linha:</span>
                <span className="value">{product.dadosEstilo.linha || '-'}</span>
              </InfoRow>
              {product.status !== 'EM_DESENVOLVIMENTO' && (
                <InfoRow>
                  <span className="label">Preço:</span>
                  <span className="value">
                    {product.dadosCompras.preco ? `R$ ${product.dadosCompras.preco}` : '-'}
                  </span>
                </InfoRow>
              )}
            </CardBody>

            <CardFooter>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={12} />
                Atualizado em {formatDate(product.atualizadoEm)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#e4e7eb' }}>
                {product.status === 'EM_DESENVOLVIMENTO' ? (
                  <><Edit3 size={14} /> Editar Estilo</>
                ) : product.status === 'CADASTRADO_AGUARDANDO_COMPRAS' ? (
                  <><ShoppingBag size={14} /> Preencher Compras</>
                ) : (
                  <><Edit3 size={14} /> Ver Detalhes</>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </Grid>
    </ListContainer>
  );
};

export default ListagemProdutos;


import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { FichaColecao, COLECAO_OPTIONS } from '../types';
import { PanelContainer, FichaCard } from './FichasColecaoPanel.styles';

interface FichasColecaoPanelProps {
  fichasColecao: FichaColecao[];
  onNovaFicha?: () => void;
  onSalvarFicha?: (ficha: FichaColecao) => void;
  onExcluirFicha?: (fichaId: string) => void;
}

const FichasColecaoPanel: React.FC<FichasColecaoPanelProps> = ({
  fichasColecao,
  onNovaFicha,
  onSalvarFicha,
  onExcluirFicha,
}) => {
  const [fichaSelecionada, setFichaSelecionada] = useState<FichaColecao | null>(null);
  const [fichaDraft, setFichaDraft] = useState<FichaColecao | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Abre modal em modo visualização
  const handleAbrirFicha = (ficha: FichaColecao) => {
    setFichaSelecionada(ficha);
    setFichaDraft({ ...ficha });
    setIsEditing(false);
  };

  // Ativa modo edição
  const handleAtivEdicao = () => {
    setIsEditing(true);
  };

  const handleSalvarFicha = () => {
    if (!fichaDraft) return;
    if (onSalvarFicha) {
      onSalvarFicha({ ...fichaDraft, atualizadoEm: new Date().toISOString() });
    }
    setFichaSelecionada(null);
    setFichaDraft(null);
  };

  const handleCancelarEdicao = () => {
    setFichaSelecionada(null);
    setFichaDraft(null);
    setIsEditing(false);
  };

  const handleExcluir = () => {
    if (!fichaDraft || !fichaSelecionada) return;
    if (!window.confirm('Tem certeza que deseja excluir esta ficha de coleção?')) return;
    if (onExcluirFicha) {
      onExcluirFicha(fichaSelecionada.id);
    }
    setFichaSelecionada(null);
    setFichaDraft(null);
    setIsEditing(false);
  };

  return (
    <>
      <PanelContainer>
        {/* Cabeçalho com título e botão */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}>
          <h3 style={{
            color: '#e4e7eb',
            fontSize: '0.95rem',
            fontWeight: 700,
            margin: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
          }}>
            Fichas de Coleção
          </h3>

          {onNovaFicha && (
            <button
              type="button"
              onClick={onNovaFicha}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: 'none',
                cursor: 'pointer',
                background: '#23242c',
                color: '#e4e7eb',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#2a2b35';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(229, 24, 45, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#23242c';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              + Nova
            </button>
          )}
        </div>

        {/* Linha separadora */}
        <div style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          margin: '-0.5rem 0 0.5rem 0',
        }} />

        {(!fichasColecao || fichasColecao.length === 0) && (
          <FichaCard style={{
            border: '1.5px dashed rgba(255,255,255,0.13)',
            color: '#888',
            fontSize: 15,
            fontWeight: 500,
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
          }}>
            Nenhuma ficha cadastrada para este produto.
          </FichaCard>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {fichasColecao &&
            fichasColecao.map(ficha => (
              <FichaCard
                key={ficha.id}
                onClick={() => handleAbrirFicha(ficha)}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    background: 'linear-gradient(90deg, #e5182d 60%, #ff3333 100%)',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: 12,
                    borderRadius: 6,
                    padding: '2px 10px',
                    letterSpacing: 0.5,
                    minWidth: 'fit-content',
                  }}>
                    {ficha.colecao || 'Coleção'}
                  </span>
                  <span style={{ color: '#b3b3b3', fontSize: 12, marginLeft: 'auto' }}>
                    {ficha.criadoEm ? new Date(ficha.criadoEm).toLocaleDateString('pt-BR') : ''}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#9ca3af', lineHeight: 1.4 }}>
                  <b>{ficha.comprador || '-'}</b> • {ficha.fornecedor || '-'}
                </div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>
                  Preço: <span style={{ color: '#e5182d', fontWeight: 600 }}>R$ {ficha.precoPlanejado || '-'}</span>
                </div>
              </FichaCard>
            ))}
        </div>
      </PanelContainer>

      {/* Modal Unificado - Visualização/Edição - Renderizado em Portal */}
      {fichaDraft && createPortal(
        <>
          {/* Overlay escuro com glassmorphism */}
          <div
            onClick={() => {
              setFichaSelecionada(null);
              setFichaDraft(null);
              setIsEditing(false);
            }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(18, 20, 28, 0.55)',
              zIndex: 9998,
              animation: 'fadeIn 0.3s ease',
              backdropFilter: 'blur(10px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
              pointerEvents: 'auto',
              transition: 'backdrop-filter 0.3s',
            }}
          />

          {/* Modal Unificado com efeito liquid glass */}
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(26, 29, 39, 0.82)',
              border: '1.5px solid rgba(255,255,255,0.13)',
              borderRadius: 28,
              padding: '3.2rem 2.5rem',
              maxWidth: 1100,
              width: '96vw',
              maxHeight: '80vh',
              overflowY: 'auto',
              zIndex: 9999,
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.55), 0 0 100px rgba(229, 24, 45, 0.13)',
              animation: 'slideUp 0.3s ease',
              pointerEvents: 'auto',
              backdropFilter: 'blur(18px) saturate(1.2)',
              WebkitBackdropFilter: 'blur(18px) saturate(1.2)',
              transition: 'box-shadow 0.25s, border 0.25s, background 0.25s',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.2rem',
            }}
            onClick={e => {
              e.stopPropagation();
              e.preventDefault();
            }}
            onMouseDown={e => {
              e.stopPropagation();
            }}
          >
            {/* Cabeçalho com badge de coleção */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '2.5rem',
              paddingBottom: '1.5rem',
              borderBottom: '2px solid rgba(229, 24, 45, 0.3)',
            }}>
              <span style={{
                background: 'linear-gradient(90deg, #e5182d 60%, #ff3333 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 12,
                borderRadius: 8,
                padding: '6px 14px',
                letterSpacing: 0.8,
                textTransform: 'uppercase',
                boxShadow: '0 4px 12px rgba(229, 24, 45, 0.3)',
              }}>
                {fichaDraft.colecao || 'Coleção'}
              </span>
              <h2 style={{
                color: '#e4e7eb',
                fontSize: '1.5rem',
                fontWeight: 700,
                margin: 0,
              }}>
                {isEditing ? 'Editar Ficha' : 'Visualizar Ficha'}
              </h2>
            </div>

            {/* Grid de campos 3 colunas */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '1.8rem',
              marginBottom: '2.5rem',
            }}>
              {/* Cores */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Cores
                </label>
                <input
                  type="text"
                  value={fichaDraft.cores}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, cores: e.target.value })}
                  placeholder="Ex: Azul, Branco"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                    opacity: isEditing ? 1 : 1,
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Fornecedor */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Fornecedor
                </label>
                <input
                  type="text"
                  value={fichaDraft.fornecedor}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, fornecedor: e.target.value })}
                  placeholder="Fornecedor"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Fabricante */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Fabricante
                </label>
                <input
                  type="text"
                  value={fichaDraft.fabricante}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, fabricante: e.target.value })}
                  placeholder="Fabricante"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Comprador */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Comprador
                </label>
                <input
                  type="text"
                  value={fichaDraft.comprador}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, comprador: e.target.value })}
                  placeholder="Comprador"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Coleção */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Coleção
                </label>
                <select
                  value={fichaDraft.colecao}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, colecao: e.target.value })}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    cursor: isEditing ? 'pointer' : 'default',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  <option value="">Selecione...</option>
                  {COLECAO_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              {/* Preço Planejado */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Preço Planejado
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1.1rem', top: '0.9rem', color: isEditing ? '#e5182d' : '#6b7280', fontWeight: 700, fontSize: 15 }}>R$</span>
                  <input
                    type="number"
                    value={fichaDraft.precoPlanejado}
                    onChange={(e) => setFichaDraft({ ...fichaDraft, precoPlanejado: e.target.value })}
                    placeholder="0.00"
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.1rem 0.9rem 3rem',
                      borderRadius: 11,
                      border: '1.5px solid #23242c',
                      background: isEditing ? '#0f1117' : '#0f1117',
                      color: isEditing ? '#e5182d' : '#6b7280',
                      fontSize: 15,
                      fontWeight: 700,
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      cursor: isEditing ? 'text' : 'default',
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.currentTarget.style.borderColor = '#e5182d';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                      }
                    }}
                    onBlur={(e) => {
                      if (isEditing) {
                        e.currentTarget.style.borderColor = '#23242c';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Preço de Venda */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Preço de Venda
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1.1rem', top: '0.9rem', color: isEditing ? '#e5182d' : '#6b7280', fontWeight: 700, fontSize: 15 }}>R$</span>
                  <input
                    type="number"
                    value={fichaDraft.precoVenda}
                    onChange={(e) => setFichaDraft({ ...fichaDraft, precoVenda: e.target.value })}
                    placeholder="0.00"
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '0.9rem 1.1rem 0.9rem 3rem',
                      borderRadius: 11,
                      border: '1.5px solid #23242c',
                      background: isEditing ? '#0f1117' : '#0f1117',
                      color: isEditing ? '#e5182d' : '#6b7280',
                      fontSize: 15,
                      fontWeight: 700,
                      transition: 'all 0.2s ease',
                      boxSizing: 'border-box',
                      cursor: isEditing ? 'text' : 'default',
                    }}
                    onFocus={(e) => {
                      if (isEditing) {
                        e.currentTarget.style.borderColor = '#e5182d';
                        e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                      }
                    }}
                    onBlur={(e) => {
                      if (isEditing) {
                        e.currentTarget.style.borderColor = '#23242c';
                        e.currentTarget.style.boxShadow = 'none';
                      }
                    }}
                  />
                </div>
              </div>

              {/* Cluster */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Cluster
                </label>
                <input
                  type="text"
                  value={fichaDraft.cluster}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, cluster: e.target.value })}
                  placeholder="Ex: Sul, Sudeste"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Cartela de Cor */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Cartela de Cor
                </label>
                <input
                  type="text"
                  value={fichaDraft.cartelaCor}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, cartelaCor: e.target.value })}
                  placeholder="Cartela"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Nacional/Importado */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Nacional/Importado
                </label>
                <input
                  type="text"
                  value={fichaDraft.nacionalImportado}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, nacionalImportado: e.target.value })}
                  placeholder="Nacional ou Importado"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Pirâmide */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Pirâmide
                </label>
                <input
                  type="text"
                  value={fichaDraft.piramide}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, piramide: e.target.value })}
                  placeholder="Pirâmide"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Campanha */}
              <div>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Campanha
                </label>
                <input
                  type="text"
                  value={fichaDraft.campanha}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, campanha: e.target.value })}
                  placeholder="Campanha"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Categorias - Full Width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Categorias
                </label>
                <input
                  type="text"
                  value={fichaDraft.categorias.join(', ')}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, categorias: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Ex: Premium, Camisa"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.9rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>

              {/* Observações - Full Width */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ color: '#9ca3af', fontSize: 11, fontWeight: 700, display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                  Observações
                </label>
                <textarea
                  value={fichaDraft.observacoes}
                  onChange={(e) => setFichaDraft({ ...fichaDraft, observacoes: e.target.value })}
                  placeholder="Observações da ficha"
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '1rem 1.1rem',
                    borderRadius: 11,
                    border: '1.5px solid #23242c',
                    background: isEditing ? '#0f1117' : '#0f1117',
                    color: isEditing ? '#e4e7eb' : '#6b7280',
                    fontSize: 15,
                    fontWeight: 500,
                    minHeight: 120,
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    transition: 'all 0.2s ease',
                    boxSizing: 'border-box',
                    cursor: isEditing ? 'text' : 'default',
                  }}
                  onFocus={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#e5182d';
                      e.currentTarget.style.boxShadow = '0 0 0 4px rgba(229, 24, 45, 0.22)';
                    }
                  }}
                  onBlur={(e) => {
                    if (isEditing) {
                      e.currentTarget.style.borderColor = '#23242c';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                />
              </div>
            </div>

            {/* Botões inteligentes - Mudam conforme o estado */}
            <div style={{
              display: 'flex',
              gap: '1.2rem',
              justifyContent: 'flex-end',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '2.5rem',
            }}>
              {!isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setFichaSelecionada(null);
                      setFichaDraft(null);
                      setIsEditing(false);
                    }}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '11px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      background: '#23242c',
                      color: '#e4e7eb',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2a2b35';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#23242c';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Fechar
                  </button>

                  <button
                    type="button"
                    onClick={handleAtivEdicao}
                    style={{
                      padding: '1rem 2.5rem',
                      borderRadius: '11px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      background: 'linear-gradient(90deg, #e5182d 60%, #ff3333 100%)',
                      color: '#fff',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 6px 16px rgba(229, 24, 45, 0.35)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(229, 24, 45, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(229, 24, 45, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Editar Ficha
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFichaDraft(fichaSelecionada);
                    }}
                    style={{
                      padding: '1rem 2rem',
                      borderRadius: '11px',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      background: '#23242c',
                      color: '#e4e7eb',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2a2b35';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#23242c';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Cancelar
                  </button>

                  {fichaSelecionada && (
                    <button
                      type="button"
                      onClick={handleExcluir}
                      style={{
                        padding: '1rem 2rem',
                        borderRadius: '11px',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        border: 'none',
                        cursor: 'pointer',
                        background: '#7f1d1d',
                        color: '#fecaca',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#991b1b';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(127, 29, 29, 0.4)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#7f1d1d';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      Excluir
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleSalvarFicha}
                    style={{
                      padding: '1rem 2.5rem',
                      borderRadius: '11px',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: 'none',
                      cursor: 'pointer',
                      background: 'linear-gradient(90deg, #e5182d 60%, #ff3333 100%)',
                      color: '#fff',
                      transition: 'all 0.2s ease',
                      boxShadow: '0 6px 16px rgba(229, 24, 45, 0.35)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(229, 24, 45, 0.5)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 6px 16px rgba(229, 24, 45, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Salvar Ficha
                  </button>
                </>
              )}
            </div>
          </div>

          <style>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }

            @keyframes slideUp {
              from {
                opacity: 0;
                transform: translate(-50%, -48%);
              }
              to {
                opacity: 1;
                transform: translate(-50%, -50%);
              }
            }

            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background: transparent;
            }

            ::-webkit-scrollbar-thumb {
              background: rgba(229, 24, 45, 0.3);
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: rgba(229, 24, 45, 0.5);
            }

            input:disabled, textarea:disabled, select:disabled {
              opacity: 0.7;
            }
          `}</style>
        </>,
        document.body
      )}
    </>
  );
};

export default FichasColecaoPanel;

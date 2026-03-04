import React, { useState, useCallback, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import {
  UserRole, FormData, DadosEstilo, DadosCompras,
  AIValidationResult, INITIAL_FORM_DATA,
} from './types';
import { validarEstilo, validarCompras, parseDescricaoIA } from './services/api';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import EstiloForm from './components/EstiloForm';
import ComprasForm from './components/ComprasForm';
import ListagemProdutos from './components/ListagemProdutos';
import AIPanel from './components/AIPanel';
import BottomBar from './components/BottomBar';
import {
  AppContainer, MainContent, FormArea, PanelArea, Footer,
  DescriptionOverlay, DescriptionCard, DescriptionCardTitle,
  DescriptionCardSubtitle, DescriptionCardSkip, DescriptionButtonGroup,
} from './App.styles';
import { AITextArea, AIParseButton, TypingIndicator } from './components/AIPanel/Panel.styles';
import { Zap, FileText } from 'react-feather';

const INITIAL_VALIDATION: AIValidationResult = {
  score: 0,
  alertas: [],
  sugestoes: ['Preencha os campos para receber sugestões da IA.'],
  checklist: [],
  camposPreenchidos: 0,
  totalCampos: 11,
};

const MOCK_PRODUCTS: FormData[] = [
  {
    id: 'PROD-1001',
    dadosEstilo: {
      ...INITIAL_FORM_DATA.dadosEstilo,
      grupo: 'Camisas',
      subgrupo: 'Manga Longa',
      nomeProduto: 'Camisa Social Slim Fit',
      linha: 'Social',
      colecao: 'Inverno 2026',
    },
    dadosCompras: { ...INITIAL_FORM_DATA.dadosCompras },
    status: 'EM_DESENVOLVIMENTO',
    criadoEm: new Date(Date.now() - 86400000 * 2).toISOString(),
    atualizadoEm: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: 'PROD-1002',
    dadosEstilo: {
      ...INITIAL_FORM_DATA.dadosEstilo,
      grupo: 'Calças',
      subgrupo: 'Jeans',
      nomeProduto: 'Calça Jeans Skinny',
      linha: 'Casual',
      colecao: 'Verão 2026',
      modelagem: 'Skinny',
      descricao: 'Calça jeans com elastano e lavagem escura.',
      conceito: 'Conforto para o dia a dia.',
      observacoes: 'Atenção aos aviamentos.',
      coresSugeridas: 'Azul Escuro, Preto',
    },
    dadosCompras: { ...INITIAL_FORM_DATA.dadosCompras },
    status: 'CADASTRADO_AGUARDANDO_COMPRAS',
    criadoEm: new Date(Date.now() - 86400000 * 5).toISOString(),
    atualizadoEm: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'PROD-1003',
    dadosEstilo: {
      ...INITIAL_FORM_DATA.dadosEstilo,
      grupo: 'Acessórios',
      subgrupo: 'Cintos',
      nomeProduto: 'Cinto de Couro Reversível',
      linha: 'Premium',
      colecao: 'Inverno 2026',
    },
    dadosCompras: {
      ...INITIAL_FORM_DATA.dadosCompras,
      comprador: 'João Silva',
      fornecedor: 'Couros & Cia',
      fabricante: 'Couros & Cia',
      custo: '45.00',
      preco: '149.90',
      faixaPreco: 'Básico (R$100-199)',
      margem: '70',
      quantidade: '500',
      coresAtivas: 'Preto/Marrom',
      categoriaFinal: 'Acessório',
    },
    status: 'FINALIZADO',
    criadoEm: new Date(Date.now() - 86400000 * 10).toISOString(),
    atualizadoEm: new Date(Date.now() - 86400000 * 2).toISOString(),
  }
];

function App() {
  // ========================
  // ESTADO CENTRALIZADO
  // ========================
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState<FormData>({ ...INITIAL_FORM_DATA });
  const [validation, setValidation] = useState<AIValidationResult>(INITIAL_VALIDATION);
  const [isValidating, setIsValidating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [products, setProducts] = useState<FormData[]>(MOCK_PRODUCTS);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [showDescriptionCard, setShowDescriptionCard] = useState(false);
  const [descriptionCardExiting, setDescriptionCardExiting] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');

  // Helper: insere ou atualiza produto na lista local
  const upsertProduct = useCallback((product: FormData) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = product;
        return copy;
      }
      return [...prev, product];
    });
  }, []);

  // ========================
  // FUNÇÃO GENÉRICA DE ATUALIZAÇÃO
  // ========================
  const handleChange = useCallback((
    section: 'dadosEstilo' | 'dadosCompras',
    field: keyof DadosEstilo | keyof DadosCompras,
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }, []);

  // ========================
  // AÇÕES - ESTILO
  // ========================
  const handleValidarIAEstilo = useCallback(async () => {
    setIsValidating(true);
    const result = await validarEstilo(formData);
    setValidation(result);
    setIsValidating(false);
  }, [formData]);

  const handleEnviarCompras = useCallback(() => {
    if (!formData.dadosEstilo.grupo || !formData.dadosEstilo.subgrupo || !formData.dadosEstilo.nomeProduto) {
      alert('Preencha pelo menos Grupo, Subgrupo e Nome do Produto antes de enviar.');
      return;
    }

    const updated: FormData = {
      ...formData,
      status: 'CADASTRADO_AGUARDANDO_COMPRAS',
      id: formData.id || 'PROD-' + Date.now(),
      criadoEm: formData.criadoEm || new Date().toISOString(),
      atualizadoEm: new Date().toISOString(),
    };
    setFormData(updated);
    upsertProduct(updated);
    alert('Produto enviado para Compras com sucesso! Status: Aguardando Compras');
  }, [formData, upsertProduct]);

  const handleCancelarEstilo = useCallback(() => {
    if (window.confirm('Deseja cancelar? Os dados não salvos serão perdidos.')) {
      setFormData({ ...INITIAL_FORM_DATA });
      setValidation(INITIAL_VALIDATION);
    }
  }, []);

  // ========================
  // AÇÕES - COMPRAS
  // ========================
  const handleValidarIACompras = useCallback(async () => {
    setIsValidating(true);
    const result = await validarCompras(formData);
    setValidation(result);
    setIsValidating(false);
  }, [formData]);

  const handleFinalizarCompras = useCallback(() => {
    const d = formData.dadosCompras;
    if (!d.comprador || !d.fornecedor || !d.custo || !d.preco) {
      alert('Preencha ao menos Comprador, Fornecedor, Custo e Preço para finalizar.');
      return;
    }

    const updated: FormData = {
      ...formData,
      status: 'FINALIZADO',
      atualizadoEm: new Date().toISOString(),
    };
    setFormData(updated);
    upsertProduct(updated);
    alert('Produto finalizado! Pronto para integração PLM / LINX.');
  }, [formData, upsertProduct]);

  // ========================
  // IA - PARSING DE TEXTO LIVRE
  // ========================
  const handleAIDescriptionParse = useCallback(async (texto: string) => {
    setIsParsing(true);
    try {
      const parsed = await parseDescricaoIA(texto);
      setFormData(prev => ({
        ...prev,
        dadosEstilo: {
          ...prev.dadosEstilo,
          ...Object.fromEntries(
            Object.entries(parsed.dadosEstilo).filter(([_, v]) => v !== undefined && v !== '')
          ),
        },
        dadosCompras: {
          ...prev.dadosCompras,
          ...Object.fromEntries(
            Object.entries(parsed.dadosCompras).filter(([_, v]) => v !== undefined && v !== '')
          ),
        },
      }));
      // Anima saída do card e depois remove
      dismissDescriptionCard();
    } finally {
      setIsParsing(false);
    }
  }, []);

  const dismissDescriptionCard = useCallback(() => {
    setDescriptionCardExiting(true);
    setTimeout(() => {
      setShowDescriptionCard(false);
      setDescriptionCardExiting(false);
    }, 500);
  }, []);

  // ========================
  // AÇÕES GERAIS
  // ========================
  const handleLogin = (role: UserRole) => {
    setUserRole(role);
    setCurrentView('list');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('list');
    setFormData({ ...INITIAL_FORM_DATA });
    setValidation(INITIAL_VALIDATION);
  };

  const handleNewProduct = () => {
    setFormData({ ...INITIAL_FORM_DATA });
    setValidation(INITIAL_VALIDATION);
    setShowDescriptionCard(true);
    setDescriptionCardExiting(false);
    setDescriptionText('');
    setCurrentView('form');
  };

  const handleSelectProduct = (product: FormData) => {
    setFormData(product);
    setShowDescriptionCard(false);
    setCurrentView('form');
  };

  // ========================
  // TELA DE LOGIN
  // ========================
  if (!userRole) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoginPage onLogin={handleLogin} />
      </ThemeProvider>
    );
  }

  // ========================
  // TELA PRINCIPAL
  // ========================
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header
          userRole={userRole}
          onLogout={handleLogout}
          onNewProduct={handleNewProduct}
          showBack={currentView === 'form'}
          onBack={() => setCurrentView('list')}
        />

        {currentView === 'list' ? (
          <MainContent style={{ display: 'block' }}>
            <ListagemProdutos
              products={products}
              userRole={userRole}
              onNewProduct={handleNewProduct}
              onSelectProduct={handleSelectProduct}
            />
          </MainContent>
        ) : (
          <>
            <MainContent>
              {/* Overlay card — só aparece para Estilo e enquanto showDescriptionCard */}
              {userRole === 'estilo' && showDescriptionCard && (
            <DescriptionOverlay $exiting={descriptionCardExiting}>
              <DescriptionCard>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 13,
                    background: 'conic-gradient(from 0deg, rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(229, 24, 45))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'spin 4s linear infinite',
                    boxShadow: '0 0 16px rgba(229, 24, 45, 0.35)',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: '#1a1d27',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FileText size={18} color="rgb(229, 24, 45)" />
                    </div>
                  </div>
                  <DescriptionCardTitle>Descreva o Produto</DescriptionCardTitle>
                </div>

                <DescriptionCardSubtitle>
                  Escreva livremente sobre o produto que deseja cadastrar.
                  A IA vai analisar o texto, categorizar automaticamente e preencher
                  todos os campos do formulário para você.
                </DescriptionCardSubtitle>

                <AITextArea
                  value={descriptionText}
                  onChange={(e) => setDescriptionText(e.target.value)}
                  placeholder="Ex: Camisa manga longa social slim fit, coleção inverno 2026, público masculino, tons de azul marinho, tecido em algodão egípcio com acabamento premium..."
                  style={{ minHeight: 130, fontSize: '0.92rem' }}
                />

                {isParsing ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                    <TypingIndicator>
                      <span /><span /><span />
                    </TypingIndicator>
                    <span style={{ fontSize: '0.88rem', color: 'rgb(229, 24, 45)', fontWeight: 600, fontStyle: 'italic' }}>
                      Analisando com IA...
                    </span>
                  </div>
                ) : (
                  <DescriptionButtonGroup>
                    <AIParseButton
                      disabled={!descriptionText.trim()}
                      onClick={() => handleAIDescriptionParse(descriptionText)}
                      style={{ width: '100%', maxWidth: 360 }}
                    >
                      <span className="siri-shine" />
                      <Zap size={18} />
                      Preencher com IA
                    </AIParseButton>

                    <DescriptionCardSkip onClick={dismissDescriptionCard}>
                      Pular e preencher manualmente
                    </DescriptionCardSkip>
                  </DescriptionButtonGroup>
                )}
              </DescriptionCard>
            </DescriptionOverlay>
          )}

          <FormArea $blurred={userRole === 'estilo' && showDescriptionCard}>
            {userRole === 'estilo' && (
              <EstiloForm
                formData={formData}
                onChange={handleChange}
                onValidarIA={handleValidarIAEstilo}
                onEnviarCompras={handleEnviarCompras}
                onCancelar={handleCancelarEstilo}
                isValidating={isValidating}
              />
            )}

            {userRole === 'compras' && (
              <ComprasForm
                formData={formData}
                onChange={handleChange}
                onValidarIA={handleValidarIACompras}
                onFinalizar={handleFinalizarCompras}
                isValidating={isValidating}
              />
            )}
          </FormArea>

          <PanelArea $blurred={userRole === 'estilo' && showDescriptionCard}>
            <AIPanel
              validation={validation}
              role={userRole}
              onAIDescriptionParse={showDescriptionCard ? undefined : handleAIDescriptionParse}
              isParsing={isParsing}
            />
          </PanelArea>
        </MainContent>

        <Footer>
          <BottomBar
            score={validation.score}
            camposPreenchidos={validation.camposPreenchidos}
            totalCampos={validation.totalCampos}
            userRole={userRole}
          />
        </Footer>
        </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

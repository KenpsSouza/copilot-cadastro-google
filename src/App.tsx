import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, theme } from './styles/GlobalStyles';
import {
  UserRole, FormData, DadosEstilo, DadosCompras, FichaColecao,
  AIValidationResult, INITIAL_FORM_DATA, ALL_ESTILO_FIELDS, INITIAL_DADOS_COMPRAS
} from './types';
import { validarEstilo, validarCompras } from './services/api';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import EstiloForm from './components/EstiloForm';
import ComprasForm from './components/ComprasForm';
import ListagemProdutos from './components/ListagemProdutos';
import AIPanel from './components/AIPanel';
import FichasColecaoPanel from './components/FichasColecaoPanel';
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
  totalCampos: ALL_ESTILO_FIELDS.length,
};

const countFilledFields = (data: Record<string, any>): number => {
  return Object.values(data).filter(value => {
    if (typeof value === 'string') return value.trim() !== '';
    if (Array.isArray(value)) return value.length > 0;
    return value !== null && value !== undefined;
  }).length;
};

function App() {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState<FormData>({ ...INITIAL_FORM_DATA });
  const [validation, setValidation] = useState<AIValidationResult>(INITIAL_VALIDATION);
  const [isValidating, setIsValidating] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [products, setProducts] = useState<FormData[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'form'>('list');
  const [showDescriptionCard, setShowDescriptionCard] = useState(false);
  const [descriptionCardExiting, setDescriptionCardExiting] = useState(false);
  const [descriptionText, setDescriptionText] = useState('');

  useEffect(() => {
    const data = userRole === 'estilo' ? formData.dadosEstilo : formData.dadosCompras;
    const total = userRole === 'estilo' ? ALL_ESTILO_FIELDS.length : Object.keys(INITIAL_DADOS_COMPRAS).length;
    const preenchidos = countFilledFields(data);
    const score = total > 0 ? Math.round((preenchidos / total) * 100) : 0;
    setValidation(prev => ({ ...prev, camposPreenchidos: preenchidos, totalCampos: total, score: score }));
  }, [formData, userRole]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const saveProduct = useCallback(async (product: FormData) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      if (!response.ok) throw new Error('Failed to save product on the server.');
      return await response.json();
    } catch (error) {
      console.error("Save product error:", error);
      alert('Erro ao salvar o produto no servidor. Verifique o console.');
      return null;
    }
  }, []);

  const upsertProduct = useCallback(async (product: FormData) => {
    setProducts(prev => {
      const idx = prev.findIndex(p => p.id === product.id);
      if (idx >= 0) { const copy = [...prev]; copy[idx] = product; return copy; }
      return [...prev, product];
    });
    await saveProduct(product);
  }, [saveProduct]);

  const handleChange = useCallback((section: 'dadosEstilo' | 'dadosCompras', field: keyof DadosEstilo | keyof DadosCompras | '__fichasColecao', value: any) => {
    if (section === 'dadosCompras' && field === '__fichasColecao') {
      setFormData(prev => ({ ...prev, fichasColecao: value }));
      return;
    }
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));
  }, []);

  const handleAIDescriptionParse = useCallback(async (texto: string) => {
    setIsParsing(true);
    try {
      const response = await fetch('/api/webhook/case_produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ texto }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erro de comunicação com o servidor.' }));
        throw new Error(errorData.error || 'Resposta inválida do servidor de IA.');
      }

      const parsed = await response.json();
      
      setFormData(prev => ({
        ...prev,
        dadosEstilo: { ...prev.dadosEstilo, ...parsed.dadosEstilo },
        dadosCompras: { ...prev.dadosCompras, ...parsed.dadosCompras },
      }));
      
      dismissDescriptionCard();
    } catch (error: any) {
      alert(`Falha na Análise da IA:\n\n${error.message}`);
    } finally {
      setIsParsing(false);
    }
  }, []);

  const dismissDescriptionCard = useCallback(() => {
    setDescriptionCardExiting(true);
    setTimeout(() => { setShowDescriptionCard(false); setDescriptionCardExiting(false); }, 500);
  }, []);

  const handleValidarIAEstilo = useCallback(async () => {
    setIsValidating(true);
    const result = await validarEstilo(formData);
    setValidation(result);
    setIsValidating(false);
  }, [formData]);

  const handleEnviarCompras = useCallback(async () => {
    if (!formData.dadosEstilo.grupo || !formData.dadosEstilo.subgrupo || !formData.dadosEstilo.bu || !formData.dadosEstilo.griffe) {
      alert('Preencha pelo menos BU, Griffe, Grupo e Subgrupo antes de enviar.');
      return;
    }
    const updated: FormData = { 
      ...formData, 
      status: 'ESTILO_CONCLUIDO', 
      id: formData.id || 'PROD-' + Date.now(), 
      criadoEm: formData.criadoEm || new Date().toISOString(), 
      atualizadoEm: new Date().toISOString() 
    };
    setFormData(updated);
    await upsertProduct(updated);
    alert('Produto enviado para Compras com sucesso! Status: Aguardando Compras');
    setCurrentView('list');
  }, [formData, upsertProduct]);

  const handleCancelarEstilo = useCallback(() => {
    if (window.confirm('Deseja cancelar? Os dados não salvos serão perdidos.')) {
      setFormData({ ...INITIAL_FORM_DATA });
      setValidation(INITIAL_VALIDATION);
      setCurrentView('list');
    }
  }, []);

  const handleValidarIACompras = useCallback(async () => {
    setIsValidating(true);
    const result = await validarCompras(formData);
    setValidation(result);
    setIsValidating(false);
  }, [formData]);

  const handleFinalizarCompras = useCallback(async () => {
    if (window.confirm('Tem certeza que deseja finalizar o cadastro deste produto? Esta ação não poderá ser desfeita.')) {
      const updated: FormData = { 
        ...formData, 
        status: 'FINALIZADO', 
        atualizadoEm: new Date().toISOString() 
      };
      setFormData(updated);
      await upsertProduct(updated);
      alert('Produto finalizado com sucesso!');
      setCurrentView('list');
    }
  }, [formData, upsertProduct]);
  

  const handleSalvarFichaPainel = useCallback((fichaAtualizada: FichaColecao) => {
    const fichasAtualizadas = formData.fichasColecao ? formData.fichasColecao.map(f => f.id === fichaAtualizada.id ? fichaAtualizada : f) : [fichaAtualizada];
    setFormData(prev => ({ ...prev, fichasColecao: fichasAtualizadas, atualizadoEm: new Date().toISOString() }));
  }, [formData]);

  const handleExcluirFichaPainel = useCallback((fichaId: string) => {
    const fichasAtualizadas = formData.fichasColecao ? formData.fichasColecao.filter(f => f.id !== fichaId) : [];
    setFormData(prev => ({ ...prev, fichasColecao: fichasAtualizadas, atualizadoEm: new Date().toISOString() }));
  }, [formData]);

  const handleLogin = (role: UserRole) => { setUserRole(role); setCurrentView('list'); };
  const handleLogout = () => { setUserRole(null); setCurrentView('list'); setFormData({ ...INITIAL_FORM_DATA }); setValidation(INITIAL_VALIDATION); };
  const handleNewProduct = () => { setFormData({ ...INITIAL_FORM_DATA }); setValidation(INITIAL_VALIDATION); setShowDescriptionCard(true); setDescriptionCardExiting(false); setDescriptionText(''); setCurrentView('form'); };
  const handleSelectProduct = (product: FormData) => { setFormData(product); setShowDescriptionCard(false); setCurrentView('form'); };
  const handleDeleteProduct = useCallback(async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.')) {
      try {
        const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Falha ao excluir o produto no servidor.');
        setProducts(prev => prev.filter(p => p.id !== productId));
      } catch (error) {
        console.error("Delete product error:", error);
        alert('Erro ao excluir o produto.');
      }
    }
  }, []);

  if (!userRole) return <ThemeProvider theme={theme}><GlobalStyles /><LoginPage onLogin={handleLogin} /></ThemeProvider>;

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <Header userRole={userRole} onLogout={handleLogout} onNewProduct={handleNewProduct} showBack={currentView === 'form'} onBack={() => setCurrentView('list')} />
        {currentView === 'list' ? (
          <MainContent style={{ display: 'block' }}><ListagemProdutos products={products} userRole={userRole} onNewProduct={handleNewProduct} onSelectProduct={handleSelectProduct} onDeleteProduct={handleDeleteProduct} /></MainContent>
        ) : (
          <>
            <MainContent>
              {userRole === 'estilo' && showDescriptionCard && (
                <DescriptionOverlay $exiting={descriptionCardExiting}>
                  <DescriptionCard>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 42, height: 42, borderRadius: 13, background: 'conic-gradient(from 0deg, rgb(229, 24, 45), rgb(255, 51, 51), rgb(179, 0, 21), rgb(229, 24, 45))', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'spin 4s linear infinite', boxShadow: '0 0 16px rgba(229, 24, 45, 0.35)' }}><div style={{ width: 36, height: 36, borderRadius: 10, background: '#1a1d27', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={18} color="rgb(229, 24, 45)" /></div></div>
                      <DescriptionCardTitle>Descreva o Produto</DescriptionCardTitle>
                    </div>
                    <DescriptionCardSubtitle>Escreva livremente sobre o produto que deseja cadastrar. A IA vai analisar o texto, categorizar automaticamente e preencher todos os campos do formulário para você.</DescriptionCardSubtitle>
                    <AITextArea value={descriptionText} onChange={(e) => setDescriptionText(e.target.value)} placeholder="Ex: Camisa manga longa social slim fit, coleção inverno 2026, público masculino, tons de azul marinho, tecido em algodão egípcio com acabamento premium..." style={{ minHeight: 130, fontSize: '0.92rem' }} />
                    {isParsing ? (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                        <TypingIndicator><span /><span /><span /></TypingIndicator>
                        <span style={{ fontSize: '0.88rem', color: 'rgb(229, 24, 45)', fontWeight: 600, fontStyle: 'italic' }}>Analisando com IA...</span>
                      </div>
                    ) : (
                      <DescriptionButtonGroup>
                        <AIParseButton disabled={!descriptionText.trim()} onClick={() => handleAIDescriptionParse(descriptionText)} style={{ width: '100%', maxWidth: 360 }}><span className="siri-shine" /><Zap size={18} /> Preencher com IA</AIParseButton>
                        <DescriptionCardSkip onClick={dismissDescriptionCard}>Pular e preencher manualmente</DescriptionCardSkip>
                      </DescriptionButtonGroup>
                    )}
                  </DescriptionCard>
                </DescriptionOverlay>
              )}
              <FormArea $blurred={userRole === 'estilo' && showDescriptionCard}>
                {userRole === 'estilo' && <EstiloForm formData={formData} onChange={handleChange} onValidarIA={handleValidarIAEstilo} onEnviarCompras={handleEnviarCompras} onCancelar={handleCancelarEstilo} isValidating={isValidating} />}
                {userRole === 'compras' && <ComprasForm formData={formData} onChange={handleChange} onValidarIA={handleValidarIACompras} onFinalizar={handleFinalizarCompras} isValidating={isValidating} />}
              </FormArea>
              <PanelArea $blurred={userRole === 'estilo' && showDescriptionCard}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  {userRole === 'compras' && <FichasColecaoPanel fichasColecao={formData.fichasColecao || []} onNovaFicha={() => { window.dispatchEvent(new CustomEvent('novaFichaColecao')); }} onSalvarFicha={handleSalvarFichaPainel} onExcluirFicha={handleExcluirFichaPainel} />}
                  <AIPanel validation={validation} role={userRole} onAIDescriptionParse={showDescriptionCard ? undefined : handleAIDescriptionParse} isParsing={isParsing} />
                </div>
              </PanelArea>
            </MainContent>
            <Footer>
              <BottomBar score={validation.score} camposPreenchidos={validation.camposPreenchidos} totalCampos={validation.totalCampos} userRole={userRole} />
            </Footer>
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

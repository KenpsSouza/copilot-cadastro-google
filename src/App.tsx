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
    id: 'PROD-2001',
    dadosEstilo: {
      bu: 'Aramis',
      griffe: 'Aramis',
      linha: 'Casual',
      sexo: 'Masculino',
      colecaoOrigem: 'Verão 2026',
      referencia: 'REF-2026-9876',
      refLacreFornecedor: 'LC-BR-1234',
      modeloAra: 'ARA-CJ-301',
      modelo: 'MOD-301-SK',
      grade: '38-40-42-44-46',
      grupo: 'JEANS',
      subgrupo: 'Calça Jeans',
      modelagem: 'Slim Fit',
      baseMP: 'Denim Premium 11oz',
      tipo: 'Fashion',
      selo: 'Nenhum',
      beneficiamento: 'Stone Wash',
      collab: 'Nenhum',
      fabricanteOriginal: 'Denim Brasil Indústria',
      fornecedorOriginal: 'Tecelagem Nacional',
      piramideOriginal: 'Core',
      produtoOrigem: 'Nacional',
      tipoAmostra: 'Proto',
      tamanhoPiloto: '42',
      restricaoLavagem: 'Não lavar à máquina',
      gerente: 'Paulo Souza',
      estilista: 'Ana Paula Lima',
      analista: 'Carlos Eduardo',
      corPrincipal: 'Azul Médio',
      continuidade: 'Não',
      composicao: '98% Algodão, 2% Elastano',
      composicaoTraducao: '98% Cotton, 2% Elastane',
      ncm: '6203.42.00',
      descricaoFiscal: 'Calça jeans masculina, tecido denim, lavagem stone',
      materialPrincipal: 'Denim Premium',
      medidasProdutoAcabado: '38: Cintura 80cm, Comprimento 104cm | 40: Cintura 84cm, Comprimento 106cm',
      coresModelo: 'Azul Médio, Azul Escuro',
      passadoria: 'Ferro morno',
      lavagem: 'Lavagem normal',
      alvejamento: 'Permitido',
      limpeza: 'Limpeza a seco permitida',
      secadora: 'Secar na secadora',
      secagem: 'Secar na sombra',
      tecidos: 'Denim Premium 11oz - Tecelagem Nacional (ref. TN-DEN11)',
      aviamentos: 'Botão metálico personalizado | Zíper YKK | Etiqueta couro ecológico',
      nomeProduto: 'Calça Jeans Slim Stone Wash',
      descricao: 'Calça jeans masculina slim fit, lavagem stone, toque macio, elastano para conforto, acabamento moderno.',
      conceito: 'Inspirada no lifestyle urbano, une conforto e estilo para o dia a dia.',
      observacoes: 'Atenção ao encolhimento pós-lavagem. Garantir costura reforçada no entrepernas.',
      pedidoAmostras: '2 amostras tamanho 42: 1x Azul Médio, 1x Azul Escuro. Prazo: 10 dias úteis.',
    },
    dadosCompras: {
      comprador: 'Fernanda Ribeiro',
      fornecedor: 'Tecelagem Nacional',
      fabricante: 'Denim Brasil Indústria',
      custo: '59.90',
      preco: '199.90',
      faixaPreco: 'Intermediário (R$200-399)',
      margem: '70',
      quantidade: '800',
      coresAtivas: 'Azul Médio, Azul Escuro',
      categoriaFinal: 'Fashion',
    },
    fichasColecao: [
      {
        id: 'FICHA-002',
        colecao: 'Verão 2026',
        cores: 'Azul Médio, Azul Escuro',
        fornecedor: 'Tecelagem Nacional',
        fabricante: 'Denim Brasil Indústria',
        comprador: 'Fernanda Ribeiro',
        precoPlanejado: '159.90',
        precoVenda: '199.90',
        cluster: 'Sudeste, Centro-Oeste',
        categorias: ['Fashion', 'Jeans'],
        cartelaCor: 'Cartela Verão 2026',
        nacionalImportado: 'Nacional',
        piramide: 'Core',
        campanha: 'Lançamento Verão',
        observacoes: 'Produto estratégico para volume. Foco em PDVs multimarcas.',
        criadoEm: new Date(Date.now() - 86400000 * 10).toISOString(),
        atualizadoEm: new Date(Date.now() - 86400000 * 2).toISOString(),
      }
    ],
    status: 'FINALIZADO',
    criadoEm: new Date(Date.now() - 86400000 * 10).toISOString(),
    atualizadoEm: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'PROD-1002',
    dadosEstilo: {
      ...INITIAL_FORM_DATA.dadosEstilo,
      bu: 'Aramis',
      griffe: 'Aramis',
      grupo: 'JEANS',
      subgrupo: 'Calça Jeans',
      nomeProduto: 'Calça Jeans Skinny',
      linha: 'Casual',
      colecaoOrigem: 'Verão 2026',
      modelagem: 'Slim Fit',
      descricao: 'Calça jeans com elastano e lavagem escura.',
      conceito: 'Conforto para o dia a dia.',
      observacoes: 'Atenção aos aviamentos.',
      coresModelo: 'Azul Escuro, Preto',
    },
    dadosCompras: { ...INITIAL_FORM_DATA.dadosCompras },
    fichasColecao: [],
    status: 'CADASTRADO_AGUARDANDO_COMPRAS',
    criadoEm: new Date(Date.now() - 86400000 * 5).toISOString(),
    atualizadoEm: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
  {
    id: 'PROD-1004',
    dadosEstilo: {
      bu: 'Aramis',
      griffe: 'Aramis',
      linha: 'Social',
      sexo: 'Masculino',
      colecaoOrigem: 'Inverno 2026',
      referencia: 'REF-2026-4521',
      refLacreFornecedor: 'LC-BR-7890',
      modeloAra: 'ARA-CS-112',
      modelo: 'MOD-112-SL',
      grade: 'PP-P-M-G-GG',
      grupo: 'CAMISA',
      subgrupo: 'Manga Longa',
      modelagem: 'Slim Fit',
      baseMP: 'Algodão Egípcio 120 fios',
      tipo: 'Premium',
      selo: 'Sustentável',
      beneficiamento: 'Amaciamento',
      collab: 'Nenhum',
      fabricanteOriginal: 'Têxtil Brasileira LTDA',
      fornecedorOriginal: 'Fios & Tramas S.A.',
      piramideOriginal: 'Premium',
      produtoOrigem: 'Nacional',
      tipoAmostra: 'PP Sample',
      tamanhoPiloto: 'M',
      restricaoLavagem: 'Água fria',
      gerente: 'Maria Fernanda Costa',
      estilista: 'Lucas Andrade',
      analista: 'Beatriz Oliveira',
      corPrincipal: 'Azul Marinho',
      continuidade: 'Sim',
      composicao: '97% Algodão Egípcio, 3% Elastano',
      composicaoTraducao: '97% Egyptian Cotton, 3% Elastane',
      ncm: '6205.20.00',
      descricaoFiscal: 'Camisa social masculina de algodão, manga longa',
      materialPrincipal: 'Algodão Egípcio 120 fios',
      medidasProdutoAcabado: 'P: Tórax 98cm, Comprimento 72cm | M: Tórax 104cm, Comprimento 74cm | G: Tórax 110cm, Comprimento 76cm',
      coresModelo: 'Azul Marinho, Branco, Azul Claro, Rosa Antigo',
      passadoria: 'Ferro morno',
      lavagem: 'Lavagem delicada',
      alvejamento: 'Não alvejante',
      limpeza: 'Limpeza a seco permitida',
      secadora: 'Secadora temperatura baixa',
      secagem: 'Secar na sombra',
      tecidos: 'Algodão Egípcio 120 fios - Fios & Tramas (ref. FT-EG120) | Entretela termocolante leve - Adesitex (ref. AD-TC01)',
      aviamentos: 'Botões madrepérola 18L (x8) - Botões Premium BR | Linha 120 algodão mercerizado | Etiqueta tecida logo Aramis | Tag cartão com composição',
      nomeProduto: 'Camisa Social Slim Algodão Egípcio Premium',
      descricao: 'Camisa social manga longa em algodão egípcio 120 fios com toque sedoso. Colarinho semi-spread com barbatana removível. Punho duplo abotoável. Acabamento interno com fita de reforço. Costuras reforçadas com pespontos de 7 pontos/cm.',
      conceito: 'Inspiração na alfaiataria italiana contemporânea. Peça atemporal que une sofisticação clássica com o conforto moderno. Pensada para o homem que transita entre reuniões executivas e jantares elegantes sem perder a elegância.',
      observacoes: 'Atenção ao alinhamento das listras na costura lateral. Botão reserva na etiqueta interna. Exigir certificado OEKO-TEX do tecido.',
      pedidoAmostras: '3 amostras em tamanho M: 1x Azul Marinho, 1x Branco, 1x Rosa Antigo. Prazo: 15 dias úteis.',
    },
    dadosCompras: {
      comprador: 'Ricardo Mendes',
      fornecedor: 'Fios & Tramas S.A.',
      fabricante: 'Têxtil Brasileira LTDA',
      custo: '89.50',
      preco: '449.90',
      faixaPreco: 'Premium (R$400-699)',
      margem: '80',
      quantidade: '1200',
      coresAtivas: 'Azul Marinho, Branco, Azul Claro, Rosa Antigo',
      categoriaFinal: 'Premium',
    },
    fichasColecao: [
      {
        id: 'FICHA-001',
        colecao: 'Inverno 2026',
        cores: 'Azul Marinho, Branco, Rosa Antigo',
        fornecedor: 'Fios & Tramas S.A.',
        fabricante: 'Têxtil Brasileira LTDA',
        comprador: 'Ricardo Mendes',
        precoPlanejado: '399.90',
        precoVenda: '449.90',
        cluster: 'Sul, Sudeste',
        categorias: ['Premium', 'Camisa'],
        cartelaCor: 'Cartela Inverno 2026',
        nacionalImportado: 'Nacional',
        piramide: 'Premium',
        campanha: 'Lançamento Inverno',
        observacoes: 'Produto destaque da coleção. Foco em PDVs premium.',
        criadoEm: new Date(Date.now() - 86400000 * 15).toISOString(),
        atualizadoEm: new Date(Date.now() - 86400000 * 1).toISOString(),
      }
    ],
    status: 'FINALIZADO',
    criadoEm: new Date(Date.now() - 86400000 * 15).toISOString(),
    atualizadoEm: new Date(Date.now() - 86400000 * 1).toISOString(),
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
    field: keyof DadosEstilo | keyof DadosCompras | '__fichasColecao',
    value: any
  ) => {
    if (section === 'dadosCompras' && field === '__fichasColecao') {
      setFormData(prev => ({ ...prev, fichasColecao: value }));
      return;
    }
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
    if (!formData.dadosEstilo.grupo || !formData.dadosEstilo.subgrupo || !formData.dadosEstilo.bu || !formData.dadosEstilo.griffe) {
      alert('Preencha pelo menos BU, Griffe, Grupo e Subgrupo antes de enviar.');
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
    const e = formData.dadosEstilo;
    // Checagem básica de obrigatórios
    if (!d.comprador || !d.fornecedor || !d.custo || !d.preco) {
      alert('Preencha ao menos Comprador, Fornecedor, Custo e Preço para finalizar.');
      return;
    }

    // Checa se todos os principais campos de Estilo e Compras estão preenchidos
    const obrigatoriosEstilo = [e.bu, e.griffe, e.linha, e.sexo, e.colecaoOrigem, e.referencia, e.modeloAra, e.modelo, e.grade, e.grupo, e.subgrupo, e.modelagem, e.baseMP, e.tipo, e.nomeProduto];
    const obrigatoriosCompras = [d.comprador, d.fornecedor, d.fabricante, d.custo, d.preco, d.faixaPreco, d.margem, d.quantidade, d.coresAtivas, d.categoriaFinal];
    const todosPreenchidos = obrigatoriosEstilo.every(v => v && v.trim() !== '') && obrigatoriosCompras.every(v => v && v.trim() !== '');

    let novaFicha = null;
    if (todosPreenchidos && (!formData.fichasColecao || formData.fichasColecao.length === 0)) {
      // Gera ficha automaticamente
      novaFicha = {
        id: 'FICHA-' + Date.now(),
        colecao: e.colecaoOrigem,
        cores: e.coresModelo,
        fornecedor: d.fornecedor,
        fabricante: d.fabricante,
        comprador: d.comprador,
        precoPlanejado: d.custo,
        precoVenda: d.preco,
        cluster: '',
        categorias: [d.categoriaFinal, e.grupo],
        cartelaCor: '',
        nacionalImportado: e.produtoOrigem,
        piramide: e.piramideOriginal,
        campanha: '',
        observacoes: '',
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };
    }

    const updated: FormData = {
      ...formData,
      status: 'FINALIZADO',
      atualizadoEm: new Date().toISOString(),
      fichasColecao: novaFicha ? [novaFicha] : formData.fichasColecao,
    };
    setFormData(updated);
    upsertProduct(updated);
    alert('Produto finalizado! Pronto para integração PLM / LINX.' + (novaFicha ? '\nFicha de coleção gerada automaticamente.' : ''));
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

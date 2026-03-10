const fs = require('fs');
const path = require('path');

// Configurações
const DADOS_DIR = path.join(__dirname, 'dados');
const ARQUIVO_PRODUTOS = path.join(DADOS_DIR, 'produtos.json');

// 1. Estrutura Inicial: Criar pasta 'dados' se não existir
if (!fs.existsSync(DADOS_DIR)) {
    fs.mkdirSync(DADOS_DIR);
    console.log('Pasta "dados" criada.');
}

// 2. Cadastro Inicial de Produtos (com dados iniciais)
function inicializarDados() {
    if (!fs.existsSync(ARQUIVO_PRODUTOS)) {
        const produtosIniciais = [
            { id: 1, produto: 'Notebook', preco: 3500.00 },
            { id: 2, produto: 'Mouse', preco: 50.00 }
        ];
        fs.writeFileSync(ARQUIVO_PRODUTOS, JSON.stringify(produtosIniciais, null, 2));
        console.log('Arquivo produtos.json inicializado.');
    }
}

// 3. Leitura de Dados (Síncrona)
function listarProdutos() {
    try {
        const dados = fs.readFileSync(ARQUIVO_PRODUTOS, 'utf8');
        const produtos = JSON.parse(dados);
        console.log('\n--- Catálogo de Produtos ---');
        console.table(produtos); // Formatação amigável
    } catch (err) {
        console.error('Erro ao ler o arquivo:', err.message);
    }
}

// 4. Atualização do Catálogo (Adicionar Produto)
function adicionarProduto(novoProduto) {
    try {
        const dados = fs.readFileSync(ARQUIVO_PRODUTOS, 'utf8');
        const produtos = JSON.parse(dados);
        
        produtos.push(novoProduto);
        
        fs.writeFileSync(ARQUIVO_PRODUTOS, JSON.stringify(produtos, null, 2));
        console.log(`\nProduto "${novoProduto.produto}" adicionado com sucesso.`);
    } catch (err) {
        console.error('Erro ao atualizar o arquivo:', err.message);
    }
}

// 5. Operações Assíncronas (Leitura)
function listarProdutosAsync() {
    console.log('\n--- Iniciando leitura assíncrona ---');
    fs.readFile(ARQUIVO_PRODUTOS, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro na leitura assíncrona:', err.message);
            return;
        }
        console.log('>> [Async] Produtos carregados via leitura assíncrona:');
        console.table(JSON.parse(data));
    });
    console.log('>> [Async] Esta mensagem aparece ANTES dos dados (comportamento não-bloqueante).');
}

// 6. Funcionalidade de Busca
function buscarProdutoPorId(id) {
    try {
        const dados = fs.readFileSync(ARQUIVO_PRODUTOS, 'utf8');
        const produtos = JSON.parse(dados);
        
        const produto = produtos.find(p => p.id === id);
        return produto || null; // Retorna null se não encontrar
    } catch (err) {
        console.error('Erro ao buscar produto:', err.message);
        return null;
    }
}

// --- Execução do Fluxo ---
inicializarDados();
listarProdutos();

adicionarProduto({ id: 3, produto: 'Teclado', preco: 150.00 });

// Demonstração assíncrona
listarProdutosAsync();

// Demonstração de busca
setTimeout(() => {
    console.log('\n--- Busca de Produto ---');
    console.log('Resultado (ID 2):', buscarProdutoPorId(2));
    console.log('Resultado (ID 99):', buscarProdutoPorId(99));
}, 100); // Pequeno delay para esperar o async terminar

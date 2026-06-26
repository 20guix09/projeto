const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Habilita a leitura de JSON no corpo (Body) das requisições
app.use(express.json())

// ==========================================
// 🛡️ SEU NOVO MIDDLEWARE DE LOG (AULA 06)
// ==========================================
// Ele intercepta a requisição, mostra no terminal e passa adiante
app.use((req, res, next) => {
  const horaAtual = new Date().toISOString()
  
  // Mostra no terminal o método (GET/POST/etc), a URL acessada e o horário
  console.log(`[${horaAtual}] ${req.method} para a rota ${req.url}`)
  
  // CRÍTICO: Avança para a rota correspondente. Se esquecer o next(), a API trava!
  next() 
})

// ==========================================
// SEU BANCO DE DADOS EM MEMÓRIA
// ==========================================
const bancoDeDadosFrases = [
  {
    "id": 1,
    "frase": "O sucesso é a soma de pequenos esforços repetidos dia após dia.",
    "categoria": "Motivacional"
  },
  {
    "id": 2,
    "frase": "A persistência é o caminho do êxito.",
    "categoria": "Motivacional"
  },
  {
    "id": 3,
    "frase": "Código limpo é aquele que pode ser lido e entendido facilmente.",
    "categoria": "Tecnologia"
  },
  {
    "id": 4,
    "frase": "A prática leva à perfeição na programação.",
    "categoria": "Tecnologia"
  },
  {
    "id": 5,
    "frase": "Quem tem um porquê enfrenta quase qualquer como.",
    "categoria": "Filosofia"
  }
];

// ==========================================
// ROTAS DO SEU CRUD (AULAS ANTERIORES)
// ==========================================

// GET global com filtro opcional por query param (?categoria=...)
app.get('/frases', (req, res) => {
  const { categoria } = req.query

  if (categoria) {
    const filtradas = bancoDeDadosFrases.filter(
      f => f.categoria.toLowerCase() === categoria.toLowerCase()
    )
    return res.json(filtradas)
  }

  res.json(bancoDeDadosFrases)
})

// GET por ID
app.get('/frases/:id', (req, res) => {
  const idBusca = Number(req.params.id)
  const fraseEncontrada = bancoDeDadosFrases.find(f => f.id === idBusca)

  if (!fraseEncontrada) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  res.json(fraseEncontrada)
})

// POST: Criar frase
app.post('/frases', (req, res) => {
  const { frase, categoria } = req.body

  if (!frase || !categoria) {
    return res.status(400).json({ erro: "Frase e categoria são obrigatórias" })
  }

  const novaFrase = {
    id: bancoDeDadosFrases.length > 0 ? bancoDeDadosFrases[bancoDeDadosFrases.length - 1].id + 1 : 1,
    frase,
    categoria
  }

  bancoDeDadosFrases.push(novaFrase)
  res.status(201).json(novaFrase)
})

// PUT: Atualizar frase
app.put('/frases/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = bancoDeDadosFrases.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  const { frase, categoria } = req.body

  if (!frase || !categoria) {
    return res.status(400).json({ erro: "Frase e categoria são obrigatórias para atualizar" })
  }

  bancoDeDadosFrases[index] = { id, frase, categoria }
  res.json(bancoDeDadosFrases[index])
})

// DELETE: Remover frase
app.delete('/frases/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = bancoDeDadosFrases.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  bancoDeDadosFrases.splice(index, 1)
  res.status(204).send()
})

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
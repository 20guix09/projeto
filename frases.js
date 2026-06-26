const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Habilita a leitura de JSON no corpo (Body) das requisições
app.use(express.json())

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
// 1. ROTAS GET (READ - LER)
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

// GET por ID para buscar uma única frase
app.get('/frases/:id', (req, res) => {
  const idBusca = Number(req.params.id)
  const fraseEncontrada = bancoDeDadosFrases.find(f => f.id === idBusca)

  if (!fraseEncontrada) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  res.json(fraseEncontrada)
})

// ==========================================
// 2. ROTA POST (CREATE - CRIAR)
// ==========================================
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

// ==========================================
// 3. ROTA PUT (UPDATE - ATUALIZAR) — NOVA!
// ==========================================
app.put('/frases/:id', (req, res) => {
  const id = Number(req.params.id) // O ID sempre chega como string, convertemos para número
  const index = bancoDeDadosFrases.findIndex(f => f.id === id) // Procura a posição no array

  // Se o findIndex retornar -1, significa que não achou o ID
  if (index === -1) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  const { frase, categoria } = req.body

  // Validação dos campos obrigatórios
  if (!frase || !categoria) {
    return res.status(400).json({ erro: "Frase e categoria são obrigatórias para atualizar" })
  }

  // Substitui o item na posição encontrada, segurando o ID original
  bancoDeDadosFrases[index] = { id, frase, categoria }

  // Retorna o item atualizado com o status 200 (OK)
  res.json(bancoDeDadosFrases[index])
})

// ==========================================
// 4. ROTA DELETE (DELETE - DELETAR) — NOVA!
// ==========================================
app.delete('/frases/:id', (req, res) => {
  const id = Number(req.params.id)
  const index = bancoDeDadosFrases.findIndex(f => f.id === id)

  if (index === -1) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  // Remove 1 elemento a partir da posição encontrada
  bancoDeDadosFrases.splice(index, 1)

  // Status 204 significa "No Content" (Sucesso, mas sem corpo na resposta)
  res.status(204).send()
})

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
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

// ROTA GET: Lista todas as frases OU filtra por categoria usando Query Params (?categoria=...)
app.get('/frases', (req, res) => {
  const { categoria } = req.query // Captura o parâmetro opcional da URL

  // Se o usuário passou uma categoria na URL, filtramos o array
  if (categoria) {
    const filtradas = bancoDeDadosFrases.filter(
      f => f.categoria.toLowerCase() === categoria.toLowerCase()
    )
    return res.json(filtradas)
  }

  // Se não passou nenhuma categoria, retorna a lista completa
  res.json(bancoDeDadosFrases)
})

// ROTA GET por ID: Busca uma frase específica usando Route Params (:id)
app.get('/frases/:id', (req, res) => {
  // req.params.id sempre chega como texto (string), precisamos converter para Número
  const idBusca = Number(req.params.id)

  // Procura a frase com o ID correspondente
  const fraseEncontrada = bancoDeDadosFrases.find(f => f.id === idBusca)

  // Se não encontrar a frase, retorna o erro 404 (Not Found)
  if (!fraseEncontrada) {
    return res.status(404).json({ erro: 'Frase não encontrada' })
  }

  // Se encontrar, retorna a frase
  res.json(fraseEncontrada)
})

// ROTA POST: Cria uma nova frase (Mantida da aula anterior)
app.post('/frases', (req, res) => {
  const { frase, categoria } = req.body

  if (!frase || !categoria) {
    return res.status(400).json({ erro: "Frase e categoria são obrigatórias" })
  }

  const novaFrase = {
    id: bancoDeDadosFrases.length + 1,
    frase,
    categoria
  }

  bancoDeDadosFrases.push(novaFrase)
  res.status(201).json(novaFrase)
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
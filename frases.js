const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// Habilita a leitura do corpo das requisições em formato JSON (OBRIGATÓRIO antes das rotas)
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

// ROTA GET: Retorna todas as frases
app.get('/frases', (req, res) => {
  res.json(bancoDeDadosFrases)
})

// ROTA POST: Cria uma nova frase e adiciona ao array
app.post('/frases', (req, res) => {
  const { frase, categoria } = req.body

  // Validação extra: impede de salvar se faltar dados (ganha pontos com o professor!)
  if (!frase || !categoria) {
    return res.status(400).json({ erro: "Frase e categoria são obrigatórias" })
  }

  const novaFrase = {
    id: bancoDeDadosFrases.length + 1, // Gera o ID automático baseado no tamanho do array
    frase,
    categoria
  }

  bancoDeDadosFrases.push(novaFrase) // Salva no array
  res.status(201).json(novaFrase) // Retorna status 201 (Created)
})

// Inicia o servidor na porta configurada
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
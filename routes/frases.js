const express = require('express')
const router = express.Router()

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

// ROTA GET Global
router.get('/', (req, res, next) => {
  try {
    const { categoria } = req.query
    if (categoria) {
      const filtradas = bancoDeDadosFrases.filter(
        f => f.categoria.toLowerCase() === categoria.toLowerCase()
      )
      return res.json(filtradas)
    }
    res.json(bancoDeDadosFrases)
  } catch (err) {
    next(err) // Envia o erro para o middleware global
  }
})

// ROTA GET por ID
router.get('/:id', (req, res, next) => {
  try {
    const idBusca = Number(req.params.id)
    
    // Simulação de erro caso o ID seja um número inválido (ex: NaN)
    if (isNaN(idBusca)) {
      return res.status(400).json({ erro: 'O ID fornecido deve ser um número válido.' })
    }

    const fraseEncontrada = bancoDeDadosFrases.find(f => f.id === idBusca)
    if (!fraseEncontrada) {
      return res.status(404).json({ erro: 'Frase não encontrada.' })
    }
    res.json(fraseEncontrada)
  } catch (err) {
    next(err)
  }
})

// ROTA POST
router.post('/', (req, res, next) => {
  try {
    const { frase, categoria } = req.body

    if (!frase || !categoria) {
      return res.status(400).json({ erro: "Frase e categoria são obrigatórias." })
    }

    const novaFrase = {
      id: bancoDeDadosFrases.length > 0 ? bancoDeDadosFrases[bancoDeDadosFrases.length - 1].id + 1 : 1,
      frase,
      categoria
    }
    bancoDeDadosFrases.push(novaFrase)
    res.status(201).json(novaFrase)
  } catch (err) {
    next(err)
  }
})

// ROTA PUT
router.put('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const index = bancoDeDadosFrases.findIndex(f => f.id === id)
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Frase não encontrada.' })
    }
    
    const { frase, categoria } = req.body
    if (!frase || !categoria) {
      return res.status(400).json({ erro: "Frase e categoria são obrigatórias para atualização." })
    }
    
    bancoDeDadosFrases[index] = { id, frase, categoria }
    res.json(bancoDeDadosFrases[index])
  } catch (err) {
    next(err)
  }
})

// ROTA DELETE
router.delete('/:id', (req, res, next) => {
  try {
    const id = Number(req.params.id)
    const index = bancoDeDadosFrases.findIndex(f => f.id === id)
    
    if (index === -1) {
      return res.status(404).json({ erro: 'Frase não encontrada.' })
    }
    
    bancoDeDadosFrases.splice(index, 1)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
})

module.exports = router
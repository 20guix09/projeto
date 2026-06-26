const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

// Importa o arquivo de rotas que criamos na pasta routes
const rotasFrases = require('./routes/frases')

// Middlewares obrigatórios e de Log
app.use(express.json())

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} para ${req.url}`)
  next()
})

// Vincula as rotas importadas ao prefixo '/frases'
app.use('/frases', rotasFrases)

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
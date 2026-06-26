const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const rotasFrases = require('./routes/frases')

app.use(express.json())

// Middleware de Logs (Aula 06)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} para ${req.url}`)
  next()
})

// Suas rotas
app.use('/frases', rotasFrases)

// ==========================================
// 🚨 NOVO: MIDDLEWARE GLOBAL DE TRATAMENTO DE ERROS (AULA 08)
// ATENÇÃO: Deve ficar SEMPRE no final do arquivo, depois de todas as rotas!
// ==========================================
app.use((err, req, res, next) => {
  // Exibe o erro real detalhado no terminal do servidor para o desenvolvedor ver
  console.error('Erro interceptado pelo Middleware Global:', err.stack)

  // Responde ao cliente com JSON elegante e status 500 (Internal Server Error)
  res.status(500).json({
    erro: 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.'
  })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
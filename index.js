const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

// Exemplo para um sistema de agendamentos:
app.get('/agendamentos', (req, res) => {
  res.json([
    { id: 1, cliente: 'Ana', horario: '09:00' },
    { id: 2, cliente: 'Carlos', horario: '10:30' }
  ])
})

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
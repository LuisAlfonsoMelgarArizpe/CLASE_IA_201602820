const express = require('express')
const cors = require('cors');
const port = 3000

const app = express()

app.use(cors())
  

app.get('/', (req, res) => {
    let {turno,estado} = req.query
    console.log(turno,estado)
    res.send('53')
    // algoritmo
})


app.listen(port, () => {
    console.log(`Servidor  http://localhost:${port}`)
})
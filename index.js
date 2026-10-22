const express = require("express")
const cors = require("cors")

const app = express()
app.use(express.json())
app.use(cors())

let filmes = [
    {
        titulo: "Poderoso Chefão",
        sinopse: "Uma família mafiosa luta para estabelecer sua supremacia nos Estados Unidos depois da Segunda Guerra Mundial. Uma tentativa de assassinato deixa o chefão Vito Corleone incapacitado e força os filhos Michael e Sonny a assumir os negócios.",
    },
    {
        titulo: "Scarface",
        sinopse: "Após receber residência permanente nos Estados Unidos em troca do assassinato de um oficial do governo cubano, Tony Montana se torna o chefe do tráfico de drogas em Miami. Matando qualquer um que entre em seu caminho, Tony eventualmente se torna o maior traficante da Flórida, controlando quase toda a cocaína que entra em Miami. Porém, a pressão da polícia, as guerras com cartéis colombianos e sua própria paranoia servem para alimentar as chamas de sua eventual queda.",
    },
    {
        titulo: "Gênio Indomável",
        sinopse: "Will é um rapaz brilhante e tem um grande talento para a matemática, mas trabalha como faxineiro em uma famosa universidade. O psicólogo Sean Maguire o ajuda a formar sua identidade e lidar com as emoções, direcionando-o na vida.",
    },
]

//get: http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})
//get: http://localhost:3000/filmes
app.get('/filmes', (req, res) => {
    res.json(filmes)
})

//post: http://localhost:3000/filmes
app.post('/filmes', (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = {titulo: titulo, sinopse: sinopse}
    filmes.push(filme)
    res.json(filmes)
})

app.listen(3000, () => console.log ("server up & running"))
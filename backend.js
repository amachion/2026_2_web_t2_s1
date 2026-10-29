const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator').default
const bcrypt = require('bcrypt')

const app = express()
app.use(express.json())
app.use(cors())

const Filme = mongoose.model("Filme", mongoose.Schema({
    titulo: {type: String},
    sinopse: {type: String}
}))

const usuarioSchema = mongoose.Schema ({
    login: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})
usuarioSchema.plugin(uniqueValidator)
const Usuario = mongoose.model("Usuario", usuarioSchema)

async function conectarAoMongo () {
    await mongoose.connect(`mongodb+srv://andreiamachion_db_user:mongo123@cluster0.d7majmq.mongodb.net/`)
}

// let filmes = [
//     {
//         titulo: "Poderoso Chefão",
//         sinopse: "Uma família mafiosa luta para estabelecer sua supremacia nos Estados Unidos depois da Segunda Guerra Mundial. Uma tentativa de assassinato deixa o chefão Vito Corleone incapacitado e força os filhos Michael e Sonny a assumir os negócios.",
//     },
//     {
//         titulo: "Scarface",
//         sinopse: "Após receber residência permanente nos Estados Unidos em troca do assassinato de um oficial do governo cubano, Tony Montana se torna o chefe do tráfico de drogas em Miami. Matando qualquer um que entre em seu caminho, Tony eventualmente se torna o maior traficante da Flórida, controlando quase toda a cocaína que entra em Miami. Porém, a pressão da polícia, as guerras com cartéis colombianos e sua própria paranoia servem para alimentar as chamas de sua eventual queda.",
//     },
//     {
//         titulo: "Gênio Indomável",
//         sinopse: "Will é um rapaz brilhante e tem um grande talento para a matemática, mas trabalha como faxineiro em uma famosa universidade. O psicólogo Sean Maguire o ajuda a formar sua identidade e lidar com as emoções, direcionando-o na vida.",
//     },
// ]

//get: http://localhost:3000/oi
app.get('/oi', (req, res) => {
    res.send('oi')
})
//get: http://localhost:3000/filmes
app.get('/filmes', async (req, res) => {
    const filmes = await Filme.find()
    res.json(filmes)
})

//post: http://localhost:3000/filmes
app.post('/filmes', async (req, res) => {
    const titulo = req.body.titulo
    const sinopse = req.body.sinopse
    const filme = new Filme ({titulo: titulo, sinopse: sinopse})
    await filme.save()
    const filmes = await (Filme.find())
    res.json(filmes)
})
//post: http://localhost:3000/signup
app.post('/signup', async (req, res) => {
    try {
        const login = req.body.login
        const password = req.body.password
        const passCriptografado = await bcrypt.hash(password, 10)
        const usuario = new Usuario ({
            login: login,
            password: passCriptografado
        })
        const respostaMongo = await usuario.save()
        console.log(respostaMongo)
        res.status(201).end()
    }
    catch (e) {
        console.log(e)
        res.status(409).end()
    }
})

app.listen(3000, async () => {
    try {
        await conectarAoMongo();
        console.log ("server up & running & Mongo connected")
    }
    catch (e) {
        console.log ("erro: ", e)
    }
})
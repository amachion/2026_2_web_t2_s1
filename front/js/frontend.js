const protocolo = 'http://'
const baseURL = 'localhost:3000'

async function obterFilmes() {
    const filmesEndpoint = '/filmes'
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const filmes = (await axios.get(URLCompleta)).data
    //console.log (filmes)
    let tabela = document.querySelector('.filmes')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let filme of filmes){
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        celulaTitulo.innerHTML = filme.titulo
        celulaSinopse.innerHTML = filme.sinopse
    }
}

async function cadastrarFilme() {
    const filmesEndpoint = '/filmes'
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
    const tituloInput = document.querySelector("#tituloInput")
    const sinopseInput = document.querySelector("#sinopseInput")
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    if (titulo && sinopse) {
        tituloInput.value = ""
        sinopseInput.value = ""
        const filmes = (await axios.post(URLCompleta, {titulo, sinopse})).data
        let tabela = document.querySelector(".filmes")
        let corpoTabela = tabela.getElementsByTagName('tbody')[0]
        corpoTabela.innerHTML = ""
        for (let filme of filmes){
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            celulaTitulo.innerHTML = filme.titulo
            celulaSinopse.innerHTML = filme.sinopse
        }
    }
    else {
        let alert = document.querySelector('.alert-cadastro-filme')
        alert.classList.add('show')
        alert.classList.remove('d-none')
        setTimeout (() => {
            alert.classList.add('d-none')
            alert.classList.remove('show')
        }, 2000)
    }
}

async function cadastrarUsuario() {
    let usuarioCadastroInput = document.querySelector('#usuarioCadastroInput')
    let passwordCadastroInput = document.querySelector('#passwordCadastroInput')
    let usuarioInput = usuarioCadastroInput.value
    let passwordInput = passwordCadastroInput.value
    if (usuarioInput && passwordInput) {
        //chama o back
    }
    else {
        let alert = document.querySelector('.alert-modal-cadastro')
        alert.innerHTML = "Preencha todos os campos"
        alert.classList.add('show', 'alert-danger')
        alert.classList.remove('d-none')
        setTimeout (() => {
            alert.classList.add('d-none')
            alert.classList.remove('show', 'alert-danger')
        }, 2000)
    }
}
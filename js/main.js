const form = document.getElementById('novoItem')

const lista = document.getElementById('lista')

const items = JSON.parse(localStorage.getItem('items')) || []

items.forEach(elemento => {
  criaElemento(elemento)
})

form.addEventListener('submit', event => {
  event.preventDefault()
  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  const itemAtual = {
    nome: nome.value,
    quantidade: quantidade.value
  }
  criaElemento(itemAtual)

  items.push(itemAtual)

  localStorage.setItem('items', JSON.stringify(items))

  nome.value = ''
  quantidade.value = ''
})

function criaElemento(item) {
  const novoItem = document.createElement('li')
  novoItem.classList.add('item')

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade

  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome

  lista.appendChild(novoItem)
}

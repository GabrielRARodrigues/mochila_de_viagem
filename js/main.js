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
  const existe = items.find(elemento => elemento.nome === nome.value)

  if (existe) {
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    items[existe.id] = itemAtual
  } else {
    itemAtual.id = items.length

    criaElemento(itemAtual)

    items.push(itemAtual)
  }

  localStorage.setItem('items', JSON.stringify(items))

  nome.value = ''
  quantidade.value = ''
})

function criaElemento(item) {
  const novoItem = document.createElement('li')
  novoItem.classList.add('item')

  const numeroItem = document.createElement('strong')
  numeroItem.innerHTML = item.quantidade
  numeroItem.dataset.id = item.id

  novoItem.appendChild(numeroItem)
  novoItem.innerHTML += item.nome

  lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

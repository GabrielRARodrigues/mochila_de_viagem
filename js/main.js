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
  if (quantidade.value <= 0) {
    alert('A quantidade tem que ser maior que zero')
    quantidade.value = ''
    return
  }
  const itemAtual = {
    nome: nome.value.toLowerCase(),
    quantidade: quantidade.value
  }
  const existe = items.find(
    elemento => elemento.nome === nome.value.toLowerCase()
  )

  if (existe) {
    itemAtual.id = existe.id

    atualizaElemento(itemAtual)

    items[
      items.findIndex(elemento => {
        elemento.id === existe.id
      })
    ] = itemAtual
  } else {
    itemAtual.id = items[items.length - 1] ? items[items.length - 1].id + 1 : 0

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
  novoItem.appendChild(botaoDeleta(item.id))

  lista.appendChild(novoItem)
}

function atualizaElemento(item) {
  document.querySelector(`[data-id="${item.id}"]`).innerHTML = item.quantidade
}

function botaoDeleta(id) {
  const elementoBotao = document.createElement('button')

  elementoBotao.innerText = 'X'
  elementoBotao.addEventListener('click', function () {
    deletaElemento(this.parentNode, id)
  })

  return elementoBotao
}

function deletaElemento(tag, id) {
  tag.remove()
  items.splice(
    items.findIndex(element => element.id === id),
    1
  )
  localStorage.setItem('items', JSON.stringify(items))
}

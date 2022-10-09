const form = document.getElementById('novoItem')

form.addEventListener('submit', event => {
  event.preventDefault()
  event.target.elements['nome'].value
  event.target.elements['quantidade']
})

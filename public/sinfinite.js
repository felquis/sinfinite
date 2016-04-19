(function (window, document) {
  'use strict'

  function Sinfinite(options) {
    var _this = this

    _this.containerSelector = options.containerSelector
    _this.scrollElement = options.scrollElement
    _this.scrollElement = options.scrollElement
    var onInfinite = options.onInfinite

    if (typeof onInfinite === 'object') {
      _this.activeHandler = Object.keys(options.onInfinite)[0]
    } else if (!onInfinite) {
      throw('propriedade onInfinite não definida')
    }

    function attach() {
      _this.scrollElement.addEventListener('scroll', onScroll)
    }

    // Inicia modulo
    _this.init = function init() {

      if (!_this.scrollElement) {
        _this.scrollElement = document.querySelector(_this.containerSelector)
      }

      attach()
    }

    _this.complete = function complete() {
      infiniteScrollCalled = false
    }

    _this.end = function complete() {
      listInTheEnd = true
    }

    _this.setHandler = function setHandler(handler) {
      _this.activeHandler = handler
    }

    var distance = 0
    var windowHeight = window.innerHeight
    var scrollHeight
    var currentTarget = null
    var listInTheEnd = false
    var infiniteScrollCalled = false

    function onScroll(event) {
      _this.scrollTop = event.target.scrollTop
      scrollHeight = _this.scrollElement.scrollHeight
      // Se já chegou ao final da lista, não executa mais nada
      if (listInTheEnd) { return }

      // os eventos acoplados no document, o scrollTop fica no body e não no target
      // uma confusãozinha básica de web
      currentTarget = (event.target.scrollTop !== undefined)? event.target : event.target.body

      // O tamanho de todo o documento HTML
      // é necessário remover o height do window
      // para que 100% seja exatamente quando
      // o total do scroll encosta no bottom da janela
      scrollHeight = currentTarget.scrollHeight - windowHeight

      // Porcentagem do scroll que o usuário já fez
      // com relação a quantidade de pixeis que o usuário fez scroll
      distance = (currentTarget.scrollTop / scrollHeight) * 100

      // executa função do infinite scroll
      // quando o scroll estiver a 98% concluido
      // significando 2% para completar o scroll
      // da página
      if (distance > 90 && !infiniteScrollCalled) {
        // Próximos scroll enquanto estiver em 98% são bloqueados
        // e um próximo infiniteScroll é chamado apenas se a função
        // complete liberar a variável abaixo
        infiniteScrollCalled = true

        // good luck!
        if (typeof onInfinite !== 'function') {
          onInfinite[_this.activeHandler]()
        } else {
          onInfinite()
        }
      }
    }

    _this.init()

    return this
  }

  window.Sinfinite = Sinfinite
}(window, document));

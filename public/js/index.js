function addContent(container, classs) {
  classs = classs || ''
  container = document.querySelector(container)
  container.insertAdjacentHTML('beforeend', '<div class="big-content added '+ classs +'">Ajax Content '+ classs +'</div>')
}

/*
  Infinite Handler
*/
var primeiro = new Sinfinite({
  containerSelector: '[data-infinite="primeiro"]',
  onInfinite: function () {
    addContent(primeiro.containerSelector)

    primeiro.complete()
  }
})

/*
  Infinite Handler
*/
var terceiro = new Sinfinite({
  containerSelector: '[data-infinite="terceiro"]',
  onInfinite: {
    handler1: function () {
      addContent(terceiro.containerSelector, 'handler1')
      terceiro.complete()
    },
    handler2: function () {
      addContent(terceiro.containerSelector, 'handler2')
      terceiro.complete()
    },
    handler3: function () {
      addContent(terceiro.containerSelector, 'handler3')
      terceiro.complete()
    }
  }
})


// Necessary to test onInfinite handlers
changeHandler()
function changeHandler() {
  var buttons = document.querySelectorAll('[data-handler]')

  attach(buttons[0])
  attach(buttons[1])
  attach(buttons[2])

  function attach(element) {
    element.addEventListener('click', function (event) {
      $(terceiro.containerSelector).find('.added').remove()

      terceiro.setHandler(event.target.getAttribute('data-handler'))
    })
  }
}

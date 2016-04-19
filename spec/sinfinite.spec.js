
describe('check test page', function () {
  it('Test page title', function () {
    expect(document.title).toBe('Sinfinite');
  });

  it('Sinfinite is defined', function () {
    expect(Sinfinite).toBeTruthy();
  });
});

describe('First Column', function () {
  var $scrollElement = $(primeiro.scrollElement)

  it('Should add new elements', function (done) {
    $scrollElement.scrollTop(primeiro.scrollElement.scrollHeight)
    $scrollElement.trigger('scroll')

    setTimeout(function () {
      expect($scrollElement.find('.added').length).toBe(1)

      done()
    }, 0)
  })

  it('Should add another element', function (done) {
    $scrollElement.scrollTop(primeiro.scrollElement.scrollHeight)
    $scrollElement.trigger('scroll')

    setTimeout(function () {
      expect($scrollElement.find('.added').length).toBe(2)

      done()
    }, 20)
  })
})

describe('Third Column', function () {
  var $scrollElement = $(terceiro.scrollElement)
  var $handlers = $('[data-handler]')

  it('Should exec handler1', function (done) {
    $scrollElement.scrollTop(terceiro.scrollElement.scrollHeight)
    $scrollElement.trigger('scroll')

    setTimeout(function () {
      expect($scrollElement.find('.added.handler1').length).toBe(1)

      done()
    }, 20)
  })

  it('Should remove all handler1 elements', function (done) {

    $handlers.eq(1).trigger('click')

    setTimeout(function () {
      expect($scrollElement.find('.added.handler1').length).toBe(0)

      done()
    }, 20)
  })

  it('Should exec handler2', function (done) {
    $handlers.eq(1).trigger('click')
    $scrollElement.scrollTop(0)
    $scrollElement.trigger('scroll')
    $scrollElement.scrollTop(terceiro.scrollElement.scrollHeight + 100)
    $scrollElement.trigger('scroll')

    setTimeout(function () {
      expect($scrollElement.find('.added.handler2').length).toBe(1)

      done()
    }, 20)
  })

  it('Should exec handler3', function (done) {
    $handlers.eq(2).trigger('click')
    $scrollElement.scrollTop(0)
    $scrollElement.trigger('scroll')
    $scrollElement.scrollTop(terceiro.scrollElement.scrollHeight + 100)
    $scrollElement.trigger('scroll')

    setTimeout(function () {
      expect($scrollElement.find('.added.handler3').length).toBe(1)

      done()
    }, 20)
  })

  it('Should only exist handler3 elements', function (done) {
    $handlers.eq(2).trigger('click')
    $scrollElement.scrollTop(0)
    $scrollElement.trigger('scroll')
    $scrollElement.scrollTop(terceiro.scrollElement.scrollHeight + 100)
    $scrollElement.trigger('scroll')

    setTimeout(function () {
      expect($scrollElement.find('.added.handler1').length).toBe(0)
      expect($scrollElement.find('.added.handler2').length).toBe(0)
      expect($scrollElement.find('.added.handler3').length).toBe(1)

      done()
    }, 20)
  })
})

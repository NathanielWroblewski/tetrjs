namespace('Tetris.Views')

Tetris.Views.Board = function(config) {
  this.el = config.el
  this.model = config.model

  this.initialize = function() {
    this.model.on('change', this.render.bind(this))
  }

  this.template = function(board) {
    var html = ''

    for (var i = 0; i < board.length; i++) {
      var attr = board[i] ? 'block ' + this.color(board[i]) : ''

      html += '<div class="' + attr + '"></div>'
    }

    return html
  }

  this.color = function(shape) {
    switch(shape) {
      case 'O': return 'red'
      case 'F': return 'orange'
      case 'L': return 'yellow'
      case 'S': return 'blue'
      case 'Z': return 'green'
      case 'I': return 'purple'
      case 'T': return 'pink'
    }
  }

  this.render = function() {
    document.querySelector(config.el).innerHTML = this.template(this.model.toJSON())
  }

  this.initialize()
}

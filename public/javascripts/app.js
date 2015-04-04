!function() {
  var DROP_INTERVAL = 1000

  var piece = new Tetris.Models.Piece()

  var board = new Tetris.Models.Board({
    piece: piece
  })

  var view = new Tetris.Views.Board({
    el: '.game',
    model: board
  })

  view.render()

  setInterval(function() {
    board.movePiece('drop')
  }, DROP_INTERVAL)

  document.addEventListener('keydown', function(e) {
    var charCode = (typeof e.which === 'number') ? e.which : e.keyCode

    if (charCode > 36 && charCode < 41) e.preventDefault()

    switch(charCode) {
      case 37:
        board.movePiece('left')
        break
      case 38:
        board.movePiece('rotate')
        break
      case 39:
        board.movePiece('right')
        break
      case 40:
        board.movePiece('drop')
        break
    }
  })
}()

!function() {
  Tetris.interval = 900

  var piece = new Tetris.Models.Piece()
  var board = new Tetris.Models.Board({
    piece: piece
  })
  var view = new Tetris.Views.Board({
    el: '.game',
    model: board
  })

  board.on('change', function() {
    if (board.score < 10) {
      return Tetris.interval = 1000 - (board.score * 100)
    } else if (board.score > 9 && board.score < 15) {
      return Tetris.interval = 100 - ((board.score - 9) * 10)
    }
  })

  document.addEventListener('keydown', function(e) {
    var charCode = (typeof e.which === 'number') ? e.which : e.keyCode

    if (charCode > 36 && charCode < 41) e.preventDefault()

    switch(charCode) {
      case 37: return board.movePiece('left')
      case 38: return board.movePiece('rotate')
      case 39: return board.movePiece('right')
      case 40: return board.movePiece('drop')
    }
  })

  view.render()

  function gameLoop() {
    setTimeout(function() {
      board.movePiece('drop')
      if (!board.gameOver) gameLoop()
    }, Tetris.interval)
  }

  gameLoop()
}()

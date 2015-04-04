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
    if (Tetris.interval > 100) {
      return Tetris.interval -= Math.floor(board.score / 4) * 100
    } else if (Tetris.interval <= 100) {
      return Tetris.interval = Math.floor(Tetris.interval * 0.9)
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

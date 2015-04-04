namespace('Tetris.Models')

var EMPTY_CELL = 0

Tetris.Models.Board = function(config) {
  this.gameOver = false
  this.score  = 0
  this.height = 20
  this.width  = 10
  this.board  = []
  this.piece  = new Tetris.Models.Piece()
  this._callbacks = { change: [] }

  this.initialize = function() {
    this.generateBoard()
    this.place(this.piece.toJSON())
  }

  this.generateBoard = function() {
    for (var i = 0; i < this.width * this.height; i++) {
      this.board.push(EMPTY_CELL)
    }
  }

  this.place = function(indices) {
    for (var i = 0; i < indices.length; i++) {
      var index = indices[i]
      this.board[index] = this.piece.shape
    }
  }

  this.handleLeft = function() {
    this.movePiece('left')
  }

  this.movePiece = function(direction) {
    if (this.gameOver) return false

    if (this.spaceAvailable(this.piece[direction](), this.piece.toJSON())) {
      this.remove(this.piece.toJSON())
      this.piece.update(this.piece[direction](), direction === 'rotate')
    } else if (direction === 'drop') {
      this.checkLines()
      this.newPiece()
    }

    this.place(this.piece.toJSON())
    this.trigger('change')
  }

  this.checkLines = function() {
    while (this.findLine()) {
      this.score++

      var line = this.findLine()

      this.remove(line)

      var blocksAboveLine = []

      for (var i = 0; i < line[0]; i++) {
        if (this.occupied(i)) blocksAboveLine.push(i)
      }

      for (var i = 0, len = blocksAboveLine.length; i < len; i++) {
        var previousIndex = blocksAboveLine[len - (i + 1)],
            previousValue = this.board[previousIndex]
        this.board[previousIndex] = EMPTY_CELL
        this.board[previousIndex + this.width] = previousValue
      }
    }
  }

  this.findLine = function() {
    for (var i = 0; i < this.board.length; i += this.width) {
      var row = this.board.slice(i, i + this.width)

      if (row.indexOf(EMPTY_CELL) < 0) {
        var indices = []
        for (var j = 0; j < row.length; j++) indices.push(i + j)
        return indices
      }
    }
  }

  this.newPiece = function() {
    this.piece = new Tetris.Models.Piece()
    if (!this.placeable(this.piece.toJSON())) this.endGame()
  }

  this.endGame = function() {
    alert('Game Over')
    this.gameOver = true
  }

  this.placeable = function(indices) {
    for (var i = 0; i < indices.length; i++) {
      if (this.occupied(indices[i])) return false
    }
    return true
  }

  this.spaceAvailable = function(indices, current) {
    for (var i = 0; i < indices.length; i++) {
      var index = indices[i]
      if (index < 0 || index > this.width * this.height) return false
      if (this.occupied(index) && current.indexOf(index) < 0) return false
    }

    if (this.offBoard(indices)) return false

    if (this.lineTest(indices, current) || this.lineTest(current, indices)) return false

    return true
  }

  this.occupied = function(index) {
    return this.board[index] !== EMPTY_CELL
  }

  this.offBoard = function(indices) {
    var leftColumn = false,
        rightColumn = false;

    for (var i = 0; i < indices.length; i++) {
      if (indices[i] % this.width === 0) leftColumn = true
      if (indices[i] % this.width === this.width - 1) rightColumn = true
    }

    return leftColumn && rightColumn
  }

  // ensures a vertical line will not pass from the left to the right
  this.lineTest = function(left, right) {
    var leftLine = true,
        rightLine = true

    for (var i = 0; i < left.length; i++) {
      if (left[i] % this.width !== 0) leftLine = false
    }

    for (var i = 0; i < right.length; i++) {
      if (right[i] % this.width !== this.width - 1) rightLine = false
    }

    return leftLine && rightLine
  }

  this.remove = function(indices) {
    for (var i = 0; i < indices.length; i++) {
      var index = indices[i]
      this.board[index] = EMPTY_CELL
    }
  }

  this.toJSON = function() {
    return this.board
  }

  this.trigger = function(eventName) {
    for (var i = 0; i < this._callbacks[eventName].length; i++) {
      this._callbacks[eventName][i]()
    }
  }

  this.on = function(eventName, callback) {
    this._callbacks[eventName] = this._callbacks[eventName].concat(callback)
  }

  this.initialize()
}

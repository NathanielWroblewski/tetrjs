namespace('Tetris.Models')

var SHAPES = ['O', 'S', 'Z', 'L', '7', 'T', 'I']
var PIECES = {
  O: [4,  5, 14, 15],
  S: [4,  5, 13, 14],
  Z: [4,  5, 15, 16],
  L: [4, 14, 24, 25],
  7: [4,  5, 15, 25],
  T: [4, 14, 24, 15],
  I: [4, 14, 24, 34]
}

var ORIENTATIONS = {
  O: [[ 0,  1, 10, 11], [ 0,  1, 10, 11], [ 0,  1, 10, 11], [ 0,  1, 10, 11]],
  S: [[-1,  9, 10, 20], [ 1,  2, 10, 11], [-1,  9, 10, 20], [ 1,  2, 10, 11]],
  Z: [[ 1, 10, 11, 20], [-1,  0, 10, 11], [ 1, 10, 11, 20], [-1,  0, 10, 11]],
  L: [[10, 11, 12, 20], [-9,  1, 11, 12], [ 1,  9, 10, 11], [-2, -1,  9, 19]],
  7: [[ 1,  9, 10, 11], [-2, -1,  9, 19], [10, 11, 12, 20], [-9,  1, 11, 12]],
  T: [[ 0,  9, 10, 11], [ 0, 10, 11, 20], [ 9, 10, 11, 20], [-9,  0,  1, 11]],
  I: [[ 9, 10, 11, 12], [-9,  1, 11, 21], [ 9, 10, 11, 12], [-9,  1, 11, 21]]
}

Tetris.Models.Piece = function() {

  this.initialize = function() {
    var randomIndex = Math.floor(Math.random() * SHAPES.length)

    this.orientation = 1
    this.shape   = SHAPES[randomIndex]
    this.indices = PIECES[this.shape]
  }

  this.drop = function() {
    return this._move(10)
  }

  this.left = function() {
    return this._move(-1)
  }

  this.right = function() {
    return this._move(1)
  }

  this.rotate = function() {
    var deltas = ORIENTATIONS[this.shape][(this.orientation + 1) % 4],
        result = []

    for (var i = 0; i < deltas.length; i++) {
      result.push(this.indices[0] + deltas[i])
    }

    return result
  }

  this._move = function(change) {
    var indices = []

    for (var i = 0; i < this.indices.length; i++) {
      indices.push(this.indices[i] + change)
    }

    return indices
  }

  this.update = function(indices, orientation) {
    this.indices = indices
    if (orientation) this.orientation++
  }

  this.toJSON = function() {
    return this.indices
  }

  this.initialize()
}

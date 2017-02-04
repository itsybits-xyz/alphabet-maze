class Truck {
  constructor () {
    this.level = [
      // 1            2           3                4          5          6           7             8
      [['r','d'], ['l','d','r'], ['l','d'],     ['d','r'], ['l','r'], ['l','r'], ['l','r'],     ['l','d']],
      [['u'],     ['u','d'],     ['u','d'],     ['u','r'], ['l'],     ['r','d'], ['l','r'],     ['l','d','u']],
      [['r','d'], ['u','l'],     ['u','d','r'], ['l','r'], ['l','r'], ['u','l'], ['d'],         ['u','d']],
      [['u','d'], ['r'],         ['u','l'],     ['d','r'], ['l','d'], ['d'],     ['u','r','d'], ['u','l']],
      [['u','r'], ['r','l'],     ['r','l'],     ['u','l'], ['u'],     ['u','r']  ['u','l','r'], ['l']],
    ]
    this.el = document.querySelector('.truck')
    this.position = {
      row: 0, // (72 * row) + 36
      column: 3, // (72 * column) + 24
    }
  }

  handleKey (keyCode) {
    const letter = String.fromCharCode(keyCode).toLowerCase()
    if (letter === 'a') {
      this.up()
    }
    if (letter === 'b') {
      this.down()
    }
    if (letter === 'c') {
      this.left()
    }
    if (letter === 'd') {
      this.right()
    }
  }

  update () {
    this.el.style.top = ((this.position.row * 72) + 36) + 'px'
    this.el.style.left = ((this.position.column * 72) + 24) + 'px'
  }

  allowableDirections () {
    return this.level[this.position.row][this.position.column]
  }

  allow (direction) {
    return this.allowableDirections().indexOf(direction) !== -1
  }

  up () {
    var count = 0
    while (!count++ || this.allowableDirections().length <= 2) {
      if (!this.allow('u')) break
      this.position.row--
    }
    this.update()
  }

  down () {
    var count = 0
    while (!count++ || this.allowableDirections().length <= 2) {
      if (!this.allow('d')) break
      this.position.row++
    }
    this.update()
  }

  left () {
    var count = 0
    while (!count++ || this.allowableDirections().length <= 2) {
      if (!this.allow('l')) break
      this.position.column--
    }
    this.update()
  }

  right () {
    var count = 0
    while (!count++ || this.allowableDirections().length <= 2) {
      if (!this.allow('r')) break
      this.position.column++
    }
    this.update()
  }
}

window.truck = new Truck()
document.addEventListener('keyup', function(evt) {
  truck.handleKey(evt.keyCode)
})

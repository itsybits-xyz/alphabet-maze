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
    this.letters = {
      up: document.querySelector('.truck .up'),
      down: document.querySelector('.truck .down'),
      left: document.querySelector('.truck .left'),
      right: document.querySelector('.truck .right'),
    }
    this.update()
  }

  handleKey (letter) {
    if (this.letters.up.innerText === letter) {
      this.up()
    }
    if (this.letters.down.innerText === letter) {
      this.down()
    }
    if (this.letters.left.innerText === letter) {
      this.left()
    }
    if (this.letters.right.innerText === letter) {
      this.right()
    }
  }
  
  update () {
    this.el.style.top = ((this.position.row * 72) + 36) + 'px'
    this.el.style.left = ((this.position.column * 72) + 24) + 'px'
    this.letters.left.style.display = this.allow('l') ? 'inline' : 'none'
    this.letters.right.style.display = this.allow('r') ? 'inline' : 'none'
    this.letters.up.style.display = this.allow('u') ? 'inline' : 'none'
    this.letters.down.style.display = this.allow('d') ? 'inline' : 'none'
    const [l, r, u, d] = pickRandomN(alphabets, 4)
    this.letters.left.innerText = l
    this.letters.right.innerText = r
    this.letters.up.innerText = u
    this.letters.down.innerText = d
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

function getRandomInt (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function pickRandomN (items, n) {
  if (items.length < n) throw new RangeError(`Not enough elemnts to take. Requested: ${n} Available: ${items.length}`)
  selected = new Set()
  while (n) {
    const i = getRandomInt(0, items.length)
    if (!selected.has(items[i])) {
      selected.add(items[i])
      n--
    }
  }
  return Array.from(selected)
}

var alphabets = 'abcdefghijklmnopqrstuvwyxz'


window.truck = new Truck()
document.addEventListener('keyup', function(evt) {
  const letter = String.fromCharCode(evt.keyCode).toLowerCase()
  truck.handleKey(letter)
})

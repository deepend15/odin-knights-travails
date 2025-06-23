const xAxis = 8;
const yAxis = 8;

class LinkedList {
  constructor(x = null, y = null) {
    this.value = [x, y];
    this.nextSquare = null;

    if (x + 1 < xAxis) {
      if (y + 2 < yAxis) {
        this.append(x + 1, y + 2);
      }

      if (y - 2 >= 0) {
        this.append(x + 1, y - 2);
      }

      if (x + 2 < xAxis) {
        if (y + 1 < yAxis) {
          this.append(x + 2, y + 1);
        }

        if (y - 1 >= 0) {
          this.append(x + 2, y - 1);
        }
      }
    }

    if (x - 1 >= 0) {
      if (y + 2 < yAxis) {
        this.append(x - 1, y + 2);
      }

      if (y - 2 >= 0) {
        this.append(x - 1, y - 2);
      }

      if (x - 2 >= 0) {
        if (y + 1 < yAxis) {
          this.append(x - 2, y + 1);
        }

        if (y - 1 >= 0) {
          this.append(x - 2, y - 1);
        }
      }
    }
  }

  static Square = class {
    constructor(x, y) {
      this.value = [x, y];
      this.nextSquare = null;
    }
  };

    head() {
      if (!this.value) return null;
      else return this;
    }

  tail() {
    if (!this.value) return null;
    else {
      let currentSquare = this;
      while (currentSquare.nextSquare !== null) {
        currentSquare = currentSquare.nextSquare;
      }
      return currentSquare;
    }
  }

  append(x, y) {
    if (!this.value) {
      this.value = [x, y];
      this.nextSquare = null;
    } else {
      const newSquare = new LinkedList.Square(x, y);
      const tail = this.tail();
      tail.nextSquare = newSquare;
    }
  }

  possibleMoves() {
    const arr = [];
    let currentSquare = this.nextSquare;
    while (currentSquare !== null) {
      arr.push(currentSquare.value);
      currentSquare = currentSquare.nextSquare;
    }
    return arr;
  }
}

function knightMoves(startingSquare, endingSquare) {
  function outOfBounds([x, y]) {
    if (x < 0 || x >= xAxis || y < 0 || y >= yAxis) {
      return true;
    }
  }

  if (
    startingSquare[0] === endingSquare[0] &&
    startingSquare[1] === endingSquare[1]
  ) {
    return 0;
  }

  if (outOfBounds(startingSquare) || outOfBounds(endingSquare)) {
    throw new Error("One or both of your inputted squares is invalid.");
  }

  // code here

  
}

let startingSquare = new LinkedList(3, 3);
let possibleMoves = startingSquare.possibleMoves();
console.log(possibleMoves);

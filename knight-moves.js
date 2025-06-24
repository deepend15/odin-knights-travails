const xAxis = 8;
const yAxis = 8;

function outOfBounds([x, y]) {
  if (!(0 <= x && x < xAxis && 0 <= y && y < yAxis)) {
    return true;
  }
}

class LinkedList {
  constructor(x, y) {
    if (outOfBounds([x, y])) {
      throw new Error("Invalid square.");
    }

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

  tail() {
    let currentSquare = this;
    while (currentSquare.nextSquare !== null) {
      currentSquare = currentSquare.nextSquare;
    }
    return currentSquare;
  }

  append(x, y) {
    const newSquare = new LinkedList.Square(x, y);
    const tail = this.tail();
    tail.nextSquare = newSquare;
  }

  adjacentVertices() {
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
  if (outOfBounds(startingSquare) || outOfBounds(endingSquare)) {
    throw new Error("One or both of your inputted squares is invalid.");
  }

  if (
    startingSquare[0] === endingSquare[0] &&
    startingSquare[1] === endingSquare[1]
  ) {
    console.log(`You made it in 0 moves! Here's your path:`);
    console.log(startingSquare);
    console.log(endingSquare);
    return;
  }

  const queue = [];

  const squareStart = new LinkedList(startingSquare[0], startingSquare[1]);
  const startingAdjacentVertices = squareStart.adjacentVertices();

  for (const vertex of startingAdjacentVertices) {
    queue.push({
      path: [[startingSquare[0], startingSquare[1]]],
      level: 1,
      value: vertex,
    });
  }

  while (queue.length !== 0) {
    const evalSquare = queue[0];
    if (
      evalSquare.value[0] === endingSquare[0] &&
      evalSquare.value[1] === endingSquare[1]
    ) {
      evalSquare.path.push(evalSquare.value);
      let moves;
      if (evalSquare.level === 1) moves = 'move';
      else moves = 'moves';
      console.log(
        `You made it in ${evalSquare.level} ${moves}! Here's your path:`
      );
      evalSquare.path.forEach((vertex) => console.log(vertex));
      return;
    }
    const newSquare = new LinkedList(evalSquare.value[0], evalSquare.value[1]);
    const newSquareVertices = newSquare.adjacentVertices();
    for (const vertex of newSquareVertices) {
      const newPath = evalSquare.path.slice();
      newPath.push(evalSquare.value);
      const newLevel = evalSquare.level + 1;
      queue.push({ path: newPath, level: newLevel, value: vertex });
    }
    queue.shift();
  }
}

knightMoves([5, 4], [6, 6]);
knightMoves([3, 3], [4, 3]);
knightMoves([0, 0], [7, 7]);

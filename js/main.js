const board = [
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, -1, 0, -1, 0, -1, 0, -1],
    [-1, 0, -1, 0, -1, 0, -1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1]
];
const gameBoard = document.querySelector('.container');

const reverseBoard = board.map( arr => arr.map(elem => elem).reverse()).reverse();

let inputs = document.querySelectorAll('input');
inputs.forEach(item => item.addEventListener('change', () => chooseSide(item.id)))

function chooseSide(side) {
    if (side === 'darkside') {
        gameBoard.innerHTML = '';
        createBoard(reverseBoard);
    } else {
        gameBoard.innerHTML = '';
        createBoard (board);
        
    }
}
//chooseSide(inputs[1].id)
//createBoard (board);

function createBoard (arr) {
    for (let i = 0; i < arr.length; i++) {
        let row = arr[i];
        for (let j = 0; j < row.length; j++) {
            let elementMark = row[j];
            let occupied = '';
            let boardElement = document.createElement('div');
            boardElement.setAttribute('data-position', '' + i + j);
            boardElement.classList.add('square')
            gameBoard.append(boardElement);
            if (i % 2 === 0) {
                if (j % 2 === 0) {
                    boardElement.classList.add('black');
                } else {
                    boardElement.classList.add('white');
                }
            } else {
                if (j % 2 !== 0) {
                    boardElement.classList.add('black');
                } else {
                    boardElement.classList.add('white');
                }
            }

            
            if (elementMark === 1 || elementMark === -1) {
                if (elementMark === 1) {
                    side = 'republic';
                    boardElement.append(makeChecker(side));
                    
                } else {
                    side = 'empire';
                    boardElement.append(makeChecker(side));
                
                }
                
            } else {
                occupied = 'empty';
                let emptySquare = document.createElement('div');
                emptySquare.classList.add(occupied);
                boardElement.append(emptySquare);
            }
            
            
        
        }
    }
}

function makeChecker (side) {
    let checker = document.createElement('div');
    checker.classList.add('checker');
    checker.classList.add(side);
    checker.addEventListener('mouseover', () => possibleToMove(checker));
    //checker.addEventListener('mouseleave', () => clearElements());
    checker.addEventListener('click', (e) => moveChecker(e.target));
    return checker;
}







function possibleToMove(item) {

    clearElements();

    // let currentPosition = item.getAttribute('data-position');
    // let currentRow = currentPosition[0];
    // let currentColumn  = currentPosition[1];
    // let possiblePositions = [];
    // let newRow = currentRow - 1 + '';
    // let newColumn1 = currentColumn - 1 + '';
    // let newColumn2 = +currentColumn + 1 + '';
    // possiblePositions.push(newRow + newColumn1, newRow + newColumn2);
    let targetChecker =  getCheckerInfo(item)
    targetChecker.possiblePositions.forEach(pos => isEmpty(pos));

   
   
}

function isEmpty(position) {

    if(position > 0) {
        //console.log(position);
        let newPossiblePosition = document.querySelector(`[data-position = "${position}"]`);
        if (newPossiblePosition) {
          
            let empty = newPossiblePosition.firstElementChild.classList.contains('empty');
            if (empty) {
                
                newPossiblePosition.classList.add('possibleToMove');
            }
        }
    }
}

function clearElements() {
    let toClear = document.querySelectorAll('.possibleToMove');
    toClear.forEach(elem => elem.classList.remove('possibleToMove'));
}

function getCheckerInfo (checker) {
    let positions = {};

    positions.currentPosition = checker.parentNode.getAttribute('data-position');;
    positions.currentRow = positions.currentPosition[0];
    positions.currentColumn  = positions.currentPosition[1];
    positions.possiblePositions = [];
    positions.newRow = positions.currentRow - 1 + '';
    positions.newColumn1 = positions.currentColumn - 1 + '';
    positions.newColumn2 = +positions.currentColumn + 1 + '';
    positions.possiblePositions.push(positions.newRow + positions.newColumn1, positions.newRow + positions.newColumn2);
  
    return positions;

}

function moveChecker(checker) {
 
 
    let targetChecker = getCheckerInfo (checker);
    let newPositions = targetChecker.possiblePositions;
    let checkerSide = checker.classList[1];

    for (let i = 0; i < newPositions.length; i++) {
        if (newPositions[i] > 0) {
            
            let newPosition = document.querySelector(`[data-position = "${newPositions[i]}"]`);
            if(newPosition) {
                newPosition.addEventListener('click', () => moveTo(newPosition, checkerSide, targetChecker.currentPosition));

            }
        }
    }
}

function moveTo(element, className, oldPlace) {
   //element.append(makeChecker(className)); 
   element.firstElementChild.replaceWith(makeChecker(className));
   
   let oldElement = document.querySelector(`[data-position = "${oldPlace}"]`);    
   oldElement.firstElementChild.className = 'empty'
   console.log(oldElement)
   
}   


function moveTo(element, className, oldPlace) {
    //element.append(makeChecker(className)); 
    element.firstElementChild.replaceWith(makeChecker(className));
    
    let oldElement = document.querySelector(`[data-position = "${oldPlace}"]`);    
    oldElement.firstElementChild.className = 'empty'
    console.log(oldElement)
    
 }   
/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')
let score = 0

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */


function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge + 40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge + 20;


    if (
      (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerLeftEdge) ||
      (rockRightEdge >=dodgerRightEdge && rockLeftEdge <= dodgerRightEdge) ||
      (rockLeftEdge >= dodgerLeftEdge && rockRightEdge <= dodgerRightEdge)) {
        return true
      }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  var top = 0
  rock.style.top = top
  GAME.appendChild(rock);

  function moveRock() {
    rock.style.top = `${top += 2}px`;
    if (checkCollision(rock)) {
      return endGame();
    }

    if (top < 380) {
      window.requestAnimationFrame(moveRock);
   } else {
     score += 1;
     console.log(score);
     rock.remove();
   }
  }
  window.requestAnimationFrame(moveRock)
  // Add the rock to ROCKS so that we can remove all rocks
  // when there's a collision
  ROCKS.push(rock)

  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval)

  ROCKS.forEach(function(rock) { rock.remove() })

  document.removeEventListener('keydown', moveDodger)

  START.innerHTML = `Score: ${score}`
  START.style.display = 'inline'
  let score = 0;
  ROCKS = [];

  alert('You will dodge no more.');

}

function moveDodger(e) {
  // implement me!
  /**
   * This function should call `moveDodgerLeft()`
   * if the left arrow is pressed and `moveDodgerRight()`
   * if the right arrow is pressed. (Check the constants
   * we've declared for you above.)
   * And be sure to use the functions declared below!
   */
  document.addEventListener('keydown', function(e) {
    if (e.which === LEFT_ARROW) {
      moveDodgerLeft()
    }
    if (e.which === RIGHT_ARROW) {
      moveDodgerRight()
    }
  })
}

    /*
    if (e.which === 40) {
      console.log('stop dang it!!!')
      window.cancelAnimationFrame(requestAnimationFrame(moveDodger))
      stopDodger()
    }
      */

/*
function stopDodger() {
  window.cancelAnimationFrame(requestAnimationFrame(step))
  debugger;
  let position = DODGER.style.left;
  DODGER.style.left = position;
  debugger;
}
*/

function moveDodgerLeft() {
  const leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10);
  //console.log("left!");
  //console.log(left);

  function step() {
  DODGER.style.left = `${left -= 4}px`
    if (left > 0) {
      window.requestAnimationFrame(step);
    }
  }
 if (left > 0) {
   window.requestAnimationFrame(step);
 }
}


function moveDodgerRight() {
  const leftNumbers = dodger.style.left.replace('px', '');
  let left = parseInt(leftNumbers, 10);

  function step() {
    DODGER.style.left = `${left += 4}px`
    if (left < 360) {
     window.requestAnimationFrame(step);
    }
   }
  if (left < 360) {
    window.requestAnimationFrame(step);
  }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}

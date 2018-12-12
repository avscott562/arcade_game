let allEnemies = [];
let enemy, player, key;
let winModal = document.getElementById('win-modal');
let mClose = document.getElementById('wm-content-close');
let wmClose = document.getElementById('wm-close');
let replay = document.getElementById('wm-replay');

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // initialize variables and parameters
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // set speed
    if(this.x < 505) {
      this.x += (this.speed * dt);
    } else {
      //ensure enemy wraps board
      this.x = -202;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
  //initialize variables, parameters, and methods for player class.
  //position
  this.x = x;
  this.y = y;
  //add image
  this.sprite = 'images/char-horn-girl.png';
  //add function to respond to arrow keys
  this.handleInput = function(key) {
    switch(key) {
      case key = 'left':
        if(this.x > 0) {
          this.x -= 101;
        }
        break;
      case key = 'up':
        if(this.y > 0) {
          this.y -= 83;
        }
        break;
      case key = 'right':
        if(this.x < 404) {
          this.x += 101;
        }
        break;
      case key = 'down':
        if(this.y < 410) {
          this.y += 83;
        }
        break;
    }
  };
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {
  for(let item of allEnemies) {
    //see if player is in winning row
    if (this.y === -5) {
      winModal.style.display = 'block';
      //cancelAnimationFrame(animaId);
    } else {
      //see if player and enemy collide
      if (this.y === item.y + 8) {
        if (this.x < item.x + 92 && this.x + 80 > item.x) {
          //if collision occurs, move player back to starting position
          this.x = 202;
          this.y = 410;
        };
      };
    };
  };
};

Player.prototype.render = function() {
  //render image of player at designated position
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// create enemies
function createEnemies() {
  for (let i = 0; i < 3; i++) {
    //initialize variables for enemies
    let x = -101;
    let y = 70 + (83 * i);
    let speed = 125 - (50 * i);
    //create enemies
    enemy = new Enemy(x, y, speed);
    //and add to allEnemies array
    allEnemies.push(enemy);
  }
}

//choosePlayer();
newGame();

function newGame() {  
  allEnemies = [];
  createEnemies();
  // create player
  player = new Player(202, 410);
  //close modal
  closeModal();
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//add eventLisenters for winning modal targets
mClose.addEventListener('click', closeModal);
wmClose.addEventListener('click', closeModal);
replay.addEventListener('click', newGame);

//function to close modal
function closeModal() {
  console.log('I was clicked');
  winModal.style.display = 'none';
}

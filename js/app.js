let allEnemies = [];
let enemy, player, key;
let playerXoptions = [0, 101, 202, 303, 404];

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
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
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505) {
      this.x += (this.speed * dt);
    } else {
      this.x = -303;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(x, y) {
  this.x = x;
  this.y = y;
  this.sprite = 'images/char-horn-girl.png';
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
    if (this.y === item.y + 8) {
      //console.log('we are in the same row');
      if (Math.abs(this.x - item.x) === 0) {
        //console.log('same x position');
      };
    };
  };
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
(function createEnemies() {
  for (let i = 0; i < 3; i++) {
    //initialize variables for enemies
    let x = -101;
    let y = 70 + (83 * i);
    let speed = 425 - (50 * i);
    //create enemies
    enemy = new Enemy(x, y, speed);
    //and add to allEnemies array
    allEnemies.push(enemy);
  }
}());

//choosePlayer();
// Place the player object in a variable called player
player = new Player(202, 410);

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

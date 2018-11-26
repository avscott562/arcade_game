let allEnemies = [];
let enemy, player, key;

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
        this.x = x - 90;
        break;
      case key = 'up':
        this.y = y - 101;
        break;
      case key = 'right':
        this.x = x + 90;
        break;
      case key = 'down':
        this.y = y + 101;
        break;
    }
  };
};
// This class requires an update(), render() and
// a handleInput() method.
Player.prototype.update = function(dt) {

};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now instantiate your objects.
function createEnemies() {
  for (let i = 0; i < 3; i++) {
    //initialize variables for enemies
    let x = 0;
    let y = 75 + (75 * i);
    let speed = 200 - (50 * i);
    //create enemies
    enemy = new Enemy(x, y, speed);
    //and add to allEnemies array
    allEnemies.push(enemy);
  }
}
createEnemies();
console.log(allEnemies);
//choosePlayer();
// Place the player object in a variable called player
player = new Player(202, 410);
console.log(player);




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

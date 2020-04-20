/*
Joann Long
CMPM120
4/19/2020

Points breakdown:
  Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (50)
  Implement parallax scrolling (15)
  Create a new animated sprite for the Spaceship enemies (15)
  Allow the player to control the Rocket after it's fired (10)
  Randomize each spaceship's movement direction at the start of each play (10)
  Add your own (copyright-free) background music to the Play scene (10)


  I'm not sure if some of these overlap with the 50 Point Redesign; I listed them just in case.
  And to make a small case if necessary, parallax scrolling wasn't included in the base game, 
  and neither was animated sprites for the Spaceship enemies (which I changed to cute ghosts).

*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;
class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  
  preload() {
        // load audio
        this.load.audio('sfx_select', './assets/boo select.m4a');
        this.load.audio('sfx_explosion', './assets/aw yeah.m4a');
        this.load.audio('sfx_rocket', './assets/throw.m4a');
        this.load.audio('bg_music', './assets/Loyalty_Freak_Music_-_02_-_A_ghost_Waltz.mp3') // found here https://freemusicarchive.org/music/Loyalty_Freak_Music/WITCHY_BATTY_SPOOKY_HALLOWEEN_IN_SEPTEMBER_
        this.load.image('title_screen', './assets/title page.png');
      }

  create() {
     this.title_screen = this.add.tileSprite(0, 0, 640, 480, 'title_screen').setOrigin(0, 0); // i'm all about the short run babey 

    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }
  
  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000    
      }
      this.sound.play('sfx_select');
      this.scene.start("playScene");    
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000    
      }
      this.sound.play('sfx_select');
      this.scene.start("playScene");    
    }
  }
}
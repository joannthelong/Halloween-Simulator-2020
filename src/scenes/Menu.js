class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  
  preload() {
        // load audio
        this.load.audio('sfx_select', './assets/oooo select.m4a');
        this.load.audio('sfx_explosion', './assets/aw yeah.m4a');
        this.load.audio('sfx_rocket', './assets/throw.m4a');
  }

  create() {
      // menu display
      let menuConfig = {
        fontFamily: 'Cambria',
        fontSize: '28px',
        backgroundColor: '#F3B141',
        color: '#843605',
        align: 'right',
        padding: {
            top: 5,
            bottom: 5,
        },
        fixedWidth: 0
    }

    // show menu text
    let centerX = game.config.width/2;
    let centerY = game.config.height/2;
    let textSpacer = 64;

    this.add.text(centerX, centerY- textSpacer, 'ROCKET PATROL', menuConfig). setOrigin(0.5);
    this.add.text(centerX, centerY, 'Use ← → arrows to move & (F) to Fire', menuConfig).setOrigin(0.5);
    menuConfig.backgroundColor = '#00FF00'; 
    menuConfig.color = '#000';
    this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

//    this.add.text(20, 20, "Rocket Patrol Menu");
//    this.scene.start("playScene");

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
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/candy.png');
        this.load.image('spaceship', './assets/ghost.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('fog1', './assets/fog1.png');
        this.load.image('fog2', './assets/fog2.png');
        this.load.image('border', './assets/border.png');
        this.load.image('gg','./assets/game over.png');
        // load spritesheets
        this.load.spritesheet('explosion', './assets/ghost bye.png', {frameWidth: 77, frameHeight: 82, startFrame: 0, endFrame: 3});
        this.load.spritesheet('walk', './assets/ghost walk.png', {frameWidth: 74, frameHeight: 77, startFrame: 0, endFrame: 1});
        
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.border = this.add.tileSprite(0, 0, 640, 480, 'border').setOrigin(0, 0);
        this.fog2 = this.add.tileSprite(0, 0, 640, 480, 'fog2').setOrigin(0, 0);
        this.fog1 = this.add.tileSprite(0, 0, 640, 480, 'fog1').setOrigin(0, 0);

        // play background music
        this.music = this.sound.add('bg_music');
        this.music.setLoop(true);
        this.music.play();

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);

        // add spaceships (x3)
        var spaceshipStart1 = Phaser.Math.Between(0, game.config.width);
        var spaceshipStart2 = Phaser.Math.Between(0, game.config.width);
        var spaceshipStart3 = Phaser.Math.Between(0, game.config.width);
        this.ship01 = new Spaceship(this, spaceshipStart1, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, spaceshipStart2, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, spaceshipStart3, 260, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 3, first: 0}),
            frameRate: 8
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('walk', { start: 0, end: 1, first: 0}),
            frameRate: 5,
            repeat: -1
        });

        this.ship01.anims.play('walk');
        this.ship02.anims.play('walk');
        this.ship03.anims.play('walk');

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Girrasol',
            fontSize: '28px',
//            backgroundColor: '#6b26b4',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
//            fixedWidth: 100
        }
    this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

    // game over flag
    this.gameOver = false;

    // 60 second play clock
    scoreConfig.fixedWidth = 0;
    this.clock - this.time.delayedCall(game.settings.gameTimer, () => {
        this.gg = this.add.tileSprite(0, -10, 640, 480, 'gg').setOrigin(0, 0);
        this.gameOver = true;
    }, null, this)
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.music.stop();
            this.scene.restart(this.p1Score);
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.music.stop();
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -=4;
        this.fog2.tilePositionX -=3;
        this.fog1.tilePositionX -=2;

        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);   
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // siple AABB checking
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
                return true;
        } else {
                return false;
        }
    }

    shipExplode(ship) {
        ship.alpha = 0;                         // temporarily hide ship
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        });       
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }  
}
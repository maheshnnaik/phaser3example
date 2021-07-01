import Block from "./block";
import Player from "./player";
import Score from "./score";
// import Score from "./score";

var leftSide = 0;
var rightSide = 1;
export default class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }
    preload(){
        this.load.image('bg', './images/background.png');
        this.load.image('square', './images/plataforma.png');
        this.load.image('player', './images/robot.png');
        this.load.image('block', './images/platform.png');
        this.load.bitmapFont('font2', './images/font/font2_0.png', './images/font/font2.fnt' );
    }
    create(){
        this.camera = this.cameras.main;
        // this.camera.setBounds(0, 0, 480, 2160);
        this.cameraSpeed= {
            base: 10,
            current: 10,
            max: 10
        };
        this.createBackground();

        this.score = new Score({scene: this, x: this.game.config.width * 0.05, y: this.game.config.height * 0.05, font: "font2", text: 'Score: 0', size: 38});

        console.log(this.camera);
        this.player = new Player({scene: this, x: this.square.x, y: this.square.y - this.square.height/2, key: 'player', });
        // this.platforms = [];
        this.platformCount = 0;
        this.currentPlatform = 0;
        this.isGameOver = false;
        this.spawnPlatform();
        this.spawnNewPlatform = false;
        this.playerLanded = false;
        this.isCollided = false;
        this.input.on('pointerdown', this.jumpPlayer, this);
        this.movePlatform();

    }
    update(){
        if(!this.isGameOver){
            if(this.spawnNewPlatform && this.playerLanded){
                // this.updateCamera();
                this.movePlatform();
                this.spawnNewPlatform = false;
                // this.camera.scrollY -= 3;
            }
        }
    }
    jumpPlayer(){
        if(!this.isGameOver)
        {
            if(this.player.onGround || this.player.body.touching.down){
                this.player.onGround = false;
                this.playerLanded = false;
                this.player.jump();
                this.isCollided = false;
            }
        }
    }
    checkCollision(player, block){
        if(!this.isCollided){
            if(player.body.touching.down && block.body.touching.up){
                block.stopBlock();
                this.moveDown(block);
                this.score.updateScore(1);
                this.currentPlatform += 1;
                this.spawnNewPlatform = true;
                this.playerLanded = true;
                this.isCollided = true;
            } else if(player.body.touching.left || player.body.touching.right){
                block.stopBlock();
                player.die();
                this.spawnNewPlatform = false;
                this.isCollided = true;
                this.isGameOver = true;
            }
        }
        
    }
    spawnPlatform(){
        var height = this.square.y - this.square.height/2;
        this.platforms = this.add.group();
        for(let e = 0; e < 10; e++){
            let platform = new Block({scene: this, 
                x: 0, 
                y: height, 
                key: 'block'}
            );
            this.platforms.add(platform);
            height = height - platform.height / 2.3;
            this.platformCount++;
        }
        this.physics.add.collider(this.platforms, this.platforms, (block1, block2)=>{
            if(block1.body.touching.up && block2.body.touching.down){
                block1.stopBlock();
                // block1.body.force = 0;
                // block2.body.force = 0;
                // block2.stopBlock();
                // block.stopBlock();
                // this.moveDown(block);
                // this.score.updateScore(1);
                // this.currentPlatform += 1;
                // this.spawnNewPlatform = true;
                // this.playerLanded = true;
                // this.isCollided = true;
            } 
            // this.physics.add.collider(this.square, this.platforms.children.entries[0], (square, block)=>{
            //     block.body.force = 0;
            //     block.body.setVelocityY(0);
            // }, null, this);
            
            // block1.body.setVelocityY(0);
            // block2.body.setVelocityY(0);
        }, null, this);
        console.log(this.platforms.children);
        
    }
    movePlatform(){
        this.platforms.children.entries[this.currentPlatform].createPlatform();
    }
    createBackground(){
        this.background ;
        let y = this.game.config.height / 2;
        let x = this.game.config.width / 2;
        let bg = this.add.image(x, y, 'bg');
        let scaleX = window.innerWidth / bg.width;
        let scaleY = window.innerHeight / bg.height;
        bg.setScale(scaleX, scaleY);
        this.square = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height * 0.9, 'square').setScale(0.7, 0.5);
        this.square.body.setAllowGravity(false);
        this.square.body.immovable = true;
        y+= bg.height;
    }
    updateCamera(){
        this.camera.setScroll(0, -(this.camera.scrollY + this.cameraSpeed.current));
        // this.camera.startFollow(this.player);
    }
    // setCameraSpeed(speed){
    //     this.cameraSpeed.base = speed;
    //     this.cameraSpeed.current = speed;
    //     this.cameraSpeed.current = Math.min(this.cameraSpeed.current, this.cameraSpeed.max);
    //     this.cameraSpeed.current = Math.max(this.cameraSpeed.current, 0);
    // }
    moveDown(block){
        var tween = this.tweens.add({
            targets: this.square,
            y: this.square.y + block.height / 2,
            duration: 500,
            ease: 'Linear',
            repeat: 0,
            yoyo: false
        });
        tween.on(Phaser.Tweens.Events.TIMELINE_COMPLETE, ()=>{
            // block.body.immovable = false;
            block.body.setVelocityY(0);
        })
        var speed = (this.square.y + block.height / 2) / 0.5;
        // block.body.immovable = false;
        block.body.setVelocityY(speed);
    }
};
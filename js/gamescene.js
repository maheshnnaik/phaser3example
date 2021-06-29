import Block from "./block";
import Player from "./player";

var leftSide = 0;
var rightSide = 1;
export default class GameScene extends Phaser.Scene{
    constructor(){
        super('GameScene');
    }
    preload(){
        this.load.image('bg', './images/background.png');
        this.load.image('player', './images/robot.png');
        this.load.image('block', './images/platform.png');
    }
    create(){
        this.camera = this.cameras.main;
        // this.camera.setBounds(0, 0, 480, 2160);
        this.cameraSpeed= {
            base: 10,
            current: 10,
            max: 10
        };
        this.createBackground(5);
        console.log(this.camera);
        this.player = new Player({scene: this, x: 240, y: 640, key: 'player', });
        this.platforms = [];
        this.platformCount = 0;
        this.isGameOver = false;
        this.spawnPlatform();
        this.spawnNewPlatform = false;
        this.playerLanded = false;
        this.isCollided = false;
        this.input.on('pointerdown', this.jumpPlayer, this);
        // this.physics.add.collider(this.player, this.block, this.checkCollision, null, this);
        this.movePlatform();

    }
    update(){
        // this.block.update();
        // if(this.spawnNewPlatform && this.playerLanded){
        //     this.spawnPlatform();
        // }
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
        if(this.player.onGround || this.player.body.touching.down){
            this.player.onGround = false;
            this.playerLanded = false;
            this.player.jump();
            this.isCollided = false;
        }
    }
    checkCollision(player, block){
        if(!this.isCollided){
            if(player.body.touching.down && block.body.touching.up){
                block.stopBlock();
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
        // this.spawnNewPlatform = false;
        // this.block = new Block({scene: this, x: 0, y: 0, key: 'block', });
        // console.log(this.block.y, this.block.height);
        // var height = this.game.config.height - (this.platformCount * this.block.height / this.block.scaleY) - 10;
        // this.platformCount++;
        // this.block.createPlatform(height);
        var height = 660;
        for(let i = 0; i<50; i++){
            var block = new Block({scene: this, x: 0, y: height, key: 'block' });
            height = this.game.config.height - (this.platformCount * block.height);
            this.platformCount++;
            this.platforms.push(block);
        }
        this.platformCount = 0;
    }
    movePlatform(){
        this.platforms[this.platformCount].createPlatform();
        this.platformCount++;
        // this.background.y -= 10;
        // this.camera.y += 10;
        // this.camera.scrollY += 3;
    }
    /**
     * 
     * @param {number} count 
     */
    createBackground(count){
        this.background ;
        let y = this.game.config.height / 2;
        for(let i=0; i<count;i++){
            let bg = this.add.image(240, y, 'bg').setScale(0.25, 0.5).setScrollFactor(0,3);
            y+= bg.height;
        }
    }
    updateCamera(){
        this.camera.setScroll(0, -(this.camera.scrollY + this.cameraSpeed.current));
        // this.camera.startFollow(this.player);
    }
    setCameraSpeed(speed){
        this.cameraSpeed.base = speed;
        this.cameraSpeed.current = speed;
        this.cameraSpeed.current = Math.min(this.cameraSpeed.current, this.cameraSpeed.max);
        this.cameraSpeed.current = Math.max(this.cameraSpeed.current, 0);
    }
};
import Block from "./block";
import Player from "./player";

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
        this.background = this.add.image(240, 320, 'bg').setScale(0.25, 0.5);
        this.player = new Player({scene: this, x: 240, y: 640, key: 'player', });

        this.block = new Block({scene: this, x: 0, y: 640, key: 'block', });
        this.input.on('pointerdown', this.jumpPlayer, this);
        this.physics.add.collider(this.player, this.block, function(player, block){
            // console.log(player.body.touching);
            if(block.body.touching.left){
                console.log("Left");
            }else if(block.body.touching.right){
                console.log("Right");
            }
            if(player.body.touching.left){
                console.log("Left player");
            }else if(player.body.touching.right){
                console.log("Right player");
            }
            if(block.body.touching.up && player.body.touching.down){
                block.blockTween.stop();
                console.log("collide");
            }else if(block.body.touching.left && player.body.touching.right){
                console.log("right");
            }else if(block.body.touching.right && player.body.touching.left){
                console.log("left");
            }
            
        });
    }
    update(){

    }
    jumpPlayer(){
        this.player.jump();
    }
};
import { Tweens } from "phaser";

export default class Block extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.setOrigin(0.5, 0.5);
        this.setScale(0.4, 0.65);
        this.canMove = false;
        this.scene.physics.world.enable(this);
        this.scene.physics.add.existing(this, true);
        this.body.enabled = true;
        this.body.immovable = false;
        this.scene.add.existing(this);
        this.body.setAllowGravity(false);
        this.setVisible(false);
        this.scene.physics.add.collider(this.scene.player, this, this.scene.checkCollision, null, this.scene);
        this.scene.physics.add.collider(this.scene.square, this, (square, block)=>{
            block.body.setVelocityY(0);
        }, null, this.scene);
        this.scene.events.on('update', this.update, this);

    }
    update(){
        if(this.canMove){
            if(this.x <= 240){
                this.moveBlock();
            } else{
                this.stopBlock();
            }
        }  
    }
    moveBlock(){
        this.body.setVelocityX(100);
    }
    stopBlock(){
        this.canMove = false;
        this.body.setVelocityX(0);
        // this.body.setAllowGravity(false);
        // this.body.friction = 10000;
        // this.body.setGravityY(-50)
    }
    createPlatform(height){
        // this.x = 0;
        // this.y = height;
        this.setVisible(true);
        this.canMove = true;
        this.body.setAllowGravity(true);
        this.body.setGravityY(50)
    }
}
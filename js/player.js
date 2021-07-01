export default class Player extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.setOrigin(0.5, 1);
        this.setScale(0.2);
        this.onGround = true;
        this.canJump = true;
        this.jumpVelocity = 500;
        this.currentPos = config.y;
        this.scene.physics.world.enable(this);
        this.scene.physics.add.existing(this, false);
        this.body.enabled = true;
        this.body.setCollideWorldBounds(true);
        this.scene.add.existing(this);
        this.body.setGravityY(1000);
        this.scene.physics.add.collider(this.scene.square, this, (player, square)=>{square.body.setVelocityY(0);}, null, this.scene);
    }
    jump(){
        if(this.canJump){
            this.body.setVelocityY(-this.jumpVelocity);
        }
    }
    die(){
        console.log("die");
        this.canJump = false;
        this.body.setVelocity(0);
        this.body.immovable = false;
    }
}
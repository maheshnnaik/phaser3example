export default class Player extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.setOrigin(0.5, 1);
        this.setScale(0.25);
        this.jumpVelocity = 500;
        this.currentPos = config.y;
        this.scene.physics.world.enable(this);
        this.scene.physics.add.existing(this, false);
        this.body.enabled = true;
        this.body.setCollideWorldBounds(true);
        this.scene.add.existing(this);
        this.body.setGravityY(1000);
    }
    jump(){
        this.body.setVelocityY(-this.jumpVelocity);
        
    }
}
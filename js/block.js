export default class Block extends Phaser.GameObjects.Sprite{
    constructor(config){
        super(config.scene, config.x, config.y, config.key);
        this.scene = config.scene;
        this.setOrigin(0.5, 1);
        this.setScale(0.5, 0.75);
        this.scene.physics.world.enable(this);
        this.scene.physics.add.existing(this, true);
        this.body.enabled = true;
        this.body.immovable = true;
        this.body.setCollideWorldBounds(true);
        this.scene.add.existing(this);
        this.body.setAllowGravity(false);
        // this.setVisible(false);
        console.log(this.scene);
        this.blockTween = this.scene.tweens.add({
            targets: this,
            x: 240,
            y: 640,
            duration: 1500,
            ease: 'Linear',
            repeat: 0,
            yoyo: false,
            delay: 200
        });
    }
    
}
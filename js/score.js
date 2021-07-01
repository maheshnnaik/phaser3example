export default class Score extends Phaser.GameObjects.DynamicBitmapText{
    constructor(config){
        super(config.scene, config.x, config.y, config.font, config.text, config.size);
        config.scene.add.existing(this);
        this.currentScore = 0;
    }
    updateScore(score){
        this.currentScore += score;
        this.setText(`Score: ${this.currentScore}`);
    }
}
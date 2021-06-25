import Phaser from 'phaser';
import GameScene from './js/gamescene';

const config = {
    type: Phaser.AUTO,
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [GameScene]
};

const game = new Phaser.Game(config);
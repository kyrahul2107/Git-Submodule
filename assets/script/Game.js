let { Globals } = require('./Global.js');
cc.log(Globals.score)

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node
        },
        score: {
            default: null,
            type: cc.Node
        },
        music: {
            default: null,
            type: cc.AudioClip
        },
        sound: {
            default: null,
            type: cc.AudioClip
        }
    },
    onLoad() { 
        if(!cc.audioEngine.isMusicPlaying()){
            cc.audioEngine.playMusic(this.music,true);
        }
        this.enablePhysics();
        Globals.score = 0;
        this.hero.on('score', () => {
            cc.audioEngine.play(this.sound)
            ++Globals.score;
            cc.log(Globals.score)
            this.score.getComponent(cc.Label).string = Globals.score;
        });

        // We are adding a new scene when hero dies
        this.hero.once('die', () => {
            cc.log('Hero has died. Loading Score scene...');
            cc.director.loadScene('Score');
        });
    },

    enablePhysics() {
        let physicsManager = cc.director.getPhysicsManager();
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, -320); // Default gravity

        // enabling Collision Manager in the Game
        let collisionManager = cc.director.getCollisionManager();
        collisionManager.enabled = true;

        // Enable debug draw to visualize physics
        // physicsManager.debugDrawFlags =
        //     cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    },

    start() {
        // Additional initialization if needed
    },
});

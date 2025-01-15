let { Globals } = require('./Global.js');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreLabel:{
            default:null,
            type:cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        cc.log(`Game is Over and Score is: ${Globals.score.toString()}`);
        this.scoreLabel.string=`Score: ${Globals.score.toString()} `;
        this.node.on(cc.Node.EventType.TOUCH_END,()=>{
        cc.director.loadScene('Game');
        });
    },

    // update (dt) {},
});

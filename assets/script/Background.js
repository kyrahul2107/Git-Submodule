
cc.Class({
    extends: cc.Component,

    properties: {
        speed:150
    },

    // onLoad () {},

    start () {

    },

    move(node, offset){
        // Find the X coordinate of the right edge of the current sprite
        const spriteRightX=node.x+node.width/2;
        // Find the X coordinate of the left edge of the screen
        const screenLeftX=-cc.winSize.width/2;
        // If the right x of the sprite is less than left x of the scren
        if(spriteRightX<=screenLeftX){
               // swap the iamges
               node.x+=node.width*2-offset;
        }else{
            // Else shift current node with the specified offset
            node.x-=offset;
        }
    },

    update (dt) {
        // Find all the children node and add with logic to the move function
        this.node.children.forEach((node)=>{
            this.move(node,dt*this.speed);
        });
    },
});

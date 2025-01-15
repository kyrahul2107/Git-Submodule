cc.Class({
    extends: cc.Component,
    properties: {
        jumpSpeed: cc.v2({ x: 0, y: 300 }), // Y velocity for jumping
        maxJumpDistance: 300,
        jumpSprite: {
            default: null,
            type: cc.SpriteFrame,
        }
    },

    onLoad() {
        // To get the Animated Component
        this.animation = this.node.getComponent(cc.Animation);
        this.sprite = this.getComponent(cc.Sprite);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (event) => {
            switch (event.keyCode) {
                case cc.macro.KEY.space:
                    // cc.log(`Jump key is pressed`);
                    this.jumpKeyPressed = true;
                    break;
            }
        });

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, (event) => {
            switch (event.keyCode) {
                case cc.macro.KEY.space:
                    // cc.log(`Jump key is relased`);
                    this.jumpKeyPressed = false;
                    this.isJumping = false;
                    break;
            }
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_START, () => {
            this.jumpKeyPressed = true;
        });

        this.node.parent.on(cc.Node.EventType.TOUCH_END, () => {
            this.jumpKeyPressed = false;
            this.isJumping = false;
        });
    },

    start() {
        this.body = this.getComponent(cc.RigidBody);
        this.isJumping = false;
        this.jumpKeyPressed = false;
        this.touching = false;
        this.startJumpyY = false;
    },

    onBeginContact() {
        this.touching = true;
    },

    onEndContact() {
        this.touching = false;
    },

    onCollisionEnter(other, self) {
        if (other.node.name === 'diamond') {
            other.node.destroy();
            this.node.emit('score');
        }

    },

    animate() {
        // if hero is running on the platform
        if (this.touching) {
            if (!this.animation.getAnimationState('running').isPlaying) {
                this.animation.start('running');
            }
        } else {
            // The Hero is Jumping then Stop the animation
            if (this.animation.getAnimationState('running').isPlaying) {
                this.animation.stop();
                this.sprite.spriteFrame = this.jumpSprite;
            }
        }
    },


    update(dt) {
        cc.log('Jump key is pressed', this.jumpKeyPressed);
        if (this.jumpKeyPressed) {
            this.jump();
        }
        this.animate();

        if (this.node.y < -cc.winSize.height / 2) {
            this.node.emit('die');
        }
    },

    jump() {
        // if hero touches the ground
        cc.log(`jump Function is being called`);
        cc.log('Is touching:',this.touching)
        if (this.touching) {
            // remember hero's start position
            this.startJumpyY = this.node.y;
            // cc.log('The Hero Position is:',this.startJumpyY)
            // set jump is not finished
            this.jumpFinished = false;
            // set jump is started
            this.isJumping = true;
            // set hero's speed on Y axis
            this.body.linearVelocity = this.jumpSpeed;
        }
        // else if hero is jumping and jump is not finished
        else if (this.isJumping && !this.jumpFinished) {
            const jumpDistance = this.node.y - this.startJumpyY;
            cc.log('Is jumping :', isJumping)
            // If jump distance is not Maximum
            if (jumpDistance < this.maxJumpDistance) {
                // Finish jump
                this.body.linearVelocity = this.jumpSpeed;
            } else {
                // Finish jump
                this.jumpFinished = true;
            }
        }
    },

});

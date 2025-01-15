
cc.Class({
    extends: cc.Component,

    properties: {
        xOffsetMin: 60,
        xOffsetMax: 200,
        yOffsetMin: -120,
        yOffsetMax: 120,
        tilesCountMin: 2,
        tilesCountMax: 5,
        platform: {
            default: null,
            type: cc.Prefab,
        }
    },

    generateRandomData() {
        let data = {
            tilesCount: 0,
            x: 0,
            y: 0
        };

        // Logic
        // const randomNumber=min+Math.random(Math.random()*(max-min));
        const xOffset = this.xOffsetMin + Math.random() * (this.xOffsetMax - this.xOffsetMin);
        const yOffset = this.yOffsetMin + Math.random() * (this.yOffsetMax - this.yOffsetMin);

        // Getting the x cordinate
        data.x = this.current.node.x + this.current.node.width + xOffset;
        let y = this.current.node.y + yOffset;

        // Getting the Y coordinate
        const screenTop = cc.winSize.height / 2;
        const screenBottom = -cc.winSize.height / 2;
        y = Math.min(y, screenTop - this.current.node.height * 2);
        y = Math.max(y, screenBottom + this.current.node.height);
        data.y = y;

        // Getting the tile count
        data.tilesCount = this.tilesCountMin + Math.floor(Math.random() * (this.tilesCountMax - this.tilesCountMin));
        // To get the random number in range 1 to 10
        return data;
    },

    // onLoad () {},

    start() {
        // I will put all creatd Platform
        this.platforms = [];
        this.createPlatform({
            tilesCount: 4,
            x: -200,
            y: -200
        });
    },


    createPlatform(data) {
        if (!data) {
            data = this.generateRandomData();
        }

        // It will find the object in the array which is not active
        const platform = this.platforms.find(platform => !platform.active);

        // If the Inactive Platform exist in the array then reuse it
        if (platform) {
            // cc.log('Reuse');
            this.current = platform;
        }
        // Otherwise push create a new platform
        else {
            // cc.log('Create');
            const node = cc.instantiate(this.platform);
            this.node.addChild(node);
            this.current = node.getComponent('Platform');
            this.platforms.push(this.current);

        }
        this.current.init(data.tilesCount, data.x, data.y);
    },

    update(dt) {
        const screenRight = cc.winSize.width / 2;
        const currentPlatformRight = this.current.node.x + this.current.node.width;
        if (currentPlatformRight <= screenRight) {
            this.createPlatform();
            // cc.log('Platform length:', this.platforms.length);
        }
    }

});

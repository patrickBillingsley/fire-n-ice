const canvas = {
    level: document.getElementById('level'),
    sprite: document.getElementById('sprite')
};

const ctx = {
    level: canvas.level.getContext('2d'),
    sprite: canvas.sprite.getContext('2d')
};

const spritesheet = {
    level: new Image(),
    sprite: new Image(),
    character: new Image()
};

spritesheet.level.src = './resources/spritesheets/level.png';
spritesheet.sprite.src = './resources/spritesheets/sprite.png';
spritesheet.character.src = './resources/spritesheets/dana-sprites.png';

class Map {
    constructor(cols, rows, ref) {
        this.cols = cols;
        this.rows = rows;
        this.ref = this.formatRef(ref);
    }

    tileSize = 16;

    legend = {
        'E': 0,  // empty
        'B': 1,  // single wall block
        'L': 2,  // left wall block
        'W': 3,  // center wall block
        'R': 4,  // right wall block
    };

    formatRef = ref => {
        return ref.map((x, index) => {
            if(x === 'W') {
                if(ref[index-1] !== 'W' && ref[index+1] !== 'W') {  // single block
                    return 'B';
                }
                if(index % this.cols === 0 ) {                      // left wall
                    return 'L';
                }
                if(ref[index-1] !== 'W') {                          // left cap
                    return 'L';
                }
                if((index + 1) % this.cols === 0) {                 // right wall
                    return 'R';
                }
                if(ref[index+1] !== 'W') {                          // right cap
                    return 'R';
                }
                return 'W';
            } else {
                return 'E';
            }
        })
    };

    getTile = (col, row) => {
        return this.legend[this.ref[row * this.cols + col]];
    };

    draw = () => {
        spritesheet.level.onload = () => {
            for(let r = 0; r < this.rows; r++) {
                for(let c = 0; c < this.cols; c++) {
                    let tile = this.getTile(c, r);
                    
                    ctx.level.drawImage(
                        spritesheet.level,
                        tile * this.tileSize,
                        0,
                        this.tileSize,
                        this.tileSize,
                        c * this.tileSize,
                        r * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    )
                }
            }
        }
    };
};

class Sprites {
    constructor(cols, rows, ref) {
        this.cols = cols;
        this.rows = rows;
        this.ref = this.formatRef(ref);
    }

    tileSize = 16;

    legend = {
        'I': 0, // single ice block
        'L': 1, // left ice block
        'M': 2, // middle ice block
        'R': 3, // right ice block
        'F': 6, // fire
        'C': 0  // character
    };

    animations = {
        'I': new Animator(2, 70),
        'F': new Animator(6, 40)
    }

    formatRef = ref => {
        return ref.map((x, index) => {
            if(x === 'I') {
                if(ref[index-1] !== 'I' && ref[index+1] !== 'I') {  // single block
                    return x;
                }
                if(ref[index-1] !== 'I') {                          // left cap
                    return 'L';
                }
                if(ref[index+1] !== 'I') {                          // right cap
                    return 'R';
                }
                return 'M';
            } else if(x === 'F') {
                return x;
            } else {
                return null;
            }
        });
    };

    getRef = (col, row) => {
        return this.ref[row * this.cols + col];
    }

    getTile = (col, row) => {
        return this.legend[this.ref[row * this.cols + col]];
    };

    draw = () => {
        for(let r = 0; r < this.rows; r++) {
            for(let c = 0; c < this.cols; c++) {
                const ref = this.getRef(c, r);
                const tile = this.getTile(c, r);

                if(ref) {
                    const sy = this.animations[ref].animate();

                    if(tile > -1) {
                        ctx.sprite.drawImage(
                            spritesheet.sprite,
                            tile * this.tileSize,
                            sy * this.tileSize,
                            this.tileSize,
                            this.tileSize,
                            c * this.tileSize,
                            r * this.tileSize,
                            this.tileSize,
                            this.tileSize
                        )
                    }
                }
            }
        }
    };
};

class Level {
    constructor(cols, rows, ref) {
        this.ref = this.refToArray(ref);
        this.map = new Map(cols, rows, this.ref);
        this.sprite = new Sprites(cols, rows, this.ref);
    }

    refToArray = ref => {
        return ref.match(/\w/g);
    };
};

class Animator {
    constructor(frameCount, delay) {
        this.count = 0;
        this.frameIndex = 0;
        this.frameCount = frameCount;
        this.delay = delay;
    }

    animate = () => {
        this.count++;

        if(this.count > this.delay) {
            this.count = 0;
            this.frameIndex = (this.frameIndex === this.frameCount-1) ? 0 : this.frameIndex + 1;
        }

        return this.frameIndex;
    }
}

const ref = [
    `W W W W W W W W W W W W W W 
     W W W W W W W W W W W W W W
     W W W W W W W W W W W W W W
     W W W E E E E E E E E W W W
     W W W E E F E I E C E W W W
     W W W E W W W W W W W W W W
     W W W E I E E E W W W W W W
     W W W E I E F E E E E W W W
     W W W E I E F E E E E W W W
     W W W E I E F E E E E W W W
     W W W W W W W W F E E W W W
     W W W W W W W W W W W W W W
     W W W W W W W W W W W W W W
     W W W W W W W W W W W W W W`
];

const level = [
    new Level(14, 14, ref[0])
];

level[0].map.draw();

const main = () => {
    window.requestAnimationFrame(main);



    ctx.sprite.clearRect(0, 0, canvas.sprite.width, canvas.sprite.height);
    level[0].sprite.draw();
}
main();
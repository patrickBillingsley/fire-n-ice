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

const tileSize = 16;

let currentSecond = 0;
let frameCount = 0;
let framesLastSecond = 0;
let lastFrameTime = 0;

const keys = ['ArrowRight', 'ArrowLeft'];
let keysPressed = [];

window.addEventListener('keydown', ({ code }) => {
    if(keys.includes(code) && !keysPressed.includes(code)) {
        keysPressed.unshift(code);
    }
});

window.addEventListener('keyup', ({ code }) => {
    if(keys.includes(code) && keysPressed.includes(code)) {
        keysPressed = keysPressed.filter(x => x !== code);
    }
})

class Map {
    constructor(cols, rows, ref) {
        this.cols = cols;
        this.rows = rows;
        this.ref = this.formatRef(ref);
    }

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

                    const sx = tile * tileSize;
                    const sy = 0;
                    const sw = tileSize;
                    const sh = tileSize;
                    const dx = c * tileSize;
                    const dy = r * tileSize;
                    const dw = tileSize;
                    const dh = tileSize;
                    
                    ctx.level.drawImage(
                        spritesheet.level,
                        sx, sy, sw, sh,
                        dx, dy, dw, dh
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

        this.player = new Character(cols, ref);
    }

    legend = {
        'I': 0, // single ice block
        'L': 1, // left ice block
        'M': 2, // middle ice block
        'R': 3, // right ice block
        'F': 6  // fire
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
            } else if(x === 'W') {
                return 1;
            } else {
                return 0;
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

                if(typeof ref === 'string') {
                    const sx = tile * tileSize;
                    const sy = this.animations[ref].animate() * tileSize;
                    const sw = tileSize;
                    const sh = tileSize;
                    const dx = c * tileSize;
                    const dy = r * tileSize;
                    const dw = tileSize;
                    const dh = tileSize;

                    ctx.sprite.drawImage(
                        spritesheet.sprite,
                        sx, sy, sw, sh,
                        dx, dy, dw, dh
                    )
                }
            }
        }
        
        this.player.draw();
    };
};

class Character {
    constructor(cols, ref) {
        this.cols = cols;
        this.ref = this.formatRef(ref);

        this.tileFrom = this.calcStartCoordinates(cols, ref);
        this.tileTo = this.calcStartCoordinates(cols, ref);
        this.dimensions = [tileSize * 3, tileSize * 2]
        this.position = [((tileSize * this.tileFrom[0]) + 
            ((tileSize - this.dimensions[0]) / 2)), 
            ((tileSize * this.tileFrom[1]) +
            (tileSize - this.dimensions[1]))]
        this.timeMoved = 0;
        this.delayMove = 700;

        this.facing = 'right';
        this.walking = false;
        this.falling = false;
    }

    legend = {
        'E': 0,
        'W': 1,
        'I': 2,
        'F': 3,
        'C': 0
    }
    
    animations = {
        turnLeft: new Animator(3, 50),
        turnRight: new Animator(3, 50),
        
    }

    formatRef = ref => {
        return ref.map(x => {
            if(Object.keys(this.legend).includes(x)) {
                return this.legend[x];
            } else {
                return x;
            }
        })
    }

    calcStartCoordinates = (cols, ref) => {
        const index = ref.indexOf('C');
        const x = index % cols;
        const y = Math.floor(index / cols);

        return [x, y];
    }

    placeAt = (x, y) => {
        this.tileFrom = [x, y];
        this.tileTo = [x, y];
        this.position = [((tileSize * x) + 
            ((tileSize - this.dimensions[0]) / 2)), 
            ((tileSize * y) +
            (tileSize - this.dimensions[1]))];
    }

    processMovement = t => {
        if(this.tileFrom[0] === this.tileTo[0] && this.tileFrom[1] === this.tileTo[1]) {
            return false;
        }

        if((t - this.timeMoved) >= this.delayMove) {
            this.placeAt(this.tileTo[0], this.tileTo[1]);
        } else {
            this.position[0] = (this.tileFrom[0] * tileSize) +
                ((tileSize - this.dimensions[0]) / 2);
            this.position[1] = (this.tileFrom[1] * tileSize) +
                ((tileSize - this.dimensions[1]));

            if(this.tileTo[0] !== this.tileFrom[0]) {
                const diff = (tileSize / this.delayMove) *
                    (t - this.timeMoved);
                this.position[0] += (this.tileTo[0] < this.tileFrom[0] ?
                    0 - diff : diff)
            }

            if(this.tileTo[1] !== this.tileFrom[1]) {
                const diff = (tileSize / this.delayMove) *
                    (t - this.timeMoved);
                this.position[1] += (this.tileTo[1] < this.tileFrom[1] ?
                    0 - diff : diff);
            }

            this.position[0] = Math.round(this.position[0]);
            this.position[1] = Math.round(this.position[1]);
        }
        return true;
    }

    toIndex = (x, y) => {
        return (y * this.cols) + x;
    }

    draw() {
        const currentFrameTime = Date.now();
        const timeElapsed = currentFrameTime - lastFrameTime;
        
        const sec = Math.floor(Date.now() / 1000);
        
        if(sec !== currentSecond) {
            currentSecond = sec;
            framesLastSecond = frameCount;
            frameCount = 1;
        } else {
            frameCount++;
        }

        if(!this.processMovement(currentFrameTime)) {
            if(this.ref[this.toIndex(this.tileFrom[0], 
                this.tileFrom[1] + 1)] === 0) {
                    this.tileTo[1] += 1;
            } else if(keysPressed[0] === 'ArrowLeft' &&
                this.ref[this.toIndex(this.tileFrom[0] - 1,
                    this.tileFrom[1])] === 0) {
                        this.tileTo[0] -= 1;
            } else if(keysPressed[0] === 'ArrowRight' &&
                this.ref[this.toIndex(this.tileFrom[0] + 1,
                    this.tileFrom[1])] === 0) {
                        this.tileTo[0] += 1;
            }

            if(this.tileFrom[0] !== this.tileTo[0] || this.tileFrom[1] !== this.tileTo[1]) {
                this.timeMoved = currentFrameTime;
            }
        }

        const sx = 0;
        const sy = 0;
        const sw = tileSize * 3;
        const sh = tileSize * 2;
        const dx = this.position[0];
        const dy = this.position[1];
        const dw = tileSize * 3;
        const dh = tileSize * 2;

        ctx.sprite.drawImage(
            spritesheet.character,
            sx, sy, sw, sh,
            dx, dy, dw, dh
        )

        lastFrameTime = currentFrameTime;
    }
}

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
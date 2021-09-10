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
        'E': 0,  //empty
        'B': 1,  //single wall block
        'L': 2,  //left wall block
        'W': 3,  //center wall block
        'R': 4,  //right wall block
    };

    formatRef = ref => {
        return ref.map(x => Object.keys(this.legend).includes(x) ? x : 'E')
    }

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

class Level {
    constructor(cols, rows, ref) {
        this.ref = this.refToArray(ref);
        this.map = new Map(cols, rows, this.ref);
    }

    refToArray = ref => {
        return ref.match(/\w/g);
    }
}

const ref = [
    `L W W W W W W W W W W W W R 
     L W W W W W W W W W W W W R
     L W W W W W W W W W W W W R
     L W R E E E E E E E E L W R
     L W R E E F E I E C E L W R
     L W R E L W W W W W W W W R
     L W R E I E E E L W W W W R
     L W R E I E F E E E E L W R
     L W R E I E F E E E E L W R
     L W R E I E F E E E E L W R
     L W W W W W W R F E E L W R
     L W W W W W W W W W W W W R
     L W W W W W W W W W W W W R
     L W W W W W W W W W W W W R`
];

const level = [
    new Level(14, 14, ref[0])
];

level[0].map.draw();

// const main = () => {
//     window.requestAnimationFrame(main);
// }
// main();
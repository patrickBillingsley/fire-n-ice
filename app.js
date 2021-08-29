const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const map = {
    cols: 14,
    rows: 14,
    legend: {
        0: 'empty',
        1: 'wall',
        2: 'ice',
        3: 'fire',
        4: 'character',
        'E': [0, 0, 0],  //empty
        'B': [1, 0, 1],  //single wall block
        'L': [2, 0, 1],  //left wall block
        'W': [3, 0, 1],  //wall block
        'R': [4, 0, 1],  //right wall block
        'I': [0, 10, 2], //ice block
        'F': [10, 0, 3], //flame
        'C': [0, 0, 4]   //character
    },
    ref:
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
         L W W W W W W W F E E L W R
         L W W W W W W W W W W W W R
         L W W W W W W W W W W W W R
         L W W W W W W W W W W W W R`,
    getTile: (ref, col, row) => {
        return map.legend[ref[row * map.cols + col]]
    }
};

const heldDirections = [];

const tileset = new Image();
tileset.src = './resources/spritesheets/tileset.png';

const spritesheet = new Image();
spritesheet.src = './resources/spritesheets/dana-sprites.png';

formatRef();

const main = () => {
    window.requestAnimationFrame(main);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(map);
};
main()

const keys = {
    'ArrowLeft': 'left',
    'ArrowRight': 'right'
};

document.addEventListener('keydown', e => {
    const dir = keys[e.code];
    if(dir && heldDirections.indexOf(dir) === -1) {
        heldDirections.unshift(dir);
    }
    moveCharacter(heldDirections[0]);
})

document.addEventListener('keyup', e => {
    const dir = keys[e.code];
    const index = heldDirections.indexOf(dir);
    if(index > -1) {
        heldDirections.splice(index, 1);
    }
})

function formatRef() {
    if(!Array.isArray(map.ref)) {
        map.ref = map.ref.match(/\w/g);
    }
}

function isValidMove(x) {
    const nextCell = map.ref.indexOf('C') + x;
    const nextCellLogic = map.legend[map.ref[nextCell]][2];

    if(nextCellLogic === 0) {
        return true;
    } else {
        return false;
    }
}

function moveCharacter(direction) {
    if(direction === 'left') {
        if(isValidMove(-1)) {
            map.ref.splice(map.ref.indexOf('C') - 1, 2, 'C', 'E');
        }
    } else if(direction === 'right') {
        if(isValidMove(1)) {
            map.ref.splice(map.ref.indexOf('C'), 2, 'E', 'C');
        }
    }
}

function draw(map) {
    const tileSize = 16;

    for(let c = 0; c < map.cols; c++) {
        for(let r = 0; r < map.rows; r++) {
            const tile = map.getTile(map.ref, c, r);

            ctx.drawImage(
                tileset,
                tile[0] * tileSize,
                tile[1] * tileSize,
                tileSize,
                tileSize,
                c * tileSize,
                r * tileSize,
                tileSize,
                tileSize
            )

            if(tile[2] === 4) {
                drawSprite(spritesheet, 32, c, r);
            }
        }
    }
}

function drawSprite(sprites, size, c, r) {
    const yPos = (r - 1) * 16;

    ctx.drawImage(
        sprites,
        size * 3, 
        size * 0,
        size, 
        size,
        c * 16,
        yPos,
        size,
        size
    )
}
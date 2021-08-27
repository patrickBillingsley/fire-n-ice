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
    layers: [
        `L W W W W W W W W W W W W R 
         L W W W W W W W W W W W W R
         L W W W W W W W W W W W W R
         L W R E E E E E E E E L W R
         L W R E E F E I E E E L W R
         L W R E L W W W W W W W W R
         L W R E I E E E L W W W W R
         L W R E I E F E E E E L W R
         L W R E I E F E E E E L W R
         L W R E I E F E E E E L W R
         L W W W W W W W F E E L W R
         L W W W W W W W W W W W W R
         L W W W W W W W W W W W W R
         L W W W W W W W W W W W W R`
    ],
    getTile: (layer, col, row) => {
        return map.legend[layer[row * map.cols + col]]
    }
};

const stage = {
    '0-0': [2, 0],
    '1-0': [3, 0],
    '2-0': [3, 0],
    '3-0': [3, 0],
    '4-0': [3, 0],
    '5-0': [3, 0],
    '6-0': [3, 0],
    '7-0': [3, 0],
    '8-0': [3, 0],
    '9-0': [3, 0],
    '10-0': [3, 0],
    '11-0': [3, 0],
    '12-0': [3, 0],
    '13-0': [3, 0],
    '14-0': [4, 0],
    '0-1': [2, 0],
    '1-1': [3, 0],
    '2-1': [3, 0],
    '3-1': [3, 0],
    '4-1': [3, 0],
    '5-1': [3, 0],
    '6-1': [3, 0],
    '7-1': [3, 0],
    '8-1': [3, 0],
    '9-1': [3, 0],
    '10-1': [3, 0],
    '11-1': [3, 0],
    '12-1': [3, 0],
    '13-1': [3, 0],
    '14-1': [4, 0],
    '0-2': [2, 0],
    '1-2': [3, 0],
    '2-2': [3, 0],
    '3-2': [3, 0],
    '4-2': [3, 0],
    '5-2': [3, 0],
    '6-2': [3, 0],
    '7-2': [3, 0],
    '8-2': [3, 0],
    '9-2': [3, 0],
    '10-2': [3, 0],
    '11-2': [3, 0],
    '12-2': [3, 0],
    '13-2': [3, 0],
    '14-2': [4, 0],
    '0-3': [2, 0],
    '1-3': [3, 0],
    '2-3': [4, 0],
    '3-3': [0, 0],
    '4-3': [0, 0],
    '5-3': [0, 0],
    '6-3': [0, 0],
    '7-3': [0, 0],
    '8-3': [0, 0],
    '9-3': [0, 0],
    '10-3': [0, 0],
    '11-3': [0, 0],
    '12-3': [2, 0],
    '13-3': [3, 0],
    '14-3': [4, 0],
    '0-4': [2, 0],
    '1-4': [3, 0],
    '2-4': [4, 0],
    '3-4': [0, 0],
    '4-4': [0, 0],
    '5-4': [0, 0],
    '6-4': [0, 0],
    '7-4': [0, 0],
    '8-4': [0, 0],
    '9-4': [0, 0],
    '10-4': [0, 0],
    '11-4': [0, 0],
    '12-4': [2, 0],
    '13-4': [3, 0],
    '14-4': [4, 0],
    '0-5': [2, 0],
    '1-5': [3, 0],
    '2-5': [4, 0],
    '3-5': [0, 0],
    '4-5': [2, 0],
    '5-5': [3, 0],
    '6-5': [3, 0],
    '7-5': [3, 0],
    '8-5': [3, 0],
    '9-5': [3, 0],
    '10-5': [3, 0],
    '11-5': [3, 0],
    '12-5': [3, 0],
    '13-5': [3, 0],
    '14-5': [4, 0],
    '0-6': [2, 0],
    '1-6': [3, 0],
    '2-6': [4, 0],
    '3-6': [0, 0],
    '4-6': [0, 0],
    '5-6': [0, 0],
    '6-6': [0, 0],
    '7-6': [0, 0],
    '8-6': [2, 0],
    '9-6': [3, 0],
    '10-6': [3, 0],
    '11-6': [3, 0],
    '12-6': [3, 0],
    '13-6': [3, 0],
    '14-6': [4, 0],
    '0-7': [2, 0],
    '1-7': [3, 0],
    '2-7': [4, 0],
    '3-7': [0, 0],
    '4-7': [0, 0],
    '5-7': [0, 0],
    '6-7': [0, 0],
    '7-7': [0, 0],
    '8-7': [0, 0],
    '9-7': [0, 0],
    '10-7': [0, 0],
    '11-7': [0, 0],
    '12-7': [2, 0],
    '13-7': [3, 0],
    '14-7': [4, 0],
    '0-8': [2, 0],
    '1-8': [3, 0],
    '2-8': [4, 0],
    '3-8': [0, 0],
    '4-8': [0, 0],
    '5-8': [0, 0],
    '6-8': [0, 0],
    '7-8': [0, 0],
    '8-8': [0, 0],
    '9-8': [0, 0],
    '10-8': [0, 0],
    '11-8': [0, 0],
    '12-8': [2, 0],
    '13-8': [3, 0],
    '14-8': [4, 0],
    '0-9': [2, 0],
    '1-9': [3, 0],
    '2-9': [4, 0],
    '3-9': [0, 0],
    '4-9': [0, 0],
    '5-9': [0, 0],
    '6-9': [0, 0],
    '7-9': [0, 0],
    '8-9': [0, 0],
    '9-9': [0, 0],
    '10-9': [0, 0],
    '11-9': [0, 0],
    '12-9': [2, 0],
    '13-9': [3, 0],
    '14-9': [4, 0],
    '0-10': [2, 0],
    '1-10': [3, 0],
    '2-10': [3, 0],
    '3-10': [3, 0],
    '4-10': [3, 0],
    '5-10': [3, 0],
    '6-10': [3, 0],
    '7-10': [4, 0],
    '8-10': [0, 0],
    '9-10': [0, 0],
    '10-10': [0, 0],
    '11-10': [0, 0],
    '12-10': [2, 0],
    '13-10': [3, 0],
    '14-10': [4, 0],
    '0-11': [2, 0],
    '1-11': [3, 0],
    '2-11': [3, 0],
    '3-11': [3, 0],
    '4-11': [3, 0],
    '5-11': [3, 0],
    '6-11': [3, 0],
    '7-11': [3, 0],
    '8-11': [3, 0],
    '9-11': [3, 0],
    '10-11': [3, 0],
    '11-11': [3, 0],
    '12-11': [3, 0],
    '13-11': [3, 0],
    '14-11': [4, 0],
    '0-12': [2, 0],
    '1-12': [3, 0],
    '2-12': [3, 0],
    '3-12': [3, 0],
    '4-12': [3, 0],
    '5-12': [3, 0],
    '6-12': [3, 0],
    '7-12': [3, 0],
    '8-12': [3, 0],
    '9-12': [3, 0],
    '10-12': [3, 0],
    '11-12': [3, 0],
    '12-12': [3, 0],
    '13-12': [3, 0],
    '14-12': [4, 0],
    '0-13': [2, 0],
    '1-13': [3, 0],
    '2-13': [3, 0],
    '3-13': [3, 0],
    '4-13': [3, 0],
    '5-13': [3, 0],
    '6-13': [3, 0],
    '7-13': [3, 0],
    '8-13': [3, 0],
    '9-13': [3, 0],
    '10-13': [3, 0],
    '11-13': [3, 0],
    '12-13': [3, 0],
    '13-13': [3, 0],
    '14-13': [4, 0]
}
const sprites = {
    '6-4': 'f',
    // '6-4': map.legend.f,
    '8-4': map.legend.i,
    '4-6': map.legend.i,
    '4-7': map.legend.i,
    '6-7': map.legend.f,
    '4-8': map.legend.i,
    '6-8': map.legend.f,
    '4-9': map.legend.i,
    '6-9': map.legend.f,
    '8-10': map.legend.f
};

// State of character
const character = {
    x: 10,
    y: 4
};

const heldDirections = [];
// const speed = 1;

// const placeCharacter = () => {
//     const pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

//     const heldDirection = heldDirections[0];
//     if(heldDirection) {
//         if(heldDirection === directions.right) {x += speed;}
//         if(heldDirection === directions.left)  {x -= speed;}
//         character.setAttribute('facing', heldDirection)
//     }
//     character.setAttribute('walking', heldDirection ? 'true' : 'false');

//     if(character.attributes.walking.value === 'true') {
//         characterSpritesheet.className = `character__spritesheet pixel-art character__walk-${heldDirection}`;
//     } else {
//         characterSpritesheet.className = 'character__spritesheet pixel-art';
//     }

//     character.style.transform = `translate3d(${x * pixelSize}px, ${y * pixelSize}px, 0)`;
// };

const tileset = new Image();
tileset.src = './resources/spritesheets/tileset.png';

const spritesheet = new Image();
spritesheet.src = './resources/spritesheets/dana-sprites.png';

const main = () => {
    window.requestAnimationFrame(main);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(map);
    // draw(sprites);
    // drawCharacter();
};
main()

const directions = {
    left: 'left',
    right: 'right'
};

const keys = {
    'ArrowLeft': directions.left,
    'ArrowRight': directions.right
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

function isValidMove(x, y) {
    const nextCell = `${character.x + x}-${character.y + y}`;
    const nextCellHasSprite = Object.keys(sprites).includes(`${character.x + x}-${character.y + y}`);
    const nextSprite = sprites[nextCell];

    if(stage[nextCell][0] === 0 &&
        stage[nextCell][1] === 0) {
            if(nextCellHasSprite) {
                // handleNextSprite(nextCell, nextSprite);
                return false;
            }
        return true;
    }
    return false;
}

// function handleNextSprite(cell, sprite) {
//     console.log('cell:', cell, 'sprite:', sprite);
//     if(sprite[0] === 0 && sprite[1] === 10) {

//     }
// }

function updateMatrix(matrix, y, x, val) {
    matrix[y][x] = val;
}

function moveCharacter(direction) {
    if(direction === 'left') {
        if(isValidMove(-1, 0)) {
            character.x--;
        }
    } else if(direction === 'right') {
        if(isValidMove(1, 0)) {
            character.x++;
        }
    }
}

function draw(map) {
    tileSize = 16;

    
    map.layers.forEach(layer => {
        layer = layer.match(/\w/g);
        for(let c = 0; c < map.cols; c++) {
            for(let r = 0; r < map.rows; r++) {
                const tile = map.getTile(layer, c, r);

                ctx.drawImage(
                    tileset,
                    (tile[0]) * tileSize,
                    (tile[1]) * tileSize,
                    tileSize,
                    tileSize,
                    c * tileSize,
                    r * tileSize,
                    tileSize,
                    tileSize
                );
            }
        }
    })


    // const cropSize = 16;

    // Object.keys(obj).forEach(key => {
    //     xPos = +key.split('-')[0];
    //     yPos = +key.split('-')[1];

    //     const [tilesheetX, tilesheetY] = obj[key];

    //     ctx.drawImage(
    //         tileset,
    //         tilesheetX * cropSize, tilesheetY * cropSize,
    //         cropSize, cropSize,
    //         xPos * cropSize, yPos * cropSize,
    //         cropSize, cropSize
    //     )
    // })
}

function drawCharacter() {
    const cropSize = 32;

    ctx.drawImage(
        spritesheet,
        96, 0,
        cropSize, cropSize,
        character.x * 16 - 8, (character.y - 1) * 16,
        cropSize, cropSize
    )
}
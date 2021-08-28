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

// State of character
const character = {
    x: 9,
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
};
main()

// const directions = {
//     left: 'left',
//     right: 'right'
// };

// const keys = {
//     'ArrowLeft': directions.left,
//     'ArrowRight': directions.right
// };

// document.addEventListener('keydown', e => {
//     const dir = keys[e.code];
//     if(dir && heldDirections.indexOf(dir) === -1) {
//         heldDirections.unshift(dir);
//     }
//     moveCharacter(heldDirections[0]);
// })

// document.addEventListener('keyup', e => {
//     const dir = keys[e.code];
//     const index = heldDirections.indexOf(dir);
//     if(index > -1) {
//         heldDirections.splice(index, 1);
//     }
// })

// function isValidMove(x, y) {
//     const nextCell = `${character.x + x}-${character.y + y}`;
//     const nextCellHasSprite = Object.keys(sprites).includes(`${character.x + x}-${character.y + y}`);
//     const nextSprite = sprites[nextCell];

//     if(stage[nextCell][0] === 0 &&
//         stage[nextCell][1] === 0) {
//             if(nextCellHasSprite) {
//                 // handleNextSprite(nextCell, nextSprite);
//                 return false;
//             }
//         return true;
//     }
//     return false;
// }

// function moveCharacter(direction) {
//     if(direction === 'left') {
//         if(isValidMove(-1, 0)) {
//             character.x--;
//         }
//     } else if(direction === 'right') {
//         if(isValidMove(1, 0)) {
//             character.x++;
//         }
//     }
// }

function draw(map) {
    const tileSize = 16;
    const ref = map.ref.match(/\w/g)

    for(let c = 0; c < map.cols; c++) {
        for(let r = 0; r < map.rows; r++) {
            const tile = map.getTile(ref, c, r);

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
                drawCharacter(c, r);
            }
        }
    }
}

function drawCharacter(c, r) {
    const tileSize = 32;
    const yPos = (r - 1) * 16;

    ctx.drawImage(
        spritesheet,
        tileSize * 3, 
        tileSize * 0,
        tileSize, 
        tileSize,
        c * 16,
        yPos,
        tileSize,
        tileSize
    )
}
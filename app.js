const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
    '6-4': [10, 0],
    '8-4': [0, 10],
    '4-6': [0, 10],
    '4-7': [0, 10],
    '6-7': [10, 0],
    '4-8': [0, 10],
    '6-8': [10, 0],
    '4-9': [0, 10],
    '6-9': [10, 0],
    '8-10': [10, 0]
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
    draw(stage);
    draw(sprites);
    drawCharacter();
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
    if(stage[`${character.x + x}-${character.y + y}`][0] === 0 &&
        stage[`${character.x + x}-${character.y + y}`][1] === 0) {
        return true;
    }
    return false;
}

function updateMatrix(matrix, y, x, val) {
    matrix[y][x] = val;
}

function moveCharacter(direction) {
    if(direction === 'left') {
        if(isValidMove(-1, 0)) {
            character.x += -1;
        }
    } else if(direction === 'right') {
        if(isValidMove(1, 0)) {
            character.x += 1;
        }
    }
}

function draw(obj) {
    const cropSize = 16;

    Object.keys(obj).forEach(key => {
        xPos = +key.split('-')[0];
        yPos = +key.split('-')[1];

        const [tilesheetX, tilesheetY] = obj[key];

        ctx.drawImage(
            tileset,
            tilesheetX * cropSize, tilesheetY * cropSize,
            cropSize, cropSize,
            xPos * cropSize, yPos * cropSize,
            cropSize, cropSize
        )
    })
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
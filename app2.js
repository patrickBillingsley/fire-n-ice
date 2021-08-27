class GridSystem {
    constructor(matrix, playerX, playerY) {
        this.matrix = matrix;
        this.outlineContext = this.#getContext(0, 0, '#444');
        this.topContext = this.#getContext(0, 0, '#111', true);
        this.cellSize = 16;
        this.padding = 0;

        this.player = { x: playerX, y: playerY, color: 'orange' };
        this.matrix[playerY][playerX] = 4;

        document.addEventListener('keydown', this.movePlayer);
    }

    #isValidMove(x, y) {
        if(this.matrix[this.player.y + y][this.player.x + x] === 0) {
            return true;
        }
        return false;
    }

    #updateMatrix(y, x, val) {
        this.matrix[y][x] = val;
    }

    movePlayer = ({ keyCode }) => {
        if(keyCode === 37) {
            if(this.#isValidMove(-1, 0)) {
                this.#updateMatrix(this.player.y, this.player.x, 0);
                this.#updateMatrix(this.player.y, this.player.x - 1, 4);
                this.player.x--;
                this.render();
            }
        } else if(keyCode === 39) {
            if(this.#isValidMove(1, 0)) {
                this.#updateMatrix(this.player.y, this.player.x, 0);
                this.#updateMatrix(this.player.y, this.player.x + 1, 4);
                this.player.x++;
                this.render();
            }
        }
    }

    #getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + 'px',
            y: window.innerHeight / 2 - h / 2 + 'px'
        }
        
    }

    #getContext(w, h, color='111', isTransparent=false) {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = 'absolute';
        this.canvas.style.background = color;
        if(isTransparent) {
            this.canvas.style.backgroundColor = 'transparent';
        }
        const center = this.#getCenter(w, h);
        this.canvas.style.marginLeft = center.x; 
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);

        return this.context;
    }

    render() {
        const w = (this.cellSize + this.padding) * this.matrix[0].length - (this.padding);
        const h = (this.cellSize + this.padding) * this.matrix.length - (this.padding);

        this.outlineContext.canvas.width = w;
        this.outlineContext.canvas.height = h;

        const center = this.#getCenter(w, h);
        this.outlineContext.canvas.style.marginLeft = center.x; 
        this.outlineContext.canvas.style.marginTop = center.y;

        this.topContext.canvas.style.marginLeft = center.x; 
        this.topContext.canvas.style.marginTop = center.y;

        for(let row = 0; row < matrix.length; row++) {
            for(let col = 0; col < matrix[row].length; col++) {
                const cellVal = this.matrix[row][col];
                let color =
                  cellVal === 1 ? 'tan'
                : cellVal === 2 ? 'cyan'
                : cellVal === 3 ? 'red'
                : cellVal === 4 ? this.player.color
                : 'black';

                this.outlineContext.fillStyle = color;
                this.outlineContext.fillRect(col * (this.cellSize + this.padding),
                row * (this.cellSize + this.padding),
                this.cellSize, this.cellSize);
            }
        }
    }
}

const matrix = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0, 3, 0, 2, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 2, 0, 0, 0, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 2, 0, 3, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 2, 0, 3, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 2, 0, 3, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 3, 0, 0, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const gridSystem = new GridSystem(matrix, 9, 4);
gridSystem.render();
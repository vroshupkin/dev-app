

class dataGraph{
    #origin = [0, 0]

    constructor(origin){
        this.#origin = origin;
    }

    setOrigin(origin){
        console.log(this.#origin)
        this.#origin = origin
        console.log(this.#origin)
    }
}

// const d = new dataGraph([1, 2]);

// d.setOrigin([3, 4])
// d.setOrigin([1, 2])

class dataCoord{
    #zoom;
    #x; #y;
    constructor(x, y, zoom){
        this.#x = x;
        this.#y = y;
        this.#zoom = zoom;
    }

    toDrawCoord(){
        const draw_x = this.#x / this.#zoom;
        const draw_y = this.#y / this.#zoom;
        
        return [draw_x, draw_y]
    }
}

const c = new dataCoord(200, 200, 3);


const delay = (ms) => {
    return new Promise((resolve) => {setTimeout(() => resolve(), ms)})
}

function loopFunc(count){
    if(count < 10){
        console.log(count);
        
        delay(1000)
         .then(() => loopFunc(count + 1));
    }
}

loopFunc(3);

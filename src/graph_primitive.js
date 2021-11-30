class point{
    x;
    y;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class vector{
    p_1;
    p_2;
    deg;
    
    constructor(p_1, p_2){
        this.p_1 = p_1;
        this.p_2 = p_2;
        this.calDegree();
    }

    calDegree(){
        const delta_x = this.p_2.x - this.p_1.x 
        const delta_y = this.p_2.y - this.p_1.y
    
        const rad = Math.atan2(delta_y, delta_x)
        this.deg = rad * (180 / Math.PI)
    }

    calcAbs(){
        this.abs = (this.p_2.x - this.p_1.x) * (this.p_2.x - this.p_1.x) + (this.p_2.y - this.p_1.y) * (this.p_2.y - this.p_1.y)
    }
}

class rect{
    #width
    #height
    #start_point

    constructor(width, height, start_point){
        this.#width = width
        this.#height = height
        this.#start_point = start_point
    }
}


export { point, vector }


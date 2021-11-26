import { render } from '@testing-library/react';
import React, { useState, useEffect, useRef } from 'react';

// TODO Написать фунукцию для прорисовки линии
// TODO Оси написать с использование функции прорисовки линии по 2 точкам
/* IDEA сделать объект камера
    1. Координаты
    2. Ширина, высота 
*/
function Row(props){
    const flex_style = {
        "display"       : 'flex',
        "flex-direction": "row"
    };
    const div_style = {
        "height"        : "20px",
        "width"         : "20px",
        "border"        : "1px solid black",
        "text-align"    : "center"
    }

    const [data, setData] = useState(props.data);

    return(
        <div style={flex_style}>
            {data.map((val) =>{
                return(
                    <div style={div_style}>{val}</div>    
                )
            })}
            
        </div>
    )
}


// 1. Вычисляет шаг по Х
// 2. Вычисляет шаг по Y
// TODO Сделать метод изменения количества линий
// TODO сделать метод смещения сетки по X и Y

class point{
    x;
    y;
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

class workingArea{
    #w; #h; #z      // width, height, zoom
    #globalStartPoint;
    #workingAreaPoing;

    #globalPoints;

    constructor(width, heigth, zoom, globalStartPoint){
        this.#w = width;
        this.#h = heigth;
        this.#z = zoom;
        this.#globalStartPoint = globalStartPoint;

        this.#globalPoints = [
            new point(globalStartPoint[0],                   globalStartPoint[1]),
            new point(globalStartPoint[0] + width * zoom,    globalStartPoint[1]),
            new point(globalStartPoint[0] + width * zoom,    globalStartPoint[1] + heigth * zoom),
            new point(globalStartPoint[0],                   globalStartPoint[1] + heigth * zoom)
        ]
    }
}

// IDEA может быть хорошим примитивом
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

class gridModel{
    // Step scale
    step_x;
    step_y;

    #width;
    #height;
    #origin;
    #zoom;
    
    constructor(width, height, origin, zoom){
        // console.log("Constructor call - gridModel")  [debug]
        this.#width = width;
        this.#height = height;
        this.#origin = origin;
        this.#zoom = zoom;

        this._calcStepX(10);
        this._calcStepY(10);
    }

    _calcStepX(n){
        this.step_x = this.#width / n;
    }

    _calcStepY(n){
        this.step_y = this.#height / n;
    }

    _draw_axis(ctx){
        
        ctx.lineWidth = 2.2;

        const start_x = this.#origin[0]
        const end_x = start_x + this.#width * this.#zoom
        if(start_x <= 0 && end_x >= 0){
            ctx.strokeStyle = "#008000";
            const ratio = start_x / this.#width
            //console.log("%", ratio)
            
            ctx.beginPath();
            ctx.moveTo(-ratio * this.#width, 0);
            ctx.lineTo(-ratio * this.#width, this.#height)
            ctx.closePath()
            ctx.stroke()
        }

        // X AXIS
        const start_y = this.#origin[1]
        const end_y = start_y + this.#height * this.#width;
        if(start_y <= 0 && end_y >= 0){
            ctx.strokeStyle = "#FF2D00";
            const ratio = start_y / this.#height
            console.log("%", ratio)
            // console.log("p1 =", 0, -ratio * this.#height)
            // console.log("p2 =", this.#width-100, -ratio * this.#height)
            
            
            ctx.beginPath();
            ctx.moveTo(0, -ratio * this.#height);
            ctx.lineTo(this.#width, -ratio * this.#height)
            ctx.closePath()
            ctx.stroke()
        }
    }

    draw(ctx){
        if(ctx === undefined) return;
        this._draw_axis(ctx)

        ctx.strokeStyle = "#8a8a8a";
        ctx.lineWidth = 0.3;

        var x = this.#origin[0] % this.step_x;
        while(x < this.#width){
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.#height);   
            ctx.closePath();
            ctx.stroke();
            
            // X-axis
            const x_text = Number((x + this.#origin[0] / this.#zoom)).toString();
            // X-text
            ctx.fillText(x_text, x, 15);
            x += this.step_x;    
        }


        var y = this.#origin[1] % this.step_y;
        while(y < this.#height){
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.#width, y);   
            ctx.closePath();
            ctx.stroke();

            // Y-axis 
            const y_text = Number(- (y + this.#origin[1]) / this.#zoom).toString();
            // Y-text
            ctx.fillText(y_text, this.#width - 30, y);
            y += this.step_y;
        }
        
        
    }
}

/*  TODO
    Интерфейс должен содержать
    1. Выбор цвета
    2. Выбор ширины линии
    3. Выбор типа линии (сплошная, прерывистая) 
*/
class dataLine{
    #data = []
    #scale = 1
    #origin = [0, 0]
    #zoom = 1

    color = "#1d1f24"
    constructor(data, scale, origin, zoom){
        // console.log("Constructor call - dataLine")       [debug]

        this.#data   = data
        this.#scale  = scale
        this.#origin = origin
        this.#zoom = zoom

        console.log(this.#origin )
    }

    draw(ctx){
        if(ctx === undefined){
            console.log(ctx);
            return;
        } 
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;

        console.log("origin", this.#origin)
        for(let i = 0; i < (this.#data[0].length-1); i++){        
            const start_point_x =    this.#zoom * this.#scale * this.#data[0][i] - this.#origin[0];
            const start_point_y = - (this.#zoom * this.#scale * this.#data[1][i] + this.#origin[1]);
            const end_point_x   =    this.#zoom * this.#scale * this.#data[0][i+1] - this.#origin[0];
            const end_point_y   = - (this.#zoom * this.#scale * this.#data[1][i+1] + this.#origin[1]);
            
            // console.log(i)
            // console.log("(", start_point_x, ",", end_point_x, ")");
            // console.log("(", start_point_y, ",", end_point_y, ")");
            

            ctx.beginPath();
            ctx.moveTo(start_point_x, start_point_y);
            ctx.lineTo(end_point_x, end_point_y);   
            ctx.closePath();
            ctx.stroke();
        }
    }
    
    
   
}


/* TODO
    1. В общей программе сделать контейнер для линий
    2. 
*/
function Graph(props){
    const width  = 700;
    const height = 400;
    const [cameraCoord,  setCameraCoord]   = useState([-0.1 * width, -0.9 * height])
    const [graphScale, setGraphScale] = useState(1)
    const [zoom, setZoom] = useState(1)
    

    
    var data = [
        ["x", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
        ["y", 3, 5, 6, 7, 8, 4, 5, 6, 2, 20, 30, 15, 19, 20, 25, 3, 5, 6, 7, 8, 4, 5, 6, 2, 20, 30, 15, 19, 20, 25]
    ];

    // const woking_area = new workingArea(width, height, zoom)         [del]
    const data_line = new dataLine(data, graphScale, cameraCoord, zoom)
    const grid = new gridModel(width, height, cameraCoord, zoom);

    const buttons_flex = {
        "display"       : "flex",
        "flex-direction": "row"
    };
    const canvas_style = {
        "border"        : "1px solid black",
        //"width"         : width + "px",
        //"height"        : height + "px"
    }

    const main_div_style = {
        "width"     : width + "px"
    }

    const canvasRef = useRef(null);
    

    // function draw_vertical_line(x){
    //     const ctx = canvasRef.current.getContext('2d')
    //     ctx.clearRect(0, 0, width, height);

    //     renderData(ctx);
    //     grid.draw(ctx);
    //     ctx.lineWidth = 0.3;
    //     ctx.strokeStyle = "#47c736";

        
    //     ctx.beginPath();
    //     ctx.moveTo(x, 0);
    //     ctx.lineTo(x, height);   
    //     ctx.closePath();
    //     ctx.stroke();
    // }


    // Если []  - то изменяется после каждого рендера
    // [res]    - подписывается на изменения res

    function render(){

        // console.log("Render");                       [debug]
        const ctx = canvasRef.current.getContext('2d')
        ctx.clearRect(0, 0, width, height);

        grid.draw(ctx);
        data_line.draw(ctx);

    }

    function logState(){
        const out = {
            graphScale: graphScale,
            globalOrigin: cameraCoord,
            zoom: zoom
        }

        console.log("States: ",out)
    }

    useEffect(() => {
        logState();
        render()
    }, [graphScale, zoom, cameraCoord])

    useEffect(() => {
        
        render()
    }, [cameraCoord])

    return (
        <div style={main_div_style}>
            <canvas
                onWheel={e => {
                    if(e.altKey)
                        setCameraCoord([cameraCoord[0] + e.deltaY, cameraCoord[1]]);
                    else
                        setCameraCoord([cameraCoord[0], cameraCoord[1] + e.deltaY]);
                    }}
                    
                style={canvas_style}
                width={width}
                height={height}
                ref={canvasRef}> 
             </canvas>
            <div width={width + "px"} style={buttons_flex}>
                <button onClick={() => {setGraphScale(graphScale + 1)}}>+</button>
                <button onClick={() => {setGraphScale(graphScale - 1)}}>-</button>
                <button onClick={() => {setCameraCoord([cameraCoord[0] + 1, cameraCoord[1]])}}>X+</button>
                <button onClick={() => {setCameraCoord([cameraCoord[0] - 1, cameraCoord[1]])}}>X-</button>
                <button onClick={() => {setCameraCoord([cameraCoord[0], cameraCoord[1] + 1])}}>Y+</button>
                <button onClick={() => {setCameraCoord([cameraCoord[0], cameraCoord[1] - 1])}}>Y-</button>
                <button onClick={() => {setZoom(zoom * 2)}}>Zoom x2</button>
                <button onClick={() => {setZoom(zoom / 2)}}>Zoom /2</button>
            </div>  
        </div>
    );

}



export default Graph
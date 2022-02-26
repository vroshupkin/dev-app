import React, { useState, useEffect, useRef } from 'react';
import { point, vector } from "./graph_primitive"

// TODO Написать фунукцию для прорисовки линии: draw_line(p_1, p_2)
// TODO Оси написать с использование функции прорисовки линии по 2 точкам
/* IDEA сделать объект - камера
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

function canvasDrawLine(ctx, p1, p2){
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);   
    ctx.closePath();
    ctx.stroke();
}

// 1. Вычисляет шаг по Х
// 2. Вычисляет шаг по Y
// TODO Сделать метод изменения количества линий
// TODO сделать метод смещения сетки по X и Y


// IDEA может быть хорошим примитивом

class gridModel{
    // Step scale
    step_x;
    step_y;

    #width;
    #height;
    #origin;
    #zoom;
    
    constructor(width, height, origin, zoom){
        this.#width = width;
        this.#height = height;
        this.#origin = origin;
        this.#zoom = zoom;

        this._calcStepX(10);
        this._calcStepY(10);

        // console.log("Constructor call - gridModel")  [debug]
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
            
            const p1 = new point(-ratio * this.#width, 0)
            const p2 = new point(-ratio * this.#width, this.#height)
            canvasDrawLine(ctx, p1, p2)

            //console.log("%", ratio)
        }

        // X AXIS
        const start_y = this.#origin[1]
        const end_y = start_y + this.#height * this.#width;
        if(start_y <= 0 && end_y >= 0){
            ctx.strokeStyle = "#FF2D00";
            const ratio = start_y / this.#height
            
            const p3 = new point(0, -ratio * this.#height)
            const p4 = new point(this.#width, -ratio * this.#height)
            canvasDrawLine(ctx, p3, p4)

            // console.log("%", ratio)
            // console.log("p1 =", 0, -ratio * this.#height)
            // console.log("p2 =", this.#width-100, -ratio * this.#height)
            
        }
    }

    draw(ctx){
        if(ctx === undefined) return;
        this._draw_axis(ctx)

        ctx.strokeStyle = "#8a8a8a";
        ctx.lineWidth = 0.3;

        var x = this.#origin[0] % this.step_x;
        while(x < this.#width){
            const p1 = new point(x, 0)
            const p2 = new point(x, this.#height)
            canvasDrawLine(ctx, p1, p2)
            // ctx.beginPath();
            // ctx.moveTo(x, 0);
            // ctx.lineTo(x, this.#height);   
            // ctx.closePath();
            // ctx.stroke();
            
            // X-axis
            const x_text = Number((x + this.#origin[0] / this.#zoom)).toString();
            // X-text
            ctx.fillText(x_text, x, 15);
            x += this.step_x;    
        }


        var y = this.#origin[1] % this.step_y;
        while(y < this.#height){
            const p1 = new point(0, y)
            const p2 = new point(this.#width, y)
            canvasDrawLine(ctx, p1, p2)

            // ctx.beginPath();
            // ctx.moveTo(0, y);
            // ctx.lineTo(this.#width, y);   
            // ctx.closePath();
            // ctx.stroke();

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

        // console.log(this.#origin )
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
            
            const p1 = new point(start_point_x, start_point_y)
            const p2 = new point(end_point_x, end_point_y)

            canvasDrawLine(ctx, p1, p2)
        }
    }
    
    
   
}


const graph_style = {
    buttons_flex:{
        "display"       : "flex",
        "flex-direction": "row"
    },
    canvas_style:{
        "border"        : "1px solid black",
    }
}

function Graph(props){
    const width  = 700;
    const height = 400;
    const [cameraCoord,  setCameraCoord]    = useState([-0.1 * width, -0.9 * height])
    const [graphScale, setGraphScale]       = useState(1)
    const [zoom, setZoom] = useState(1)
    const [coord, setCoord] = useState([0, 0])

    const canvasRef = useRef(null);
    
    const data_line = new dataLine(props.data, graphScale, cameraCoord, zoom)    
    const grid      = new gridModel(width, height, cameraCoord, zoom);

    const main_div_style = {"width": width + "px"}

    function render(){
        const ctx = canvasRef.current.getContext('2d')
        // Full clear zone
        ctx.clearRect(0, 0, width, height);
        grid.draw(ctx);
        data_line.draw(ctx);

    }

    useEffect(() => {
        render()
    }, [graphScale, zoom, cameraCoord])


    useEffect(() => {
        // console.log(coord)
    }, [coord])

    return (
        <div style={main_div_style}>
            <canvas
                width   = {width}
                height  = {height}
                style   = {graph_style.canvas_style}
                ref     = {canvasRef}

                // Зумирование
                onWheel={e => {
                    if(e.altKey)    setCameraCoord([cameraCoord[0] + e.deltaY, cameraCoord[1]]);
                    else            setCameraCoord([cameraCoord[0], cameraCoord[1] + e.deltaY]);
                    }}
                
                // Для отображения координат
                onMouseMove= {e => {
                    const start_p   = new point(0, 0);
                    const coord_p   = new point(e.nativeEvent.layerX + cameraCoord[0], -1 * (e.nativeEvent.layerY + cameraCoord[1]));
                    const vect      = new vector(start_p, coord_p);

                    setCoord([coord_p.x, coord_p.y])
                    }
                }
                > 
             </canvas>
            <div>x:{coord[0]}, y:{coord[1]}</div> 
            <div width={width + "px"} style={graph_style.buttons_flex}>
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
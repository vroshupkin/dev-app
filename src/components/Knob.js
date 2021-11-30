import React, { useState, useEffect, useRef} from 'react';
import { vector, point } from '../graph_primitive';

export default Knob

const delay = (ms) => {
    return new Promise((resolve) => {setTimeout(() => resolve(), ms)})
}

function calcDegree(p_1, p_2){
    const delta_x = p_2.x - p_1.x 
    const delta_y = p_2.y - p_1.y
    
    const rad = Math.atan2(delta_y, delta_x)
    let deg = rad * (180 / Math.PI)

    return deg
}

function calculate_center(top, left, height, width){
    return [top + (height / 2), left + (width / 2)]
}

function get_center_div(div){
    const p = new point(0, 0)
    p.x = div.current.offsetLeft + div.current.offsetWidth / 2;
    p.y = div.current.offsetTop  - div.current.offsetHeight / 2;
    
    
    return p;
}


function Knob(){
    const [size, setSize] = useState([50, 50]);
    const [pressClick, setPressClick] = useState(0)
    const refArrow = useRef();
    const refWrapper = useRef();

    function knob_event(e){
        console.log(e)
        e.preventDefault();
        console.log("(", e.clientX, ", ", e.clientY, ")");        
        setPressClick(1)
        
        // const mouse_point = new point(e.clientX, e.clientY)
        // const v_1 = new vector(get_center_div(refWrapper), mouse_point)
        // console.log(v_1)

        // console.log("offsetTop", refArrow.current.offsetTop, "offsetLeft", refArrow.current.offsetLeft)
        // refArrow.current.style.
    }
    
    function mouse_move(e){
        if(pressClick){
            const mouse_p  = new point(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
            const center_p = new point(25, 25)

            console.log(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            const v_1 = new vector(center_p, mouse_p)      
            console.log(v_1) 
        }
    }

    function release_click(e){
        setPressClick(0)
    }

    useEffect(() => {
        console.log("press_click =", pressClick)
    }, [pressClick])
    
    
    const wrapper_style = {
        background: "#333",
        "border-radius": "40px",
        
        width: "50px",
        height: "50px"
    }

    const arrow_style = {
        background: "#CCC",
        width: "10px",
        height: "10px",
        "border-radius": "10px",

        position: "relative",
        top: "3px",
        left: "20px"
        

        
    }


    return(
        <div ref={refWrapper} style = {wrapper_style}
            onMouseDown = {knob_event}
            onMouseUp = {release_click}
            onMouseMove = {mouse_move}
            >
            <div ref={refArrow} style = {arrow_style}></div>
        </div>
    )
}

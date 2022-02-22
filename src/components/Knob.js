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
    const [arrowCoord, setArrowCoord] = useState([0, 0]);
    const [angle, setAngle] =  useState([0, 0]);
    const [rotCount, setRotCount] = useState(0);

    const [pressClick, setPressClick] = useState(0)
    const refArrow = useRef();
    const refWrapper = useRef();

    function knob_event(e){
        // console.log(e)
        e.preventDefault();
        // console.log("(", e.clientX, ", ", e.clientY, ")");        
        setPressClick(1)
        
        // const mouse_point = new point(e.clientX, e.clientY)
        // const v_1 = new vector(get_center_div(refWrapper), mouse_point)
        // console.log(v_1)

        // console.log("offsetTop", refArrow.current.offsetTop, "offsetLeft", refArrow.current.offsetLeft)
        // refArrow.current.style.
    }
    
    function mouse_move(e){
        if(pressClick){
            let rad = Math.atan2(e.nativeEvent.offsetY - 25, e.nativeEvent.offsetX - 25) + Math.PI;
            rad /= 2 * Math.PI;

            setAngle([angle[1], rad])
            let delta = angle[1] - angle[0];
            if(delta < -0.8)
                setRotCount(rotCount + 1)
            else if(delta > 0.8)
                setRotCount(rotCount - 1)

            setArrowCoord([e.nativeEvent.offsetX, e.nativeEvent.offsetY])
        }
    }

    function release_click(e){
        // console.log(e)
        console.log(`${e.nativeEvent.offsetX}, ${e.nativeEvent.offsetY}`)
        
        setPressClick(0)
    }

    useEffect(() => {
        // console.log("press_click =", pressClick)
    }, [pressClick])
    
    
    const wrapper_style = {
        background: "#333",
        "border-radius": "40px",
        
        width: "50px",
        height: "50px"
    }

    let arrow_style = {
        position: "relative",
        width: "10px",
        height: "10px",

        top: arrowCoord[1],
        left: arrowCoord[0],
        "pointer-events": "none",
        "border-radius": "10px",
        background: "#CCC",   
    }


    return(
        <div>
            <div ref={refWrapper} style = {wrapper_style}
                onMouseDown = {knob_event}
                onMouseUp = {release_click}
                onMouseMove = {mouse_move}
                >
                <div ref={refArrow} style = {arrow_style}></div>    
            </div>
            <div>{rotCount + angle[1]}</div>
        </div>
    )
}

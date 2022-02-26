import React, { useState, useEffect, useRef} from 'react';
import { vector, point } from '../graph_primitive';

export default Knob


function Knob(){
    const [arrowCoord, setArrowCoord] = useState([0, 22]);           // Position coordinates
    const [angle, setAngle] =  useState([0, 0]);
    const [rotCount, setRotCount] = useState(0);

    const [pressClick, setPressClick] = useState(0)
    const refArrow = useRef();
    const refWrapper = useRef();

    function knob_event(e){
        e.preventDefault();   
        setPressClick(1)
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
        setPressClick(0)
    }

    useEffect(() => {
        // console.log("press_click =", pressClick)
    }, [pressClick])
    
    const main_wrapper_style = {
        width: "70px",
        height: "70px",
        margin: "0px"
        
    }

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
        <div style={main_wrapper_style}>
            <div ref={refWrapper} style = {wrapper_style}
                onMouseDown = {knob_event}
                onMouseUp = {release_click}
                onMouseMove = {mouse_move}
                >
                <div ref={refArrow} style = {arrow_style}></div>    
            </div>
            <div>{(rotCount + angle[1]).toFixed(3)}</div>
        </div>
    )
}

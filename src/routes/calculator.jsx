import React, { useState, useEffect, useRef } from 'react';


// Сделать алгоритм используя запоминание данных 
function fact(x){
    if(x == 0) return 1;

    let num = 1;
    for(let i = 1; i < x + 1; i++){
        num *= i;
    }
    return num
}


function sine(x, accr=10){
    let sum = 0;
    x %= Math.PI;
    for(let k=0; k<accr; k++){
        
        let sign;
        if(k%2)     sign = -1;
        else        sign = 1;

        const div = fact(2*k + 1);
        const multp = x ** (2*k + 1);

        sum += (sign * multp) / (div);
    }

    return sum;
}




function Component_1(){
    const [x, setX] = useState('0');

    let flex_row = {
        "display":"flex",
        "flex-direction":"row",
        "align-items":"center"
    }
    let textarea_style = {
        width:"46px",
        height: "15px",
        resize: "none"
    }
    const div_font = {
        "font-size": "20px",

    }
    const text_area_handler = (e) => {
        let val = sine(e.target.value)
        setX(val.toPrecision(4));
    }
    
    return(
        <div style={flex_row}>
            <div style={div_font}>sin(</div>
            <textarea maxlength="6" onChange={text_area_handler} style={textarea_style}></textarea>
            <div style={div_font}>) = {x}</div>
        </div>
    )
}

export default function Calculator(){
    return(
        <main style={{ padding: "1rem 0" }}>
            <Component_1></Component_1>
        </main>
    )
}
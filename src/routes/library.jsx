import React, { useState, useEffect, useRef } from 'react';
import {Route, Routes} from "react-router-dom";
import './library.css'
// ctrl + P         - Открытие файлов из текущего контекста экспорера
// ctrl + shift + P - Открыть командную строку vscode


// TreeView - https://www.w3schools.com/howto/howto_js_treeview.asp 
export default function Library(){

    const refCaret = useRef(null);
    
    useEffect(() => {
        console.log("It's call")

    }, [])

    function caretHandler(e){
        console.log(e.currentTarget.parentElement)
        console.log(e.currentTarget.children)
        
        
        
    }

    return(
        // <ul id="myUL">
        //     {/* <li><span className="caret" onClick={caretHandler}>HTML</span> */}
        //     <li><span className="caret">HTML</span>
        //         <ul className="nested"> 
        //             <li>Water</li>
        //             <li display="none">Coffee</li>
        //         </ul>
        //     </li>
        // </ul>
        <div className='library'>
            
                <div className='left-menu'>
                    <div className='nested'>Hello</div>
                    <url>qwert</url>
                    <div>Tree</div>

                </div>

                <switch className='library-content'>
                    <Routes>
                        <Route path="/library/block_1">
                            <Block_1></Block_1>
                        </Route>
                        <Route path="library/block_2">
                            <Block_2></Block_2>
                        </Route>
                    </Routes>
                </switch>
            
        </div>
    )
}

function Block_1(){
    return(
        <div>Block_1</div>
    )
}

function Block_2(){
    return(
        <div>Block_2</div>
    )
}

nested_handler()

function nested_handler(){
    let toggler = document.getElementsByClassName("caret")
    
    for(let i = 0; i < toggler.length; i++){
        toggler[i].addEventListener("click", function() {
            this.parentElement.querySelector(".nested").classList.toggle("active");
            this.classList.toggle("caret-down");
        })
    }
    
}

/* Knowledge HTML https://www.w3schools.com/tags/ref_standardattributes.asp
    Абсолютно у любого тега есть аттрибуты:
        1. class, id            - для использование стилизации и javascript
        2. hidden               - для скрытия элемента из DOM
        3. draggable            - можно ли перенести элемент мышкой             [?]
        4. translate, lang      - для автоматического перевода                  [?]

*/

/*  Knowledge React
     Название стилей должно быть в camelCase
     justifyContent
     flexDirection
*/ 

/*  Knowledge React
        1. Получение доступа к элементу в обработчике
            handler(event) {event.currentTarget}
        2. Получение списка всех классов элемента в его обработчике
            handler(event) {event.currentTarget.classList}
*/

/*  Knowledge React
        https://developer.mozilla.org/en-US/docs/Web/API/Element/classList
        1. Получение списка всех классов элемента
            element.classList
        2. Добавление, удаление, переключение классов к элементу
            element.classList.add("qwerty")
            element.classList.remove("qwerty")
            element.classList.toggle("qwerty")
            
            
*/

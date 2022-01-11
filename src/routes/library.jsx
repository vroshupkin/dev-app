import React, { useState, useEffect, useRef } from 'react';

// ctrl + P         - Открытие файлов из текущего контекста экспорера
// ctrl + shift + P - Открыть командную строку vscode

export default function library(){

    return(
        <div>
            <ul>
                <li>
                    <li class="nested">
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                        <div>1</div>
                    </li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                </li>
            </ul>
        </div>
    )
}

nested_handler()

function nested_handler(){
    console.log("This page work1")
}

/* Knowledge HTML
    Абсолютно у любого тега есть аттрибуты:
        1. Class, ID    - для использование стилизации и javascript
        2. Hidden       - для скрытия элемента из DOM
        3. 

*/
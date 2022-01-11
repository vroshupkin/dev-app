import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from           "./App"
import Head from          "./Head"
import Calculator from    "./routes/calculator"
import Library from       "./routes/library"

ReactDOM.render(
  <BrowserRouter>
    <Head></Head>
    <Routes>
      <Route path="/"           element={<App />}>        </Route>
      <Route path="calculator"  element={<Calculator/>}>  </Route>
      <Route path="library"     element={<Library/>}>     </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


/* TODO написать в библиотеку пример роутера
    1. В начале нужно создать страницу роутера
    2. Добавить элемент благодаря, которому можно перейти в роутер
*/

/*  Knowledge React
      Все начинает исполнятся из index.js ?
*/

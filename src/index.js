import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import Head from "./Head"
import Calculator from './routes/calculator'


ReactDOM.render(
  <BrowserRouter>
    <Head></Head>
    <Routes>
      
      <Route path="/" element={<App />}></Route>
      <Route path="calculator" element={<Calculator/>}> </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

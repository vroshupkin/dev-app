import NumericConverter from './components/NumericConverter.js';
import Knob from './components/Knob.js'
import React, { useState } from 'react';
import Graph from "./Canvas.js"

var data = [
  ["x", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
  ["y", 3, 5, 6, 7, 8, 4, 5, 6, 2, 20, 30, 15, 19, 20, 25, 3, 5, 6, 7, 8, 4, 5, 6, 2, 20, 30, 15, 19, 20, 25]
];

function App() {
  return (
    <div className="App">
      <div>Hello convrter</div>
      <NumericConverter/>
      <Graph data={data}/>
      <Knob/>

    </div>
  );
}



export default App;

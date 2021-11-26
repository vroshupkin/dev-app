import NumericConverter from './components/NumericConverter.js';
import Knob from './components/Knob.js'
import React, { useState } from 'react';
import Graph from "./Canvas.js"



function App() {
  return (
    <div className="App">
      <div>Hello convrter</div>
      <NumericConverter/>
      <Graph/>
      <Knob/>

    </div>
  );
}



export default App;

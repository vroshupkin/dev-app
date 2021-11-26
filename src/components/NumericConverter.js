import React, { useState, useEffect } from 'react';
export default NumericConverter

var bit_operation = {
    // Преобразует число по основанию base 
    convert_data: (str) =>{
      if     (str[1] === "x")     return parseInt(str.slice(2), 16);
      else if(str[1] === "o")     return parseInt(str.slice(2), 8);
      else if(str[1] === "b")     return parseInt(str.slice(2), 2)
      else                        return;
    },
  
    // Переварачивает число, зеркалит 0x1234 -> 0x4321
    reverse_bin_data: (str) =>{
      if(str.length < 2)      
          return NaN
  
      var out = str.slice(0, 2);
      for(var i = (str.length-1); i >= 2; i--)
          out += str[i];
  
      return out
    }
  }
  
  function NumericConverter(props){
    const [data, setData] = useState(["0", "0", "0", "0"])
  
    var bit_oper = bit_operation;
    function handlerOnChng(e){
      var d_1 = e.target.value 
      var d_2 = bit_oper.convert_data(d_1)
      var d_3 = bit_oper.reverse_bin_data(d_1)
      var d_4 = bit_oper.convert_data(d_3)
  
      setData([d_1, d_2, d_3, d_4]);
    }
  
    return(
      <div>
        <textarea onChange={handlerOnChng}></textarea>
        <div>{data[0]} = {data[1]}</div>
        <div>{data[2]} = {data[3]}</div>
      </div>
    )
  }


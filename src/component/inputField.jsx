import React from 'react';



const Input= ({text, handleText, putTodo})=> {

    return (
       
        <label>
            <input value={text} onChange={(e)=>{handleText(e.target.value)}}/> 
            <button onClick={putTodo}> add todo</button>
         </label>
         
         
      )
}

export default Input;
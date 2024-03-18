

import { useRef, useState } from 'react';



function App() {
  const [count, setCount] = useState(0);
  const countref =useRef(0);

  const increaseRef = () => {
    countref.current++;
    console.log("Ref + :",countref.current);
  }


  const increaseState = () =>{
    setCount(prev => prev +1 );
  }

  return (
    <div className='App'>
      <header className="App-header">
        <p>REf {countref.current}</p>
        <p>State {count}</p>
      </header>

      <div>
        <button onClick={increaseRef}> REf + </button>
        <button onClick={increaseState}> State + </button>
      </div>
      
    </div>
  )
}


export default App;

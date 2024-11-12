import './App.css';
import { useState } from "react";


function NameList() {
  const [list, setList] = useState(["Hasan","Neha","Mharin"]);
  const [name,setName] = useState("");
  const addName = ()=> {
    setList([...list,name]);
    setName("");

  }

  return(
    <div>
      <ul>
        {list.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e)=>setName(e.target.value)}
      />
      <button onClick={addName}>Add Name</button>
    </div>
  )
}

function Counter() {

  const [count,setCount] = useState(10);

  function addOne() {
    setCount(count+1);
  }
  return (
    <div className="Counter">
    <button onClick={addOne}>Count = {count}</button>
      
    </div>
  );
}

function App() {

  return (
    <div className="App">
    <Counter/>
    <Counter/>
    <Counter/>

    <NameList/>

    </div>
  )
}

export default App;

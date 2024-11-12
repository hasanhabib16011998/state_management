import './App.css';
import { useState,useEffect } from "react";


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


function NameEffect(){
  const [names,setNames] = useState([]);

  useEffect(()=>{
    fetch("/names.json")
    .then((response)=>response.json())
    .then((data)=> setNames(data));
  },[]);

  const [selectedName,setSelectedName] = useState(null);

  return(
    <div>
      <div>
        {names.map((name)=>(
          <button onClick={()=>setSelectedName(name)}>{name}</button>
        ))}
      </div>
      <div>{selectedName}</div>
    </div>
  )
}

function App() {

  return (
    <div className="App">
    <h2>Usestate demo</h2>
    <Counter/>
    <Counter/>
    <Counter/>
    <NameList/>

    <h2>Useeffect demo</h2>
    <NameEffect/>

    </div>
  )
}

export default App;

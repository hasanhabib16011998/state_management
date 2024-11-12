import './App.css';
import { useReducer } from "react";


function UserForm(){
  return(
    <div>
      <input
        type="text"
        value={state.first}
      />
      <input
        type="text"
        value={state.second}
      />
    </div>
  );
}

function NameList() {

  const [state,dispatch] = useReducer((state,action)=>{
    switch(action.type){
      case "SET_NAME":
        return {...state,name:action.payload};
      case "ADD_NAME":
        return {
          ...state,
          names:[...state.names,state.name],
          name:"",
        };
      default:
        break;
    }

  },{
    names:[],
    name:"",
  });

  return (
    <div className="App">

    <div>
      {state.names.map((name,index)=>(
        <div key={index}>{name}</div>
      ))}
    </div>
    <input
      type="text"
      value={state.name}
      onChange={e => dispatch({type: "SET_NAME", payload: e.target.value })}
    />

    <button
    onClick={()=>dispatch({type:"ADD_NAME"})}
    >Add name</button>


    </div>
  );
}


function App(){
  return(
    <div>
      <NameList/>
    </div>
  )
}
export default App;

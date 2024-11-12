import { ProductCard, ProductProvider } from "./store/Products";
import './App.css';

function App() {

  return (
    <div className="App">


      <ProductProvider>
        <ProductCard/>
      </ProductProvider>


    </div>
  );
}

export default App;

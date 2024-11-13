import { ProductCard, ProductProvider,SearchBox } from "./store/Products";
import './App.css';




function App() {

  return (
    <div className="App">


      <ProductProvider>
        <SearchBox/>
        <ProductCard/>
      </ProductProvider>


    </div>
  );
}

export default App;

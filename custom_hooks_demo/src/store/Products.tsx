import React, { useEffect, useState, useReducer, createContext,useContext, useCallback, useMemo } from 'react';

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
}

export function SearchBox(){
  const {search,setSearch}= useProducts();
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search-input"
      />
    </div>
  );
   
}

function useProductSource():{
  products: Products[];
  search:string;
  setSearch:(search:string)=>void;
} {

  type ProductState={
    products:Products[],
    search:string;
  }
  type ProductAction = 
    | { type: "setProducts"; payload: Products[] }
    | { type: "setSearch"; payload: string };

  const [{products,search },dispatch] = useReducer((state:ProductState,action:ProductAction)=>{
    switch(action.type){
      default:
        return state;
      case "setProducts":
        return {...state,products:action.payload};
      case "setSearch":
        return {...state,search:action.payload};
    }

  },{
    products:[],
    search:"",
  });

  useEffect(()=>{
    fetch('https://dummyjson.com/products')
    .then(res=>res.json())
    .then((json)=>dispatch({
      type:"setProducts",
      payload:json.products,
    }))
  },[]);

  const setSearch = useCallback((search:string)=>{
    dispatch({
      type:"setSearch",
      payload:search,
    });
  },[]);

  const filteredProducts = useMemo(
    () => products.filter((p) => p.title.toLowerCase().includes(search)),
    [products, search]
  );
  
  return { products:filteredProducts,search,setSearch};

}

const ProductContext = createContext<ReturnType<typeof useProductSource> | undefined
>(undefined);


function useProducts(){
  return useContext(ProductContext)!;
}
export const ProductCard = () => {
  const { products } = useProducts();
  return (
    <div className="product-list">
      {products.map((p) => (
        <div key={p.id} className="product-card">
          <img src={p.images[0]} alt={p.title} className="product-image" />
          <div className="product-details">
            <h2 className="product-title">{p.title}</h2>
            <p className="product-price">${p.price.toFixed(2)}</p>
            <p className="product-rating">Rating: {p.rating.rate} ({p.rating.count} reviews)</p>
            <p className="product-description">{p.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export function ProductProvider({children}:{
    children: React.ReactNode;
}){
    return(
    <ProductContext.Provider value={useProductSource()}>
        {children}
    </ProductContext.Provider>
    );
}
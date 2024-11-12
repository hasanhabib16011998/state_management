import React, { useEffect, useState, createContext,useContext } from 'react';

interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}


function useProductSource():{
  products: Products[];
} {
  const[products,setProducts] = useState<Products[]>([]);

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=>setProducts(json))
  },[]);
  return {products};

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
          <img src={p.image} alt={p.title} className="product-image" />
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
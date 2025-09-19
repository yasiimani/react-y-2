import axios from "axios"

const BASE_URL ='https://dummyjson.com'

const api = axios.create({
    baseURL : BASE_URL
})
 export type TProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
};

type TQuery={
  limit:number,
  skip : number,
  q:string
}

export const getCharacters = async ({
  limit=5,
  skip=0,
  q=''
}:TQuery):Promise<{
 limit:number,
 skip:number,
 total:number,
  products: TProduct[],
   
}> => {
  const url = q ? '/products/search' : '/products'
    const response = await api.get(url,{
      params:{limit,
        skip,
        q
      }
    })
    return response.data 
}
import { useEffect, useState } from "react";

import { getCharacters,type TProduct } from "./lib/api";


const App = () => {
  
     const [characters,setcharacter] = useState<TProduct[]>([])
     const [limit,setlimit] = useState<number>(5)
     const [skip,setskip] = useState<number>(0)
     const [query,setquery] = useState<string>('')
     useEffect( () => {
       const params = new URLSearchParams();
  if (query) params.set('query', query);
  params.set('limit', String(limit));
  params.set('skip', String(skip));
  window.history.replaceState(null, '', `?${params.toString()}`);

      const fetchCharacters = async () => {
        const respone = await getCharacters({limit,skip,q:query})
        setcharacter(respone.products)
      }
      fetchCharacters()
     },[limit,skip,query])
  return (<>
  
  <div className="border-2 p-2 flex justify-center gap-10"> 
    <div>
      <label htmlFor="search">search:</label>
    <input type="text"
    className="border-2 rounded-xl p-1.5 m-2 focus:border-green-600"
    value={query}
    onChange={e => setquery(e.target.value)} 
    placeholder="search...."
    id="search"/>
  </div>
   <div className="w-fit h-max ">
     <label htmlFor="limit" >limit:</label>
    <select
  value={limit}
  onChange={(e) => setlimit(Number(e.target.value))}
  className="border-2 rounded-md w-max m-2 focus:border-green-500"
  name="limit"
  id="limit"
>
  <option value={5}>5</option>
  <option value={10}>10</option>
  <option value={15}>15</option>
  <option value={20}>20</option>
  <option value={9999}>All</option>
</select>

   </div>
   <div className="w-max h-max ">
     <label htmlFor="skip" >skip:</label>
    <select
  value={skip}
  onChange={(e) => setskip(Number(e.target.value))}
  className="border-2 rounded-md w-max m-2 focus:border-green-500"
  name="skip"
  id="skip"
>
  <option value={0}>0</option>
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
  <option value={4}>4</option>

</select>

   </div>
  </div>
  <div className="grid grid-cols-3 gap-3 p-5">
   {characters.map((c) => (
    <div className="border-2 p-4 rounded-xl border-purple-600 font-semibold h-50 px-5" key={c.id}>
      <h1 class="text-center my-1.5">{c.title}</h1>
      <p className="text-pink-500">{c.description}</p>
    </div>
   ))}
  </div>
  </>)
};

export default App;

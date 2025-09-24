import { useEffect, useState, useCallback } from "react";

import { getCharacters, type TProduct } from "./lib/api";

const App = () => {
  const [characters, setCharacters] = useState<TProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [skip, setSkip] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  const fetchCharacters = useCallback(async () => {
    setIsLoading(true);
    setError("");
    try {
      const response = await getCharacters({ limit, skip, q: query });
      console.log(response);
      setTimeout(() => {
        setCharacters(response.products);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError("خطا در دریافت اطلاعات. لطفاً دوباره تلاش کنید.");
      setIsLoading(false);
      console.error("Error fetching characters:", err);
    }
  }, [limit, skip, query]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    params.set("limit", String(limit));
    params.set("skip", String(skip));
    window.history.replaceState(null, "", `?${params.toString()}`);

    // debounce برای search query
    const timeoutId = setTimeout(
      () => {
        fetchCharacters();
      },
      query ? 500 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [limit, skip, query, fetchCharacters]);
  return (
    <>
      {isLoading && (
        <div className="min-h-screen min-w-screen flex justify-center items-center backdrop-blur-sm fixed z-10 bg-opacity-30 backdrop-blur-xs inset-0">
          <div className="border-4 rounded-full border-blue-500 border-r-transparent w-8 h-8 animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 mx-4">
          {error}
        </div>
      )}

      <div className="border-2 p-4 flex flex-col md:flex-row justify-center gap-4 md:gap-10">
        <div>
          <label htmlFor="search">search:</label>
          <input
            type="text"
            className="border-2 rounded-xl p-1.5 m-2 focus:border-green-600"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search...."
            id="search"
          />
        </div>
        <div className="w-fit h-max ">
          <label htmlFor="limit">limit:</label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
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
          <label htmlFor="skip">skip:</label>
          <select
            value={skip}
            onChange={(e) => setSkip(Number(e.target.value))}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
        {characters.map((c) => (
          <div
            className="border-2 p-4 rounded-xl border-purple-600 font-semibold min-h-32 px-5"
            key={c.id}
          >
            <h1 className="text-center my-1.5">{c.title}</h1>
            <p className="text-pink-500">{c.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;

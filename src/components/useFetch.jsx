import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cleanUp = new AbortController();

    fetch(url, { signal: cleanUp.signal })
      .then((res) => {
        if (!res.ok) {
          throw Error("Daten können nicht geliefert werden...");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        setData(data);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch abort");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => cleanUp.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;

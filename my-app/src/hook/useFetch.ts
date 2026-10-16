import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url) {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      console.log('started fetching data...')
      try {
        setLoading(true);
        setError(null);

        const { data } = await axios.get(url, { signal: controller.signal }
        );

        setData(data);
        console.log('data fetch complete')

      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => controller.abort();
   }, []);


   return { data, loading, error }

}

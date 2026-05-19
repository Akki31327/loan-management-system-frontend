import { useEffect, useState } from "react";

import api from "../api/axios";

function useFetch(url, dependencies = []) {

  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | FETCH DATA
  |--------------------------------------------------------------------------
  */

  const fetchData = async () => {

    try {

      setLoading(true);

      const response = await api.get(url);

      setData(response.data);

    } catch (err) {

      setError(err.response?.data || err.message);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchData();

  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
  };
}

export default useFetch;
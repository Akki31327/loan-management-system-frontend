import { useState } from "react";

import api from "../api/axios";

function useDelete() {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | DELETE DATA
  |--------------------------------------------------------------------------
  */

  const deleteData = async (url) => {

    try {

      setLoading(true);

      setError(null);

      const response = await api.delete(url);

      return response.data;

    } catch (err) {

      setError(err.response?.data || err.message);

      throw err;

    } finally {

      setLoading(false);
    }
  };

  return {
    deleteData,
    loading,
    error,
  };
}

export default useDelete;
import { useState } from "react";

import api from "../api/axios";

function useUpdate() {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | UPDATE DATA
  |--------------------------------------------------------------------------
  */

  const updateData = async (url, payload) => {

    try {

      setLoading(true);

      setError(null);

      const response = await api.put(url, payload);

      return response.data;

    } catch (err) {

      setError(err.response?.data || err.message);

      throw err;

    } finally {

      setLoading(false);
    }
  };

  return {
    updateData,
    loading,
    error,
  };
}

export default useUpdate;
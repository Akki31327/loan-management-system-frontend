import { useState } from "react";

import api from "../api/axios";

function usePost() {

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);


  const postData = async (url, payload) => {

    try {

      setLoading(true);

      setError(null);

      const response = await api.post(url, payload);

      return response.data;

    } catch (err) {

      setError(err.response?.data || err.message);

      throw err;

    } finally {

      setLoading(false);
    }
  };

  return {
    postData,
    loading,
    error,
  };
}

export default usePost;
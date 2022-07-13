import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useFetch = (endpoint) => {
  const [data, setData] = useState([]);

  const fetchData = useCallback(async () => {
    const response = await axios.get(endpoint);
    setData(response.data);
  }, [endpoint]);

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [fetchData]);

  return data;
};

export default useFetch;

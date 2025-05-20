import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useHome =()=> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.example.com/data');
        setData(null)
        console.log(response)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.response?.data.error || 'Error al cargar las peliculas');
        } else {
          toast.error('Error al cargar las peliculas');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { isLoading, data };
}

export default useHome;
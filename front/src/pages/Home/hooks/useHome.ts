import axios from "axios";
import api from "../../../services/axiosConfig";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { IMovie } from "../types/homeTypes";

const useHome =()=> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<IMovie[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await api('movie');
        setData(response.data.movies)
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
import React, { useContext, useEffect, useState } from "react";
import type { IFormMovie, IFormMovieErrors } from "../types/typesNuevaMovie";
import toast from "react-hot-toast";
import { MyContext } from "../../../contexts/AppContext";
import api from "../../../services/axiosConfig";
import { useNavigate } from "react-router-dom";

const initialValues: IFormMovie = {
    title: '',
    description: '',
    year: '',
    imgUrl: '',
    userId: '',
}

const useNuevaMovie = () => {
  const navigate = useNavigate();
  const context = useContext(MyContext)
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<IFormMovieErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=> {
    setFormData({
      ...formData,
      userId: context.user
    })
  }, [])
   
  const actions = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
      });
    },
    handleSubmit: async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const newErrors: IFormMovieErrors = {};
    if (!formData.title) newErrors.title = 'El título es obligatorio';
    if (!formData.description) newErrors.description = 'La descripción es obligatoria';
    if (!formData.year) newErrors.year = 'El año es obligatorio';
    if (!formData.imgUrl) newErrors.imgUrl = 'La URL de la imagen es obligatoria';
    
    setErrors(newErrors);
    if (!formData.title || !formData.description || !formData.year || !formData.imgUrl) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      return;
    }
    try {
      const resp = await api.post('/movie', formData)
      if (resp.status === 201) {
        toast.success('Película agregada correctamente');
        setFormData(initialValues);
        setErrors({});
        navigate('/home');
      } else {
        toast.error('Error al agregar la película');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error al cargar la película');
      }
    } finally {
      setIsLoading(false);
    }
  }
  }

  const system = {
    formData,
    errors,
    isLoading
  }

  return {
    actions,
    system
  }
}

export default useNuevaMovie;
import React, { useState } from "react";
import type { IFormMovie, IFormMovieErrors } from "../types/typesNuevaMovie";
import toast from "react-hot-toast";

const initialValues: IFormMovie = {
    title: '',
    description: '',
    year: '',
    imgUrl: '',
    userId: '',
}

const useNuevaMovie = () => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<IFormMovieErrors>({});

   
  const actions = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value 
      });
    },
    handleSubmit: (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: IFormMovieErrors = {};
    if (!formData.title) newErrors.title = 'El título es obligatorio';
    if (!formData.description) newErrors.description = 'La descripción es obligatoria';
    if (!formData.year) newErrors.year = 'El año es obligatorio';
    if (!formData.imgUrl) newErrors.imgUrl = 'La URL de la imagen es obligatoria';

    setErrors(newErrors);
    if (!formData.title || !formData.description || !formData.year) {
      toast.error('Por favor, completa todos los campos obligatorios.');
      console.log(errors)
      return;
    }
    console.log(formData)
  }
  }

  const system = {
    formData,
    errors,
  }

  return {
    actions,
    system
  }
}

export default useNuevaMovie;
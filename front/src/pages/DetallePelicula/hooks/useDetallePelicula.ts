import { useEffect, useState } from "react"
import type { IMovie } from "../../Home/types/homeTypes"
import type { IComments, IPropsDetallePelicula } from "../types/typesDetallePelicula"
import toast from "react-hot-toast"
import api from "../../../services/axiosConfig"
import { useNavigate } from "react-router-dom"

const initialValueMovie: IMovie = {
  _id: "",
  title: "",
  description: "",
  imgUrl: "",
  year: ""
}

const initialValueComments: IComments[] = [{
  comment: "",
  movieId: "",
  userId: {
    _id: "",
    username: ""
  },
  createdAt: "",
  _id: ""
}]

const useDetallePelicula = (props: IPropsDetallePelicula) => {
  const navigate = useNavigate()
  const { id } = props
  const [movie, setMovie] = useState<IMovie>(initialValueMovie)
  const [comments, setComments] = useState<IComments[]>(initialValueComments)
  const [loading, setLoading] = useState<boolean>(false)
  const [modalAddComment, setModalAddComment] = useState<boolean>(false)
  const [comment, setComment] = useState<string>("")

  useEffect(()=> {
    actions.fetchData()
  }, [])

  const actions = {
    fetchData: async () => {
      setLoading(true)
      try {
        const respMovie = await api.get(`movie/${id}`)
        const respComments = await api.get(`movie/commentInMovie/${id}`)
        setMovie(respMovie.data.movie)
        setComments(respComments.data.comments)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Error al cargar la pelicula")
        }
      } finally {
        setLoading(false)
      }
    },
    addComment: async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault()
      try {
        const resp = await api.post(`comment/${id}`, { comment })
        await actions.fetchData()
        setComment("")
        setModalAddComment(false)
        toast.success(resp.data.message)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Error al agregar el comentario")
        }
      }
    },
    handleChangeComment: (e: React.ChangeEvent<HTMLInputElement>) => {
      setComment(e.target.value)
    },
    openModal: () => {
      setModalAddComment(true)
    },
    closeModal: () => {
      setModalAddComment(false)
    },
    deleteMovie: async () => {
      try {
        const resp = await api.delete(`movie/${id}`)
        toast.success(resp.data.message)
        navigate("/home")
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        } else {
          toast.error("Error al eliminar la pelicula")
        }
      }
    }
  }

  const system = {
    movie,
    comments,
    loading,
    modalAddComment,
    comment
  }

  return {
    actions,
    system
  }
}

export default useDetallePelicula
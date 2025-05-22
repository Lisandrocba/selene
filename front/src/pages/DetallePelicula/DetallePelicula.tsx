import { useParams } from "react-router-dom"
import useDetallePelicula from "./hooks/useDetallePelicula"
import type { IComments } from "./types/typesDetallePelicula"
import AddComment from "./components/AddComment"

const DetallePelicula = () => {
  const { id } = useParams()
  const { actions, system } = useDetallePelicula({id: id || ""})

  return (
    <div className="relative flex flex-row justify-center items-center gap-10 bg-[#d8da0a] p-10 rounded-lg shadow-lg z-0">
        <div className="w-full">
          {
            system.movie.imgUrl ? (
              <img src={system.movie.imgUrl} className="w-72 mb-10" alt={system.movie.title} />
            ) : (
              <img src="https://placehold.co/150x250" className="w-72 mb-10" alt="Placeholder" />
            )
          }
          <h1 className="text-4xl uppercase text-gray-700 font-bold text-center">{system.movie.title}</h1>
          <p className="text-xl text-black">{system.movie.description}</p>
          <p className="text-xl text-black">Año: {system.movie.year}</p>
        </div>
        <div className="w-full flex flex-col justify-center items-center gap-2 bg-gray-700 p-10 rounded-lg shadow-lg">
          <div className="w-full flex flex-col justify-center items-center gap-2">
            <h2 className="text-xl font-bold text-center">{system.comments.length === 0 ? 'No hay comentarios' : 'Comentarios'}</h2>
            {
              system.comments.map((comment: IComments) => (
                <div key={comment._id} className="bg-white p-5 rounded-lg shadow-lg mb-2">
                  <p className="text-xl text-black">{comment.comment}</p>
                  <p className="text-sm text-gray-500">Usuario: {comment.userId.username}</p>
                  <p className="text-sm text-gray-500">Fecha: {new Date(comment.createdAt).toLocaleDateString()}</p>
                </div>
              ))
            }
            <button onClick={actions.openModal} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer mt-10">Agregar un comentario</button>
          </div>
          <button onClick={actions.deleteMovie} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-red-600 transition duration-300 cursor-pointer mt-10">Eliminar Pelicula</button>
        </div>
          {
            system.modalAddComment && (
              <AddComment setOpen={actions.closeModal} comment={system.comment} change={actions.handleChangeComment} submit={actions.addComment}/>
            )
          }
    </div>
    
  )
}

export default DetallePelicula

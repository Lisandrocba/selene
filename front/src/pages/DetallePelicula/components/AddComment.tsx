import type { IPropsAddComment } from "../types/typesDetallePelicula"

const AddComment = (props: IPropsAddComment) => {
  return (
      <div className="absolute z-10 w-[50rem] h-50 bg-gray-700 left-[-10%] top-[20vh] bottom-0 shadow-2xl">
        <div className="flex flex-col justify-center items-center gap-2 bg-[#d8da0a] p-10 rounded-lg shadow-lg">
          <h1 className="text-4xl uppercase text-gray-700 font-bold text-center">Agregar Comentario</h1>
          <form className="flex flex-col justify-center items-start p-10" onSubmit={props.submit}>
            <label>Comentario:</label>
            <input className="mb-5 rounded-sm text-black bg-amber-50 pl-2" type="text" value={props.comment} onChange={props.change}/>
            <input className="m-auto mt-3 cursor-pointer bg-slate-800 text-slate-100 px-3 py-1 rounded-md" type="submit" value="Guardar Comentario" />
          </form>
          <button onClick={props.setOpen} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 cursor-pointer mt-10">Cerrar</button>
        </div>
      </div>
  )
}

export default AddComment

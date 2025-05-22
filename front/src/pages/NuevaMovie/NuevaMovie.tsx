import useNuevaMovie from "./hooks/useNuevaMovie"

const NuevaMovie = () => {
  const {actions, system} = useNuevaMovie()

  return (
    <div className="bg-[#d8da0a] p-10 rounded-xl shadow-lg text-black">
      <p className="text-2xl mb-10">Agregar Producto</p>
      <form onSubmit={actions.handleSubmit} className="flex flex-col justify-center items-center gap-5 p-10">
        <div className="flex flex-col flex-wrap justify-center items-center gap-1 text-xl">
          <label>Título</label>
          <input 
            className="rounded-sm bg-amber-50 pl-2"
            type="text" 
            name="title" 
            value={system.formData.title} 
            onChange={actions.handleChange} 
          />
          {system.errors.title && <div className="w-full text-red-950 text-base">{system.errors.title}</div>}
        </div>

        <div className="flex flex-col flex-wrap justify-center items-center gap-1 text-xl">
          <label>Descripción</label>
          <input 
            className="rounded-sm bg-amber-50 pl-2"
            type="text" 
            name="description" 
            value={system.formData.description} 
            onChange={actions.handleChange} 
          />
          {system.errors.description && <div className="w-full text-red-950 text-base">{system.errors.description}</div>}
        </div>

        <div className="flex flex-col flex-wrap justify-center items-center gap-1 text-xl">
          <label>Año</label>
          <input 
            className="rounded-sm bg-amber-50 pl-2"
            type="text" 
            name="year" 
            value={system.formData.year} 
            onChange={actions.handleChange} 
          />
          {system.errors.year && <div className="w-full text-red-950 text-base">{system.errors.year}</div>}
        </div>

         <div className="flex flex-col flex-wrap justify-center items-center gap-1 text-xl">
          <label>URL de la imagen</label>
          <input 
            className="rounded-sm bg-amber-50 pl-2"
            type="text" 
            name="imgUrl" 
            value={system.formData.imgUrl} 
            onChange={actions.handleChange} 
          />
          {system.errors.imgUrl && <div className="w-full text-red-950 text-base">{system.errors.imgUrl}</div>}
        </div>
        {
          system.isLoading ? (
            <p className="px-10 py-2 bg-gray-700 rounded-sm text-amber-50 cursor-pointer mt-5">Cargando...</p>
          ) : (
            <button type="submit" className="px-5 py-2 bg-gray-700 rounded-sm text-amber-50 cursor-pointer mt-5">Guardar Película</button>
          )
        }
    </form>
    </div>
  )
}

export default NuevaMovie

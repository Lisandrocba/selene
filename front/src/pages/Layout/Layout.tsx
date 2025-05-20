import { Outlet } from 'react-router'
import logo from '/image.png'

const Layout = () => {

  return (
    <div className='flex flex-col gap-10 justify-start items-center min-h-[93vh] w-full'>
      <div className='flex flex-row justify-between item-center w-full'>
        <div className='flex flex-row items-center pr-5 m-0 bg-black'>
          <img className='w-36' src={logo} alt="Logo" />
          <p className='text-xl text-[#d8da0a] font-bold'>Peliculas</p>
        </div>
        <div className='flex flex-row items-center gap-2'>
          <button className='bg-[#d8da0a] text-black text-xl font-semibold px-3 py-1 rounded-md hover:bg-[#d8da0a]/80 cursor-pointer'>Agregar Pelicula +</button>
          <button className='bg-[#d8da0a] text-black text-xl font-semibold px-3 py-1 rounded-md hover:bg-[#d8da0a]/80 cursor-pointer'>Cerrar sesion</button>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default Layout
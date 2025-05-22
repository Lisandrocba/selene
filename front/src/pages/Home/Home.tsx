import Item from "./components/Item"
import useHome from "./hooks/useHome"
import type { IMovie } from "./types/homeTypes"

const Home = () => {
  const { system } = useHome()
  const { isLoading, data } = system

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[90vh]">
        <p className="text-2xl">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-row flex-wrap justify-center items-stretch gap-5">
      {
        data && data.map((item: IMovie) => (
          <Item key={item._id} item={item} />
        ))
      }
    </div>
  )
}

export default Home

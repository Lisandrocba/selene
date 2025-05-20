import useHome from "./hooks/useHome"

const Home = () => {
  const { isLoading, data } = useHome()

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl">Cargando...</p>
      </div>
    )
  }

  return (
    <div>
      {
        data && 'hola mundo'
      }
    </div>
  )
}

export default Home

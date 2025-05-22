import axios from "axios"
import api from "../../services/axiosConfig"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { MyContext } from "../../contexts/AppContext"
import { useNavigate } from "react-router-dom"

const NuevaCuenta = () => {
  const navigate = useNavigate()
    const context = useContext(MyContext)
    const [datos, setData] = useState({
        nombreUsuario: '',
        email: '',
        password: ''
    })
    const { setUserName } = context;

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setData({...datos , [e.target.name]: e.target.value})
    }
    

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            const result = await api.post('user/signup', { username: datos.nombreUsuario, email: datos.email, password: datos.password })
            setUserName(result.data.userName)
            localStorage.setItem('token', result.data.token)
            toast.success(result.data.message)
            navigate('/')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.error || 'Error en el login')
            } else {
                toast.error('Error en el login')
            }
        }
    }
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-[url('./HD-wallpaper-argentina-copa-america-champions-2021.webp')]  lg:bg-contain">
      <div className="bg-[#d8da0a] p-10 rounded-xl shadow-lg text-black">
          <p className="text-xl underline">Cuenta Nueva</p>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start p-10">
              <label>User Name:</label>
              <input name="nombreUsuario" onChange={handleChange} className="mb-5 rounded-sm bg-amber-50 pl-2" value={datos.nombreUsuario} type="text"/>
              <label>Email:</label>
              <input name="email" onChange={handleChange} className="mb-5 rounded-sm bg-amber-50 pl-2" type="text"/>
              <label>Password:</label>
              <input name="password" onChange={handleChange} className=" mb-5 rounded-sm bg-amber-50 pl-2" value={datos.password} type="password" />
              <input className="m-auto mt-3 cursor-pointer bg-slate-800 text-slate-100 px-3 py-1 rounded-md" type="submit" value="Crear cuenta"/>
            </form>
      </div>
    </div>
  )
}

export default NuevaCuenta

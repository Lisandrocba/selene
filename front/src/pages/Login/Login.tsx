import axios from "axios"
import api from "../../services/axiosConfig"
import React, { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { MyContext } from "../../contexts/AppContext"
import toast from "react-hot-toast"

const Login = () => {
    const navigate = useNavigate()
    const context = useContext(MyContext)
    const [datos, setData] = useState({
        nombreUsuario: '',
        password: ''
    })
    
    const { setUserName, setUser } = context;

    const handleChange =(e: React.ChangeEvent<HTMLInputElement>)=>{
        setData({...datos , [e.target.name]: e.target.value})
    }
    

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) =>{
        e.preventDefault()
        try {
            const result = await api.post('user/login', { username: datos.nombreUsuario, password: datos.password })
            setUserName(result.data.userName)
            setUser(result.data._id)
            localStorage.setItem('token', result.data.token)
            navigate('/home')
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.error || 'Error en el login')
            } else {
                toast.error('Error en el login')
            }
        }
    }

  return (
    <div className="h-[90vh] flex flex-col justify-center items-center lg:bg-contain">
        <div className="bg-[#d8da0a] p-10 rounded-xl shadow-lg text-black">
            <p className="text-xl underline">Login</p>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start p-10">
                <label>User Name:</label>
                <input name="nombreUsuario" onChange={handleChange} className="mb-5 rounded-sm bg-amber-50 pl-2" value={datos.nombreUsuario} type="text"/>
                <label>Password:</label>
                <input name="password" onChange={handleChange} className=" mb-5 rounded-sm bg-amber-50 pl-2" value={datos.password} type="password" />
                <input className="m-auto mt-3 cursor-pointer bg-slate-800 text-slate-100 px-3 py-1 rounded-md" type="submit" value="Iniciar sesion"/>
            </form>
        </div>
    </div>
  )
}

export default Login

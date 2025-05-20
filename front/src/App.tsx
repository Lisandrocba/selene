import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import AppContext from './contexts/AppContext'
import NuevaCuenta from './pages/NuevaCuenta/NuevaCuenta'
import Home from './pages/Home/Home'
import Layout from './pages/Layout/Layout'


function App() {

  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/nuevacuenta' element={<NuevaCuenta />}/>
          <Route element={<Layout />}>
            <Route path='/home' element={<Home />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext>
  )
}

export default App

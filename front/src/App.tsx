import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import AppContext from './contexts/AppContext'
import NuevaCuenta from './pages/NuevaCuenta'


function App() {

  return (
    <AppContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/nuevacuenta' element={<NuevaCuenta />}/>
        </Routes>
      </BrowserRouter>
    </AppContext>
  )
}

export default App

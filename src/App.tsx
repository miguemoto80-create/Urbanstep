import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from './components/Layout'
import Home from './pages/Home'
import Catalogo from './pages/Catalogo'
import DetalleProducto from './pages/DetalleProducto'
import Carrito from './pages/Carrito'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Registro from './pages/Registro'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="catalogo" element={<Catalogo />} />
        <Route path="producto/:id" element={<DetalleProducto />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="login" element={<Login />} />
        <Route path="registro" element={<Registro />} />
        
        {/* Rutas protegidas para Administrador */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
    <Toaster position="bottom-right" />
    </>
  )
}

export default App

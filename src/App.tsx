import { useRef } from 'react'
import './App.css'
import { AUTH_KEY } from './utils'
import { BrowserRouter as Router, Routes,  Route, Navigate } from "react-router-dom"
import Signup from './pages/Signup'
import { useUser } from './hooks/useUser'
import Dashboard from './pages/dashboard/Dashboard'
import Navbar from './components/Navbar'
import CreateFoodShopPage from './pages/create-food-shop/CreateFoodShopPage'

function App() {
  const { user } = useUser()
  console.log(user);
  

  return (
    <>
      <div className='font-mono'>
        <Navbar />
        <Router>
          <Routes>
          <Route path='/signup' element={user ? <Navigate to={"/"}/> : <Signup />} />
          <Route path='/' element={!user ? <Navigate to={"/signup"}/> : !user.foodShop ? <CreateFoodShopPage /> : <Dashboard />} />

          </Routes>
        </Router>

      </div>
     
    </>
  )
}

export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { PrivateRoute } from './components/PrivateRoute'
import { Transactions } from './pages/Transactions'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/transactions' element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

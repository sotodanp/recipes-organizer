import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Recipe from './pages/recipe/Recipe'
import Create from './pages/create/Create'
import Edit from './pages/edit/Edit'

import Navbar from './components/Navbar'
import ThemeSelector from './components/ThemeSelector'
import { useTheme } from './hooks/useTheme'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'



function App() {

  const { mode } = useTheme()
  const { authIsReady, user } = useAuthContext()

  return (
    <div className={`App ${mode}`}>
      {authIsReady && (
        <>
          <Navbar />
          <ThemeSelector />
          <Routes>
            <Route path="/"
              element={user ? <Home /> : <Navigate to='/login' />} />
            <Route path="/signup"
              element={!user ? <Signup /> : <Navigate to='/' />} />
            <Route path="/login"
              element={!user ? <Login /> : <Navigate to='/' />} />
            <Route path="/search"
              element={<Search />} />
            <Route path="/create"
              element={<Create />} />
            <Route path="/recipes/:id"
              element={user ? <Recipe /> : <Navigate to='/login' />} />
            <Route path="/recipe/:id/edit"
              element={user ? <Edit /> : <Navigate to='/login' />} />
            <Route path="*"
              element={<Navigate to='/' replace />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App

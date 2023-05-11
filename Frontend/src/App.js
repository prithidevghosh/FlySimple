import React from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Signup' element={<Signup />} />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

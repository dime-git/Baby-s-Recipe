import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Register from './users/Register';
import Header from './partials/Header';
import Footer from './partials/Footer';
import Breakfast from './recipes/Breakfast';
import Brunch from './recipes/Brunch';
import Lunch from './recipes/Lunch';
import Dinner from './recipes/Dinner';
import Login from './users/Login';
import MyRecipes from './recipes/MyRecipes';
import MyRecipe from './recipes/MyRecipe';
import Home from './recipes/Home';
import MyProfile from './users/MyProfile';
import CreateRecipe from './recipes/CreateRecipe';
import '../assets/css/babys.css';
const token = localStorage.getItem('token');




function App() {
  return (
    <div id="body">
      <Container>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/breakfast' element={<Breakfast />} />
            <Route path='/brunch' element={<Brunch />} />
            <Route path='/lunch' element={<Lunch />} />
            <Route path='/dinner' element={<Dinner />} />
            <Route path='/register' element={token ? <Navigate to="/myprofile" /> : <Register />} />
            <Route path='/login' element={token ? <Navigate to="/myprofile" /> : <Login />} />
            <Route path='/myprofile' element={token ? <MyProfile /> : <Navigate to="/login" />} />
            <Route path='/create' element={token ? <CreateRecipe /> : <Navigate to="/login" />} />
            <Route path='/myrecipes' element={token ? <MyRecipes /> : <Navigate to="/login" />} />
            <Route path="/myrecipes/:id" element={token ? <MyRecipe /> : <Navigate to="/login" />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </div>
  );
}

export default App;

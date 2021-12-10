import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Account from './components/Account';
import Header from './components/Header';
import Footer from './components/Footer';
import Breakfast from './components/Breakfast';
import Brunch from './components/Brunch';
import Lunch from './components/Lunch';
import Dinner from './components/Dinner';
import Login from './components/Login';
import MyRecipes from './components/MyRecipes';
import Home from './components/Home';
import MyProfile from './components/MyProfile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Account />} />
          <Route path='/login' element={<Login />} />
          <Route path='/breakfast' element={<Breakfast />} />
          <Route path='/brunch' element={<Brunch />} />
          <Route path='/lunch' element={<Lunch />} />
          <Route path='/dinner' element={<Dinner />} />
          <Route path='/myRecipes' element={<MyRecipes />} />
          <Route path='/myProfile' element={<MyProfile />} />


        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

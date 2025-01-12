import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import About from "./pages/about/About";
import HomeLayout from './pages/home/HomeLayout';
// import Patient from './pages/patient/Patient';
import AccountsPage from './pages/login/AccountsPage';
// import Layout from "./pages/Layout";
import './App.css';
import Home from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<Home />} />
          {/* <Route path='/patient' element={<Patient />} /> */}
          <Route path='accounts' element={<AccountsPage />} />
        </Route>
        {/* <Route path="/about" element={<About />} /> */}
      </Routes>
    </Router>
  );
};

export default App;

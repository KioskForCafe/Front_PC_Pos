import React from 'react';
import logo from './logo.svg';
import NavigationBar from  './views/NavigationBar';
import CustomMenu from './views/CustomMenu';
import './App.css';
import { useLocation } from 'react-router-dom';
import Footer from './views/Footer';

function App() {
  return (
    <>
    <NavigationBar/>
    <CustomMenu/>
    <Footer />
    </>
  );
}

export default App;

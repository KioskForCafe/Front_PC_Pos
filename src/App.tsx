import React from 'react';
import logo from './logo.svg';
import NavigationBar from  './views/NavigationBar';
import './App.css';
import { useLocation } from 'react-router-dom';
import Footer from './views/Footer';

function App() {
  return (
    <>
    <NavigationBar/>
    <Footer />
    </>
  );
}

export default App;

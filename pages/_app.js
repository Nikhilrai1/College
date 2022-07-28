import React, { useState, useEffect } from 'react';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component  {...pageProps} />
    </>
  )
}

export default MyApp

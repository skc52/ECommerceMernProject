import React from 'react'
import Header from './component/layout/Header/Header'
import Footer from './component/layout/Footer/Footer'
import AppUser from './AppUser'
import AppNormal from './AppNormal'
import { Router } from 'react-router-dom'
const CombineApp = () => {
  return (
    
    <Router>
        <Header/>
            <AppUser/>
            <AppNormal/>
        <Footer/>
    </Router>
        
    
  )
}

export default CombineApp
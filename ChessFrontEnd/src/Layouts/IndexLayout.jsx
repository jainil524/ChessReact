import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'


function IndexLayout() {
  return (
    <>
        <Header />
        <Outlet/>
    </>
  )
}

export default IndexLayout

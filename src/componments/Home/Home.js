import React from 'react'
import Header from '../Header/Header'
import LeftSideBar from '../LeftSideBar/LeftSideBar'
import { Outlet } from 'react-router-dom'
import RightSideBar from '../RightSideBar/RightSideBar'
// import Footer from '../Footer/Footer'
import './Home.scss'
import Player from '../Player'

const Home = () => {
    return (
        <div className='home-container'>
            <div className='main-container'>
                <div className='left-bar'>
                    <LeftSideBar />
                </div>
                <div className='main'>
                    <div className='header'>
                        <Header />
                    </div>
                    <div className='content'>
                        <Outlet />
                    </div>
                </div>
                <div className='right-bar'>
                    <RightSideBar />
                </div>
            </div>
            <div className='footer-container'>
                <Player />
            </div>
        </div>
    )
}

export default Home
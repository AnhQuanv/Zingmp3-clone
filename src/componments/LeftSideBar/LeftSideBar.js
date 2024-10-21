import React, { useState } from 'react'
import logo from '../../assets/logo-light.svg'
import './LeftSideBar.scss'
import { LuListMusic } from "react-icons/lu";
import { ImRadioChecked2 } from "react-icons/im";
import { SiSoundcharts } from "react-icons/si";
import { SiYoutubemusic } from "react-icons/si";
import { FaPlayCircle } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { TbMusicPlus } from "react-icons/tb";
import { MdTopic } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';




const LeftSideBar = () => {
    const [activeItem, setActiveItem] = useState(1);
    const navigate = useNavigate();
    const handleClick = (index) => {
        setActiveItem(index); // Cập nhật trạng thái khi click vào một item
        if (index === 1) {
            navigate('/explore')
        }

        if (index === 2) {
            navigate('/library')
        }
    }

    return (
        <>
            <div className='logo' onClick={() => navigate('/')}>
                <img src={logo} alt='...' />
            </div>
            <div className='menu'>
                <ul>
                    <li className={activeItem === 0 ? 'menu-item active' : 'menu-item'} onClick={() => handleClick(0)} >
                        <span ><LuListMusic /></span>
                        Thư viện
                        <span className='play'><FaPlayCircle /></span>
                    </li>
                    <li className={activeItem === 1 ? 'menu-item active' : 'menu-item'} onClick={() => handleClick(1)} >
                        <span><ImRadioChecked2 /></span>
                        Khám phá
                    </li>
                    <li className={activeItem === 2 ? 'menu-item active' : 'menu-item'} onClick={() => handleClick(2)} >
                        <span><SiSoundcharts /></span>
                        #zingchart
                    </li>
                    <li className={activeItem === 3 ? 'menu-item active' : 'menu-item'} onClick={() => handleClick(3)} >
                        <span><SiYoutubemusic /></span>
                        <span>Radio</span>
                        <span className='special'>LIVE</span>
                        <span className='play'><FaPlayCircle /></span>
                    </li>
                </ul>
                <div className='space'>
                    <hr />
                </div>
                <div className='sub-2'>
                    <ul>
                        <li className='menu-item'>
                            <span><TbMusicPlus /></span>
                            <span>BXH Nhạc Mới</span>
                            <span className='play'><FaPlayCircle /></span>

                        </li>
                        <li className='menu-item'>
                            <span><MdTopic /></span>
                            <span>Chủ đề & Thể Loại</span>
                        </li>
                        <li className='menu-item'>
                            <span><FaStar /></span>
                            <span>Top 100</span>
                        </li>
                        <li className='menu-item'>
                            <span><FaClockRotateLeft /></span>
                            <span>Nghe gần đây</span>
                        </li>
                        <li className='menu-item'>
                            <span><MdFavorite /></span>
                            <span>Bài hát yêu thích</span>
                            <span className='play'><FaPlayCircle /></span>
                        </li>
                    </ul>
                </div>
                <div className='space'>
                    <hr />
                </div>
                <div className='footer'>
                    <ul>
                        <li className='menu-item'>
                            <span><FaPlusSquare /></span>
                            <span>Tạo playlist mới</span>
                        </li>
                    </ul>
                </div>
            </div>


        </>
    )
}

export default LeftSideBar
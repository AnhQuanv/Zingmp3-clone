import React from 'react'
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import './Header.scss'

const Header = () => {
    return (
        <>
            <div className='left-header'>
                <div className='arrow'>
                    <span><FaArrowLeftLong /></span>
                    <span><FaArrowRightLong /></span>
                </div>
                <div className="box-search">
                    <div className="icon-search">
                        <span className="" ><FaSearch /></span>
                    </div>
                    <input type="text" className="search" placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..." />
                </div>
            </div>
            <div className='right-header'>
                aaaaaaaaaaaaaaaaaaaaaaaaaa
            </div>
        </>
    )
}

export default Header
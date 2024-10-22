import React, { memo } from 'react'
import './AlbumSong.scss'
import ListSongOfAlbum from './ListSongOfAlbum'
import moment from 'moment';
import { BsDot } from "react-icons/bs";

const AlbumSong = ({ listSong = [], totalDuration }) => {
    console.log(listSong);
    console.log(totalDuration);

    return (
        <>
            <div className='title-album-song'>
                <span>Bài hát</span>
                <span>Album</span>
                <span>Thời gian</span>
            </div>
            <div className='list-song'>
                {listSong?.map((item, index) => {
                    return (
                        <ListSongOfAlbum key={item.encodeId} songData={item} />
                    )
                })}
            </div>


            <span className='footer-album'>
                <span>{`${listSong?.length} bài hát`}</span>
                <span><BsDot /></span>
                <span>
                    {moment.utc(totalDuration * 1000).format('HH:mm:ss')}
                </span>
            </span>
        </>
    )
}

export default memo(AlbumSong)
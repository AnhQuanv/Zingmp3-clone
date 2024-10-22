import React from 'react'
import './ListSongOfAlbum.scss'
import { CiMusicNote1 } from "react-icons/ci";
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { play, setCurSongId } from '../redux/action/music';

const ListSongOfAlbum = ({ songData }) => {
    const artistsString = songData?.artists?.map(item => item?.name).join(', ');
    const cutOffIndexArtists = artistsString.slice(0, 50).lastIndexOf(',');
    const displayArtists = cutOffIndexArtists !== -1 ? artistsString.slice(0, cutOffIndexArtists + 1) : artistsString;
    const finalArtistsDisplay = artistsString.length > 50 ? `${displayArtists.trim()}...` : displayArtists;

    const titleString = songData?.title;
    const finalTitleDisplay = titleString.length > 50 ? `${titleString.slice(0, 50).trim()}...` : titleString;
    const dispatch = useDispatch();

    const handleTogglePlay = () => {
        dispatch(setCurSongId(songData?.encodeId));
        dispatch(play(true));
    }

    return (
        <div className='song-container' onClick={() => handleTogglePlay()}>
            <div className='title-song'>
                <span><CiMusicNote1 /></span>
                <img
                    src={songData?.thumbnail}
                    alt='...' />
                <span className='title'>
                    <span className='name-song'>{finalTitleDisplay}</span>
                    <span className='name-artist'>
                        {finalArtistsDisplay}
                    </span>
                </span>
            </div>
            <div className='name-album'>
                {songData?.album?.title}
            </div>
            <div className='time'>
                {moment.utc(songData?.duration * 1000).format('mm:ss')}
            </div>
        </div>
    )
}


export default ListSongOfAlbum


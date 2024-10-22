import React, { useEffect, useRef, useState } from 'react'
import './Player.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailSong, getSong } from '../apis/apiServices';
import { CiHeart } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoRepeat } from "react-icons/io5";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { IoShuffle } from "react-icons/io5";
import { IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { play } from '../redux/action/music';

const Player = () => {

    const dispatch = useDispatch();
    const { curSongId, isPlaying } = useSelector(state => state.music);

    const [songInfo, setSongInfo] = useState(null);
    const [source, setSource] = useState(null);
    const audioRef = useRef(new Audio());

    useEffect(() => {
        const fetchDetailSong = async () => {
            try {
                const res1 = await getDetailSong(curSongId);
                const res2 = await getSong(curSongId);

                if (res1.data.err === 0) {
                    setSongInfo(res1.data.data);
                }

                if (res2.data.err === 0) {
                    setSource(res2.data.data['128']);
                }
            } catch (error) {
                console.error('Error fetching song details:', error);
            }
        };

        if (curSongId) {
            fetchDetailSong();
        }
    }, [curSongId]);

    useEffect(() => {
        if (source) {
            audioRef.current.src = source;

            if (isPlaying) {
                audioRef.current.load();
                audioRef.current.play(); // Phát nhạc nếu trạng thái isPlaying là true
            }
        }
    }, [source]);

    const handleToggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause(); // Dừng nhạc
            dispatch(play(false)); // Cập nhật trạng thái redux
        } else {
            audioRef.current.play(); // Phát nhạc
            dispatch(play(true)); // Cập nhật trạng thái redux
        }
    };

    return (
        <>
            <div className='detail-song'>
                <img className='img-cd' src={songInfo?.thumbnail} alt='...' />
                <div className='title'>
                    <span className="song-title">{songInfo?.title}</span>
                    <span className="artists-names">{songInfo?.artistsNames}</span>
                </div>
                <div className='sub-icon'>
                    <span><CiHeart /></span>
                    <span><BsThreeDots /></span>

                </div>
            </div>
            <div className='main-player'>
                <div className='sub-play'>
                    <span title='Bật phát ngẫu nhiên'><IoRepeat /></span>
                    <span><IoMdSkipBackward /></span>
                    <span className='icon-play' onClick={handleToggleMusic}>{isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}</span>
                    <span><IoMdSkipForward /></span>
                    <span title='Bật phát lại tất cả'><IoShuffle /></span>
                </div>
                <div>play</div>
            </div>
            <div className='volume'>Volume</div>
        </>

    )
}

export default Player
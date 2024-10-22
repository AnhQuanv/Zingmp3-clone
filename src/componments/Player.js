import React, { useEffect, useRef, useState } from 'react';
import './Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailSong, getSong } from '../apis/apiServices';
import { CiHeart } from "react-icons/ci";
import { BsThreeDots } from "react-icons/bs";
import { IoRepeat, IoShuffle, IoPlayCircleOutline, IoPauseCircleOutline } from "react-icons/io5";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { play } from '../redux/action/music';

var intervalId;

const Player = () => {
    const dispatch = useDispatch();
    const { curSongId, isPlaying } = useSelector(state => state.music);
    const [songInfo, setSongInfo] = useState(null);
    const audioRef = useRef(new Audio());
    const thumbRef = useRef();
    const [progress, setProgress] = useState(0);
    const progressBarRef = useRef();

    useEffect(() => {
        const fetchDetailSong = async () => {
            try {
                const res1 = await getDetailSong(curSongId);
                const res2 = await getSong(curSongId);

                if (res1.data.err === 0) {
                    setSongInfo(res1.data.data);
                }

                if (res2.data.err === 0) {
                    audioRef.current.src = res2.data.data['128'];
                    audioRef.current.load();
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
        const handleCanPlay = () => {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error('Error attempting to play audio:', error);
                });
            }
        };

        audioRef.current.addEventListener('canplaythrough', handleCanPlay);

        return () => {
            audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
        };
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying) {
            intervalId = setInterval(() => {
                const curTime = audioRef.current.currentTime;
                const duration = audioRef.current.duration;

                if (duration) {
                    const proPer = (curTime / duration) * 100;
                    setProgress(proPer);
                }
            }, 1000);
        } else {
            intervalId && clearInterval(intervalId);
        }
    }, [isPlaying]);

    const handleToggleMusic = () => {
        if (isPlaying) {
            audioRef.current.pause();
            dispatch(play(false));
        } else {
            audioRef.current.play().catch(error => {
                console.error('Error attempting to play audio:', error);
            });
            dispatch(play(true));
        }
    };

    const handleClickProgress = (e) => {
        const progressBar = progressBarRef.current; // Truy cập DOM element của thanh tiến trình
        const rect = progressBar.getBoundingClientRect(); // Lấy tọa độ của thanh
        const clickX = e.clientX - rect.left; // Vị trí click theo pixel
        const progressPercent = (clickX / rect.width) * 100; // Tính phần trăm vị trí click so với chiều dài thanh

        const duration = audioRef.current.duration;

        // Chỉ cập nhật nếu duration có giá trị hợp lệ
        if (!isNaN(duration) && duration > 0) {
            const newTime = (progressPercent / 100) * duration; // Tính thời gian tương ứng với phần trăm

            // Cập nhật thời gian phát
            audioRef.current.currentTime = Math.min(Math.max(newTime, 0), duration); // Đảm bảo newTime nằm trong khoảng hợp lệ
            setProgress(progressPercent); // Cập nhật thanh tiến trình
        }
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
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
                    <span className='icon-play' onClick={handleToggleMusic}>
                        {isPlaying ? <IoPauseCircleOutline /> : <IoPlayCircleOutline />}
                    </span>
                    <span><IoMdSkipForward /></span>
                    <span title='Bật phát lại tất cả'><IoShuffle /></span>
                </div>
                <div className='process-bar-box'>
                    <span>{formatTime(audioRef.current.currentTime)}</span> {/* Thời gian đang chạy */}
                    <div className='down' ref={progressBarRef} onClick={handleClickProgress}>
                        <div ref={thumbRef} className='up' style={{ width: `${progress}%` }}></div>
                    </div>
                    <span>{songInfo ? formatTime(songInfo.duration) : '0:00'}</span> {/* Thời gian tổng */}
                </div>
            </div>
            <div className='volume'>Volume</div>
        </>
    );
};

export default Player;

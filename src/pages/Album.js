import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getDetailPlayList } from '../apis/apiServices';
import './Album.scss'
import moment from 'moment';
import AlbumSong from '../componments/AlbumSong';
import { Scrollbar } from 'react-scrollbars-custom';

const Album = () => {
    const { title, plid } = useParams();
    const [playListData, setPlayListData] = useState({});

    useEffect(() => {
        const fetchDetailPlayList = async () => {
            const res = await getDetailPlayList(plid);
            if (res?.data.err === 0) {
                setPlayListData(res.data?.data);
            }

        }

        fetchDetailPlayList();
    }, [plid])

    return (
        <div className='album-container'>
            <div className='title'>
                <img src={playListData?.thumbnail} alt='...' />
                <div className='sub-title'>
                    <h3>{playListData?.title}</h3>
                    <span>
                        <span>Cập nhật:</span>
                        <span>{moment.unix(playListData?.contentLastUpdate).format("DD/MM/YYYY")}</span>
                    </span>
                    <span>{playListData?.artistsNames}</span>
                    <span>{`${Math.round(playListData?.like / 1000)}K người yêu thích`}</span>
                </div>
            </div>
            <Scrollbar style={{ width: '100%', height: '80%' }}>
                <div className='playlist'>
                    <span>
                        <span className='sub-title'>Lời tựa </span>
                        <span>{playListData?.sortDescription}</span>
                    </span>
                    <div className='sub-playlist'>
                        <AlbumSong listSong={playListData?.song?.items} totalDuration={playListData?.song?.totalDuration} />
                    </div>
                </div>
            </Scrollbar>
        </div>

    );
};

export default Album
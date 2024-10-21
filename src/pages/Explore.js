import React, { useEffect, useState } from 'react';
import { getHome } from '../apis/apiServices';
import './Explore.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import _ from 'lodash'
import { useDispatch } from 'react-redux';
import { play, setCurSongId } from '../redux/action/music';


const Explore = () => {
    const [listBanner, setListBanner] = useState([]);
    const dispatch = useDispatch();


    useEffect(() => {
        const fetchHome = async () => {
            let res = await getHome();
            // setListBanner(res.data.data.items[0].items);
            setListBanner(res.data.data.items[3].items.all);
            console.log("check res: ", res);
            // console.log("check res: ", res.data.data.items[3].items.all[0].thumbnail);


        };

        fetchHome();
    }, []);

    const handleSlideChange = (swiper) => {
        const slides = document.querySelectorAll('.swiper-slide');

        slides.forEach((slide, index) => {
            slide.classList.remove('active-slide', 'inactive-slide');
            // Nếu đây là slide đầu tiên
            if (index === swiper.activeIndex) {
                slide.classList.add('active-slide');
            } else {
                slide.classList.add('inactive-slide');
            }
        });
    };

    const handleClickBanner = (song) => {
        console.log(song.encodeId)
        if (!_.isEmpty(song?.encodeId)) {
            console.log('oke')
            dispatch(setCurSongId(song.encodeId));
            dispatch(play(true));
        }
    }

    return (
        <div className='banner'>
            <Swiper
                slidesPerView={listBanner.length < 3 ? listBanner.length : 3}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                spaceBetween={25}
                loop={listBanner.length < 3 ? false : true}
                navigation={true}
                onSlideChange={handleSlideChange}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {listBanner.length > 0 &&
                    listBanner?.map((banner, index) => (
                        <SwiperSlide key={index}>
                            {/* <img src={banner.banner} alt='...' onClick={() => handleClickBanner(banner)} /> */}
                            <img src={banner?.thumbnail} alt='...' onClick={() => handleClickBanner(banner)} />

                        </SwiperSlide>
                    ))
                }
                {/* {listBanner.length > 0 &&
                    listBanner?.map((banner, index) => (
                        <SwiperSlide key={index}>
                            <img src={banner.banner} alt='...' onClick={() => handleClickBanner(banner)} />
                            <img src={banner?.all?.thumbnail} alt='...' onClick={() => handleClickBanner(banner)} />

                        </SwiperSlide>
                    ))
                } */}
            </Swiper>
        </div>
    );
}

export default Explore;

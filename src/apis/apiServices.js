import axios from "../ultis/axios"

const getHome = () => {
    return axios.get('api/home');
}

const getSong = (songId) => {
    return axios.get(`api/song?id=${songId}`);

}

const getDetailSong = (songId) => {
    return axios.get(`api/infosong?id=${songId}`);

}

const getDetailPlayList = (plId) => {
    return axios.get(`api/detailplaylist?id=${plId}`);

}

export { getHome, getDetailSong, getSong, getDetailPlayList }
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

export { getHome, getDetailSong, getSong }
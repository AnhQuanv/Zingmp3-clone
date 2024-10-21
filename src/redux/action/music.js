import actionTypes from "./actionTypes"

export const setCurSongId = (curSongId) => {
    return {
        type: actionTypes.SET_CUR_SONG_ID,
        curSongId
    };
}

export const play = (flag) => {
    return {
        type: actionTypes.SET_IS_PLAYING,
        flag
    };
} 
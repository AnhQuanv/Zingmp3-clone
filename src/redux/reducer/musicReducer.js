import actionTypes from "../action/actionTypes"


const initialState = {
    curSongId: null,
    isPlaying: false
}

const musicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curSongId: action.curSongId
            };

        case actionTypes.SET_IS_PLAYING:
            return {
                ...state,
                isPlaying: action.flag
            };

        default:
            return state
    }
}

export default musicReducer;

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import musicReducer from './musicReducer';

const commonConfig = {
    stateReconciler: autoMergeLevel2,
    storage
}

const musicConfig = {
    ...commonConfig,
    key: 'music',
    whitelist: ['curSongId']
};

const persistedMusicReducer = persistReducer(musicConfig, musicReducer);

const rootReducer = combineReducers({
    music: persistedMusicReducer
});


export default rootReducer;
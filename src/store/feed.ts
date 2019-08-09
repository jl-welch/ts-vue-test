import {
  Module,
  ActionTree,
  GetterTree,
  MutationTree,
} from 'vuex';
import { VideoState, Video, Favorite } from '@type';
import feedData from '../../public/data/videos.json';

type VideoModule = Module<VideoState, any>;
type VideoGetter = GetterTree<VideoState, any>;
type VideoAction = ActionTree<VideoState, any>;
type VideoMutation = MutationTree<VideoState>;

const state: VideoState = {
  allVideos: feedData.sort((a, b) => (a.id < b.id) ? 1 : -1),
  currentVideo: {
    hls_feed: "",
    id: -1,
    image_url: "",
    title: "",
  },
  nextVideos: [],
  favorites: [],
};

const getters: VideoGetter = {
  favorite: state => {
    for (let i = 0; i < state.favorites.length; i++) {
      if (state.favorites[i].id === state.currentVideo.id) {
        return true;
      }
    }
  },
};

const actions: VideoAction = {
  updateCurrentVideo({ commit, dispatch, state }, id: string): void {
    const videoId: number = parseInt(id, 10);
    const currentVideo = state.allVideos.find(video => video.id === videoId) as Video;

    commit('updateCurrentVideo', currentVideo);
    dispatch('getNextVideos');
  },
  setFavorite({ commit, state }): void {
    for (let i = 0; i < state.favorites.length; i++) {
      if (state.favorites[i].id === state.currentVideo.id) {
        commit('removeFavorite', i);
        return;
      }
    }

    const newFavorite: Favorite = {
      ...state.currentVideo,
      added: new Date().getTime(),
    }

    commit('addFavorite', newFavorite);
  },
  getNextVideos({ commit, state }): void {
    // specifying type for object destructuring is uglier than not using destructuring
    const { id } = state.currentVideo;
    const nextVideos: Video[] = state.allVideos.filter(video => video.id < id).slice(0, 3);

    // Instead of displaying "no more videos", repeat from start
    if (nextVideos.length < 3) {
      let index: number = 0;
      while (nextVideos.length < 3) {
        nextVideos.push(state.allVideos[index]);
        ++index;
      }
    }

    commit('getNextVideos', nextVideos);
  },
};

const mutations: VideoMutation = {
  updateCurrentVideo(state, currentVideo: Video): void {
    state.currentVideo = { ...state.currentVideo, ...currentVideo };
  },
  addFavorite(state, favorite: Favorite): void {
    state.favorites.push(favorite);
  },
  removeFavorite(state, index: number): void {
    state.favorites.splice(index, 1);
  },
  getNextVideos(state, nextVideos: Video[]): void {
    state.nextVideos = nextVideos;
  },
};

const namespaced: boolean = true;
const videoFeed: VideoModule = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};

export default videoFeed;

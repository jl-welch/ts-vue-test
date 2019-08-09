import {
  Module,
  ActionTree,
  GetterTree,
  MutationTree,
} from 'vuex';
import { VideoState, Video } from '@type';
import feedData from '../../public/data/videos.json';

type VideoModule = Module<VideoState, any>;
type VideoGetter = GetterTree<VideoState, any>;
type VideoAction = ActionTree<VideoState, any>;
type VideoMutation = MutationTree<VideoState>;

const state: VideoState = {
  allVideos: feedData.sort((a, b) => (a.id < b.id) ? 1 : -1),
  currentVideo: undefined,
  nextVideos: undefined,
};

const getters: VideoGetter = {
  favorites: state => state.allVideos.filter((video: Video) => video.favorite),
};

const actions: VideoAction = {
  updateCurrentVideo({ commit, dispatch }, id: string): void {
    const videoId: number = parseInt(id, 10);
    const currentVideo = state.allVideos.find(video => video.id === videoId) as Video;

    commit('updateCurrentVideo', currentVideo);
    dispatch('getNextVideos');
  },
  toggleFavorite({ commit }): void {
    if (!state.currentVideo) {
      return;
    }

    const currentVideo = { ...state.currentVideo } as Video;
    currentVideo.favorite = !currentVideo.favorite;

    commit('toggleFavorite', currentVideo);
  },
  getNextVideos({ commit }): void {
    if (!state.currentVideo) {
      return;
    }

    // specifying type for object destructuring is uglier than not using destructuring
    const id: number = state.currentVideo.id;
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
    if (!state.currentVideo) {
      state.currentVideo = currentVideo;
      return;
    }

    Object.assign(state.currentVideo, currentVideo);
  },
  toggleFavorite(state, currentVideo: Video): void {
    Object.assign(state.currentVideo, currentVideo);
  },
  getNextVideos(state, nextVideos: Video[]): void {
    if (!state.nextVideos) {
      state.nextVideos = nextVideos;
      return;
    }

    Object.assign(state.nextVideos, nextVideos);
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

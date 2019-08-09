import Vue from 'vue';
import Vuex from 'vuex';
import videoFeed from './feed';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    videoFeed,
  },
});

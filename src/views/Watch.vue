<template>
  <div>
    <div
      class="video"
      v-if="!loading"
    >
      <video
        class="video__player"
        ref="video"
        playsinline
        controls
        :poster="videoFeed.currentVideo.image_url"
        :data-src="videoFeed.currentVideo.hls_feed"
      ></video>
      <div class="video__meta">
        <h1 class="video__title">{{ videoFeed.currentVideo.title }}</h1>
        <button 
          type="button"
          class="video__favorite"
          :class="{ 'video__favorite--true': favorite }"
          @click="updateFavorites"
        >Add to Favorites</button>
      </div>
    </div>
    <Listing
      v-if="!loading"
      :feed="videoFeed.nextVideos"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {
    State,
    Getter,
    Action,
  } from 'vuex-class';
  import { VideoState, Video } from '@type';
  import Listing from '@/components/Listing.vue';
  import Hls from 'hls.js';
  const namespace: string = 'videoFeed';

  Component.registerHooks([
    'beforeRouteUpdate',
  ]);

  @Component({
    components: {
      Listing,
    },
  })
  export default class Watch extends Vue {
    loading: boolean = true;
    @State('videoFeed') videoFeed!: VideoState;
    @State('favorites', { namespace }) favorites!: Video[];
    @Getter('favorite', { namespace }) favorite!: boolean;
    @Action('updateCurrentVideo', { namespace }) updateCurrentVideo: any;
    @Action('setFavorite', { namespace }) setFavorite: any;

    playVideo() {
      const video: any = this.$refs.video;

      // Bit of a hacky way to get the next video
      const nextVideo: any = this.$el.querySelector('.thumbnail__link');
      // and 'click' it after the current one finishes
      video.addEventListener('ended', () => {
        nextVideo.click();
      });

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(video.getAttribute('data-src'));
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, _ => {
          video.play();
        });
      }
    }

    updateFavorites() {
      this.setFavorite();
    }

    updateView(id: string): void {
      this.updateCurrentVideo(id);
      this.loading = false;
    }

    mounted(): void {
      this.updateView(this.$route.params.id);
      this.$nextTick(() => {
        this.playVideo();
      });
    }
  }
</script>

<style scoped lang="scss">
  $video-margin-bottom:           3rem;

  $video-player-margin-bottom:    2rem;
  $video-player-border-radius:    8px;

  $video-meta-padding-bottom:     1rem;
  $video-meta-border-width:       1px;
  $video-meta-border-color:       #e4e7e7;

  $video-title-font-size:         1.6rem;
  $video-title-font-weight:       500;
  
  .video {
    margin-bottom: $video-margin-bottom;
  }

  .video__player {
    margin-bottom: $video-player-margin-bottom;
    border-radius: $video-player-border-radius;
  }

  .video__meta {
    display: flex;
    padding-bottom: $video-meta-padding-bottom;
    border-bottom: $video-meta-border-width solid $video-meta-border-color;
    align-items: center;
    justify-content: space-between;
  }

  .video__title {
    font-size: $video-title-font-size;
    font-weight: $video-title-font-weight;
  }

  .video__favorite {
    display: flex;
    border: none;
    align-items: center;
    color: #444;
    background-color: transparent;
    cursor: pointer;

    &::before {
      content: "";
      display: block;
      height: 16px;
      width: 16px;
      margin-right: 1rem;
      border: 1px solid #111;
      border-radius: 8px;
      font-size: 1rem;
    }

    &--true::before {
      border-color: #ff4444;
      background-color: #ff4444;
    }
  }
</style>

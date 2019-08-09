<template>
  <div>
    <div class="tab">
      <button
        class="tab__btn"
        type="button"
        :class="{ 'tab__btn--active': isAll }"
        @click="tab(true)"
      >All</button>
      <button
        class="tab__btn"
        type="button"
        :class="{ 'tab__btn--active': !isAll }"
        @click="tab(false)"
      >Favorites</button>
    </div>
    <Listing
      :feed="isAll ? videoFeed.allVideos : favorites"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import {
    State,
    Getter,
    Action,
    Mutation,
  } from 'vuex-class';
  import { Video, VideoState } from '@type';
  import Listing from '@/components/Listing.vue';
  const namespace: string = 'videoFeed';

  @Component({
    components: {
      Listing,
    },
  })

  export default class Home extends Vue {
    @State('videoFeed') videoFeed!: VideoState;
    @Getter('favorites', { namespace }) favorites!: Video[];
    isAll: boolean = true;

    tab(all: boolean): void {
      this.isAll = all;
      this.favorites = this.$store.getters['videoFeed/favorites']();
    }
  }
</script>

<style scoped lang="scss">
  $tab-margin-bottom:     3rem;
  $tab-padding:           .2rem;
  $tab-border-radius:     4px;
  $tab-bg:              #f3f7fa;

  $tab-btn-padding-y:     .6rem;
  $tab-btn-padding-x:     1.8rem;

  $tab-btn-font-size:     1.2rem;
  $tab-btn-font-weight:   500;

  $tab-btn-color:       #444;

  $tab-btn-active-color:#111;
  $tab-btn-active-bg:   #fff;
  $tab-btn-active-shadow: 0 0 2px #999;


  .tab {
    display: inline-block;
    margin-bottom: $tab-margin-bottom;
    padding: $tab-padding;
    border-radius: $tab-border-radius;
    background-color: $tab-bg;
  }

  .tab__btn {
    padding: $tab-btn-padding-y $tab-btn-padding-x;
    border: 0;
    border-radius: $tab-border-radius;
    font-family: inherit;
    font-size: $tab-btn-font-size;
    font-weight: $tab-btn-font-weight;
    color: $tab-btn-color;
    background-color: transparent;
    cursor: pointer;

    &--active {
      box-shadow: $tab-btn-active-shadow;
      color: $tab-btn-active-color;
      background-color: $tab-btn-active-bg;
    }
  }
</style>

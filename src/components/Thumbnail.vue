<template>
  <div class="thumbnail">
    <router-link
      class="thumbnail__link"
      :to="{ name: 'watch', params: { id }}"
    >
      <img
        class="thumbnail__image"
        alt="Video thumbnail image"
        :src="imageUrl"
      > <!-- It's preferred not to use the title for the alt text, the above is placeholder -->
      <h3 class="thumbnail__title">{{ title }}</h3>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Thumbnail extends Vue {
  @Prop() private id!: number;
  @Prop() private imageUrl!: string;
  @Prop() private hlsFeed!: string;
  @Prop() private title!: string;
}
</script>

<style scoped lang="scss">
  $thumbnail-margin-bottom:         2.5rem;
  $thumbnail-flex-basis:            32%;

  $thumbnail-image-margin-bottom:   1rem;
  $thumbnail-image-border-radius:   6px;

  $thumbnail-image-box-shadow:      0 0 2px #444;

  $thumbnail-title-font-size:       1.4rem;
  $thumbnail-title-font-weight:     400;

  .thumbnail {
    margin-bottom: $thumbnail-margin-bottom;
    flex-basis: $thumbnail-flex-basis;

    &:hover {
      .thumbnail__link { text-decoration: underline; }
      .thumbnail__image { box-shadow: $thumbnail-image-box-shadow; }
    }
  }

  .thumbnail__link {
    color: inherit;
    text-decoration: none;
  }

  .thumbnail__image {
    margin-bottom: $thumbnail-image-margin-bottom;
    border-radius: $thumbnail-image-border-radius;
  }

  .thumbnail__title {
    font-size: $thumbnail-title-font-size;
    font-weight: $thumbnail-title-font-weight;
  }
</style>

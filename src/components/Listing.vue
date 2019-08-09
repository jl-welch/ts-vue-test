<template>
  <div class="listing">
    <Thumbnail
      v-for="(item, index) in feed"
      :key="index"
      :id="item.id"
      :imageUrl="item.image_url"
      :hlsFeed="item.hls_feed"
      :title="item.title"
    />
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { VideoState } from '@type';
  import Thumbnail from '@/components/Thumbnail.vue';

  @Component({
    components: {
      Thumbnail,
    },
  })

  export default class Listing extends Vue {
    @Prop() private feed!: VideoState;
  }
</script>

<style scoped lang="scss">
  .listing {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
</style>

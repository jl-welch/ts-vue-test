// store

export interface VideoState {
  allVideos: Video[];
  nextVideos: Video[];
  favorites: Favorite[];
  currentVideo: Video;
}

// models

export interface Video {
  id: number;
  title: string;
  hls_feed: string;
  image_url: string;
}

export interface Favorite extends Video {
  added: number;
}

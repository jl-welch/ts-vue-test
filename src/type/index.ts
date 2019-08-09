// store

export interface VideoState {
  allVideos: Video[];
  currentVideo?: Video;
  nextVideos?: Video[];
}

// models

export interface Video {
  hls_feed: string;
  id: number;
  image_url: string;
  title: string;
  favorite?: boolean;
  dateFavorited?: Date;
}

// Normalized data type
export type PodcastListType = {
  id: string;
  title: string;
  image: string;
  author: string;
  summary: string;
}

// Fetched data interfaces
export interface PodcastsFetchedContent {
  'im:name': { label: string };
  'im:image': { label: string; attributes: { height: string } }[];
  summary: { label: string };
  'im:price': { label: string; attributes: { amount: string; currency: string } };
  'im:contentType': { attributes: { term: string; label: string } };
  rights: { label: string };
  title: { label: string };
  link: { attributes: { rel: string; type: string; href: string } };
  id: { label: string; attributes: { 'im:id': string } };
  'im:artist': { label: string; attributes: { href: string } };
  category: {
    attributes: { 'im:id': string; term: string; scheme: string; label: string };
  };
  'im:releaseDate': { label: string; attributes: { label: string } };
}

export interface PodcastsFetchedData {
  feed: {
    author: { name: { label: string }; uri: { label: string } };
    entry: PodcastsFetchedContent[];
  };
}

export interface PodcastEpisodesDetails {
  wrapperType: string;
  kind: string;
  artistId: number;
  collectionId: number;
  trackId: number;
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionCensoredName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  collectionViewUrl: string;
  feedUrl: string;
  trackViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  collectionHdPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackCount: number;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
  contentAdvisoryRating: string;
  artworkUrl600: string;
  genreIds: string[];
  genres: string[];
}

export interface PodcastEpisodeData {
  country: string;
  previewUrl: string;
  collectionViewUrl: string;
  trackTimeMillis: number;
  artistViewUrl: string;
  feedUrl: string;
  closedCaptioning: string;
  collectionId: number;
  collectionName: string;
  artworkUrl160: string;
  episodeFileExtension: string;
  episodeContentType: string;
  genres: { name: string; id: string }[];
  episodeGuid: string;
  shortDescription: string;
  description: string;
  trackViewUrl: string;
  contentAdvisoryRating: string;
  artworkUrl60: string;
  artworkUrl600: string;
  trackId: number;
  trackName: string;
  releaseDate: string;
  artistIds: number[];
  episodeUrl: string;
  kind: string;
  wrapperType: string;
}

// Complete data structure with both types
export interface PodcastEpisodes {
  resultCount: number;
  results: (PodcastEpisodesDetails | PodcastEpisodeData)[];
}

export type PodcastEpisodesType = {
  count: number;
  details: PodcastEpisodesDetails;
  episodes: PodcastEpisodeData[]
}

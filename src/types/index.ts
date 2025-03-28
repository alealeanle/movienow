export interface Movie {
  id: number;
  poster: string;
  title: string;
  year: number;
  genres: string[];
  directors: string[];
  actors: string[];
  description: string | null;
  collapse: {
    duration: string[] | null;
  };
}

export interface MoviesState {
  list: Movie[];
  movie: Movie | null;
  error: string | null;
  loading: boolean;
  lastFetched: Record<number, number>;
}

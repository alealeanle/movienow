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
  error: string | null;
  loading: boolean;
}

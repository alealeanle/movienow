import { defineStore } from 'pinia';
import { getMovie, getMoviesList } from '@/api/endpoints/moviesApi';
import type { Movie, MoviesState } from '@/types';

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    list: [],
    error: null,
    loading: false,
  }),

  actions: {
    async fetchMoviesList() {
      this.loading = true;
      this.error = null;
      try {
        const response = await getMoviesList();
        this.list = response.data.data;
      } catch (err: unknown) {
        if (err instanceof Error) {
          this.error = err.message;
        } else {
          this.error = 'Неизвестная ошибка';
        }
      } finally {
        this.loading = false;
      }
    },

    async fetchMovieById(id: string): Promise<Movie | null> {
      const movieId = +id;

      const cachedMovie = this.list.find(movie => movie.id === movieId);
      if (cachedMovie) {
        return cachedMovie;
      }

      this.error = null;

      try {
        const response = await getMovie(id);
        const newMovie: Movie = response.data.data;

        this.list.push(newMovie);
        return newMovie;
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Неизвестная ошибка';
        return null;
      }
    },

    resetListData() {
      this.list = [];
    },
  },
});

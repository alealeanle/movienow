import { defineStore } from 'pinia';
import { getMovie, getMoviesList } from '@/api/endpoints/moviesApi';
import type { MoviesState } from '@/types';

const CACHE_TTL_MS = 5 * 60 * 1000;

export const useMoviesStore = defineStore('movies', {
  state: (): MoviesState => ({
    list: [],
    movie: null,
    error: null,
    loading: false,
    lastFetched: {},
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

    async fetchMovieById(id: string) {
      const movieId = +id;
      const now = Date.now();

      if (this.movie?.id === movieId && this.lastFetched[movieId] && now - this.lastFetched[movieId] < CACHE_TTL_MS) {
        return;
      }

      const cached = this.list.find(movie => movie.id === movieId);
      const isCachedFresh = this.lastFetched[movieId] && now - this.lastFetched[movieId] < CACHE_TTL_MS;

      if (cached && isCachedFresh) {
        this.movie = cached;
        return;
      }

      this.movie = null;
      this.loading = true;
      this.error = null;

      try {
        const response = await getMovie(id);
        this.movie = response.data.data;
        this.lastFetched[movieId] = now;
      } catch (err: unknown) {
        this.error = err instanceof Error ? err.message : 'Неизвестная ошибка';
      } finally {
        this.loading = false;
      }
    },

    resetMovieData() {
      this.list = [];
      this.movie = null;
      this.lastFetched = {};
    },

    resetLoading() {
      this.loading = false;
      this.error = null;
    },
  },
});

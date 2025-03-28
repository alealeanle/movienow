import { describe, it, expect, vi, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { AxiosHeaders } from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { Movie } from '@/types';
import { useMoviesStore } from '@/store';
import * as moviesApi from '@api/endpoints/moviesApi';

function createMockAxiosResponse<T>(data: T): AxiosResponse<T> {
  const config: InternalAxiosRequestConfig = {
    headers: new AxiosHeaders(),
    method: 'get',
    url: '',
    timeout: 0,
    transformRequest: [],
    transformResponse: [],
  };

  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  };
}

describe('useMoviesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.restoreAllMocks();
  });

  it('fetches movies list and updates state', async () => {
    const mockMovies: Movie[] = [
      {
        id: 1,
        poster: 'poster.jpg',
        title: 'Test Movie',
        year: 2020,
        genres: ['Drama'],
        directors: ['Director A'],
        actors: ['Actor A'],
        description: 'Description',
        collapse: {
          duration: ['142 мин. / 02:22'],
        },
      },
    ];

    vi.spyOn(moviesApi, 'getMoviesList').mockResolvedValue(createMockAxiosResponse({ data: mockMovies }));

    const store = useMoviesStore();
    await store.fetchMoviesList();

    expect(store.list).toEqual(mockMovies);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('handles error in fetchMoviesList', async () => {
    vi.spyOn(moviesApi, 'getMoviesList').mockRejectedValue(new Error('API Error'));

    const store = useMoviesStore();
    await store.fetchMoviesList();

    expect(store.list).toEqual([]);
    expect(store.loading).toBe(false);
    expect(store.error).toBe('API Error');
  });

  it('fetches a single movie by id from API', async () => {
    const mockMovie: Movie = {
      id: 2,
      poster: 'poster2.jpg',
      title: 'Another Movie',
      year: 2021,
      genres: ['Action'],
      directors: ['Director B'],
      actors: ['Actor B'],
      description: 'Another Description',
      collapse: {
        duration: ['90 мин. / 01:30'],
      },
    };

    vi.spyOn(moviesApi, 'getMovie').mockResolvedValue(createMockAxiosResponse({ data: mockMovie }));

    const store = useMoviesStore();
    await store.fetchMovieById('2');

    expect(store.movie).toEqual(mockMovie);
    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('resets movie and list with resetMovieData', () => {
    const store = useMoviesStore();

    store.movie = {
      id: 3,
      poster: '',
      title: '',
      year: 0,
      genres: [],
      directors: [],
      actors: [],
      description: null,
      collapse: { duration: null },
    };
    store.list = [{ ...store.movie }];

    store.resetMovieData();

    expect(store.movie).toBeNull();
    expect(store.list).toEqual([]);
  });

  it('resets loading and error with resetLoading', () => {
    const store = useMoviesStore();

    store.loading = true;
    store.error = 'Some error';

    store.resetLoading();

    expect(store.loading).toBe(false);
    expect(store.error).toBeNull();
  });

  it('loading flag should be true during fetchMovieById', async () => {
    const store = useMoviesStore();
    const promise = new Promise(resolve => setTimeout(() => resolve(createMockAxiosResponse({ data: {} })), 50));

    vi.spyOn(moviesApi, 'getMovie').mockReturnValue(promise as any);

    const fetchPromise = store.fetchMovieById('123');
    expect(store.loading).toBe(true);

    await fetchPromise;
    expect(store.loading).toBe(false);
  });
});

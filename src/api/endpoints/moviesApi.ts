import api from '../';

export const getMoviesList = () => api.get('/movies');
export const getMovie = (id: string) => api.get(`/movie/${id}`);

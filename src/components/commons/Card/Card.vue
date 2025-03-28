<template>
  <li :class="[s.card, styleForHomePage && s._transition]">
    <div :class="s.poster">
      <img :src="movie.poster" alt="poster" />
    </div>
    <div :class="s.info">
      <div :class="s.infoHeader">
        <h3
          :class="[s.titleMovie, styleForHomePage && s._cursor]"
          v-html="movie.title"
          @click="goToMovie(String(movie.id))"
        />
        <span v-if="movie.collapse.duration" :class="s.duration">
          {{ movie.collapse.duration[0] }} <span class="icon-movie" />
        </span>
      </div>
      <p :class="s.row">
        <span :class="s.year">{{ movie.year }},&nbsp;</span>
        <span v-if="movie.genres" :class="s.genres">{{ movie.genres.join(', ') }}</span>
      </p>
      <p v-if="movie.directors" :class="s.row">
        Режисер:&nbsp;
        <span v-if="movie.directors" :class="s.directors">{{ movie.directors.join(', ') }}</span>
      </p>
      <p v-if="movie.actors" :class="s.row">
        Актеры:
        <span v-if="movie.actors" :class="s.actors">
          {{ movie.actors.join(', ') }}
        </span>
      </p>
      <p v-if="movie.description" :class="s.description">
        {{
          movie.description
            .replace(/\u0085/g, '...')
            .replace(/[\u0097]/g, '—')
            .replace(/[\u0092]/g, "'")
        }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import type { Movie } from '@/types';
import s from './Card.module.scss';

defineProps<{
  movie: Movie;
  styleForHomePage?: boolean;
}>();

const router = useRouter();
const route = useRoute();

const goToMovie = (movieId: string) => {
  if (route.path !== `/movie/${movieId}`) {
    router.push(`/movie/${movieId}`);
  }
};
</script>

<style />

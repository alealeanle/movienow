<template>
  <main :class="['_container', s.main]">
    <h2 :class="s.title">Фильмы</h2>

    <SortPanel v-model="selectedSort" />

    <Loading v-if="loading" />
    <transition-group v-if="sortedList && !loading && !error && sortedList.length" name="list" tag="ul" :class="s.list">
      <Card
        v-for="(movie, index) in sortedList"
        :key="movie.id"
        :movie="movie"
        :styleForHomePage="true"
        :index="index"
      />
    </transition-group>
    <p v-else-if="!sortedList.length && !loading" :class="s.notFoundMovies">Фильмы не найдены...</p>
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useSort } from '@/hooks/useSort';
import { useMoviesStore } from '@/store';
import SortPanel from './SortPanel';
import Loading from '@commons/Loading';
import Card from '@commons/Card';
import s from './Main.module.scss';

const moviesStore = useMoviesStore();
const loading = computed(() => moviesStore.loading);
const error = computed(() => moviesStore.error);
const movies = computed(() => moviesStore.list);

const { selectedSort, sortedList } = useSort(movies);

onMounted(() => {
  moviesStore.fetchMoviesList().then(() => {
    const preloadCount = 3;
    const head = document.head;

    moviesStore.list.slice(0, preloadCount).forEach(movie => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = movie.poster;

      const links = Array.from(head.querySelectorAll('link[rel="preload"]'));
      if (!links.some(l => l.getAttribute('href') === movie.poster)) {
        head.appendChild(link);
      }
    });

    requestIdleCallback(() => {
      moviesStore.list.forEach(movie => {
        const img = new Image();
        img.src = movie.poster;
      });
    });
  });
});
</script>

<style lang="scss">
.list-move {
  transition: transform 0.6s ease;
}

.list-enter-active,
.list-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.list-leave-active {
  position: absolute;
}
</style>

<template>
  <main :class="['_container', s.main]">
    <h2 :class="s.title">Фильмы</h2>

    <SortPanel v-model="selectedSort" />

    <Loading v-if="loading" />
    <transition-group v-if="sortedList && !loading && !error && sortedList.length" name="list" tag="ul" :class="s.list">
      <Card v-for="movie in sortedList" :key="movie.id" :movie="movie" :styleForHomePage="true" />
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
  moviesStore.fetchMoviesList();
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

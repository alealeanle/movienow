<template>
  <div :class="s.page">
    <Header />
    <Loading v-if="loading" />
    <main v-if="!loading" :class="[s.main, '_container']">
      <div :class="s.backToList">
        <button :class="s.backToListBtn" @click="goToHomePage">
          <span class="icon-arrow" />
          <span :class="s.backToListBtnText">Назад к списку</span>
        </button>
      </div>

      <Card v-if="movie" :movie="movie" />

      <p v-else :class="s.notFoundMovie">К сожалению, по вашему запросу ничего не найдено...</p>
    </main>
    <Footer v-if="!loading" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMoviesStore } from '@/store';
import Header from '@commons/Header';
import Card from '@commons/Card';
import Footer from '@commons/Footer';
import Loading from '@commons/Loading';
import s from './FilmPage.module.scss';
import type { Movie } from '@/types';

const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

const movieStore = useMoviesStore();
const movie = ref<Movie | null>(null);
const loading = ref(true);

onMounted(async () => {
  movie.value = await movieStore.fetchMovieById(id);
  loading.value = false;
});

const goToHomePage = () => {
  router.push('/');
  movieStore.resetListData();
};
</script>

<style />

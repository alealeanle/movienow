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
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMoviesStore } from '@/store';
import Header from '@commons/Header';
import Card from '@commons/Card';
import Footer from '@commons/Footer';
import Loading from '@commons/Loading';
import s from './FilmPage.module.scss';

const router = useRouter();
const route = useRoute();
const id = route.params.id as string;

const movieStore = useMoviesStore();
const movie = computed(() => movieStore.movie);
const loading = computed(() => movieStore.loading);

onMounted(async () => {
  movieStore.fetchMovieById(id);
});

const goToHomePage = () => {
  router.push('/');
  movieStore.resetMovieData();
};
</script>

<style />

<template>
  <header :class="s.header">
    <h1 :class="[s.title, !styleForHomePage && s._cursor]" @click="goToHomePage">#movienow</h1>
  </header>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import s from './Header.module.scss';

defineProps({
  styleForHomePage: Boolean,
});

const router = useRouter();
const route = useRoute();

const goToHomePage = () => {
  if (route.path !== '/') {
    router.push('/');
  }
};
</script>

<style lang="scss"></style>

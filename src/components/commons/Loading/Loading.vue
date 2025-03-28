<template>
  <div :class="s.loaderOverlay">
    <div :class="s.loader">
      <div :class="[s.circle, s.outer]"></div>
      <div :class="[s.circle, s.inner]"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import s from './Loading.module.scss';
</script>

<style />

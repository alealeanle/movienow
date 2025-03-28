<script setup lang="ts">
import Header from '@commons/Header';
import Main from '@HomePage/Main';
import Footer from '@commons/Footer';
import s from './HomePage.module.scss';
</script>

<template>
  <div :class="s.root">
    <Header :styleForHomePage="true" />
    <Main />
    <Footer />
  </div>
</template>

<style lang="scss" scoped></style>

<template>
  <div :class="s.sort" role="group" aria-label="Сортировка фильмов">
    <div
      v-for="item in options"
      :key="item.id"
      :class="s.sortElement"
      role="checkbox"
      :aria-checked="modelValue === item.id"
    >
      <div :class="s.checkboxWrap">
        <input
          type="checkbox"
          :id="item.id"
          :checked="modelValue === item.id"
          @change="emitChange(item.id)"
          :class="s.checkbox"
          tabindex="-1"
        />
        <label :for="item.id" :class="s.checkboxCheckMark" tabindex="-1" />
        <label
          :for="item.id"
          :class="s.checkboxFrame"
          tabindex="0"
          @keydown.enter.prevent="emitChange(item.id)"
          @keydown.space.prevent="emitChange(item.id)"
        />
      </div>
      <label :for="item.id" :class="s.sortLabel" tabindex="-1">{{ item.label }}</label>
    </div>
  </div>
</template>

<script setup lang="ts">
import s from './SortPanel.module.scss';

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const options = [
  { id: 'nameSort', label: 'Отсортировать по названию' },
  { id: 'yearSort', label: 'Отсортировать по году' },
];

const emitChange = (sortBy: string) => {
  emit('update:modelValue', props.modelValue === sortBy ? '' : sortBy);
};
</script>

<style />

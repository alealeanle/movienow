import { computed, ref, type ComputedRef } from 'vue';
import type { Movie } from '@/types';

export function useSort(movies: ComputedRef<Movie[]>) {
  const selectedSort = ref<string>('');

  const sortedList = computed(() => {
    const list = [...movies.value];
    if (selectedSort.value === 'nameSort') {
      return list.sort((a, b) => a.title.localeCompare(b.title, 'ru'));
    } else if (selectedSort.value === 'yearSort') {
      return list.sort((a, b) => a.year - b.year);
    }
    return list;
  });

  return {
    selectedSort,
    sortedList,
  };
}

import { ref, Ref } from 'vue';

interface UseDataFetcherReturn<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  fetchData: () => Promise<void>;
}

export function useDataFetcher<T>(url: string): UseDataFetcherReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>;
  const loading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const fetchData = async () => {
    loading.value = true;
    error.value = null;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      data.value = result as T;
    } catch (e) {
      error.value = e instanceof Error ? e : new Error('Произошла неизвестная ошибка');
      console.error('Ошибка загрузки данных:', e);
    } finally {
      loading.value = false;
    }
  };

  fetchData();

  return {
    data,
    loading,
    error,
    fetchData
  };
}


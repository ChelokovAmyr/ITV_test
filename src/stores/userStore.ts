import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { User } from '@/types';

export const useUserStore = defineStore('user', () => {
  const userCity = ref<string | null>(null);
  const userData = ref<User | null>(null);

  const setUserCity = (city: string) => {
    userCity.value = city;
  };

  const setUserData = (user: User) => {
    userData.value = user;
    userCity.value = user.city;
  };

  return {
    userCity,
    userData,
    setUserCity,
    setUserData
  };
});


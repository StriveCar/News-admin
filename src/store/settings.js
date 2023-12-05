import defaultSettings from '@/settings'

import { defineStore } from 'pinia';
import { reactive } from 'vue';
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

export const useSettingsStore = defineStore('settings', () => {
  const state = reactive({
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  })

  const changeSetting = ({ key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
      console.log(state[key]);
    }
  };

  return {
    state,
    changeSetting
  };
}, {
  persist: true,
});

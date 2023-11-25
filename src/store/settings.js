import defaultSettings from '@/settings'

import { defineStore } from 'pinia';
const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

export const useSettingsStore = defineStore('settings', () => {
  const state = {
    showSettings: showSettings,
    tagsView: tagsView,
    fixedHeader: fixedHeader,
    sidebarLogo: sidebarLogo
  }

  const changeSetting = ({ key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  };

  return {
    state,
    changeSetting
  };
}, {
  persist: true,
});

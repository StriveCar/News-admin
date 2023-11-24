import defaultSettings from '@/settings'

import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const { showSettings, tagsView, fixedHeader, sidebarLogo } = defaultSettings

  const changeSetting = ({ state }, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value;
    }
  };

  return {
    showSettings,
    tagsView,
    fixedHeader,
    sidebarLogo,
    changeSetting
  };
});

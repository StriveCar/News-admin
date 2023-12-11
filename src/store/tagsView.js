import { defineStore } from 'pinia'
import { reactive,ref } from 'vue'

export const useTagsViewStore = defineStore('tagsview', () => {
  const visitedViews = ref([])
  const cachedViews = ref([])

  function addVisitedView(view) {
    if (visitedViews.value.some(v => v.path === view.path)) return
    let title = view.meta.title || 'no-name'
    if (view.params) {
      for (const item in view.params) {
        title += ' - '
        title += Number(view.params[item]) + 1
        break
      }
    }
    visitedViews.value.push(
      Object.assign({}, view, {
        title: title
      })
    )
  }

  function addCachedView(view) {
    if (cachedViews.value.includes(view.name)) return
    if (!view.meta.noCache) {
      cachedViews.value.push(view.name)
    }
  }

  function delVisitedView(view) {
    return new Promise(resolve => {
      const index = visitedViews.value.findIndex(v => v.path === view.path)
      if (index > -1) {
        visitedViews.value.splice(index, 1)
      }
      resolve([...visitedViews.value])
    })
  }

  function delCachedView(view) {
    return new Promise(resolve => {
      const index = cachedViews.value.indexOf(view.name)
      if (index > -1) {
        cachedViews.value.splice(index, 1)
      }
      resolve([...cachedViews.value])
    })
  }

  function delOthersVisitedViews(view) {
    return new Promise(resolve => {
      visitedViews.value= visitedViews.value.filter(v => {
        return v.meta.affix || v.path === view.path
      })
      console.log(visitedViews.value);
      resolve([...visitedViews.value])
    })
  }

  function delOthersCachedViews(view) {
    return new Promise(resolve => {
      const index = cachedViews.value.indexOf(view.name)
      if (index > -1) {
        cachedViews.value = cachedViews.value.slice(index, index + 1)
      } else {
        cachedViews.value = reactive([])
      }
      resolve([...cachedViews.value])
    })
  }

  function delAllVisitedViews() {
    return new Promise(resolve => {
      const affixTags = visitedViews.value.filter(tag => tag.meta.affix)
      visitedViews.value = affixTags
      resolve([...visitedViews.value])
    })
  }

  function delAllCachedViews() {
    return new Promise(resolve => {
      cachedViews.value = reactive([])
      resolve([...cachedViews.value])
    })
  }

  function updateVisitedView(view) {
    visitedViews.value = visitedViews.value.find(v => v.path === view.path)
    if (visitedViews.value) {
      Object.assign(visitedViews.value, view)
    }
  }

  function addView(view) {
    addVisitedView(view)
    addCachedView(view)
  }

  function delView(view) {
    return new Promise(resolve => {
      delVisitedView(view)
      delCachedView(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delOthersViews(view) {
    return new Promise(resolve => {
      delOthersVisitedViews(view)
      delOthersCachedViews(view)
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  function delAllViews(view) {
    return new Promise(resolve => {
      delAllVisitedViews(view)
      delAllCachedViews(view)
      console.log(visitedViews);
      resolve({
        visitedViews: [...visitedViews.value],
        cachedViews: [...cachedViews.value]
      })
    })
  }

  return {
    visitedViews,
    cachedViews,
    addVisitedView,
    addCachedView,
    delVisitedView,
    delCachedView,
    delOthersVisitedViews,
    delOthersCachedViews,
    delAllVisitedViews,
    delAllCachedViews,
    updateVisitedView,
    addView,
    delView,
    delOthersViews,
    delAllViews,
  }
})
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useTagsViewStore = defineStore('tagsview', () => {
  const visitedViews = reactive([])
  const cachedViews = reactive([])

  function addVisitedView(view) {
    if (visitedViews.some(v => v.path === view.path)) return
    let title = view.meta.title || 'no-name'
    if (view.params) {
      for (const item in view.params) {
        title += ' - '
        title += Number(view.params[item]) + 1
        break
      }
    }
    visitedViews.push(
      Object.assign({}, view, {
        title: title
      })
    )
  }

  function addCachedView(view) {
    if (cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      cachedViews.push(view.name)
    }
  }

  function delVisitedView(view) {
    const index = visitedViews.findIndex(v => v.path === view.path)
    if (index > -1) {
      visitedViews.splice(index, 1)
    }
  }

  function delCachedView(view) {
    const index = cachedViews.indexOf(view.name)
    if (index > -1) {
      cachedViews.splice(index, 1)
    }
  }

  function delOthersVisitedViews(view) {
    visitedViews = visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path
    })
  }

  function delOthersCachedViews(view) {
    const index = cachedViews.indexOf(view.name)
    if (index > -1) {
      cachedViews = cachedViews.slice(index, index + 1)
    } else {
      cachedViews = reactive([])
    }
  }

  function delAllVisitedViews() {
    const affixTags = visitedViews.filter(tag => tag.meta.affix)
    visitedViews = affixTags
  }

  function delAllCachedViews() {
    cachedViews = reactive([])
  }

  function updateVisitedView(view) {
    const visitedView = visitedViews.find(v => v.path === view.path)
    if (visitedView) {
      Object.assign(visitedView, view)
    }
  }

  function addView(view) {
    addVisitedView(view)
    addCachedView(view)
  }

  function delView(view) {
    delVisitedView(view)
    delCachedView(view)
  }

  function delOthersViews(view) {
    delOthersVisitedViews(view)
    delOthersCachedViews(view)
  }

  function delAllViews(view) {
    delAllVisitedViews(view)
    delAllCachedViews(view)
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
    delAllViews
  }
})
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
    return new Promise(resolve => {
      const index = visitedViews.findIndex(v => v.path === view.path)
      if (index > -1) {
        visitedViews.splice(index, 1)
      }
      resolve([...visitedViews])
    })
  }

  function delCachedView(view) {
    return new Promise(resolve => {
      const index = cachedViews.indexOf(view.name)
      if (index > -1) {
        cachedViews.splice(index, 1)
      }
      resolve([...cachedViews])
    })
  }

  function delOthersVisitedViews(view) {
    return new Promise(resolve => {
      visitedViews = visitedViews.filter(v => {
        return v.meta.affix || v.path === view.path
      })
      resolve([...visitedViews])
    })
  }

  function delOthersCachedViews(view) {
    return new Promise(resolve => {
      const index = cachedViews.indexOf(view.name)
      if (index > -1) {
        cachedViews = cachedViews.slice(index, index + 1)
      } else {
        cachedViews = reactive([])
      }
      resolve([...cachedViews])
    })
  }

  function delAllVisitedViews() {
    return new Promise(resolve => {
      const affixTags = visitedViews.filter(tag => tag.meta.affix)
      visitedViews = affixTags
      resolve([...visitedViews])
    })
  }

  function delAllCachedViews() {
    return new Promise(resolve => {
      cachedViews = reactive([])
      resolve([...cachedViews])
    })
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
    return new Promise(resolve => {
      delVisitedView(view)
      delCachedView(view)
      resolve({
        visitedView: [...visitedViews],
        cachedView: [...cachedViews]
      })
    })
  }

  function delOthersViews(view) {
    return new Promise(resolve => {
      delOthersVisitedViews(view)
      delOthersCachedViews(view)
      resolve({
        visitedView: [...visitedViews],
        cachedView: [...cachedViews]
      })
    })
  }

  function delAllViews(view) {
    return new Promise(resolve => {
      delAllVisitedViews(view)
      delAllCachedViews(view)
      resolve({
        visitedView: [...visitedViews],
        cachedView: [...cachedViews]
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
    delAllViews
  }
})
<script setup>
import newsApi from '@/api/news'
import sectionApi from '@/api/section'
import Pagination from '@/components/Pagination'
import { ref, computed, watch } from 'vue'
import { useSettingsStore } from '@/store/settings'
import ReviewTable from './component/review-table'

const settingsStore = useSettingsStore()

const listLoading = ref(false)
const newsDialog = ref(false)
const notPulishList = ref([])
const pulishList = ref([])
const cancelPulishList = ref([])
const delNowsList = ref([])
const sectionList = ref([])
const currentNews = ref({})
const total = ref(0)
const query = ref({
  page: 1,
  size: 10,
  content: '',
  title: '',
  status: '1',
  sectionId: ''
})

const fixedHeader = computed(() => settingsStore.state.fixedHeader)

const getNewsList = () => {
  listLoading.value = true
  console.log(query.value)
  newsApi
    .newsList(query.value)
    .then((data) => {
      setNewsList(data.pageData)
      total.value = data.totalSize
      listLoading.value = false
    })
    .catch((e) => {
      listLoading.value = false
    })
}

const getSectionList = () => {
  sectionApi
    .sectionList(1, 10)
    .then((data) => {
      sectionList.value = data.pageData
    })
    .catch((e) => {
      console.log(e.message)
    })
}

const setNewsList = (data) => {
  switch (query.value.status) {
    case '1':
      notPulishList.value = data
      break
    case '2':
      pulishList.value = data
      break
    case '3':
      cancelPulishList.value = data
      break
    case '4':
      delNowsList.value = data
      break
  }
}
const pulishNews = (row, index) => {
  newsApi
    .pulishNews(row.newsId)
    .then((data) => {
      getNewsList()
    })
    .catch((e) => {
      console.log(e.message)
    })
}

const delNews = (row, index) => {
  newsApi
    .delNews(row.newsId)
    .then((data) => {
      getNewsList()
    })
    .catch((e) => {
      console.log(e.message)
    })
}

getSectionList()
getNewsList()

const handleNewsClick = (row, index) => {
  currentNews.value = row
  newsDialog.value = true
}
const resetNewsTempData = ()=>{
  currentNews.value = {}
  newsDialog.value = false
}
</script>

<template>
  <div class="app-container">
    <div
      :style="fixedHeader ? 'margin-top: 35px;' : ''"
      class="filter-container"
      style="display: flex"
    >
      <el-select
        clearable
        @change="getNewsList"
        style="width: 150px"
        v-model="query.sectionId"
        placeholder="请选择栏目"
      >
        <el-option
          v-for="item in sectionList"
          :label="item.sectionName"
          :key="item.sectionId"
          :value="item.sectionId"
        ></el-option>
      </el-select>
      <el-input
        v-model="query.title"
        clearable
        @clear="getNewsList"
        placeholder="请输入检索的新闻标题"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getNewsList"
      />
      <el-input
        v-model="query.content"
        clearable
        @clear="getNewsList"
        placeholder="请输入检索的新闻内容"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getNewsList"
      />
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="getNewsList"
      >
        搜索
      </el-button>
    </div>
    <div>
      <el-tabs v-model="query.status" @tab-click="getNewsList">
        <el-tab-pane name="1" label="未发布">
          <ReviewTable
            :newsList="notPulishList"
            :listLoading="listLoading"
            @handleNewsClick="handleNewsClick"
          />
        </el-tab-pane>
        <el-tab-pane name="2" label="已发布">
          <ReviewTable
            :newsList="pulishList"
            :listLoading="listLoading"
            @handleNewsClick="handleNewsClick"
          />
        </el-tab-pane>
        <el-tab-pane name="3" label="取消发布">
          <ReviewTable
            :newsList="cancelPulishList"
            :listLoading="listLoading"
            @handleNewsClick="handleNewsClick"
          />
        </el-tab-pane>
        <el-tab-pane name="4" label="已禁用">
          <ReviewTable
            :newsList="delNowsList"
            :listLoading="listLoading"
            @handleNewsClick="handleNewsClick"
          />
        </el-tab-pane>
      </el-tabs>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page="query.page"
        :limit="query.size"
        @update:page="query.page = $event"
        @update:limit="query.size = $event"
        @pagination="getNewsList"
      />
    </div>

    <el-dialog
      v-model="newsDialog"
      title="新闻详情"
      append-to-body
      @close="resetNewsTempData"
      :close-on-click-modal="false"
    >
      <div style="text-align: center">
        <h2>{{ currentNews.title }}</h2>
      </div>
      <br>
      <div>
        <span class="name">作者：</span>
        <span >{{ currentNews.publisherName }}</span>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <span class="name">栏目：</span> 
        <span>{{ currentNews.sectionName }}</span>
      </div>
      <br>
      <div v-html="currentNews.content"></div>
      <template #footer>
        <el-button
          style="margin-right: 10px"
          v-waves
          @click="newsDialog = false"
        >
          关闭
        </el-button>
        <el-button @click="" v-waves type="primary">发布</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss">
.name {
  font-weight: bold;
}
</style>

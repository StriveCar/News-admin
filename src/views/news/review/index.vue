<script setup>
import newsApi from '@/api/news'
import sectionApi from '@/api/section'
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'
import { ref, computed, watch } from 'vue'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()

const listLoading = ref(false)
const newsDialog = ref(false)
const newsList = ref([])
const sectionList = ref([])
const currentNews = ref({})
const total = ref(0)
const query = ref({
  page:1,
  size:10,
  content: '',
  title: '',
  status: 3,
  sectionId: ''
})
const page = ref(1)

const fixedHeader = computed(() => settingsStore.state.fixedHeader)

const getNewsList = () => {
  listLoading.value = true
  console.log(query.value)
  newsApi
    .newsList(query.value)
    .then((data) => {
      newsList.value = data.pageData
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
getSectionList()
getNewsList()

const handleNewsClick = (row, index) => {
  currentNews.value = row
  newsDialog.value = true
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
      <el-table
        key="1"
        v-loading="listLoading"
        :data="newsList"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column
          label="序号"
          align="center"
          type="index"
          width="80"
        ></el-table-column>
        <el-table-column
          label="新闻标题"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <span>{{ row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="新闻内容"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template #default="{ row }">
            <span>{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者" align="center">
          <template #default="{ row }">
            <span>
              {{ row.publisherName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="栏目" align="center">
          <template #default="{ row }">
            <span>{{ row.sectionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center">
          <template #default="{ row }">
            <span>{{ $parseTime(row.publishTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column width="300" label="操作" align="center">
          <template #default="{ row, $index }">
            <el-button
              @click="handleNewsClick(row, $index)"
              style="margin: 3px"
              v-waves
              type="primary"
              size="mini"
            >
              新闻详情
            </el-button>
            <el-button style="margin: 3px" type="primary" size="mini">
              发布
            </el-button>
            <el-button plain style="margin: 3px" type="primary" size="mini">
              修改
            </el-button>
            <el-button
              type="danger"
              v-permission="4"
              v-waves
              style="margin: 3px"
              size="mini"
            >
              禁用
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page="query.page"
        :limit="query.size"
        @update:page="query.page=$event"
        @update:limit="query.size=$event"
        @pagination="getNewsList"
      />
    </div>

    <el-dialog
      @close=""
      :close-on-click-modal="false"
      v-model="newsDialog"
      title="新闻详情"
    >
      <div style="text-align: center">
        <h2>{{ currentNews.title }}</h2>
      </div>
      <div v-html="currentNews.content">

      </div>
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

<style lang="scss"></style>

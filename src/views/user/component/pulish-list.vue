<script setup>
import { computed, ref, watch } from 'vue'
import newsApi from '@/api/news'
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'

const props = defineProps({
  pulisherId: {
    type: Number,
    default: 1
  }
})

const listLoading = ref(false)
const total = ref(0)
const pulishList = ref([])
const newsDialog = ref(false)
const currentNews = ref({})

const query = ref({
  page: 1,
  size: 10,
  param: props.pulisherId
})
const getPulisherNews = () => {
  listLoading.value = true
  console.log(query.value)
  newsApi
    .pulisherNewsList(query.value)
    .then((data) => {
      pulishList.value = data.pageData
      total.value = data.totalSize
      listLoading.value = false
      console.log(userList.value)
    })
    .catch((e) => {
      listLoading.value = false
    })
}

const handleNewsClick = (row, index) => {
  currentNews.value = row
  newsDialog.value = true
}

const resetNewsTempData = () => {
  currentNews.value = {}
  newsDialog.value = false
}

const pulisherId = computed(() => props.pulisherId) // Corrected computed property

watch(
  pulisherId,
  (newValue, oldValue) => {
    query.value.page = 1
    query.value.size = 10
    query.value.param = newValue
    getPulisherNews()
  },
  { deep: true }
)

getPulisherNews()
</script>

<template>
  <el-scrollbar height="630px">
    <el-empty
      v-if="pulishList.length === 0"
      :image-size="320"
      :image="config.emptyImg"
      description="该作者暂未发布新闻"
    ></el-empty>
    <el-card
      v-else
      v-for="(row, index) in pulishList"
      class="box-card"
      shadow="hover"
      style="padding: 10px"
    >
      <template #header>
        <div class="card-header">
          <h3>{{ row.title }}</h3>
          <el-button
            size="small"
            type="success"
            @click="handleNewsClick(row, index)"
            style="margin-left: 20px"
          >
            查看新闻详情
          </el-button>
        </div>
      </template>
      <div v-html="row.content" class="ellipsis"></div>
      <template #footer>Footer content</template>
    </el-card>
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
      <br />
      <div v-html="currentNews.content" class="dialogFooter"></div>
    </el-dialog>
    <Pagination
      v-show="total > 0"
      :total="total"
      :page="query.page"
      :limit="query.size"
      @update:page="query.page = $event"
      @update:limit="query.size = $event"
      @pagination="getPulisherNews"
    />
  </el-scrollbar>
</template>

<style lang="scss" scoped>
h3 {
  margin: 0px !important;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 5; /* 显示的行数 */
  line-clamp: 5;
}
</style>

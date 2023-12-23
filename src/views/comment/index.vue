<script setup>
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'
import { ref, computed } from 'vue'
import commentApi from '@/api/comment'
import { ElMessage, ElMessageBox, ElButton, ElDialog } from 'element-plus'
import { useSettingsStore } from '@/store/settings'

const settingsStore = useSettingsStore()
const fixedHeader = computed(() => settingsStore.state.fixedHeader)

const listLoading = ref(false)
const isFirst = ref('1')
const commentList = ref([])
const currentComment = ref({})
const commentDialog = ref(false)
const total = ref(0)
const query = ref({
  page: 1,
  size: 10,
  content: '',
  title: ''
})

const getFirstCommentList = () => {
  listLoading.value = true
  commentApi
    .firstCommentList(query.value)
    .then((data) => {
      commentList.value = data.pageData
      total.value = data.totalSize
      listLoading.value = false
    })
    .catch((e) => {
      listLoading.value = false
    })
}

const getSecondCommentList = () => {
  listLoading.value = true
  commentApi
    .secondCommentList(query.value)
    .then((data) => {
      commentList.value = data.pageData
      total.value = data.totalSize
      listLoading.value = false
    })
    .catch(() => {
      listLoading.value = false
    })
}

const delFirstComment = (row, index) => {
  console.log(row.commentId)
  ElMessageBox.confirm('确认要删除该评论吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      commentApi.delFirstComment(row.commentId).then((data) => {
        getFirstCommentList()
        ElMessage({
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    })
    .catch(() => {})
}

const getComment = () => {
  if (isFirst.value == '1') {
    getFirstCommentList()
  } else if (isFirst.value == '2') {
    getSecondCommentList()
  }
}

const delSecondComment = (row, index) => {
  ElMessageBox.confirm('确认要删除该评论吗', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      commentApi.delSecondComment(row.commentId).then((data) => {
        getSecondCommentList()
        ElMessage({
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
      })
    })
    .catch(() => {})
}

const handleCommentChange = () => {
  getComment()
}

const handleCommentClick = (row, index) => {
  currentComment.value = row
  commentDialog.value = true
}
getFirstCommentList()
</script>

<template>
  <div class="app-container">
    <div
      :style="fixedHeader ? 'margin-top: 35px;' : ''"
      class="filter-container"
      style="display: flex"
    >
      <el-radio-group v-model="isFirst" @change="handleCommentChange">
        <el-radio label="1" size="large" border>一级评论</el-radio>
        <el-radio label="2" size="large" border>二级评论</el-radio>
      </el-radio-group>
      <el-input
        v-model="query.title"
        clearable
        @clear="getFirstCommentList"
        placeholder="请输入新闻标题"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getFirstCommentList"
      />
      <el-input
        v-model="query.content"
        clearable
        @clear="getFirstCommentList"
        placeholder="请输入评论内容"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getFirstCommentList"
      />
      <!-- <el-input
        v-model="query.name"
        clearable
        @clear="getSectionDataList"
        placeholder="请输入评论人昵称"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getSectionDataList"
      /> -->
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        v-waves
        icon="el-icon-search"
        @click="getFirstCommentList"
      >
        搜索
      </el-button>
    </div>
    <div>
      <el-empty
        v-if="commentList.length === 0"
        :image-size="320"
        :image="config.emptyImg"
        description="暂无评论"
      ></el-empty>
      <el-table
        v-else
        key="1"
        v-loading="listLoading"
        :data="commentList"
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
        <el-table-column label="新闻标题" align="center" width="250" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.newsTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论人昵称" align="center">
          <template #default="{ row }">
            <span @click="handleUpdateUserNameClick(row)" class="link-type">
              {{ row.publisher.username }}
            </span>
          </template>
        </el-table-column>
        <el-table-column v-if="isFirst === '1'" label="评论时间" align="center">
          <template #default="{ row }">
            <span>{{ $parseTime(row.publishTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column v-else label="回复评论" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.parentCommentContent }}</span>
          </template>
        </el-table-column>
        <el-table-column label="评论内容" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.content }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞数" align="center" show-overflow-tooltip>
          <template #default="{ row }">
            <span>{{ row.likeNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column width="300" label="操作" align="center">
          <template #default="{ row, $index }">
            <el-button
              v-waves
              @click="handleCommentClick(row, $index)"
              style="margin: 3px"
              type="primary"
              size="mini"
            >
              查看详情
            </el-button>
            <el-button
              v-waves
              @click="delFirstComment(row, $index)"
              type="danger"
              style="margin: 3px"
              size="mini"
            >
              删除评论
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.size"
        @pagination="getFirstCommentList"
      />
    </div>

    <el-dialog v-model="commentDialog" title="评论详情" modal-append-to-body>
      <div style="text-align: center">
        <h2>{{ currentComment.newsTitle }}</h2>
      </div>
      <br>
      <div v-html="currentComment.newsContent"></div>
      <br />
      <span class="name">{{ currentComment.publisher.username }}</span>
      <span v-if="isFirst !== '1'" class="name"> 回复评论 {{currentComment.parentCommentContent}}</span>
      <span>：{{ currentComment.content }}</span>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.name {
  font-weight: bold;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>

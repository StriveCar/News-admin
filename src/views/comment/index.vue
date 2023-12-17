<script setup>
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'
import { ref, computed } from 'vue'
import commentApi from '@/api/comment';

const listLoading = ref(false)
const firstCommentList = ref([])
const SecondCommentList = ref([])
const total = ref(0)
const query = ref({
  page: 1,
  size: 10,
  content: '',
  name:'',
  title:'',
})

const getFirstCommentList = ()=>{
  listLoading.value = true
  commentApi
    .firstCommentList(query)
    .then((data) => {
      firstCommentList.value = data.pageData
      total.value = data.totalSize
      listLoading.value = false
    })
    .catch((e) => {
      listLoading.value = false
    })
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
      <el-checkbox-group v-model="reviewDate" @change="">
        <el-checkbox style="margin-right: 30px" label="1" border>
          一级评论
        </el-checkbox>
        <el-checkbox style="margin-right: 30px" label="2" border>
          二级评论
        </el-checkbox>
      </el-checkbox-group>
      <el-input
        v-model="query.content"
        clearable
        @clear="getSectionDataList"
        placeholder="请输入评论内容"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getSectionDataList"
      />
      <el-input
        v-model="query.name"
        clearable
        @clear="getSectionDataList"
        placeholder="请输入评论人昵称"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getSectionDataList"
      />
      <el-input
        v-model="query.title"
        clearable
        @clear="getSectionDataList"
        placeholder="请输入新闻标题"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getSectionDataList"
      />
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="getSectionDataList"
      >
        搜索
      </el-button>
    </div>
    <div>
      <el-table
        key="1"
        v-loading="listLoading"
        :data="firstCommentList"
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
        <el-table-column label="栏目名" align="center">
          <template #default="{ row }">
            <span>{{ row.sectionName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总浏览量" align="center">
          <template #default="{ row }">
            <span @click="handleUpdateUserNameClick(row)" class="link-type">
              {{ row.viewsSum }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="发布新闻数" align="center">
          <template #default="{ row }">
            <span>{{ row.newsNum }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总点赞量" align="center">
          <template #default="{ row }">
            <span>{{ row.likeSum }}</span>
          </template>
        </el-table-column>
        <el-table-column width="300" label="操作" align="center">
          <template #default="{ row, $index }">
            <el-button style="margin: 3px" type="primary" size="mini">
              栏目新闻
            </el-button>
            <el-button plain style="margin: 3px" type="primary" size="mini">
              修改
            </el-button>
            <el-button type="danger" style="margin: 3px" size="mini">
              禁用
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.size"
        @pagination="getSectionDataList"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

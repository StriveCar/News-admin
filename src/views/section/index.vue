<script setup>
import sectionApi from '@/api/section'
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'
import { ref, computed } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'

const listLoading = ref(false)
const addsectionDialog = ref(false)
const sectionList = ref([])
let addsection = ref('')
const total = ref(0)
const query = ref({
  page: 1,
  size: 10,
  name: ''
})

const getSectionDataList = () => {
  listLoading.value = true
  sectionApi
    .sectionDataList(query.value.page, query.value.size)
    .then((data) => {
      sectionList.value = data.pageData
      total.value = data.totalSize
      listLoading.value = false
    })
    .catch((e) => {
      listLoading.value = false
    })
}

const handleaddsection = () => {
  sectionApi
    .addSection(addsection.value)
    .then((data) => {
      sectionList.value.push(data.pageData)
      ElMessage({
        message: '添加成功',
        type: 'success',
        duration: 2000
      })
    })
    .catch((e) => {
      console.log(e.message)
    })
}

const handleDelClick = (row,index) => {
  ElMessageBox.confirm("确认要删除该栏目吗",'提示',
  {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
  }).then(() => {
    sectionApi.delSection(row.sectionId).then(()=>{
      getSectionDataList()
    })
  })
  .catch(() => {})
}

getSectionDataList()
</script>

<template>
  <div class="app-container">
    <div
      :style="fixedHeader ? 'margin-top: 35px;' : ''"
      class="filter-container"
      style="display: flex"
    >
      <el-date-picker
        :clearable="false"
        v-model="selectedTime"
        value-format="timestamp"
        type="datetimerange"
        range-separator="至"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
      <el-input
        v-model="query.name"
        clearable
        @clear="getSectionDataList"
        placeholder="请输入检索的栏目名"
        style="width: 200px; margin-left: 10px"
        class="filter-item"
        @keyup.enter.native="getSectionDataList"
      />
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        v-waves
        @click="getSectionDataList"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        id="config-list-add"
        icon="el-icon-plus"
        @click="addsectionDialog = true"
        type="primary"
        v-permission="4"
        v-waves
      >
        添加栏目
      </el-button>
    </div>
    <div>
      <el-table
        key="1"
        v-loading="listLoading"
        :data="sectionList"
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
            <el-button v-waves style="margin: 3px" type="primary" size="mini">
              栏目新闻
            </el-button>
            <el-button
              plain
              v-waves
              style="margin: 3px"
              type="primary"
              size="mini"
            >
              修改
            </el-button>
            <el-tooltip content="删除是指该栏目被删除，且栏目下的新闻将不可查看" 
            placement="bottom" effect="light">
              <el-button
                type="danger"
                v-permission="4"
                style="margin: 3px"
                size="mini"
                v-waves
                @click="handleDelClick(row,$index)"
              >
                删除
              </el-button>
          </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.size"
        @update:page="query.page = $event"
        @update:limit="query.size = $event"
        @pagination="getSectionDataList"
      />
    </div>

    <el-dialog
      @close="addsection = ''"
      :close-on-click-modal="false"
      v-model="addsectionDialog"
      width="30%"
      title="添加栏目"
    >
      <div style="text-align: center">
        <el-form label-width="80px">
          <el-form-item label="栏目名" prop="teachBuilding">
            <el-input
              clearable
              placeholder="请输入需要添加的栏目名"
              v-model="addsection"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button style="margin-right: 10px" v-waves 
        @click="addsectionDialog = false;addsection = ''">
          取消
        </el-button>
        <el-button @click="handleaddsection" v-waves type="primary">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped></style>

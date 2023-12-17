<script setup>
import userApi from '@/api/user'
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'
import { useUserStore } from '@/store/user'
import { useSettingsStore } from '@/store/settings'
import { ref, computed, nextTick } from 'vue'

const userStore = useUserStore()
const settingsStore = useSettingsStore()

const query = ref({
  page: 1,
  size: 10,
  name: '',
  identification: ''
})
const listLoading = ref(false)
const userList = ref([])
const total = ref(0)
const isSuperAdmin = ref(false)

const role = computed(() => userStore.state.roles)
const fixedHeader = computed(() => settingsStore.state.fixedHeader)

const getUserList = () => {
  listLoading.value = true
  userApi
    .userList(query.value)
    .then((data) => {
      userList.value = data.pageData
      total.value = data.totalSize
      listLoading.value = false
      console.log(userList.value)
    })
    .catch((e) => {
      listLoading.value = false
    })
}
getUserList()

const identificationDes = (identification) => {
  console.log(identification);
  switch (identification) {
    case 1:
      return '普通用户'
    case 2:
      return '新闻编辑'
    case 3:
      return '管理员'
    case 4:
      return '超级管理员'
  }
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
        @change="getUserList"
        style="margin-right: 10px"
        v-model="query.identification"
        placeholder="请选择身份"
      >
        <el-option
          v-for="(item, index) in institute"
          :label="item"
          :key="index"
          :value="item"
        ></el-option>
      </el-select>
      <el-input
        v-model="query.name"
        clearable
        @clear="getUserList"
        placeholder="请输入检索的姓名"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="getUserList"
      />
      <el-button
        v-waves
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-search"
        @click="getUserList"
      >
        搜索
      </el-button>
      <!-- <el-button
        class="filter-item"
        v-permission="['super-admin']"
        @click="$router.push('/user/import')"
        v-waves
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-upload2"
      >
        导入
      </el-button>
      <el-link
        :href="config.userExcelHref"
        v-permission="['super-admin']"
        style="margin-left: 18px"
        :underline="false"
        type="primary"
      >
        导入模板下载
        <i class="el-icon-download"></i>
      </el-link> -->
    </div>
    <div>
      <el-table
        key="1"
        v-loading="listLoading"
        :data="userList"
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
        <el-table-column label="用户名" align="center">
          <template #default="{ row }">
            <span>{{ row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" align="center">
          <template #default="{ row }">
            <span @click="handleUpdateUserNameClick(row)" class="link-type">
              {{ row.account }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template #default="{ row }">
            <span>{{ row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期" align="center">
          <template #default="{ row }">
            <span>{{ $parseTime(row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份" width="200" align="center">
          <template #default="{ row }">
            <span v-if="row.identification == 0">未赋予角色</span>
            <el-tag v-else style="margin: 3px" type="primary">
              {{ identificationDes(row.identification) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column width="300" label="操作" align="center">
          <template #default="{ row, $index }">
            <el-button style="margin: 3px" type="primary" size="mini">
              收藏详情
            </el-button>
            <el-button style="margin: 3px" type="primary" size="mini">
              发布详情
            </el-button>
            <el-button
              plain
              type="primary"
              v-waves
              style="margin: 3px"
              size="mini"
            >
              身份修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page.sync="query.page"
        :limit.sync="query.size"
        @update:page="query.page=$event"
        @update:limit="query.size=$event"
        @pagination="getUserList"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-type,
.link-type:focus {
  color: #337ab7;
  cursor: pointer;

  & :hover {
    color: rgb(32, 160, 255);
  }
}
</style>

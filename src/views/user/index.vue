<script setup>
import userApi from '@/api/user'
import Pagination from '@/components/Pagination'
import config from '@/common/sys-config'
import { useUserStore } from '@/store/user'
import { useSettingsStore } from '@/store/settings'
import { ref, computed, nextTick, toRef } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PulishList from './component/pulish-list'

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
const currentUser = ref({})
const identificationId = ref(1)
const identification = ref(1)
const changeRoleDialog = ref(false)
const pulishNewsDrawer = ref(false)
const currentUserId = ref(1)
const roleOptions = ref([
  {
    roleDes: '普通用户',
    roleName: 'user',
    id: 1
  },
  {
    roleDes: '新闻编辑',
    roleName: 'pulisher',
    id: 2
  },
  {
    roleDes: '管理员',
    roleName: 'admin',
    id: 3
  }
])

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

const updateRole = () => {
  userApi
    .changeRole({
      userId: currentUser.value.userId,
      identification: identificationId.value
    })
    .then(() => {
      let userIndex = userList.value.findIndex(
        (value) => value.userId === currentUser.value.userId
      )
      userList.value[userIndex].identification = identificationId.value
      resetUpdateTempData()
      changeRoleDialog.value = false
    })
    .catch(() => {
      changeRoleDialog.value = false
    })
}

const resetUpdateTempData = () => {
  currentUser.value = {}
  identificationId.value = 1
}

getUserList()

const identificationDes = (identification) => {
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
const handleUpdateRoleClick = (row, index) => {
  currentUser.value = Object.assign({}, row)
  identificationId.value = row.identification
  changeRoleDialog.value = true
}
const handleUpdateUserNameClick = (row) => {
  if (role.value != 4) {
    return ElMessage.error('您的权限不足，该修改操作需要超级管理员权限')
  }
  ElMessageBox.prompt('请输入要更改的新用户昵称', '更改用户昵称', {
    confirmButtonText: '更改',
    cancelButtonText: '取消',
    inputValidator: (val) => {
      if (val === null || val.trim() === '') {
        return '请输入昵称'
      } else if (val.trim().length < 2 || val.trim().length > 8) {
        return '昵称的长度必须在3~16之间'
      }
    }
  })
    .then(({ value }) => {
      ElMessage.info('正在完成操作，请稍等')
      let obj = {
        userId: row.id,
        name: value.trim()
      }
      userApi.updateUserName(obj).then(() => {
        row.name = value.trim()
        ElMessage.success('修改成功')
      })
    })
    .catch(() => {})
}

const handleUpdateAccountClick = (row) => {
  if (role.value != 4) {
    return ElMessage.error('您的权限不足，该修改操作需要超级管理员权限')
  }
  ElMessageBox.prompt('请输入要更改的新用户手机号', '更改用户手机号', {
    confirmButtonText: '更改',
    cancelButtonText: '取消',
    inputValidator: (val) => {
      if (val === null || val.trim() === '') {
        return '请输入手机号'
      } else if (val.trim().length != 11) {
        return '手机号长度必须为11位'
      }
    }
  })
    .then(({ value }) => {
      ElMessage.info('正在完成操作，请稍等')
      let obj = {
        userId: row.id,
        name: value.trim()
      }
      userApi.updateUserName(obj).then(() => {
        row.name = value.trim()
        ElMessage.success('修改成功')
      })
    })
    .catch(() => {})
}
const handlePulisherNewsClick = (row, index) => {
  console.log(row.userId);
  currentUserId.value = row.userId
  pulishNewsDrawer.value = true
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
          v-for="(item, index) in roleOptions"
          :label="item.roleDes"
          :key="index"
          :value="item.id"
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
            <span @click="handleUpdateUserNameClick(row)" class="link-type">
              {{ row.username }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="账号" align="center">
          <template #default="{ row }">
            <span >
              {{ row.account }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="联系电话" align="center">
          <template #default="{ row }">
            <span @click="handleUpdateAccountClick(row)" class="link-type">{{ row.phoneNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册日期" align="center">
          <template #default="{ row }">
            <span>{{ $parseTime(row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="身份" align="center">
          <template #default="{ row }">
            <span v-if="row.identification == 0">未赋予角色</span>
            <el-tag v-else style="margin: 3px" type="primary">
              {{ identificationDes(row.identification) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column width="400" label="操作" align="center">
          <template #default="{ row, $index }">
            <el-button
              v-if="row.identification != 1"
              @click="handlePulisherNewsClick(row, $index)"
              style="margin: 3px"
              type="primary"
              size="mini"
            >
              发布详情
            </el-button>
            <el-button
              @click="handleUpdateRoleClick(row, $index)"
              plain
              type="primary"
              v-waves
              style="margin: 3px"
              size="mini"
            >
              身份修改
            </el-button>
            <el-button style="margin: 3px" type="primary" size="mini">
              收藏详情
            </el-button>
            <el-button style="margin: 3px" type="danger" size="mini">
              重置密码
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        v-show="total > 0"
        :total="total"
        :page="query.page"
        :limit="query.size"
        @update:page="query.page = $event"
        @update:limit="query.size = $event"
        @pagination="getUserList"
      />
    </div>

    <el-drawer
      size="45%"
      title="该作者新闻发布详情"
      :show-close="false"
      v-model="pulishNewsDrawer"
      direction="rtl">
      <PulishList :pulisherId="currentUserId"/>
    </el-drawer>

    <el-dialog
      @close="resetUpdateTempData"
      :close-on-click-modal="false"
      :center="true"
      v-model="changeRoleDialog"
      width="30%"
      title="修改身份"
    >
      <div style="text-align: center">
        <el-radio-group v-model="identificationId">
          <el-radio
            :disabled="item.id == currentUser.identification"
            v-for="(item, index) in roleOptions"
            :label="item.id"
            :key="index"
          >
            {{ item.roleDes }}
          </el-radio>
        </el-radio-group>
      </div>
      <template #footer>
        <el-button
          style="margin-right: 10px"
          v-waves
          @click="changeRoleDialog = false"
        >
          取消
        </el-button>
        <el-button @click="updateRole" v-waves type="primary">确认</el-button>
      </template>
    </el-dialog>


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

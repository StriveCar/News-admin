<script setup>
import config from '@/common/sys-config'
const emit = defineEmits(['handleNewsClick'])
const props = defineProps({
  newsList: {
    type: Array,
    default: []
  },
  listLoading: {
    type: Boolean,
    default: false
  },
  isPulish: {
    type: Boolean,
    default: false
  }
})

const handleNewsClick = (row,index)=>{
  emit("handleNewsClick",row, index)
}
</script>

<template>
  <el-empty
    v-if="props.newsList.length === 0"
    :image-size="320"
    :image="config.emptyImg"
    description="暂无新闻"
  ></el-empty>
  <el-table
    v-else
    key="1"
    v-loading="listLoading"
    :data="props.newsList"
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
        <el-button
          @click="pulishNews"
          style="margin: 3px"
          v-waves
          type="primary"
          size="mini"
        >
          发布
        </el-button>
        <el-button plain v-waves style="margin: 3px" type="primary" size="mini">
          修改
        </el-button>
        <el-button
          type="danger"
          v-permission="4"
          @click="delNews"
          v-waves
          style="margin: 3px"
          size="mini"
        >
          禁用
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style lang="scss" scoped></style>

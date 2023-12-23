<script setup>
import { defineProps } from 'vue'
import {CountTo} from 'vue3-count-to'

const props = defineProps({
  countData: {
    type: Object,
    default() {
      return {
        pulisherCount: 0,
        userCount: 0,
        viewsCount: 0,
        newsCount: 0,
        commentCount: 0
      }
    }
  },
  loading: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <el-row :gutter="30" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div v-loading="loading" class="card-panel">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户数量</div>
          <count-to
            :start-val="0"
            :end-val="props.countData.userCount"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div v-loading="loading" class="card-panel">
        <div class="card-panel-icon-wrapper icon-pulisher">
          <svg-icon icon-class="pulisher" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新闻编辑</div>
          <count-to
            :start-val="0"
            :end-val="props.countData.pulisherCount"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div v-loading="loading" class="card-panel">
        <div class="card-panel-icon-wrapper icon-views">
          <svg-icon icon-class="view" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">浏览总量</div>
          <count-to
            :start-val="0"
            :end-val="props.countData.viewsCount"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div v-loading="loading" class="card-panel">
        <div class="card-panel-icon-wrapper icon-comment">
          <svg-icon icon-class="commentC" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">评论总量</div>
          <count-to
            :start-val="0"
            :end-val="props.countData.commentCount"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="4" class="card-panel-col">
      <div v-loading="loading" class="card-panel">
        <div class="card-panel-icon-wrapper icon-news">
          <svg-icon icon-class="newsC" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">新闻数量</div>
          <count-to
            :start-val="0"
            :end-val="props.countData.newsCount"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  display: flex;
  justify-content: space-evenly;
  .card-panel-col {
    padding: 8px !important;
    margin-bottom: 16px;
  }

  .card-panel {
    height: 100px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-pulisher {
        background: #9b7d31;
      }

      .icon-views {
        background: #2c3e50;
      }

      .icon-comment {
        background: #a2ef4d;
      }

      .icon-news {
        background: #4095e5;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-pulisher {
      color: #9b7d31;
    }

    .icon-views {
      color: #2c3e50;
    }

    .icon-comment {
      color: #a2ef4d;
    }

    .icon-news {
      color: #4095e5;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 10px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 600px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

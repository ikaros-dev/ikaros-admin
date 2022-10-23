<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="12" align="middle" type="flex">
      <a-col :span="24" class="pb-3">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="标题：">
                  <a-input v-model="list.params.title" @keyup.enter="handleQuery()" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="原始标题：">
                  <a-input v-model="list.params.originalTitle" @keyup.enter="handleQuery()" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <span class="table-page-search-submitButtons">
                  <a-space>
                    <a-button type="primary" @click="handleQuery()">查询</a-button>
                    <a-button @click="handleResetParam">重置</a-button>
                    <a-button @click="toAnimeSavePage">新增</a-button>
                    <a-button @click="animeAddfleetlyModal.visible = true">快速新增</a-button>
                  </a-space>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>

      <a-col :span="24">
        <a-spin :spinning="list.loading">
          <div>
            <a-row :gutter="16" >
              <div
                v-for="(anime, index) in list.data"
                :key="index"
                @click="handleAnimeItemClick(anime)"
              >
                <a-col
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="8"
                  :xl="6"
                  class="col-anime-item">
                  <a-card :bordered="false" >
                    <!-- <img :src="anime.coverUrl" :alt="anime.originalTitle"/>
                    <h1>{{ anime }}</h1> -->
                    <img
                      slot="cover"
                      :alt="anime.originalTitle"
                      :src="anime.coverUrl"
                    />
                    <a-card-meta :title="anime.title">
                      <template slot="description">
                        {{ anime.originalTitle }}
                      </template>
                    </a-card-meta>
                  </a-card>
                </a-col>
              </div>
            </a-row>
          </div>

        </a-spin>
      </a-col>
    </a-row>

    <div class="page-wrapper">
      <a-pagination
        :current="pagination.page"
        :defaultPageSize="pagination.size"
        :pageSizeOptions="['8', '16', '32', '64', '128']"
        :total="pagination.total"
        class="pagination"
        showLessItems
        showSizeChanger
        @change="handlePageChange"
        @showSizeChange="handlePageSizeChange"
      />
    </div>

    <a-modal
      title="快速新增动漫"
      :visible="animeAddfleetlyModal.visible"
      :footer="null"
    >
      <a-form-model layout="inline" :model="animeAddFleetlyForm" @submit.native.prevent>
        <a-form-model-item>
          <a-select
            style="min-width: 150px;"
            v-model="animeAddFleetlyForm.type"
            placeholder="请选择类型">
            <a-select-option value="originalTitle" disabled>
              原始标题
            </a-select-option>
            <a-select-option value="bgmtvId">
              番组计划的条目ID
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="animeAddFleetlyForm.value" placeholder="请输入对应类型的值" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="animeAddfleetlyModal.confirmLoading"
            :disabled="animeAddFleetlyForm.type === '' || animeAddFleetlyForm.value === ''"
            @click="handleAnimeAddFleetlyFormSubmit"
          >
            查询
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import { listAnimeDTOS, findAnimeDTOById, reqBgmtvBangumiMetadata2AddAnimeFleetly } from '@/api/anime'

export default {
  name: 'AnimeList',
  computed: {
    pagination () {
      return {
        page: this.list.params.page,
        size: this.list.params.size,
        total: this.list.total
      }
    }
  },
  data () {
    return {
      list: {
        data: [],
        loading: false,
        total: 0,
        hasNext: false,
        hasPrevious: false,
        params: {
          page: 1,
          size: 8,
          title: undefined,
          originalTitle: undefined
        },
        current: {}
      },
      animeAddfleetlyModal: {
        visible: false,
        confirmLoading: false
      },
      animeAddFleetlyForm: {
        type: 'bgmtvId',
        value: ''
      }
    }
  },
  created () {
    this.handleResetParam()
  },
  methods: {
    handleQuery () {
      this.$log.debug('params', this.list.params)
      this.handlePageChange()
    },
    handleResetParam () {
      this.list.params.title = undefined
      this.list.params.originalTitle = undefined
      this.handlePageChange()
    },
    handlePageChange (page = 1) {
      this.list.params.page = page
      this.handleListAnimes()
    },
    handlePageSizeChange (current, size) {
      this.$log.debug(`Current: ${current}, PageSize: ${size}`)
      this.list.params.page = 1
      this.list.params.size = size
      this.handleListFiles()
    },
    async handleListAnimes () {
      // this.$log.debug('handleListAnimes', 'run once')
      try {
        this.list.loading = true

        const response = await listAnimeDTOS(this.list.params)

        if (response.result.content.length === 0 && this.list.params.page > 0) {
          this.list.params.page--
          await this.handleListAnimes()
          return
        }
        this.list.data = response.result.content
        this.list.total = response.result.total
        this.list.hasNext = response.result.hasNext
        this.list.hasPrevious = response.result.hasPrevious
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.list.loading = false
      }
    },
    handleAnimeItemClick (anime) {
      // this.$log.debug('anime', anime)
      // 这里根据animeId, 查询到完整的 animeDTO，把 dto作为参数传给保存页面
      const animeId = anime.id
      findAnimeDTOById(animeId)
        .then((res) => {
          // this.$log.debug('res', res)
          this.$router.push({
            name: 'AnimeSave',
            params: {
              anime: res.result
            }
          })
        })
        .catch((err) => {
          this.$log.error('find animeDTO fail, err: ', err)
          this.$message.error('查询番剧详情失败, ID=' + animeId)
        })
    },
    toAnimeSavePage () {
      this.$router.push('/anime/save')
    },
    handleAnimeAddFleetlyFormSubmit () {
      const type = this.animeAddFleetlyForm.type
      if (type === '') {
        this.$message.success('请选择类型')
        return
      }

      const value = this.animeAddFleetlyForm.value
      if (value === '') {
        this.$message.success('请输入对应类型的值')
        return
      }

      // this.$log.debug('value', value)
      // this.$log.debug('type', type)
      if (type === 'bgmtvId') {
        this.animeAddfleetlyModal.confirmLoading = true
        const bgmTvId = parseInt(value)
        // this.$log.debug('bgmTvId', bgmTvId)
        reqBgmtvBangumiMetadata2AddAnimeFleetly(bgmTvId)
          .then((res) => {
            this.animeAddfleetlyModal.confirmLoading = false
            this.animeAddfleetlyModal.visible = false
            this.handlePageChange()
          })
          .catch((err) => {
            this.$log.error('request bgmtv subject metadata to add anime fleetly fail, err: ', err)
            this.$message.error('请求番组计划快速新增番剧失败, ID=' + bgmTvId)
            this.animeAddfleetlyModal.confirmLoading = false
          })
      }
    },
    handleAnimeAddfleetlyModalCancel () {}
  }
}
</script>

<style lang="less" scoped>
.col-anime-item {
  margin: 3px 0;
  // min-width: 100%;
  // min-height: 100%;
  // height: 300px;
  width: 15%;
  overflow: hidden;
  img {
    margin: 0;
    height: 100%;
    width: 100%;
  }
}
</style>

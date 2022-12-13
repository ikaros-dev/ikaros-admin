<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="12" align="middle" type="flex">
      <a-col :span="24" class="pb-3">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="中文标题：">
                  <a-input v-model="list.params.titleCn" @keyup.enter="handleQuery()" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="标题：">
                  <a-input v-model="list.params.title" @keyup.enter="handleQuery()" />
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
        <div class="table-operator mb-0">
          <a-button v-show="list.selected.length" icon="delete" type="danger" @click="handleDeleteAnimeInBatch">
            删除
          </a-button>
          <a-button v-show="list.selected.length" icon="close" @click="list.selected = []"> 取消</a-button>
          <a-button v-show="list.selected.length" icon="check-circle" type="primary" @click="handleSelectAll">
            全选
          </a-button>
          <a-button v-show="list.selected.length" icon="star" type="primary" @click="starAnimeWithBatch">
            订阅
          </a-button>
        </div>
      </a-col>

      <a-col :span="24">
        <a-spin :spinning="list.loading">
          <div>
            <a-row :gutter="16" >
              <div
                v-for="(anime, index) in list.data"
                :key="index"
              >
                <a-col
                  :xs="24"
                  :sm="12"
                  :md="8"
                  :lg="6"
                  :xl="3"
                  class="col-anime-col"
                  @contextmenu.prevent="handleContextMenu($event, anime)"
                >
                  <a-card
                    :class="`${isItemSelect(anime) ? 'card-body-select-true' : 'card-body-select-false'}`"
                    :bordered="false"
                    :title="anime.titleCn === '' ? anime.title : anime.titleCn">
                    <template #extra>
                      <a-icon
                        v-show="!isItemSelect(anime)"
                        :style="{ fontSize: '20px', color: 'rgb(37 99 235)' }"
                        theme="twoTone"
                        type="plus-circle"
                        @click.stop="handleSelect(anime)"
                      />
                    </template>
                    <img
                      slot="cover"
                      :alt="anime.originalTitle"
                      :src="anime.coverUrl"
                      @click="handleItemClick(anime)"
                    />
                  </a-card>
                </a-col>
              </div>
            </a-row>
          </div>

        </a-spin>
      </a-col>
    </a-row>

    <br>

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
      title="快速联网新增动漫"
      :visible="animeAddfleetlyModal.visible"
      @cancel="animeAddfleetlyModal.visible = false"
      :footer="null"
    >
      <a-form-model layout="inline" :model="animeAddFleetlyForm" @submit.native.prevent>
        <a-form-model-item>
          <a-select
            style="min-width: 150px;"
            v-model="animeAddFleetlyForm.type"
            placeholder="请选择类型">
            <a-select-option value="title">
              动漫名称
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
import { listAnimeDTOS, deleteAnimeById, findAnimeDTOById, deleteWithBatchByIds } from '@/api/anime'
import { reqBgmtvBangumiMetadata } from '@/api/network'
import { searchAnime } from '@/api/metadata'
import { saveUserSubscribeWithBatchByAnimeIdArr } from '@/api/user'

export default {
  name: 'AnimeList',
  computed: {
    pagination () {
      return {
        page: this.list.params.page,
        size: this.list.params.size,
        total: this.list.total
      }
    },
    isItemSelect () {
      return function (anime) {
        return this.list.selected.findIndex(item => item.id === anime.id) > -1
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
          size: 16,
          title: undefined,
          originalTitle: undefined
        },
        selected: [],
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
      this.handleListAnimes()
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
    handleAnimeItemClick (animeId) {
      // 这里根据animeId, 查询到完整的 animeDTO，把 dto作为参数传给保存页面
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
      this.$router.push('/Anime/save')
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
        reqBgmtvBangumiMetadata(bgmTvId)
          .then((res) => {
            this.animeAddfleetlyModal.confirmLoading = false
            this.animeAddfleetlyModal.visible = false
            this.handlePageChange()
          })
          .catch((err) => {
            this.$log.error('request bgmtv subject metadata to add Anime fleetly fail, err: ', err)
            this.$message.error('请求番组计划快速新增番剧失败, ID=' + bgmTvId)
            this.animeAddfleetlyModal.confirmLoading = false
          })
      }
      if (type === 'title' && value !== '') {
        this.animeAddfleetlyModal.confirmLoading = true
        searchAnime(value)
          .then((rsp) => {
            this.animeAddfleetlyModal.confirmLoading = false
            this.animeAddfleetlyModal.visible = false
            this.handlePageChange()
          })
          .catch((err) => {
            this.$log.error('request bgmtv subject metadata to add Anime fleetly fail, err: ', err)
            this.$message.error('请求联网快速新增番剧失败, keyword=' + value)
            this.animeAddfleetlyModal.confirmLoading = false
          })
      }
    },
    toAnimeDetailPage (animeId) {
      this.$router.push({
        path: '/anime/detail/' + animeId
      })
    },
    /**
     * Show context menu
     */
    handleContextMenu (event, anime) {
      this.$contextmenu({
        items: [
          {
            label: `跳转到编辑页`,
            onClick: () => {
              this.handleAnimeItemClick(anime.id)
            },
            divided: true
          },
          {
            label: `跳转到详情页`,
            onClick: () => {
              this.$router.push({
                path: '/anime/detail/' + anime.id
              })
            },
            divided: true
          },
          {
            label: '删除',
            onClick: () => {
              this.$confirm({
                title: '提示',
                content: '确定删除该动漫？',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  await deleteAnimeById(anime.id)
                  await this.handleListAnimes()
                }
              })
            }
          }
        ],
        event,
        minWidth: 210
      })
      return false
    },
    handleSelect (anime) {
      this.list.selected = [...this.list.selected, anime]
    },

    handleUnselect (anime) {
      this.list.selected = this.list.selected.filter(item => item.id !== anime.id)
    },

    handleSelectAll () {
      this.list.selected = this.list.data
    },

    handleDeleteAnimeInBatch () {
      // todo impl
      const animeIdArr = []
      this.list.selected.forEach(anime => {
        animeIdArr.push(anime.id)
      })
      this.list.loading = true
      deleteWithBatchByIds(animeIdArr)
        .then(rsp => {
          if (rsp.result) {
            this.$message.success('批量删除动漫成功')
            this.handleListAnimes()
          } else {
            const msg = '批量删除动漫失败，异常消息：' + rsp.message
            this.$message.error(msg)
            this.$log.error(msg)
          }
        })
        .catch(err => {
          const msg = '批量删除动漫失败，异常消息：' + err
          this.$message.error(msg)
          this.$log.error(msg)
        })
        .finally(() => {
          this.list.loading = false
        })
    },

    handleItemClick (anime) {
      if (this.list.selected.length <= 0) {
        this.toAnimeDetailPage(anime.id)
        return
      }
      this.isItemSelect(anime) ? this.handleUnselect(anime) : this.handleSelect(anime)
    },

    starAnimeWithBatch () {
      const animeIdArr = []
      this.list.selected.forEach(anime => {
        animeIdArr.push(anime.id)
      })

      saveUserSubscribeWithBatchByAnimeIdArr(animeIdArr)
        .then(rsp => {
          if (rsp.result) {
            this.$message.success('订阅番剧成功')
            this.list.selected = []
          } else {
            const msg = '订阅番剧失败，异常信息：' + rsp.message
            this.$message.error(msg)
            this.$log.error(msg)
          }
        })
        .catch(err => {
          const msg = '订阅番剧失败，异常信息：' + err
          this.$message.error(msg)
          this.$log.error(msg)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.col-anime-col {
  overflow: hidden;
  aspect-ratio: 0.7;

  .card-body-select-true{
    height: 100%;
    margin: 5px 0;
    border: 1px blue solid;
    border-radius: 5px;
    height: inherit;
  }
  .card-body-select-false{
    height: 100%;
    margin: 5px 0;
    border: 1px #ececec solid;
    border-radius: 5px;
  }
}
</style>

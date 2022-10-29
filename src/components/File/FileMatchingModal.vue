<template>
  <a-modal v-model="modalVisible" destroyOnClose width="65%" title="文件匹配">
    <a-row :gutter="12" align="middle" type="flex">
      <a-col :span="24" class="pb-3">
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="6" :sm="24">
                <a-form-item label="关键词：">
                  <a-input v-model="list.params.keyword" placeholder="请输入文件名称关键词" @keyup.enter="handleQuery()" />
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="存储位置：">
                  <a-select
                    v-model="list.params.place"
                    :loading="places.loading"
                    allowClear
                    @change="handleQuery()"
                  >
                    <a-select-option v-for="item in places.data" :key="item" :value="item">
                      {{ item | fileTypePlace }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <a-form-item label="文件类型：">
                  <a-select
                    v-model="list.params.type"
                    :loading="types.loading"
                    allowClear
                    @change="handleQuery()"
                  >
                    <a-select-option
                      v-for="(item, index) in types.data"
                      :key="index"
                      :value="item"
                    >{{ item | fileTypeText }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="6" :sm="24">
                <span class="table-page-search-submitButtons">
                  <a-space>
                    <a-button type="primary" @click="handleQuery()">查询</a-button>
                    <a-button @click="handleResetParam()">重置</a-button>
                    <a-button icon="cloud-upload" type="primary" @click="upload.visible = true">上传</a-button>
                  </a-space>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
      </a-col>

      <a-col :span="24">
        <a-table
          :row-selection="{ selectedRowKeys: fileTableSelectedRowKeys, onChange: fileTableOnSelectChange }"
          :columns="fileTableColumns"
          :data-source="list.data"
          :pagination="false"
          size="small"
        />
      </a-col>
    </a-row>

    <div class="page-wrapper">
      <a-pagination
        :current="pagination.page"
        :defaultPageSize="pagination.size"
        :pageSizeOptions="['12', '24', '36', '48', '72']"
        :total="pagination.total"
        class="pagination"
        showLessItems
        showSizeChanger
        @change="handlePageChange"
        @showSizeChange="handlePageSizeChange"
      />
    </div>

    <template slot="footer">
      <a-button type="primary" @click="handleRequestMatchingClick" :loading="requestMatchingButtonLoading">请求匹配</a-button>
    </template>

    <FileUploadModal :visible.sync="upload.visible" @fileUploadModalClose="onFileUploadModalClose" />

  </a-modal>
</template>

<script>
import FileUploadModal from '@/components/File/FileUploadModal.vue'
import { listTypes, listPlaces, listByPaging } from '@/api/file'
import { matchingEpisodeUrlByFileIds } from '@/api/season'

export default {
  name: 'FileMatchingModal',
  components: { FileUploadModal },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    receiveSeasonId: {
      type: String,
      default: -1
    }
  },
  beforeMount () {
    if (this.receiveSeasonId) {
      this.seasonId = this.receiveSeasonId
    }
  },
  computed: {
    modalVisible: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    },
    pagination () {
      return {
        page: this.list.params.page,
        size: this.list.params.size,
        total: this.list.total
      }
    },
    selectPreviousButtonDisabled () {
      const index = this.list.data.findIndex(file => file.id === this.list.current.id)
      return index === 0 && !this.list.hasPrevious
    },
    selectNextButtonDisabled () {
      const index = this.list.data.findIndex(file => file.id === this.list.current.id)
      return index === this.list.data.length - 1 && !this.list.hasNext
    }
  },
  data () {
    return {
      fileTableColumns: [
        {
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: 'URL',
          dataIndex: 'url'
        }
      ],
      seasonId: '',
      fileTableSelectedRowKeys: [],
      list: {
        data: [],
        loading: false,
        total: 0,
        hasNext: false,
        hasPrevious: false,
        params: {
          page: 1,
          size: 12,
          keyword: undefined,
          type: undefined,
          place: undefined
        },
        current: {}
      },
      types: {
        data: [],
        loading: false
      },

      places: {
        data: [],
        loading: false
      },

      upload: {
        visible: false
      },

      requestMatchingButtonLoading: false
    }
  },
  created () {
    this.handleResetParam()
  },
  methods: {
    /**
     * Reset query params
     */
    handleResetParam () {
      this.list.params.keyword = undefined
      this.list.params.type = undefined
      this.list.params.place = undefined
      this.handlePageChange()
      this.handleListTypes()
      this.handleListPlaces()
    },

    async handleListFiles () {
      // this.$log.debug('handleListFiles run once')
      try {
        this.list.loading = true

        const response = await listByPaging(this.list.params)
        // this.$log.debug('[handleListFiles] response: ', response)

        if (response.result.content.length === 0 && this.list.params.page > 0) {
          this.list.params.page--
          await this.handleListFiles()
          return
        }
        this.list.data = response.result.content
        // 添加表格用的key，此处直接使用文件ID
        this.list.data.forEach(element => {
          const id = element.id
          element.key = id
        })
        // this.$log.debug('data', this.list.data)
        this.list.total = response.result.total
        this.list.hasNext = response.result.hasNext
        this.list.hasPrevious = response.result.hasPrevious
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.list.loading = false
      }
    },

    /**
     * Search files
     */
    handleQuery () {
      this.$log.debug('params', this.list.params)
      this.handlePageChange()
    },

    /**
     * Handle page change
     */
    handlePageChange (page = 1) {
      // this.$log.debug('page: ', page)
      this.list.params.page = page
      this.handleListFiles()
    },

    /**
     * Handle page size change
     */
    handlePageSizeChange (current, size) {
      this.$log.debug(`Current: ${current}, PageSize: ${size}`)
      this.list.params.page = 1
      this.list.params.size = size
      this.handleListFiles()
    },

    /**
     * 获取文件所有类型
     */
    async handleListTypes () {
      try {
        this.types.loading = true

        const response = await listTypes()
        // this.$log.debug('[handleListTypes] response: ', response)

        this.types.data = response.result
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.types.loading = false
      }
    },
    /**
     * 获取文件所有位置
     */
    async handleListPlaces () {
      try {
        this.places.loading = true

        const response = await listPlaces()
        // this.$log.debug('[handleListPlaces] response: ', response)

        this.places.data = response.result
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.places.loading = false
      }
    },

    onFileUploadModalClose () {
      // this.$log.debug('onFileUploadModalClose run once')
      this.handlePageChange()
      this.handleListTypes()
      this.handleListPlaces()
    },

    handleFileItemClick (file) {
      if (this.isItemSelect(file)) {
        this.list.current = {}
      } else {
        this.list.current = file
      }
    },

    closeFileMathcingModal () {
      this.$log.debug('run')
      // this.$set(this, 'visible', false)
      // this.visible = false
      this.modalVisible = false
    },

    fileTableOnSelectChange (selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.fileTableSelectedRowKeys = selectedRowKeys
    },

    handleRequestMatchingClick () {
      this.requestMatchingButtonLoading = true
      matchingEpisodeUrlByFileIds(this.seasonId, this.fileTableSelectedRowKeys)
      .then(res => {
        this.$message.success('匹配成功')
        this.modalVisible = false
      })
      .catch(error => {
        this.$message.error('匹配失败')
        this.$log.debug('matching episode url by file ids fail, error:', error)
      })
      .finally(() => {
        this.requestMatchingButtonLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.div-filelist-item{
  background-color: #ececec;
  padding: 20px;

  .row-filelist {

    .col-file-item {
      margin: 3px 0;
      // min-width: 100%;
      // min-height: 100%;
      height: 300px;
      overflow: hidden;

      .card-body-select-true{
        border: 1px blue solid;
        border-radius: 5px;
        height: inherit;
      }
      .card-body-select-false{
        border: 1px #ececec solid;
        border-radius: 5px;
        height: inherit;
      }

      .img-filelist-item{
        margin: 0;
        height: 100%;
        width: 100%;
        // overflow: hidden;
      }
    }
  }
}

.page-wrapper {
  margin-top: 5px;
}
</style>

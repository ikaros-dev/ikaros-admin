<template>
  <page-header-wrapper :title="false">
    <a-row :gutter="12" align="middle" type="flex">
      <a-col :span="24" class="pb-3">
        <a-card :bodyStyle="{ padding: '16px' }" :bordered="false">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="48">
                <a-col :md="6" :sm="24">
                  <a-form-item label="关键词：">
                    <a-input v-model="list.params.keyword" @keyup.enter="handleQuery()" />
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
                        {{ item | typeText }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <a-form-item label="文件类型：">
                    <a-select
                      v-model="list.params.mediaType"
                      :loading="types.loading"
                      allowClear
                      @change="handleQuery()"
                    >
                      <a-select-option
                        v-for="(item, index) in types.data"
                        :key="index"
                        :value="item"
                      >{{ item }}
                      </a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24">
                  <span class="table-page-search-submitButtons">
                    <a-space>
                      <a-button type="primary" @click="handleQuery()">查询</a-button>
                      <a-button @click="handleResetParam()">重置</a-button>
                    </a-space>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="table-operator mb-0">
            <a-button icon="cloud-upload" type="primary" @click="upload.visible = true">上传</a-button>
            <a-button v-show="list.selected.length" icon="check-circle" type="primary" @click="handleSelectAll">
              全选
            </a-button>
            <a-button v-show="list.selected.length" icon="delete" type="danger" @click="handleDeleteFileInBatch">
              删除
            </a-button>
            <a-button v-show="list.selected.length" icon="close" @click="list.selected = []"> 取消</a-button>
          </div>
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-spin :spinning="list.loading">
          <div
            class="grid grid-cols-2 gap-x-2 gap-y-3 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-10"
            role="list"
          >
            <div
              v-for="(file, index) in list.data"
              :key="index"
              :class="`${isItemSelect(file) ? 'border-blue-600' : 'border-white'}`"
              class="relative cursor-pointer overflow-hidden rounded-sm border-solid bg-white transition-all hover:shadow-sm"
              @click="handleItemClick(file)"
              @mouseenter="$set(file, 'hover', true)"
              @mouseleave="$set(file, 'hover', false)"
              @contextmenu.prevent="handleContextMenu($event, file)"
            >
              <div class="group aspect-w-10 aspect-h-7 block w-full overflow-hidden bg-white">
                <img
                  v-if="isImage(file)"
                  :alt="file.name"
                  :src="file.thumbPath"
                  class="pointer-events-none overflow-hidden object-cover transition-opacity group-hover:opacity-70"
                  loading="lazy"
                />
                <span v-else class="flex items-center justify-center text-2xl text-gray-600">
                  {{ file.suffix }}
                </span>
              </div>
              <a-tooltip :title="file.name">
                <span class="block truncate p-1.5 text-xs font-medium text-gray-500">
                  {{ file.name }}
                </span>
              </a-tooltip>

              <a-icon
                v-show="!isItemSelect(file) && file.hover"
                :style="{ fontSize: '20px', color: 'rgb(37 99 235)' }"
                class="absolute top-1 right-1 cursor-pointer font-bold transition-all"
                theme="twoTone"
                type="plus-circle"
                @click.stop="handleSelect(file)"
              />
              <a-icon
                v-show="isItemSelect(file)"
                :style="{ fontSize: '20px', color: 'rgb(37 99 235)' }"
                class="absolute top-1 right-1 cursor-pointer font-bold transition-all"
                theme="twoTone"
                type="check-circle"
              />
              <a-icon
                v-show="file.hover && list.selected.length > 0"
                :style="{ fontSize: '20px' }"
                class="absolute top-1 left-1 cursor-pointer font-bold transition-all"
                theme="twoTone"
                type="profile"
                @click.stop="handleOpenDetail(file)"
              />
            </div>
          </div>
        </a-spin>
      </a-col>
    </a-row>

    <div class="page-wrapper">
      <a-pagination
        :current="pagination.page"
        :defaultPageSize="pagination.size"
        :pageSizeOptions="['50', '100', '150', '200']"
        :total="pagination.total"
        class="pagination"
        showLessItems
        showSizeChanger
        @change="handlePageChange"
        @showSizeChange="handlePageSizeChange"
      />
    </div>

    <FileUploadModal :visible.sync="upload.visible" @close="onUploadClose" />

  </page-header-wrapper>
</template>

<script>
import FileUploadModal from '@/components/File/FileUploadModal.vue'
import fileApi from '@/api/file'

export default {
  components: { FileUploadModal },
  data () {
    return {
      list: {
        data: [],
        loading: false,
        total: 0,
        hasNext: false,
        hasPrevious: false,
        params: {
          page: 0,
          size: 50,
          keyword: undefined,
          mediaType: undefined,
          place: undefined
        },
        selected: [],
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

      detailVisible: false
    }
  },
  computed: {
    isImage () {
      return function (file) {
        if (!file || !file.mediaType) {
          return false
        }
        return file.mediaType.startsWith('image')
      }
    },
    isItemSelect () {
      return function (file) {
        return this.list.selected.findIndex(item => item.id === file.id) > -1
      }
    },
    pagination () {
      return {
        page: this.list.params.page + 1,
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
  methods: {
    /**
     * List files
     */
    async handleListFiles () {
      try {
        this.list.loading = true

        const response = await fileApi.list(this.list.params)

        if (response.data.content.length === 0 && this.list.params.page > 0) {
          this.list.params.page--
          await this.handleListFiles()
          return
        }
        this.list.data = response.data.content
        this.list.total = response.data.total
        this.list.hasNext = response.data.hasNext
        this.list.hasPrevious = response.data.hasPrevious
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.list.loading = false
      }
    },

    /**
     * 获取文件所有类型
     */
    async handleListTypes () {
      try {
        this.types.loading = true

        const response = await fileApi.listTypes()

        this.types.data = response.data
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

        const response = await fileApi.listPlaces()

        this.types.data = response.data
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.types.loading = false
      }
    },

    /**
     * Handle open file detail modal event
     */
    handleOpenDetail (file) {
      this.list.current = file
      this.detailVisible = true
    },

    handleItemClick (file) {
      if (this.list.selected.length <= 0) {
        this.handleOpenDetail(file)
        return
      }
      this.isItemSelect(file) ? this.handleUnselect(file) : this.handleSelect(file)
    },

    handleSelect (file) {
      this.list.selected = [...this.list.selected, file]
    },

    handleUnselect (file) {
      this.list.selected = this.list.selected.filter(item => item.id !== file.id)
    },

    handleSelectAll () {
      this.list.selected = this.list.data
    },

    /**
     * Show context menu
     */
    handleContextMenu (event, item) {
      this.$contextmenu({
        items: [
          {
            label: `复制${this.isImage(item) ? '图片' : '文件'}链接`,
            onClick: () => {
              const text = `${encodeURI(item.path)}`
              this.$copyText(text)
                .then(message => {
                  this.$log.debug('copy', message)
                  this.$message.success('复制成功！')
                })
                .catch(err => {
                  this.$log.debug('copy.err', err)
                  this.$message.error('复制失败！')
                })
            },
            divided: true
          },
          {
            disabled: !this.isImage(item),
            label: '复制 Markdown 格式链接',
            onClick: () => {
              const text = `![${item.name}](${encodeURI(item.path)})`
              this.$copyText(text)
                .then(message => {
                  this.$log.debug('copy', message)
                  this.$message.success('复制成功！')
                })
                .catch(err => {
                  this.$log.debug('copy.err', err)
                  this.$message.error('复制失败！')
                })
            },
            divided: true
          },
          {
            label: '删除',
            onClick: () => {
              this.$confirm({
                title: '提示',
                content: '确定删除该附件？',
                okText: '确定',
                cancelText: '取消',
                onOk: async () => {
                  await fileApi.deleteById(item.id)
                  await this.handleListFiles()
                  this.handleUnselect(item)
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

    /**
     * Handle page change
     */
    handlePageChange (page = 1) {
      this.list.params.page = page - 1
      this.handleListFiles()
    },

    /**
     * Handle page size change
     */
    handlePageSizeChange (current, size) {
      this.$log.debug(`Current: ${current}, PageSize: ${size}`)
      this.list.params.page = 0
      this.list.params.size = size
      this.handleListFiles()
    },

    /**
     * Reset query params
     */
    handleResetParam () {
      this.list.params.keyword = undefined
      this.list.params.mediaType = undefined
      this.list.params.place = undefined
      this.handlePageChange()
      this.handleListTypes()
      this.handleListPlaces()
    },

    /**
     * Search files
     */
    handleQuery () {
      this.handlePageChange()
    },

    onUploadClose () {
      this.handlePageChange()
      this.handleListTypes()
      this.handleListPlaces()
    },

    /**
     * Deletes selected files
     */
    handleDeleteFileInBatch () {
      const _this = this
      if (this.list.selected.length <= 0) {
        this.$message.warn('你还未选择任何附件，请至少选择一个！')
        return
      }
      this.$confirm({
        title: '确定要批量删除选中的附件吗？',
        content: '一旦删除不可恢复，请谨慎操作',
        async onOk () {
          try {
            const fileIds = _this.list.selected.map(file => file.id)
            await fileApi.deleteInBatch(fileIds)
            _this.list.selected = []
            _this.$message.success('删除成功')
          } catch (e) {
            _this.$log.error('Failed to delete selected files', e)
          } finally {
            await _this.handleListFiles()
          }
        }
      })
    },

    /**
     * Select previous file
     */
    async handleSelectPrevious () {
      const index = this.list.data.findIndex(item => item.id === this.list.current.id)
      if (index > 0) {
        this.list.current = this.list.data[index - 1]
        return
      }
      if (index === 0 && this.list.hasPrevious) {
        this.list.params.page--
        await this.handleListFiles()

        this.list.current = this.list.data[this.list.data.length - 1]
      }
    },

    /**
     * Select next file
     */
    async handleSelectNext () {
      const index = this.list.data.findIndex(item => item.id === this.list.current.id)
      if (index < this.list.data.length - 1) {
        this.list.current = this.list.data[index + 1]
        return
      }
      if (index === this.list.data.length - 1 && this.list.hasNext) {
        this.list.params.page++
        await this.handleListFiles()

        this.list.current = this.list.data[0]
      }
    }
  }
}
</script>

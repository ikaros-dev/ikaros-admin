<template>
  <a-modal v-model="modalVisible" width="70%" title="文件详情">
    <a-row :gutter="24" type="flex">
      <a-col :lg="15" :md="24" :sm="24" :xl="15" :xs="24">
        <div class="attach-detail-img pb-3">
          <a v-if="isImage" :href="file.url" target="_blank">
            <img :src="file.url" class="file-detail-preview-img" loading="lazy" />
          </a>
          <VideoDPlayer v-else-if="isVideo" :url="file.url" />
          <!-- <video
            v-else-if="isVideo"
            width="100%"
            height="100%"
            :src="file.url"
            controls
            preload="metadata">
            您的浏览器不支持这个格式的视频
          </video> -->
          <audio v-else-if="isVoice" controls :src="file.url">
            您的浏览器不支持这个格式的音频
          </audio>
          <div v-else>此文件不支持预览</div>
        </div>
      </a-col>
      <a-col :lg="9" :md="24" :sm="24" :xl="9" :xs="24">
        <a-list itemLayout="horizontal">
          <a-list-item style="padding-top: 0">
            <a-list-item-meta :description="file.id">
              <span slot="title">文件ID：</span>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item >
            <a-list-item-meta>
              <template v-if="editable" slot="description">
                <a-input ref="nameInput" v-model="file.name" @blur="handleUpdateName" @pressEnter="handleUpdateName"/>
              </template>
              <template v-else slot="description">{{ file.name }}</template>
              <span slot="title">
                文件名：
                <a-button class="!p-0" type="link" @click="handleEditName">
                  <a-icon type="edit" />
                </a-button>
              </span>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-list-item-meta >
              <span slot="title">文件 类型/后缀：</span>
              <span slot="description"> {{ file.type | fileTypeText }}/{{ file.postfix }}</span>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-list-item-meta :description="file.place | fileTypePlace">
              <span slot="title">存储位置：</span>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-list-item-meta>
              <template slot="description">
                {{ file.size | fileSizeFormat }}
              </template>
              <span slot="title">文件大小：</span>
            </a-list-item-meta>
          </a-list-item>
          <a-list-item>
            <a-list-item-meta>
              <template slot="description">
                {{ file.createTime | moment }}
              </template>
              <span slot="title">上传日期：</span>
            </a-list-item-meta>
          </a-list-item>
        </a-list>
      </a-col>
    </a-row>

    <template #footer>
      <slot name="extraFooter" />
      <a-popconfirm cancelText="取消" okText="确定" title="你确定要删除该文件？" @confirm="handleDelete">
        <a-button type="danger" :loading="deleting">删除</a-button>
      </a-popconfirm>
    </template>
  </a-modal>
</template>

<script>
import { deleteById, updateNameById } from '@/api/file'
import VideoDPlayer from '@/components/Video/VideoDPlayer.vue'

export default {
  name: 'FileDetailModal',
  components: { VideoDPlayer },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    file: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      editable: false,
      deleting: false
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
    isImage () {
      if (!this.file || !this.file.type) {
        return false
      }
      return this.file.type.startsWith('IMAGE')
    },
    isVideo () {
      if (!this.file || !this.file.type) {
        return false
      }
      return this.file.type.startsWith('VIDEO')
    },
    isVoice () {
      if (!this.file || !this.file.type) {
        return false
      }
      return this.file.type.startsWith('VOICE')
    }
  },
  methods: {
    /**
     * Deletes the file
     */
    async handleDelete () {
      try {
        this.deleting = true

        await deleteById(this.file.id)
        this.$emit('delete', this.file)
        this.deleteErrored = false
        this.modalVisible = false
      } catch (error) {
        this.$log.error(error)
        this.deleteErrored = true
      } finally {
        setTimeout(() => {
          this.deleting = false
        }, 400)
      }
    },

    /**
     * Shows the edit name input
     */
    handleEditName () {
      this.editable = !this.editable
      if (this.editable) {
        this.$nextTick(() => {
          this.$refs.nameInput.focus()
        })
      }
    },

    /**
     * Updates the file name
     */
    async handleUpdateName () {
      if (!this.file.name) {
        this.$notification['error']({
          message: '提示',
          description: '文件名称不能为空！'
        })
        return
      }
      try {
        // TODO 修改 sdk 的方法为 updateName
        await updateNameById(this.file.id, this.file.name)
      } catch (error) {
        this.$log.error(error)
      } finally {
        this.editable = false
      }
    },

    /**
     * Handles the copy link event
     * @param {String} link
     */
    handleCopyLink (link) {
      this.$copyText(link)
        .then(message => {
          this.$log.debug('copy', message)
          this.$message.success('复制成功！')
        })
        .catch(err => {
          this.$log.debug('copy.err', err)
          this.$message.error('复制失败！')
        })
    }
  }
}
</script>

<style lang="less" scoped>
.file-detail-preview-img {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
</style>

<template>
  <a-modal v-model="modalVisible" width="70%" :afterClose="onModalClose" title="动漫订阅">
    <a-radio-group v-model="subscribe.progress">
      <a-radio-button value="WISH">
        想看
      </a-radio-button>
      <a-radio-button value="DOING">
        在看
      </a-radio-button>
      <a-radio-button value="DONE">
        看过
      </a-radio-button>
      <a-radio-button value="SHELVE">
        搁置
      </a-radio-button>
      <a-radio-button value="DISCARD">
        抛弃
      </a-radio-button>
    </a-radio-group>

    <!--    <br/><br/>-->

    <div>
      <p>请选择下方列表的第一集资源作为筛选其它剧集资源的的特征资源</p>
      <a-table
        size="middle"
        :loading="resourceTableLoading"
        :row-selection="{ selectedRowKeys: selectedRowKeys, type: 'radio', onChange: onSelectChange }"
        :customRow="customRowClick"
        :columns="columns"
        :data-source="list"
      />
    </div>

    <template slot="footer">
      <a-button key="back" @click="handleCancel">
        返回
      </a-button>
      <a-button key="submit" type="primary" :loading="submitButtonLoading" @click="handleOk">
        提交订阅
      </a-button>
    </template>
  </a-modal>
</template>
<script>

import { saveUserSubscribeByAnimeId } from '@/api/user'
import { findDmhyRssItems } from '@/api/tripartite'

export default {
  name: 'AnimeSubscribeModal',
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    animeId: {
      type: Number,
      default: -1
    },
    additional: {
      type: String,
      default: ''
    }
  },
  watch: {
    // 每当 visible 改变时，重新渲染列表
    visible (newValue, oldValue) {
      // console.log('oldValue', oldValue)
      // console.log('newValue', newValue)
      // console.log(newValue && !this.additional)
      if (newValue && !this.additional) {
        this.findList(this.animeId)
      }
    }
  },
  data () {
    return {
      subscribe: {
        animeId: this.animeId,
        progress: 'WISH',
        additional: this.additional
      },
      columns: [
        { title: '名称', dataIndex: 'title' }
      ],
      list: [],
      selectedRowKeys: [],
      submitButtonLoading: false,
      resourceTableLoading: false
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
    }
  },
  methods: {
    findList (animeId) {
      this.resourceTableLoading = true
      findDmhyRssItems(animeId, '1')
        .then(rsp => {
          const itemList = rsp.result
          itemList.forEach(item => {
            item.key = item.pubDate
          })
          this.list = itemList
          if (itemList.length === 0) {
            this.$message.warn('未查询到资源')
          }
        })
        .catch(err => {
          this.$log.error('find dmhy rss items fail', err)
        })
        .finally(() => {
          this.resourceTableLoading = false
        })
    },
    onModalClose () {
      this.$emit('animeSubscribeModalClose')
    },
    onSelectChange (key) {
      // this.$log.debug('key', key)
      this.selectedRowKeys = key
      this.subscribe.additional = this.getAdditionalByKey(key)
    },
    customRowClick (record) {
      return {
        on: {
          click: () => {
            this.$log.debug('record', record)
            this.subscribe.additional = record.name
            this.selectedRowKeys = []
            this.selectedRowKeys.push(record.key)
          }
        }
      }
    },
    getAdditionalByKey (key) {
      const additionalEle = (this.list.find(e => e.key === key))
      // this.$log.debug('additionalEle', additionalEle)
      return additionalEle.title
    },
    handleOk (e) {
      if (!this.selectedRowKeys || this.selectedRowKeys.length === 0) {
        this.$message.warn('请选择一个特征资源')
        return
      }

      // this.$log.debug('this.selectedRowKeys[0]', this.selectedRowKeys[0])
      const additional = this.getAdditionalByKey(this.selectedRowKeys[0])
      // this.$log.debug('additional', additional)

      const animeId = this.animeId
      this.submitButtonLoading = true
      this.subscribe.additional = additional
      saveUserSubscribeByAnimeId(animeId, this.subscribe.progress, this.subscribe.additional)
        .then(rsp => {
          // this.$log.debug('rsp', rsp)
          if (rsp.result) {
            this.$message.success('订阅成功')
            this.modalVisible = false
            this.$emit('userSubProgressUpdated', this.subscribe)
          }
        })
        .catch(err => {
          this.$log.error('sub anime fail, animeId=' + animeId + ', error msg: ', err)
          this.$message.error('sub anime fail, animeId=' + animeId + ', error msg: ', err)
        })
        .finally(() => {
          this.submitButtonLoading = false
        })
    },
    handleCancel (e) {
      this.modalVisible = false
    }
  }
}
</script>

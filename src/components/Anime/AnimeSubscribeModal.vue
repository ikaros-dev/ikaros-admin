<template>
  <a-modal v-model="modalVisible" :afterClose="onModalClose" title="动漫订阅">
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
    }
  },
  data () {
    return {
      subscribe: {
        animeId: this.animeId,
        progress: 'WISH',
        additional: ''
      },
      columns: [
        { title: '名称', dataIndex: 'name' }
      ],
      list: [
        { key: '1', name: '[MingY&Billion Meta Lab] 孤獨搖滾！ / Bocchi The Rock! [01][1080p][繁日內嵌][更正]（招募）' },
        { key: '2', name: '[爱恋字幕社][10月新番][孤独摇滚][Bocchi the Rock!][01][1080p][MP4][GB][简中]' },
        { key: '3', name: '[千夏字幕组][孤独摇滚!_BOCCHI THE ROCK!][第01话][1080p_HEVC][简繁内封]' },
        { key: '4', name: '[MingY&Billion Meta Lab][孤独摇滚！][Bocchi The Rock!][03][1080p][HEVC 10bit][CHS&CHT&JPN]' }
      ],
      selectedRowKeys: [],
      submitButtonLoading: false
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
      return additionalEle.name
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
      saveUserSubscribeByAnimeId(animeId, this.subscribe.progress, additional)
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

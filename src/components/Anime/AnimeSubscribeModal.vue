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
        :row-selection="{ type: 'radio', onChange: onSelectChange }"
        :columns="columns"
        :data-source="list"
      />
    </div>
  </a-modal>
</template>
<script>

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
        progress: 'WISH'
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
      selectedRowKey: ''
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
      this.$log.debug('key', key)
      this.selectedRowKey = key
    }
  }
}
</script>

<template>
  <a-form-model :model="season" labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="季度ID">
      <a-input v-model="season.id" disabled />
    </a-form-model-item>
    <a-form-model-item label="季度类型">
      <a-select v-model="season.type" placeholder="请选择季度类型">
        <!-- seasonTypes -->
        <a-select-option v-for="type in seasonTypes" :key="type" :value="type">
          {{ type | seasonTypeFilter }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="季度标题" >
      <a-input v-model="season.title" placeholder="请输入标题"/>
    </a-form-model-item>
    <a-form-model-item label="季度原始标题" >
      <a-input v-model="season.originalTitle" placeholder="请输入原始标题，建议罗马音或者英文，Ikaros可能根据这个标题去互联网查询元数据"/>
    </a-form-model-item>
    <a-form-model-item label="简述">
      <a-textarea
        v-model="season.overview"
        placeholder="请输入季度介绍"
        :auto-size="{ minRows: 3, maxRows: 10 }"/>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
      <a-button type="primary" @click="handleSaveClick">
        保存季度信息
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { saveSeasonWithAnimeId, findSeasonTypes } from '@/api/anime'
import { ANIME_SEASON_TYPE_MAP } from '@/store/mutation-types'

export default {
  props: {
    animeId: {
      type: String,
      default: -1
    },
    season: {
      type: Object,
      default: () => ({})
    }
  },
  filters: {
    seasonTypeFilter (value) {
      if (ANIME_SEASON_TYPE_MAP.get(value)) {
        return ANIME_SEASON_TYPE_MAP.get(value)
      } else {
        return value
      }
    }
  },
  created () {
    this.findAnimeSeasonTypes()
  },
  data () {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          md: { span: 24 },
          lg: { span: 24 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 24 },
          md: { span: 24 },
          lg: { span: 24 }
        },
        labelItemWrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 },
          md: { span: 16, offset: 4 },
          lg: { span: 20, offset: 2 }
        },
        noLabelItemWrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 24, offset: 0 },
          md: { span: 24, offset: 0 },
          lg: { span: 24, offset: 0 }
        },
        seasonTypes: []
      }
    },
    methods: {
      publishSeasonUpdatedEvent (data) {
        this.$emit('updateSeason', data)
      },
      handleSaveClick () {
        // todo save season
        saveSeasonWithAnimeId(this.season, this.animeId)
          .then(res => {
            this.$message.success('保存季度成功')
            this.publishSeasonUpdatedEvent(res.result)
          })
          .catch(err => {
            this.$log.error('save season fail, err: ', err)
            this.$message.error('保存季度失败')
          })
      },
      findAnimeSeasonTypes () {
        findSeasonTypes()
          .then(res => {
            this.seasonTypes = res.result
          })
          .catch(err => {
            this.$log.error('find season types fail, err: ', err)
            this.$message.error('查询季度类型失败')
          })
      }
    }
}
</script>

<style lang="less" scoped>

</style>

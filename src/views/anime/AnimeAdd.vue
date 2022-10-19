<template>
  <page-header-wrapper :title="false">
    <a-form-model :model="anime" labelAlign="right" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-model-item :wrapper-col="labelItemWrapperCol">
        <a-button type="primary" @click="handlerQuickFill">
          快速填充
        </a-button>
      </a-form-model-item>
      <a-form-model-item label="番剧ID">
        <a-input v-model="anime.id" disabled />
      </a-form-model-item>
      <a-form-model-item label="标题" >
        <a-input v-model="anime.title" placeholder="请输入标题"/>
      </a-form-model-item>
      <a-form-model-item label="原始标题" >
        <a-input v-model="anime.originalTitle" placeholder="请输入原始标题，建议罗马音或者英文，Ikaros可能根据这个标题去互联网查询元数据"/>
      </a-form-model-item>
      <a-form-model-item label="bgmtvId" >
        <a-input v-model="anime.bgmtvId" placeholder="请输入bgm.tv对应的番剧ID"/>
      </a-form-model-item>
      <a-form-model-item label="简述">
        <a-textarea
          v-model="anime.overview"
          placeholder="请输入番剧介绍"
          :auto-size="{ minRows: 3, maxRows: 10 }"/>
      </a-form-model-item>
      <a-form-model-item label="制作组">
        <a-input v-model="anime.producer" placeholder="请输入制作组"/>
      </a-form-model-item>
      <a-form-model-item label="工作人员">
        <a-textarea
          v-model="anime.staffs"
          placeholder="请输入工作人员： 一行一个， 职位 : 姓名"
          :auto-size="{ minRows: 3, maxRows: 10 }"/>
      </a-form-model-item>
      <a-form-model-item label="首次放送日期">
        <a-date-picker
          v-model="anime.airTime"
          show-time
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </a-form-model-item>
      <a-form-model-item label="海报图URL" >
        <a-input v-model="anime.coverUrl" placeholder="点击右边按钮，可快速获取已存在文件URL或者上传新的图片">
          <a-icon slot="addonAfter" type="search" @click="openFileSelectModal"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="labelItemWrapperCol">
        <a-button type="primary">
          提交
        </a-button>
      </a-form-model-item>

      <hr>

      <!-- 季度区域 -->
      <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
        <a-button type="dashed" style="width: 100%" @click="addSeasonFormModelItem">
          <a-icon type="plus" /> 添加季度
        </a-button>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="noLabelItemWrapperCol">
        <a-card title="第一季度">
          <a-tabs
            :default-active-key="1"
            tab-position="top"
            @change="handleTabChange"
          >
            <a-tab-pane v-for="i in 24" :key="i" :tab="`第${i}集`">
              <AnimeSeason />
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </a-form-model-item>

    </a-form-model>

    <FileSelectModal
      :visible.sync="fileSelectModalVisible"
      @sendSelectedFileFieldValue="handSelectedFileFieldValue"
      :disableCopySelectedFileIdButton="true" />
  </page-header-wrapper>

</template>

<script>
import FileSelectModal from '@/components/File/FileSelectModal.vue'
import AnimeSeason from '@/components/anime/AnimeSeason.vue'
export default {
  components: { FileSelectModal, AnimeSeason },
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 4 },
        lg: { span: 2 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 16 },
        lg: { span: 20 }
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
      fileSelectModalVisible: false,
      anime: {
        id: '',
        title: '',
        bgmtvId: '',
        originalTitle: '',
        overview: '',
        producer: '',
        coverUrl: '',
        staffs: '',
        airTime: ''
      }
    }
  },

  methods: {
    openFileSelectModal () {
      this.fileSelectModalVisible = true
    },
    handSelectedFileFieldValue (value) {
      this.anime.coverUrl = value
    },
    handlerQuickFill () {
      if (this.anime.bgmtvId === '' && this.anime.originalTitle === '') {
        this.$notification.warning({
          message: '请在下方输入 bgmTvId 或者 原始文件名称，Ikaros需要根据这两项去互联网匹配番剧元数据'
        })
      } else {
        this.$notification.info({
            message: 'Ikaros努力查询中，请耐心等待'
        })
        if (this.anime.bgmtvId !== '') {
          this.$log.debug('request server to quick fill by bgmTvId', this.anime.bgmtvId)
        } else {
          this.$log.debug('request server to quick fill by originalTitle', this.anime.originalTitle)
        }
      }
    },
    addSeasonFormModelItem () {
      this.$log.debug('run once')
    },
    handleTabChange (activeKey) {
      this.$log.debug('activeKey', activeKey)
    }
  }
}
</script>

<style lang="less" scoped>

</style>

<template>
  <page-header-wrapper :title="false">
    <div class="container">
      <a-tabs type="line" @change="selectTabChange">
        <a-tab-pane class="tab-content-pane" key="common" tab="常规设置">
          <a-form-model :model="common" >
            <a-form-model-item label="标题">
              <a-input v-model="common.title" />
            </a-form-model-item>
            <a-form-model-item label="地址">
              <a-input v-model="common.address" />
            </a-form-model-item>
            <a-form-model-item label="Logo">
              <a-input v-model="common.logo" />
            </a-form-model-item>
            <a-form-model-item label="Favicon">
              <a-input v-model="common.favicon" />
            </a-form-model-item>
            <a-form-model-item label="页脚信息">
              <a-input v-model="common.footer" type="textarea" />
            </a-form-model-item>
            <a-form-model-item >
              <a-button type="primary" @click="saveCommonOtpion">
                保存常规设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane class="tab-content-pane" key="seo" tab="SEO设置">
          <a-form-model :model="seo" >
            <!-- todo 需要改成 是否开启按钮 -->
            <a-form-model-item label="屏蔽搜索引擎">
              <a-input v-model="seo.hideForSearchEngine" />
            </a-form-model-item>
            <a-form-model-item label="关键词">
              <a-input v-model="seo.keywords" />
            </a-form-model-item>
            <a-form-model-item label="站点描述">
              <a-input v-model="seo.siteDescription" type="textarea" />
            </a-form-model-item>
            <a-form-model-item >
              <a-button type="primary" @click="saveSeoOption">
                保存SEO设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane class="tab-content-pane" key="file" tab="文件设置">
          <!-- todo 需要改成下拉框 -->
          <a-form-model :model="file" >
            <a-form-model-item label="存储位置">
              <a-input v-model="file.placeSelect" />
            </a-form-model-item>
            <a-form-model-item >
              <a-button type="primary" @click="saveFileOption">
                保存文件设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane class="tab-content-pane" key="network" tab="第三方设置">
          <a-form-model :model="thirdParty" >
            <!-- todo 需要改成 是否开启按钮 -->
            <a-form-model-item label="bgmTvAPI前缀">
              <a-input v-model="thirdParty.bangumiApiBase" />
            </a-form-model-item>
            <a-form-model-item label="bgmTvAPI条目">
              <a-input v-model="thirdParty.bangumiApiSubjects" />
            </a-form-model-item>
            <a-form-model-item >
              <a-button type="primary" @click="saveThirdPartyOption">
                保存第三方设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
        <a-tab-pane class="tab-content-pane" key="other" tab="其它设置">
          <a-form-model :model="other" >
            <!-- todo 需要改成 是否开启按钮 -->
            <a-form-model-item label="自定义全局 head">
              <a-input v-model="other.customerGlobalHeader" type="textarea" />
            </a-form-model-item>
            <a-form-model-item label="统计代码">
              <a-input v-model="other.statisticsCode" type="textarea" />
            </a-form-model-item>
            <a-form-model-item >
              <a-button type="primary" @click="saveOtherOption">
                保存其它设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>
      </a-tabs>
    </div>
  </page-header-wrapper>
</template>

<script>
import { findOptionModelList, saveCommonOptionModel,
  saveFileOptionModel, saveSeoOptionModel,
  saveOtherOptionModel, saveThirdPartyOption } from '@/api/options'

export default {
  data () {
    return {
      options: [],
      common: {},
      seo: {},
      file: {},
      thirdParty: {},
      other: {}
    }
  },
  created () {
    this.findOptionModels()
  },
  methods: {
    selectTabChange (key) {
      // this.$log.debug('select tab key', key)
    },
    async findOptionModels () {
      const { result } = await findOptionModelList()
      this.options = result
      // this.$log.debug('options', this.options)

      this.options.forEach(entity => {
        const category = entity.category

        if (category === 'common') {
          this.common = entity
        }

        if (category === 'seo') {
          this.seo = entity
        }

        if (category === 'file') {
          this.file = entity
        }

        if (category === 'file') {
          this.file = entity
        }

        if (category === 'thirdparty') {
          this.thirdParty = entity
        }
      })

      // this.$log.debug('common', this.common)
      // this.$log.debug('seo', this.seo)
      // this.$log.debug('file', this.file)
      this.$log.debug('network', this.network)
      // this.$log.debug('other', this.other)
    },
    async saveCommonOtpion () {
      // this.$log.debug('common', this.common)
      await saveCommonOptionModel(this.common)
      this.$message.info('更新成功')
    },
    async saveFileOption () {
      // this.$log.debug('file', this.file)
      await saveFileOptionModel(this.file)
      this.$message.info('更新成功')
    },
    async saveSeoOption () {
      // this.$log.debug('seo', this.seo)
      await saveSeoOptionModel(this.seo)
      this.$message.info('更新成功')
    },
    async saveOtherOption () {
      // this.$log.debug('other', this.other)
      await saveOtherOptionModel(this.other)
      this.$message.info('更新成功')
    },
    async saveThirdPartyOption () {
      // this.$log.debug('thirdParty', this.thirdParty)
      await saveThirdPartyOption(this.thirdParty)
      this.$message.info('更新成功')
    }
  }
}
</script>

<style lang="less" scoped>
.container {

  .tab-content-pane {
    // border: 1px solid blue;
    padding: 0 16px;
  }

}

.ant-form-item {
  margin-bottom: 0;
}
</style>

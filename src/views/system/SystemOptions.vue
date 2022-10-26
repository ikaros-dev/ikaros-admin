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
              <a-switch :checked="seo.hideForSearchEngine | str2boolean" @change="chageHideForSearchEngineSwitch" />
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
              <!-- <a-input v-model="file.placeSelect" /> -->
              <a-select
                v-model="file.placeSelect"
                :loading="places.loading"
              >
                <a-select-option v-for="item in places.data" :key="item" :value="item">
                  {{ item | fileTypePlace }}
                </a-select-option>
              </a-select>
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
import { listPlaces } from '@/api/file'
import { findPresetOptionList, saveCommonPresetOption,
  saveFilePresetOption, saveSeoPresetOption,
  saveOtherPresetOption, saveThirdPartyOption } from '@/api/options'

export default {
  data () {
    return {
      options: [],
      common: {},
      seo: {},
      file: {},
      thirdParty: {},
      other: {},
      places: {
        data: [],
        loading: false
      }
    }
  },
  created () {
    this.findPresetOptions()
    this.handleListPlaces()
  },
  methods: {
    selectTabChange (key) {
      // this.$log.debug('select tab key', key)
    },
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
    async findPresetOptions () {
      const { result } = await findPresetOptionList()
      this.options = result
      this.$log.debug('options', this.options)

      this.options.forEach(entity => {
        const category = entity.category

        if (category === 'COMMON') {
          this.common = entity
        }

        if (category === 'SEO') {
          this.seo = entity
        }

        if (category === 'FILE') {
          this.file = entity
        }

        if (category === 'THIRD_PARTY') {
          this.thirdParty = entity
        }

        if (category === 'OTHER') {
          this.other = entity
        }
      })

      // this.$log.debug('common', this.common)
      // this.$log.debug('seo', this.seo)
      // this.$log.debug('file', this.file)
      // this.$log.debug('network', this.network)
      // this.$log.debug('other', this.other)
    },
    async saveCommonOtpion () {
      // this.$log.debug('common', this.common)
      await saveCommonPresetOption(this.common)
      this.$message.info('更新成功')
    },
    async saveFileOption () {
      // this.$log.debug('file', this.file)
      await saveFilePresetOption(this.file)
      this.$message.info('更新成功')
    },
    async saveSeoOption () {
      // this.$log.debug('seo', this.seo)
      await saveSeoPresetOption(this.seo)
      this.$message.info('更新成功')
    },
    async saveOtherOption () {
      // this.$log.debug('other', this.other)
      await saveOtherPresetOption(this.other)
      this.$message.info('更新成功')
    },
    async saveThirdPartyOption () {
      // this.$log.debug('thirdParty', this.thirdParty)
      await saveThirdPartyOption(this.thirdParty)
      this.$message.info('更新成功')
    },
    chageHideForSearchEngineSwitch (checked) {
      // this.$log.debug('checked', checked)
      if (checked) {
        this.seo.hideForSearchEngine = 'true'
      } else {
        this.seo.hideForSearchEngine = 'false'
      }
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

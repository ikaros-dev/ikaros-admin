<template>
  <page-header-wrapper :title="false">
    <div class="container">
      <a-tabs type="line" @change="selectTabChange">
        <a-tab-pane class="tab-content-pane" key="COMMON" tab="常规设置">
          <a-form-model :model="common">
            <a-form-model-item label="标题">
              <a-input v-model="common.TITLE" />
            </a-form-model-item>
            <a-form-model-item label="地址">
              <a-input v-model="common.ADDRESS" />
            </a-form-model-item>
            <a-form-model-item label="Logo">
              <a-input v-model="common.LOGO" />
            </a-form-model-item>
            <a-form-model-item label="Favicon">
              <a-input v-model="common.FAVICON" />
            </a-form-model-item>
            <a-form-model-item label="描述">
              <a-input v-model="common.DESCRIPTION" type="textarea" autoSize />
            </a-form-model-item>
            <a-form-model-item label="全局Header">
              <a-input v-model="common.HEADER" type="textarea" autoSize />
            </a-form-model-item>
            <a-form-model-item label="全局Footer">
              <a-input v-model="common.FOOTER" type="textarea" autoSize />
            </a-form-model-item>
            <a-form-model-item label="统计代码">
              <a-input v-model="common.STATISTICS_CODE" type="textarea" autoSize />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('COMMON')">
                保存常规设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="SEO" tab="SEO设置">
          <a-form-model :model="seo">
            <a-form-model-item label="屏蔽搜索引擎">
              <a-switch :checked="seo.HIDE_FOR_SEARCH_ENGINE | str2boolean" @change="changeHideForSearchEngineSwitch" />
            </a-form-model-item>
            <a-form-model-item label="关键词">
              <a-input v-model="seo.KEYWORDS" />
            </a-form-model-item>
            <a-form-model-item label="站点描述">
              <a-input v-model="seo.SITE_DESCRIPTION" type="textarea" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('SEO')">
                保存SEO设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="FILE" tab="文件设置">
          <a-form-model :model="file">
            <a-form-model-item label="存储位置">
              <a-select
                v-model="file.PLACE_SELECT"
                :loading="places.loading"
              >
                <a-select-option v-for="item in places.data" :key="item" :value="item">
                  {{ item | fileTypePlace }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('FILE')">
                保存文件设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="NETWORK" tab="网络设置">
          <a-form-model :model="network">
            <a-form-model-item label="HTTP Host">
              <a-input v-model="network.PROXY_HTTP_HOST" placeholder="192.168.2.229"/>
            </a-form-model-item>
            <a-form-model-item label="HTTP Port">
              <a-input v-model="network.PROXY_HTTP_PORT" placeholder="7890"/>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('NETWORK')">
                保存网络设置
              </a-button>
              <a-button
                type="primary"
                :loading="testConnectProxyButtonLoading"
                @click="testProxyConfig"
                style="margin: 0px 5px">
                测试连接
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="QBITTORRENT" tab="Qbittorrent">
          <a-form-model :model="qbittorrent">
            <a-form-model-item label="url">
              <a-input v-model="qbittorrent.URL" placeholder="http://192.168.2.1:9091"/>
            </a-form-model-item>
            <a-form-model-item label="是否开启验证">
              <a-switch :checked="qbittorrent.ENABLE_AUTH | str2boolean" @change="changeEnableAuthSwitch" />
            </a-form-model-item>
            <a-form-model-item label="用户名" v-if="qbittorrent.ENABLE_AUTH === 'true'">
              <a-input v-model="qbittorrent.USERNAME" placeholder="admin"/>
            </a-form-model-item>
            <a-form-model-item label="密码" v-if="qbittorrent.ENABLE_AUTH === 'true'">
              <a-input-password v-model="qbittorrent.PASSWORD" placeholder="adminadmin"/>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('QBITTORRENT')">
                保存Qb设置
              </a-button>
              <a-button
                type="primary"
                :loading="testConnectQbittorrentButtonLoading"
                @click="testQbittorrentConfig"
                style="margin: 0px 5px">
                测试连接
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="BGMTV" tab="番组计划">
          <a-form-model :model="bgmtv">
            <a-form-model-item label="开启HTTP代理">
              <a-alert
                message="需要在 网络设置 里配置好HTTP代理"
                banner
                closable
              />
              <a-switch :checked="bgmtv.ENABLE_PROXY | str2boolean" @change="changeBgmTvEnableProxySwitch" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('BGMTV')">
                保存番组计划设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="MIKAN" tab="密柑计划">
          <a-form-model :model="mikan">
            <a-form-model-item label="开启HTTP代理">
              <a-alert
                message="需要在 网络设置 里配置好HTTP代理"
                banner
                closable
              />
              <a-switch :checked="mikan.ENABLE_PROXY | str2boolean" @change="changeMikanEnableProxySwitch" />
            </a-form-model-item>
            <a-form-model-item label="我的订阅">
              <a-input-password v-model="mikan.MY_SUBSCRIBE_RSS" allowClear placeholder="https://mikanani.me/RSS/MyBangumi?token={token}"/>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('MIKAN')">
                保存密柑计划设置
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
import {
  getOptionList, saveOptionWithRequest
} from '@/api/options'
import { testQbittorrentConnect } from '@/api/tripartite'
import { testProxyConnect } from '@/api/network'

export default {
  data () {
    return {
      options: [],
      common: {},
      seo: {},
      file: {},
      network: {},
      qbittorrent: {},
      bgmtv: {},
      mikan: {},
      jellyfin: {},
      other: {},
      places: {
        data: [],
        loading: false
      },
      testConnectQbittorrentButtonLoading: false,
      testConnectProxyButtonLoading: false
    }
  },
  created () {
    this.findOptionList()
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
    async findOptionList () {
      const { result } = await getOptionList()
      this.options = result
      // this.$log.debug('options', this.options)

      this.options.forEach(entity => {
        const category = entity.category

        if (category === 'COMMON') {
          this.common = entity.kvMap
        }

        if (category === 'SEO') {
          this.seo = entity.kvMap
        }

        if (category === 'FILE') {
          this.file = entity.kvMap
        }

        if (category === 'NETWORK') {
          this.network = entity.kvMap
        }

        if (category === 'QBITTORRENT') {
          this.qbittorrent = entity.kvMap
        }

        if (category === 'BGMTV') {
          this.bgmtv = entity.kvMap
        }

        if (category === 'MIKAN') {
          this.mikan = entity.kvMap
        }

        if (category === 'JELLYFIN') {
          this.jellyfin = entity.kvMap
        }

        if (category === 'OTHER') {
          this.other = entity.kvMap
        }
      })
    },
    async saveOption (category) {
      this.$log.debug('category', category)
      const request = {}
      request.category = category
      if (category === 'COMMON') {
        request.kvMap = this.common
      }
      if (category === 'SEO') {
        request.kvMap = this.seo
      }
      if (category === 'FILE') {
        request.kvMap = this.file
      }
      if (category === 'NETWORK') {
        request.kvMap = this.network
      }
      if (category === 'QBITTORRENT') {
        request.kvMap = this.qbittorrent
      }
      if (category === 'BGMTV') {
        request.kvMap = this.bgmtv
      }
      if (category === 'MIKAN') {
        request.kvMap = this.mikan
      }
      if (category === 'JELLYFIN') {
        request.kvMap = this.jellyfin
      }
      if (category === 'OTHER') {
        request.kvMap = this.other
      }
      await saveOptionWithRequest(request)
      this.$message.info('更新成功')
    },
    changeHideForSearchEngineSwitch (checked) {
      // this.$log.debug('checked', checked)
      this.seo.HIDE_FOR_SEARCH_ENGINE = checked ? 'true' : 'false'
    },
    changeMikanEnableProxySwitch (checked) {
      // this.$log.debug('checked', checked)
      this.mikan.ENABLE_PROXY = checked ? 'true' : 'false'
    },
    changeEnableAuthSwitch (checked) {
      this.qbittorrent.ENABLE_AUTH = checked ? 'true' : 'false'
    },
    changeBgmTvEnableProxySwitch (checked) {
      this.bgmtv.ENABLE_PROXY = checked ? 'true' : 'false'
    },
    testQbittorrentConfig () {
      this.testConnectQbittorrentButtonLoading = this
      testQbittorrentConnect()
        .then(rsp => {
          const isSuccess = rsp.result
          if (isSuccess) {
            this.$message.success('测试Qbittorrent连接成功')
          } else {
            this.$message.error('测试Qbittorrent连接失败')
          }
        })
        .catch(error => {
          this.$log.error('test connect qbittorrent fail', error)
          this.$message.error('测试Qbittorrent连接失败')
        })
        .finally(() => {
          this.testConnectQbittorrentButtonLoading = false
        })
    },
    testProxyConfig () {
      this.testConnectProxyButtonLoading = true
      testProxyConnect()
        .then(rsp => {
          const isSuccess = rsp.result
          if (isSuccess) {
            this.$message.success('测试HTTP代理连接成功')
          } else {
            this.$message.error('测试HTTP代理连接失败')
          }
        })
        .catch(error => {
          this.$log.error('test http proxy connect fail', error)
          this.$message.error('测试HTTP代理连接失败')
        })
        .finally(() => {
          this.testConnectProxyButtonLoading = false
        })
    }
  }
}
</script>

<style lang='less' scoped>
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

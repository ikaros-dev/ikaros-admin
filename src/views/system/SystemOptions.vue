<template>
  <page-header-wrapper :title="false">
    <div class="container">
      <a-tabs type="line" @change="selectTabChange">
        <a-tab-pane class="tab-content-pane" key="COMMON" tab="常规">
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

        <a-tab-pane class="tab-content-pane" key="FILE" tab="文件">
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

        <a-tab-pane class="tab-content-pane" key="NETWORK" tab="网络">
          <a-form-model :model="network">
            <a-form-model-item label="HTTP Host">
              <a-input v-model="network.PROXY_HTTP_HOST" placeholder="192.168.2.229"/>
            </a-form-model-item>
            <a-form-model-item label="HTTP Port">
              <a-input v-model="network.PROXY_HTTP_PORT" placeholder="7890"/>
            </a-form-model-item>
            <a-form-model-item label="读取超时时间(毫秒)">
              <a-input v-model="network.READ_TIMEOUT" placeholder="5000"/>
            </a-form-model-item>
            <a-form-model-item label="连接超时时间(毫秒)">
              <a-input v-model="network.CONNECT_TIMEOUT" placeholder="5000"/>
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
            <a-form-model-item label="Token">
              <a-alert
                message="需要在番组计划官网申请令牌，链接：https://bgm.tv/group/topic/370315"
                banner
                closable
              />
              <a-input-password v-model="bgmtv.ACCESS_TOKEN" allowClear placeholder="token"/>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('BGMTV')">
                保存番组计划设置
              </a-button>
              <a-button
                type="primary"
                :loading="testBgmTvTokenButtonLoading"
                @click="testBgmTvToken"
                style="margin: 0px 5px">
                测试令牌
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

        <a-tab-pane class="tab-content-pane" key="APP" tab="应用">
          <a-form-model :model="app">
            <a-form-model-item label="开启自动追番">
              <a-alert
                message="需要配置好 蜜柑的订阅 和 Qbittorrent 连接, 否则无法正常工作"
                banner
                closable
              />
              <a-switch :checked="app.ENABLE_AUTO_ANIME_SUB_TASK | str2boolean" @change="changeAppEnableAutoAnimeSubSwitch" />
            </a-form-model-item>
            <a-form-model-item label="开启媒体目录生成">
              <a-switch :checked="app.ENABLE_GENERATE_MEDIA_DIR_TASK | str2boolean" @change="changeAppEnableGenerateMediaDirSwitch" />
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" @click="saveOption('APP')">
                保存应用设置
              </a-button>
            </a-form-model-item>
          </a-form-model>
        </a-tab-pane>

        <a-tab-pane class="tab-content-pane" key="NOTIFY" tab="通知">
          <a-tabs default-active-key="MailConfig">
            <a-tab-pane key="MailConfig" tab="邮件配置">
              <a-form-model :model="notify">
                <a-form-model-item label="开启邮件通知">
                  <a-switch :checked="notify.MAIL_ENABLE | str2boolean" @change="changeMailNotifySwitch" />
                </a-form-model-item>
                <div v-if="notify.MAIL_ENABLE === 'true'">
                  <a-form-model-item required>
                    <span slot="label">
                      邮件协议
                      <a-tooltip>
                        <template slot="title">
                          目前仅支持SMTP协议
                        </template>
                        <a-icon type="question-circle" />
                      </a-tooltip>
                    </span>
                    <a-select disabled v-model="notify.MAIL_PROTOCOL" default-value="SMTP" >
                      <a-select-option value="SMTP">
                        SMTP
                      </a-select-option>
                    </a-select>
                  </a-form-model-item>
                  <a-form-model-item label="SMTP地址" required>
                    <a-input v-model="notify.MAIL_SMTP_HOST" placeholder="smtp.example.com"/>
                  </a-form-model-item>
                  <a-form-model-item label="SMTP端口" required>
                    <a-input v-model="notify.MAIL_SMTP_PORT" placeholder="465"/>
                  </a-form-model-item>
                  <a-form-model-item label="SMTP发送邮件账号" required>
                    <a-input v-model="notify.MAIL_SMTP_ACCOUNT" placeholder="notify@example.com"/>
                  </a-form-model-item>
                  <a-form-model-item label="SMTP发送邮件密码" required>
                    <a-input-password v-model="notify.MAIL_SMTP_PASSWORD" />
                  </a-form-model-item>
                  <a-form-model-item label="SMTP发件人别名" required>
                    <a-input v-model="notify.MAIL_SMTP_ACCOUNT_ALIAS" placeholder="Ikaros"/>
                  </a-form-model-item>
                </div>
                <a-form-model-item>
                  <a-button type="primary" @click="saveOption('NOTIFY')">
                    保存邮件设置
                  </a-button>
                </a-form-model-item>
              </a-form-model>
            </a-tab-pane>
            <a-tab-pane key="MailTest" tab="邮件测试">
              <a-form-model :model="mailTest">
                <a-form-model-item label="收件人地址" required>
                  <a-input v-model="mailTest.address" placeholder="target@example.com"/>
                </a-form-model-item>
                <a-form-model-item label="主题" required>
                  <a-input v-model="mailTest.subject" placeholder="测试邮件"/>
                </a-form-model-item>
                <a-form-model-item label="内容" required>
                  <a-input type="textarea" autoSize v-model="mailTest.content" placeholder="这是一份测试邮件"/>
                </a-form-model-item>
              </a-form-model>
              <a-form-model-item>
                <a-button type="primary" @click="reqMailTest" :loading="mailTestSubmitButtonLoading">
                  发送
                </a-button>
              </a-form-model-item>
            </a-tab-pane>
          </a-tabs>
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
import { testQbittorrentConnect, getBgmTvMe } from '@/api/tripartite'
import { testProxyConnect } from '@/api/network'
import { mailTest } from '@/api/notify'

export default {
  name: 'SystemOptions',
  data () {
    return {
      options: [],
      app: {},
      common: {},
      file: {},
      network: {},
      qbittorrent: {},
      bgmtv: {},
      mikan: {},
      jellyfin: {},
      notify: {},
      other: {},
      places: {
        data: [],
        loading: false
      },
      mailTest: {
        address: '',
        subject: '测试',
        content: '<div>' +
          '<h2>测试邮件标题</h2>' +
          '<p>测试邮件内容</p>' +
          '</div>'
      },
      mailTestSubmitButtonLoading: false,
      testConnectQbittorrentButtonLoading: false,
      testConnectProxyButtonLoading: false,
      testBgmTvTokenButtonLoading: false
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

        if (category === 'APP') {
          this.app = entity.kvMap
        }

        if (category === 'COMMON') {
          this.common = entity.kvMap
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
          // this.$log.debug('bgmtv', this.bgmtv)
        }

        if (category === 'MIKAN') {
          this.mikan = entity.kvMap
        }

        if (category === 'JELLYFIN') {
          this.jellyfin = entity.kvMap
        }

        if (category === 'NOTIFY') {
          this.notify = entity.kvMap
        }

        if (category === 'OTHER') {
          this.other = entity.kvMap
        }
      })
    },
    saveOption (category) {
      this.$log.debug('category', category)
      const request = {}
      request.category = category
      if (category === 'APP') {
        request.kvMap = this.app
      }
      if (category === 'COMMON') {
        request.kvMap = this.common
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
      if (category === 'NOTIFY') {
        request.kvMap = this.notify
      }
      if (category === 'OTHER') {
        request.kvMap = this.other
      }
      saveOptionWithRequest(request)
        .then(rsp => {
          this.$message.info('更新成功')
        })
        .catch(error => {
          this.$log.error('save option fail, ', error)
          this.$message.error(error)
          if (category === 'APP') {
            this.app.ENABLE_AUTO_ANIME_SUB_TASK = 'false'
          }
          if (category === 'BGMTV') {
            this.bgmtv.ENABLE_PROXY = 'false'
          }
          if (category === 'MIKAN') {
            this.mikan.ENABLE_PROXY = 'false'
          }
        })
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
    changeAppEnableAutoAnimeSubSwitch (checked) {
      this.app.ENABLE_AUTO_ANIME_SUB_TASK = checked ? 'true' : 'false'
    },
    changeAppEnableGenerateMediaDirSwitch (checked) {
      this.app.ENABLE_GENERATE_MEDIA_DIR_TASK = checked ? 'true' : 'false'
    },
    changeMailNotifySwitch (checked) {
      this.notify.MAIL_ENABLE = checked ? 'true' : 'false'
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
    },
    testBgmTvToken () {
      this.testBgmTvTokenButtonLoading = true
      getBgmTvMe()
        .then(rsp => {
          const bgmTvUserInfo = rsp.result
          if (bgmTvUserInfo) {
            this.$message.success('你好, ' + bgmTvUserInfo.nickname + '!')
          } else {
            this.$message.error('测试番组计划令牌失败')
          }
        })
        .catch(error => {
          this.$log.error('test bgmtv token fail', error)
          this.$message.error('测试番组计划令牌失败')
        })
        .finally(() => {
          this.testBgmTvTokenButtonLoading = false
        })
    },
    reqMailTest () {
      if (!this.mailTest.address) {
        this.$message.error('请输入收件人地址')
        return
      }
      if (!this.mailTest.subject) {
        this.$message.error('请输入邮件主题')
        return
      }
      if (!this.mailTest.content) {
        this.$message.error('请输入邮件内容')
        return
      }
      this.$log.debug('mailTest', this.mailTest)
      this.mailTestSubmitButtonLoading = true
      mailTest(this.mailTest)
        .then(rsp => {
          if (rsp.result) {
            this.$message.success('邮件发送成功')
          } else {
            const msg = '邮件发送失败，请检查通知的邮件配置项, 异常消息' + rsp.message
            this.$message.error(msg)
            this.$log.error(msg)
          }
        })
        .catch(err => {
          const msg = '邮件发送失败，异常消息：' + err
          this.$message.error(msg)
          this.$log.error(msg)
        })
        .finally(() => {
          this.mailTestSubmitButtonLoading = false
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

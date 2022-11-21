<template>
  <div class="ikaros-container">
    <div class="ikaros-form">
      <div class="ikaros-header">Ikaros初始化</div>
      <a-form-model :model="appInit" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item label="站点标题" >
          <a-input v-model="appInit.title" placeholder="可选项，请输入站点标题"/>
        </a-form-model-item>

        <a-form-model-item label="站点描述">
          <a-input v-model="appInit.description" autoSize type="textarea" placeholder="可选项，请输入站点描述"/>
        </a-form-model-item>

        <a-form-model-item required label="用户名">
          <a-input v-model="appInit.username" placeholder="请输入用户名"></a-input>
        </a-form-model-item>

        <a-form-model-item required label="密码">
          <a-input v-model="appInit.password" type="password" placeholder="请输入密码"></a-input>
        </a-form-model-item>

        <a-form-model-item required label="确认密码">
          <a-input v-model="appInit.confirmPassword" type="password" placeholder="请确认密码"></a-input>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="labelItemWrapperCol">
          <a-button type="primary" @click="submitAppInitForm">提交</a-button>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import { postOptionAppInit } from '@/api/options'
import store from '@/store'

export default {
  name: 'OptionAppInit',
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
        md: { span: 20 },
        lg: { span: 22 }
      },
      labelItemWrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
        md: { span: 16, offset: 4 },
        lg: { span: 20, offset: 2 }
      },
      appInit: {
        title: '',
        description: '',
        username: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    submitAppInitForm () {
      // 校验参数
      if (!this.appInit.username) {
        this.$message.error('用户名不能为空')
        return
      }

      if (!this.appInit.password) {
        this.$message.error('密码不能为空')
        return
      }

      if (this.appInit.password !== this.appInit.confirmPassword) {
        this.$message.error('两次输入密码不相同')
        return
      }

      // 提交给后台
      const _appInit = this.appInit
      postOptionAppInit(_appInit)
        .then(rsp => {
          const result = rsp.result
          if (result) {
            this.$message.info('初始化成功')
            // 请求登录接口，获取TOKEN并存储
            const userLoginParma = {
              username: _appInit.username,
              password: _appInit.password,
              remember_me: true
            }
            this.loginAndRedirect(userLoginParma)
          } else {
            this.$message.error('初始化失败')
            this.$log.error('server init fail, appInit:', _appInit)
          }
        })
        .catch(error => {
          this.$log.error('request server exception: ', error)
        })
    },
    loginAndRedirect (useLoginParams) {
      store.dispatch('Login', useLoginParams)
        .then((res) => {
          this.$router.push({ path: '/' })
        })
        .catch((err) => {
          this.$log.error('request login fail', err)
        })
    }

  }
}
</script>

<style lang="less" scoped>
.ikaros-container {
  //border: 1px solid rebeccapurple;
  height: 100%;
  padding: 6% 15%;

  .ikaros-form {
    padding: 1%;
    //border: 1px solid indianred;

    .ikaros-header {
      text-align: center;
      font-size: 30px;
      //border: 1px solid blue;
    }
  }
}
</style>

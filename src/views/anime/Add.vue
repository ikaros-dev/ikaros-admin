<template>
  <page-header-wrapper :title="false">
    <a-form :form="form" @submit="handleSubmit" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="番剧ID" hidden>
        <a-input
          v-decorator="['id']"
        />
      </a-form-item>

      <a-form-item label="标题">
        <a-input
          v-decorator="['title', { rules: [{ required: true, message: '请输入标题!' }] }]"
          placeholder="请输入标题"
        />
      </a-form-item>

      <a-form-item label="简述">
        <a-input
          type="textarea"
          autoSize
          v-decorator="['overview']"
          placeholder="请输入简述"
        />
      </a-form-item>

      <a-form-item label="工作人员">
        <a-input
          type="textarea"
          autoSize
          v-decorator="['staffs']"
          placeholder="请输入工作人员： 一行一个， 职位 : 姓名"
        />
      </a-form-item>

      <a-form-item label="首次放送日期">
        <a-date-picker style="width: 100%" @change="onChange" v-decorator="['airTime']"/>
      </a-form-item>

      <a-form-item label="海报图URL">
        <a-input
          v-decorator="['coverUrl']"
          placeholder="点击右边按钮，可快速获取已存在文件URL或者上传新的图片"
        >
          <a-icon slot="addonAfter" type="search" @click="openFileSelectModal"/>
        </a-input>
      </a-form-item>

      <a-form-item :wrapper-col="submitButtonWrapperCol">
        <a-button type="primary" html-type="submit" >
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </page-header-wrapper>

</template>

<script>
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      submitButtonWrapperCol: {
        xs: { span: 24, offset: 5 },
        sm: { span: 12, offset: 5 }
      },
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    onChange () {
    },
    handleSubmit () {},
    // 打开文件快速选择
    openFileSelectModal () {
      alert('hello')
    }
  }
}
</script>

<style lang="less" scoped>

</style>

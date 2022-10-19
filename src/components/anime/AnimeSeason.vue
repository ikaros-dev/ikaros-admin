<template>
  <a-form-model labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="季度ID">
      <a-input disabled />
    </a-form-model-item>
    <a-form-model-item label="季度标题" >
      <a-input placeholder="请输入标题"/>
    </a-form-model-item>
    <a-form-model-item label="季度原始标题" >
      <a-input placeholder="请输入原始标题，建议罗马音或者英文，Ikaros可能根据这个标题去互联网查询元数据"/>
    </a-form-model-item>
  </a-form-model>
</template>

<script>
export default {
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
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>

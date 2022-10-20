<template>
  <a-form-model :model="season" labelAlign="left" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item label="季度ID">
      <a-input v-model="season.id" disabled />
    </a-form-model-item>
    <a-form-model-item label="季度类型">
      <a-select v-model="season.type" placeholder="请选择季度类型">
        <a-select-option value="shanghai">
          第一季
        </a-select-option>
        <a-select-option value="beijing">
          第二季
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
      <a-button type="primary">
        保存季度信息
      </a-button>
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
      },
      season: {}
    }
  }
}
</script>

<style lang="less" scoped>

</style>

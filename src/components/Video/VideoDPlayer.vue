<template>
  <d-player ref="myVideoDPlayer" :options="options" />
</template>

<script>
export default {
  name: 'VideoDPlayer',
  props: {
    pic: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      options: {
        container: {},
        screenshot: true,
        preload: 'metadata',
        volume: 0.7,
        video: {
            pic: '',
            url: ''
        }
      }
    }
  },
  beforeMount () {
    this.options.video.pic = this.pic
    this.options.video.url = this.url
  },
  mounted () {
    this.$emit('player', this.$refs.myVideoDPlayer.dp)
  }
}
</script>

<style lang="less" scoped>

</style>

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
  computed: {
    variablyUrl () {
      return `${this.url}`
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
  },
  watch: {
    variablyUrl (newUrl, oldUrl) {
      // console.log(oldUrl)
      // console.log(newUrl)
      this.reRanderVideo(newUrl)
    }
  },
  methods: {
    reRanderVideo (newVideoUrl) {
      this.$log.debug('newVideoUrl', newVideoUrl)
      // this.$log.debug('player', this.$refs.myVideoDPlayer.dp)
      this.$refs.myVideoDPlayer.dp.pause()
      this.$refs.myVideoDPlayer.dp.switchVideo({
          url: newVideoUrl
      })
      // this.$refs.myVideoDPlayer.dp.play()
    }
  }
}
</script>

<style lang="less" scoped>

</style>

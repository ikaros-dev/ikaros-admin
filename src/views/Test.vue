<template>
  <page-header-wrapper :title="false">
    <H2>Test</H2>
    <br>

    <button @click="doPlay">play</button>
    <!-- <d-player ref="myPlayer" :options="options" /> -->

    <VideoDPlayer :pic="defaultPic" :url="defaultUrl" @player="handerVideoPlayer"/>
  </page-header-wrapper>
</template>

<script>
import VideoDPlayer from '@/components/Video/VideoDPlayer.vue'

export default {
  name: 'Test',
  components: { VideoDPlayer },
  data () {
    return {
      defaultPic: 'http://192.168.2.143:9090/upload/2022/10/16/9/223e5664bcb9435d9fe63f1e6d16c9ee.jpg',
      defaultUrl: 'http://192.168.2.143:9090/upload/2022/10/16/9/6c52452457234c1d992b0f10d1ec696c.mkv',
      options: {
        container: {},
        screenshot: true,
        preload: 'metadata',
        volume: 0.7,
        video: {
            pic: '',
            url: ''
        }
      },
      player: {}
    }
  },
  beforeMount () {
    this.options.video.pic = this.defaultPic
    this.options.video.url = this.defaultUrl
  },
  methods: {
    doPlay () {
      // this.$refs.myPlayer.dp.play()
      this.player.play()
    },
    handerVideoPlayer (player) {
      this.$log.debug('player', player)
      this.player = player
    }
  }
}
</script>

import DPlayer from 'dplayer'

const VideoDPlayer = {
  props: {
    options: {
      type: Object
    }
  },
  data () {
    return {
      dp: null
    }
  },
  mounted () {
    this.options.container = this.$el
    const player = this.dp = new DPlayer(this.options)
    const events = player.events
    Object.keys(events).forEach(item => {
      if (item === 'events') {
        return false
      } else {
        events[item].forEach(event => {
          player.on(event, () => this.$emit(event))
        })
      }
    })
  },
  install (Vue, { name = 'd-player' } = {}) {
    Vue.component(name, this)
  },
  render (h) {
    return h('div', {
      class: 'dplayer'
    }, [])
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.VideoDPlayer = VideoDPlayer
}

export default VideoDPlayer

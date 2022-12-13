<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <!-- <a href="https://github.com/ikaros-dev/ikaros" target="_blank">Github</a> -->
    </template>
    <template v-slot:copyright>
      Proudly power by <a href="https://github.com/ikaros-dev/ikaros" target="_blank">Ikaros</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>

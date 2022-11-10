<template>
  <div class="hxr-moreClick" @click="toMore">
    {{cardConfig.morePath.title}}
  </div>
</template>
<script>
import { jumpTo } from '../utils/index.js'
export default {
  name: 'commonMore',
  props: {
    cardConfig: {
      type: Object,
      default: ()=>{}
    },
    clickParams: {
      type: Object,
      default: ()=>{}
    },
  },
  data() {
    return {

    }
  },
  methods: {
    toMore(){
      let path = this.$route.path
      let pathParams = this.cardConfig.morePath.pathParams
      let params = { pageCode: this.cardConfig.morePath.pageCode }
      pathParams.forEach(item => {
        params[item] = this.clickParams[item]
      })
      this.$router.push({ path: jumpTo(path), query: params })
    }
  }
}
</script>

<style lang="scss" scoped>
.hxr-moreClick{
  color:#4178F5;
      font-size: 12px;
    font-weight: 400;
    line-height: 12px;
    height: 12px;
    text-align: center;
}

</style>

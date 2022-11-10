<template>
  <div class="hxr-iframeBack">
    <div class="hxr-iframeMain">
      <iframe :src="aimurl" scrolling="no" frameborder="0" width="100%"></iframe>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'webIframe',
    data() {
      return {
        aimurl: ""

      }
    },
    props: {
      cardUiParams: {
        type: Object,
        require: true,
        default:()=>({
          webIframe:""
        })
      },
    },
    created() {
      this.aimurl = this.cardUiParams.webIframe.iframeUrl
    },
    methods: {},
  }
</script>
<style scoped  lang="scss">
  .hxr-iframeBack {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }

  .hxr-iframeMain {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 1;
  }

  iframe {
    overflow: hidden;
    height: 100%;
  }
</style>
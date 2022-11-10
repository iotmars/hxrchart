<template>
  <div :class="pageCardUiParams.isbig==1?'hxr-floatMain':''">
    <div :class="['hxr-dcBody',pageCardUiParams.isbig==1?'hxr-cardMode-blockList-big':'hxr-cardMode-blockList']">
      <div class="hxr-cmHead"
           v-if="pageCardUiParams">
      <day-week-month-year v-if="pageCardUiParams.ifTimeSelect == 3"
                             :dateRangeType="myDateRangeType"
                             @click-date="getDate"
                             :styleMode='pageCardUiParams.isbig'
                             :composeSetting='pageCardUiParams.dateRangeList' />
        <!--日周月风格趋势-->
        <week-month-year-trendV2 v-if="pageCardUiParams.ifTimeSelect == 2"
                                 :dateRangeType="myDateRangeType"
                                 @click-date="getDate"
                                 :styleMode='pageCardUiParams.isbig'
                                 :composeSetting='pageCardUiParams.dateRangeList' />
      </div>
      <div class="hxr-cmBody">
        <common-block :mainData="blockList"
                      :config="columnConfig"
                      :styleMode='pageCardUiParams' />
      </div>
    </div>
    <!-- <div class="hxr-dcFoot">
        数据更新时间{{ dataUpdateTime }}
      </div> -->
    <div class="hxr-dcLeg"
         v-if="pageCardUiParams&&pageCardUiParams.morePath">
      <common-more :cardConfig="pageCardUiParams"
                   :clickParams="pageCardInterfaceParams" />
    </div>

  </div>

</template>
<script>
import weekMonthYearTrendV2 from '../common/weekMonthYearTrendV2.vue'
import dayWeekMonthYear from '../common/dayWeekMonthYear.vue'
import commonBlock from '../common/commonBlock.vue'
import { commonMethod } from '../api/common.js'
import commonMore from '../common/commonMore.vue'
export default {
  name: 'blockList',
  props: {
    title: {
      type: String | Number
    },
    pageCode: {
      type: String
    },
    isConcern: {
      type: String | Number
    },
    columnConfig: {
      type: Array,
      default: () => []
    },
    pageCardId: {
      type: Number
    },
    interfaceInfo: {
      type: Object,
      require: true
    },
    cardCode: {
      type: String
    },
    pageCardUiParams: {
      type: Object,
      default: () => {
        let obj = {
          ifTimeSelect: ''
        }
        return obj
      }
    },
    pageCardInterfaceParams: {
      type: Object
    }
  },
  data () {
    return {
      blockList: {},
      dataUpdateTime: "",
      myPageCardInterfaceParams: {},
      myDateRangeType: ''
    }
  },
  components: {
    'week-month-year-trendV2': weekMonthYearTrendV2,
    'common-block': commonBlock,
    'day-week-month-year': dayWeekMonthYear,
    'common-more': commonMore
  },
  created () {
    this.myPageCardInterfaceParams = this.pageCardInterfaceParams
    this.myDateRangeType = this.pageCardUiParams.dateRangeType
    this.getData()
  },
  methods: {
    getData () {
      let url = this.interfaceInfo.interfaceUrl
      let method = this.interfaceInfo.interfaceMethod
      this.myPageCardInterfaceParams.cardCode = this.cardCode
      this.myPageCardInterfaceParams.pageCardId = this.pageCardId
      commonMethod(url, method, this.myPageCardInterfaceParams).then(res => {
        if (res.code === 200) {
          this.blockList = res.data.records[0] || {}
          this.dataUpdateTime = res.dataUpdateTime
          this.$emit('getTime', res.dataUpdateTime)
        } else {
          this.$toast(res.msg)
        }
      })
    },
    getDate (data) {
      this.myPageCardInterfaceParams.dateRangeType = data.type
      this.myPageCardInterfaceParams.dateRange = data.val
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.hxr-cardMode-blockList {
  .hxr-cmHead {
    padding-bottom: 12px;
  }
  .hxr-cmBody {
    padding-bottom: 20px;
  }

  .hxr-cmLeg {
    padding-bottom: 24px;
  }

  .hxr-cmFoot {
    padding-bottom: 12px;
  }
}

.hxr-cardMode-blockList-big {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  .hxr-cmHead{
    display: flex;
    display: -webkit-flex;
    justify-content: flex-end;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .hxr-cmBody {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
  @media screen and (max-width: 2000px) {
    
    .hxr-cmBody {
      top: 20px;
    }
  }
  @media screen and (min-width: 2000px) and (max-width: 3000px) {
    .hxr-cmBody {
      top: 30px;
    }
  }
  @media screen and (min-width: 3000px) {
    .hxr-cmBody {
      top: 40px;
    }
  }
}

</style>

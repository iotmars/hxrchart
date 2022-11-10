<template>
  <div>
    <div>
      <div class="hxr-dcBody hxr-cardMode-abreastTable">
        <div class="hxr-cmBody">
          <div class="hxr-leftRight">
            <div class="hxr-lrLeft">
              <div class="hxr-lrlHead">{{cardUiParams.abreastTable.leftName}}</div>
              <scroll-table @change-sort="changeSort"
                            :needTotal="total"
                            :tableData="dataLeft"
                            :tdConfig="columnConfig"
                            :cardUiParams="cardUiParams" />
            </div>
            <div class="hxr-lrRight">
              <div class="hxr-lrrHead">{{cardUiParams.abreastTable.rightName}}</div>
              <scroll-table @change-sort="changeSort"
                            :needTotal="total"
                            :tableData="dataRight"
                            :tdConfig="columnConfig"
                            :cardUiParams="cardUiParams" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import { commonMethod } from '../api/common/common'
import scrollTable from '../common/scrollTable.vue'
export default {
  name: 'abreastTable',
  props: {
    cardCode: {
      type: String
    },
    pageCardId: {
      type: Number
    },
    cardUiParams: {
      type: Object,
      require: true,
      default: () => {
        abreastTable: {
          columnConfig: { }
        }
      },
    },
    interfaceInfo: {
      type: Object,
      require: true
    },
    interfaceParams: {
      type: Object,
      require: true
    },
  },
  data () {
    return {
      columnConfig:[],
      dataLeft:  [],
      dataRight: [],
      total: [],
      sortField: '',
      sort: '',
      dateRangeType: '',
      dateRange: '',
      myInterfaceParams: {
      },
    }
  },
  components: {
    'scroll-table': scrollTable,
  },
  created (){
    this.columnConfig = this.cardUiParams.abreastTable.columnConfig
  },
  mounted () {
    this.myInterfaceParams = this.interfaceParams
    this.getData()
  },
  methods: {
    getData () {
      this.total = []
      let url = this.interfaceInfo.interfaceUrl
      let method = this.interfaceInfo.interfaceMethod
      this.myInterfaceParams.cardCode = this.cardCode
      this.myInterfaceParams.pageCardId = this.pageCardId
      commonMethod(url, method, this.myInterfaceParams).then(res => {
        if (res.code === 200) {
          this.dataLeft = res.data.records[this.cardUiParams.abreastTable.leftField]
          this.dataRight = res.data.records[this.cardUiParams.abreastTable.rightField]
          this.total.push(res.data.total)
        } else {
          alert(res.msg)
        }
      })
    },
    changeSort (data) {
      this.myInterfaceParams.sortField = data.sortField
      this.myInterfaceParams.sort = data.sort
      this.getData()
    },
    getDate (data) {
      this.myInterfaceParams.dateRangeType = data.type
      this.myInterfaceParams.dateRange = data.val
        this.getData( )
     }
  }
}
</script>
<style lang="scss" scoped>
.hxr-cardMode-abreastTable {
  .hxr-cmBody {
    padding-bottom: 10px;
  }
}
.hxr-leftRight {
  display: flex;
  display: -webkit-flex;
  .hxr-lrLeft {
    flex: 1;
    padding-right: 2px;
    .hxr-lrlHead {
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      background: #999;
      font-weight: 600;
    }
  }
  .hxr-lrRight {
    flex: 1;
    padding-left: 2px;
    .hxr-lrrHead {
      width: 100%;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      background: #999;
      font-weight: 600;
    }
  }
}
</style>
<template>
  <div :class="styleMode.isBig==1?'hxr-slideTable-big'+styleMode.scroll:'hxr-slideTable'"
       ref="table">
    <table v-if="styleMode.isBig==1"
           ref="header"
           style="table-layout: fixed;">
      <tr>
        <th v-for="(item,index) in tdConfig"
            :key="index"
            :width='item.width'>
          <span v-if="item.sort||item.sort===0"
                @click="changeSort(item)">
            {{ item.name }}
            <img v-if="item.sort===0"
                       width="7"
                       height="10"
                       :src="require('../assets/icon_asc.png')" />
            <img v-if="item.sort===1"
                       width="7"
                       height="10"
                       :src="require('../assets/icon_desc.png')" />
            <img v-if="item.sort===2"
                       width="7"
                       height="10"
                       :src="require('../assets/icon_nosort.png')" />
          </span>
          <span v-else>{{ item.name }}</span>
        </th>
      </tr>
    </table>
    <div :class="styleMode.isBig==1?'scrollTable':''"
         :style="[{height:scrollHeight}]">
      <table :style="{'table-layout':(styleMode.isBig==1? 'fixed':'')}">
        <tr v-if="styleMode.isBig!=1">
          <th v-for="(item,index) in tdConfig"
              :key="index"
              :width='item.width'>
            <span v-if="item.sort||item.sort===0"
                  @click="changeSort(item)">
              {{ item.name }}
              <img v-if="item.sort==0"
                         width="7"
                         height="10"
                         :src="require('../assets/icon_asc.png')" />
              <img v-if="item.sort==1"
                         width="7"
                         height="10"
                         :src="require('../assets/icon_desc.png')" />

              <img v-if="item.sort==2"
                         width="7"
                         height="10"
                         :src="require('../assets/icon_nosort.png')" />
            </span>
            <span v-else>{{ item.name }}</span>
          </th>
          <th v-if="styleMode.isBig!=1"></th>
        </tr>
        <tr v-for="(item,index) in tableData"
            :key="index"
            v-show="showMore || index < limit">
          <td v-for="(x,idx) in tdConfig"
              :key="idx"
              :width='x.width'>
              <span v-if="item[x.fieldName]&&(item[x.fieldName].toString()).substring(0,1)=='+'"
                    :style="{color:x.skin==1?'#ff4500':'#ffffff'}">
                {{ changeMode(item, x)}}
              </span>
              <span v-else-if="item[x.fieldName]&&(item[x.fieldName].toString()).substring(0,1)=='-'"
                    :style="{color:x.skin==1?'#8ce78d':'#ffffff'}">
                {{ changeMode(item, x)}}
              </span>
              <span v-else>
                {{ changeMode(item, x)}}
              </span>
          </td>
          <td class="hxr-endTd"
              v-if="cardUiParams.toPath&&styleMode.isBig!=1">
            <img width="7"
                       height="12"
                       @click="toDetail(item)"
                       :src="require('../assets/icon_right.png')" />
          </td>
        </tr>
        <tr class="hxr-endTr"
            v-if="needTotal.length>0&&cardUiParams.noListTotal!=1">
          <td v-for="(x,idx) in tdConfig"
              :key="idx"
              :width='x.width'>
            {{ needTotal[0][x.fieldName]  }}
          </td>
          <td class="hxr-endTd"
              v-if="styleMode.isBig!=1">
          </td>
        </tr>
      </table>
      <p v-if="tableData.length>limit"
         class="showMore"
         @click="showMore=!showMore">
        <span v-if="!showMore">查看更多</span>
        <span v-if="showMore">收起</span>
      </p>
    </div>
  </div>
</template>
<script>
import { changeUnitV2, jumpTo,isNumber } from '../utils/index.js'

export default {
  name: 'commonTable',
  computed:{


  },
  props: {
    needTotal: {
      type: Array,
      default: () => []
    },
    tdConfig: {
      type: Array,
      required: true,
      default: () => []
    },
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    cardUiParams: {
      type: Object,
      default: () => { }
    },
    styleMode: {
      type: Object,
      default: () => {
        let obj = {
          isBig: 0,
          scroll: 1
        }
        return obj
      }
    }
  },
  data () {
    return {
      showMore: false,
      scrollHeight: '100%'
    }
  },
  computed: {
    limit () {
      var ls = 10
      if (this.cardUiParams.moreLimit) {
        ls = this.cardUiParams.moreLimit
      }
      return ls
    }
  },
  created (){
    console.log(this.tdConfig)
  },
  mounted () {
    if (this.styleMode.isBig == 1) {
      this.scrollHeight = (this.$refs.table.offsetHeight - this.$refs.header.offsetHeight) + 'px'
    }
  },
  methods: {
    changeMode (item, x) {
      var value = item[x.fieldName]
      var unit = ''
      if (x.unit){
        unit = x.unit
      }
      if (typeof value === 'underfined' || value===null ){
        var nullReplace='--'
        if (x.nullReplace){
          nullReplace=x.nullReplace
        }
        value = nullReplace
      }else{
        if (typeof(value)==='string'){
           value =  value+unit
        }else if (isNumber(value)){
          if (x.format) {
            value = changeUnitV2(value)[x.format]
          }
          value =  value+unit
        }else{
          value = "异常类型"+typeof(value)
        }
      }
      return value
    },
    changeSort (item) {
      if (item.sort|| item.sort === 0) {
        if (item.sort == 2) {
          item.sort = 1
        }
        else if (item.sort == 0) {
          item.sort = 1
        } else if (item.sort == 1) {
          item.sort = 0
        }
        this.$emit('change-sort', { sortField: item.fieldName, sort: item.sort })
      }

    },
    toDetail (t) {
      // let path = this.cardConfig.toPath.pathUrl
      let path = this.$route.path
      let pathParams = this.cardUiParams.toPath.pathParams
      let params = { pageCode: this.cardUiParams.toPath.pageCode }
      pathParams.forEach(item => {
        params[item] = t[item]
      })
      this.$router.push({ path: jumpTo(path), query: params })
    }
  }
}
</script>

<style lang="scss" scoped>
.hxr-slideTable {
  .showMore {
    text-align: center;
    color: #9e9e9e;
  }

  .hxr-endTd {
    text-align: right;
  }

  .hxr-endTr {
    color: #e64340;
  }

  table {
    width: 100%;
    font-size: 14px;
  }

  th {
    height: 30px;
    color: #999;
    font-weight: normal;
    text-align: center;
    span {
      margin-left: 2px;
    }
  }

  td {
    height: 24px;
    text-align: center;
    max-width: 70px;
    word-break: break-all;
  }
}
.scrollTable {
  position: relative;
  top: 0;
  overflow-y: auto;
  height: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
.hxr-slideTable-big1 {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  // overflow-y: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  .showMore {
    text-align: center;
    color: #9e9e9e;
  }

  .hxr-endTd {
    text-align: right;
  }

  .hxr-endTr {
    color: #fff;
  }

  table {
    width: 100%;
    color: #fff;
  }
  tr:nth-child(2n-1) {
    background-color: rgba(0, 255, 255, 0.3);
  }
  th {
    font-weight: normal;
    text-align: center;
    span {
      margin-left: 2px;
    }
  }

  td {
    text-align: center;
    word-break: break-all;
  }
  @media screen and (max-width: 2000px) {
    table {
      font-size: 6px;
    }
    th {
      height: 16px;
    }
    td {
      height: 14px;
    }
  }
  @media screen and (min-width: 2000px) and (max-width: 3000px) {
    table {
      font-size: 12px;
    }
    th {
      height: 24px;
    }

    td {
      height: 20px;
    }
  }
  @media screen and (min-width: 3000px) {
    table {
      font-size: 14px;
    }
    th {
      height: 36px;
    }
    td {
      height: 32px;
    }
  }
}
.hxr-slideTable-big0 {
  position: absolute;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  display: -webkit-flex;
  align-items: center;
  .showMore {
    text-align: center;
    color: #9e9e9e;
  }

  .hxr-endTd {
    text-align: right;
  }

  .hxr-endTr {
    color: #fff;
  }

  table {
    width: 100%;
    color: #fff;
  }
  tr:nth-child(2n-1) {
    background-color: rgba(0, 255, 255, 0.3);
  }
  th {
    font-weight: normal;
    text-align: center;
    span {
      margin-left: 2px;
    }
  }

  td {
    text-align: center;
    max-width: 70px;
    word-break: break-all;
  }
  @media screen and (max-width: 2000px) {
    table {
      font-size: 6px;
    }
    th {
      height: 16px;
    }
    td {
      height: 14px;
    }
  }
  @media screen and (min-width: 2000px) and (max-width: 3000px) {
    table {
      font-size: 12px;
    }
    th {
      height: 24px;
    }

    td {
      height: 20px;
    }
  }
  @media screen and (min-width: 3000px) {
    table {
      font-size: 14px;
    }
    th {
      height: 36px;
    }
    td {
      max-width: 70px;
      height: 32px;
    }
  }
}
</style>

<template>
  <div class="hxr-scrollTable">
    <table cellspacing="0">
      <tr>
        <th v-for="(item,index) in tdConfig"
            :key="index">
          {{ item.name }}
        </th>
      </tr>
      <tr v-for="(item,index) in tableData"
          :key="index">
        <td v-for="(x,idx) in tdConfig"
            :key="idx">
          <span v-if="item[x.fieldName]">
            <span v-if="(item[x.fieldName].toString()).substring(0,1)=='+'"
                  style="color:#e64340">
              {{ (item[x.fieldName] ? item[x.fieldName] : (x.fieldName ? (x.unit ? '' : '0') : ''))  }}
            </span>
            <span v-else-if="(item[x.fieldName].toString()).substring(0,1)=='-'"
                  style="color:green">
              {{ (item[x.fieldName] ? item[x.fieldName] : (x.fieldName ? (x.unit ? '' : '0') : ''))  }}
            </span>
            <span v-else>
              {{ (item[x.fieldName] ? item[x.fieldName] : (x.fieldName ? (x.unit ? '' : '0') : '')) }}
            </span>
          </span>
          <span v-else>0</span>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
import { numberReplace } from '../utils/index'

export default {
  name: 'scrollTable',
  filters: {
    changeMode (item, format, nullReplace) {
      if (!isNaN(Number(item)) ) {
        return numberReplace(nullReplace, item, format)
      }else{
        return item
      }
    }
  },
  props: {
    needTotal: {
      type: Array,
      default: () => []
    },
    tableData: {
      type: Array,
      required: true,
      default: () => []
    },
    tdConfig: {
      type: Array,
      required: true,
      default: () => []
    },
    cardUiParams: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
      showMore: false,
    }
  },
  created () {

  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.hxr-scrollTable {
  table {
    font-size: 10px;
    width: 100%;
    
  }
  th {
    border: 1px solid #999;
    font-weight: normal;
    text-align: center;
    background-color: #e0e0e0;
    span {
      margin-left: 2px;
    }
  }

  td {
    border-collapse: separate;
    border: 1px solid #e0e0e0;
    text-align: center;
    word-break: break-all;
  }
}
@media screen and (max-width: 400px) {
    td {
        height: 75px;
    }
}
@media screen and (min-width: 400px) and (max-width: 1100px){
    td {
        height: 60px;
    }
}
@media screen and (min-width: 1100px) {
    td {
        height: 26px;
    }
}
</style>

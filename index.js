import webIframe from "./lib/webIframe"
import abreastTable from "./lib/abreastTable"
import tableList from "./lib/tableList"
webIframe.install = v => v.component(webIframe.name,webIframe)
abreastTable.install = v => v.component(abreastTable.name,abreastTable)
tableList.install = v => v.component(tableList.name,tableList)
export {webIframe,abreastTable,tableList};

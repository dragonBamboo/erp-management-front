<template>
  <div id='container'>
    <div id='container-header'>
      <span style='float: left'>货品列表</span>
    </div>
    <div class='clear' style='clear:both;'></div>
    <!--    <div class='search'>search</div>-->
    <div class='main'>
      <!--   查询功能，有时间实现   -->
      <!--      <div id="search-main">-->
      <!--        <el-row :gutter="20">-->
      <!--          <el-col :span="16">-->
      <!--            <span class="guide left">操作指南</span>-->
      <!--            <div class="left" style="vertical-align: center;height: 60px;line-height: 60px">-->
      <!--              <el-input style='width: 400px;' class="left" ></el-input>-->
      <!--            </div>-->
      <!--          </el-col>-->
      <!--          <el-col :span="8"><div class="grid-content ep-bg-purple" /></el-col>-->
      <!--        </el-row>-->
      <!--      </div>-->
      <div id="content-main">
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="my-count global-hover">
              <div class="ccount">
                <el-text class="my-text" size="large">货品总量</el-text>
                <span class="count-test">
                {{ allTotal }}
              </span>
              </div>
            </div>
            <div class="my-echarts global-hover">
              <!--            <EChartsDemo :echarts-data="goodsData"/>-->
              <div id="chart" style="width: 100%;height: 300px" v-if="goodsData.length"></div>
              <div v-else>数据加载中...</div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="goods-table global-hover">
              <el-table
                  :data='goodsData'
                  style='width: 100%'
                  :row-class-name='tableRowClassName'
              >
                <el-table-column prop='goodsCategory' label='货品类型' width=''/>
                <el-table-column prop='goodsCode' label='货品编码' width=''/>
                <el-table-column prop='goodsName' label='货品名称'/>
                <el-table-column prop='specifications' label='规格型号'/>
                <el-table-column prop='unit' label='单位' width='60'/>
                <el-table-column prop='purchasePrice' label='参考进价'/>
                <el-table-column prop='sellingPrice' label='参考售价'/>
                <el-table-column prop='repertory' label='库存'/>
                <el-table-column prop='createTime' label='创建时间' width='180'>
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                      <el-icon>
                        <timer/>
                      </el-icon>
                      <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop='updateTime' label='更新时间' width='180'>
                  <template #default="scope">
                    <div style="display: flex; align-items: center">
                      <el-icon>
                        <timer/>
                      </el-icon>
                      <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width='140'>
                  <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                    >Edit
                    </el-button
                    >
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                    >Delete
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="add-search">
                <el-button @click="addGoods">添加</el-button>
                <el-input style="width: 400px" v-model="searchValue"
                          placeholder="请输入你要查询的（货品类型，货品编码，货品名称）内容"
                />
                <el-button @click="searchInvoke">点击查询</el-button>
                <el-button @click="delSearchInvoke">清空查询</el-button>
              </div>

              <div class="pagenation">
                <el-pagination
                    :page-size="10"
                    background
                    layout="prev, pager, next"
                    :total="allTotal"
                    :current-page="currentPage"
                    @current-change="handlePageChange"
                />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>


    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialog" title="货品信息">
      <el-form :model="goods">
        <el-form-item label="goodsCategory" :label-width="editDialog">
          <el-input v-model="goods.goodsCategory" :value="goods.goodsCategory" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="goodsCode" :label-width="editDialog">
          <el-input v-model="goods.goodsCode" :value="goods.goodsCode" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="goodsName" :label-width="editDialog">
          <el-input v-model="goods.goodsName" :value="goods.goodsName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="specifications" :label-width="editDialog">
          <el-input v-model="goods.specifications" :value="goods.specifications" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="unit" :label-width="editDialog">
          <el-input v-model="goods.unit" :value="goods.unit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="purchasePrice" :label-width="editDialog">
          <el-input v-model="goods.purchasePrice" :value="goods.purchasePrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="sellingPrice" :label-width="editDialog">
          <el-input v-model="goods.sellingPrice" :value="goods.sellingPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="repertory" :label-width="editDialog">
          <el-input v-model="goods.repertory" :value="goods.repertory" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="warehouseId" :label-width="editDialog">
          <el-input v-model="goods.warehouseId" :value="goods.warehouseId" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="update">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!-- 添加操作 -->
    <el-dialog v-model="addDialog" title="货品信息">
      <el-form :model="goods">
        <el-form-item label="goodsCategory" :label-width="addDialog">
          <el-input v-model="goods.goodsCategory" :value="goods.goodsCategory" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="goodsCode" :label-width="addDialog">
          <el-input v-model="goods.goodsCode" :value="goods.goodsCode" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="goodsName" :label-width="addDialog">
          <el-input v-model="goods.goodsName" :value="goods.goodsName" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="specifications" :label-width="addDialog">
          <el-input v-model="goods.specifications" :value="goods.specifications" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="unit" :label-width="addDialog">
          <el-input v-model="goods.unit" :value="goods.unit" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="purchasePrice" :label-width="addDialog">
          <el-input v-model="goods.purchasePrice" :value="goods.purchasePrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="sellingPrice" :label-width="addDialog">
          <el-input v-model="goods.sellingPrice" :value="goods.sellingPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="repertory" :label-width="addDialog">
          <el-input v-model="goods.repertory" :value="goods.repertory" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="warehouseId" :label-width="addDialog">
          <el-input v-model="goods.warehouseId" :value="goods.warehouseId" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="add">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!-- 删除弹窗 -->
    <el-dialog
        v-model="delDialog"
        title="Tips"
        width="30%"
    >
      <span>确认删除{{ goods.goodsCode }}这条数据吗？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="delDialog = false">取消</el-button>
        <el-button type="primary" @click="delGoods">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {Timer} from "@element-plus/icons-vue";

const goodsDefault = {
    id: '',
    createTime: '',
    updateTime: '',
    isDeleted: 0,
    param: {},
    goodsCategory: '',
    goodsCode: '',
    goodsName: '',
    specifications: '',
    unit: '',
    purchasePrice: '',
    sellingPrice: '',
    repertory: '',
    warehouseId: ''
}
export default {
    name: 'GoodsListView',
    components: {Timer},
    data() {
        return {
            goodsData: [goodsDefault],
            goods: goodsDefault,
            currentPage: 1,
            allTotal: 0,
            editDialog: false,
            delDialog: false,
            addDialog:false,
            searchValue: '',
            // 饼状体规则
            pieOption: {
                title: {
                    text: '货品分布情况',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)',
                },
                legend: {
                    type: 'scroll',
                    orient: 'vertical',
                    right: 10,
                    top: 10,
                    bottom: 20,
                    // data: this.goodsData.map(obj => obj.goodsName)
                    data: [],
                },
                series: [
                    {
                        name: '货物',
                        type: 'pie',
                        radius: '55%',
                        ceter: ['40%', '50%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0,0,0,0.5)'
                            }

                        },
                    },
                ],
            },
        }
    }
    ,
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex % 2 === 1) {
                return 'warning-row';
            } else {
                return 'success-row';
            }
        },
        async fetchData(page = 1, limit = 10, param) {
            const {data: res} = await axios.get(`/api/goods/${page}/${limit}`, {params: param})
            this.goodsData = res.data.records
            this.allTotal = res.data.total

            // 在数据获取成功后更新 legend 和 series 中的 data 属性
            this.pieOption.legend.data = this.goodsData.map(obj => obj.goodsName)
            this.pieOption.series[0].data = this.goodsData.map(obj => {
                return {
                    name: obj.goodsName,
                    value: obj.repertory,
                }
            })
            // 初始化图表
            this.init()
        },
        // 编辑
        async handleEdit(index, row) {
            // console.log(index, row)
            const id = row.id
            const {data: res} = await axios.get(`/api/goods/get/${id}`)
            this.goods = res.data
            this.editDialog = true
        },
        addGoods() {
            this.goods = {}
            this.addDialog = true
        },
        async add() {
            const {data: res} = await axios.post(`/api/goods/add`, this.goods)
            this.goods = {}
            this.fetchData()
            this.addDialog = false
        },
        async update() {
                // 修改
                const {data: res} = await axios.put(`/api/goods/update`, this.goods)
            this.goods = {}
            this.fetchData()
            this.editDialog = false
        },
        async handleDelete(index, row) {
            console.log(index, row)
            const id = row.id
            const {data: res} = await axios.get(`/api/goods/get/${id}`)
            this.goods = res.data
            this.delDialog = true
        },
        async delGoods() {
            const id = this.goods.id
            const {data: res} = await axios.delete(`/api/goods/remove/${id}`)
            this.goods = {}
            this.fetchData()
            this.delDialog = false
        },
        // 查询操作
        searchInvoke() {
            const param = {
                keyword: ''
            }
            param.keyword = this.searchValue
            this.fetchData(1, 10, param)
        },
        // 清空查询
        delSearchInvoke() {
            this.searchValue = ''
            this.fetchData()
        },
        handlePageChange(currentPage) {
            this.currentPage = currentPage;
            this.fetchData(this.currentPage, 10, {});
        },
        init() {
            const chart = this.$echarts.init(document.getElementById('chart'))
            chart.setOption(this.pieOption)
        },
    }, created() {
        this.fetchData()
    },
    mounted() {
        // this.init()
    }
}
</script>

<style scoped>
#container {
    color: #c2baba;
}

#container-header {
    display: flex;
    background-color: rgba(68, 67, 67, 0.5);
    height: 40px;
    line-height: 40px;
}

#container-header > span {
    padding-left: 20px;
    font-size: 20px;
    color: #181818;
}

/deep/ .el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

/deep/ .el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}

.main {
    height: 100%;
}

#content-main {
    min-height: 100%;
    position: relative;
}
#search-main {
    background-color: #42b983;
    height: 50px;
    font-size: 18px;
    line-height: 50px;
}

.pagenation {
    display: flex;
    justify-content: center;
}

.goods-table {
    /*float: right;*/
    margin-top: 20px;
    margin-right: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: none;
    transition: box-shadow 0.2s;
    /*边框颜色*/
    border: 1px solid #e8e8e8;
    height: 610px;
    position: relative;
    text-align: center;
}

.goods-table > .pagenation {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.global-hover:hover {
    box-shadow: 0 0 10px rgba(80, 79, 79, 0.5);
}

.my-count {
    width: 100%;
    margin-top: 20px;
    margin-left: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: none;
    transition: box-shadow 0.2s;
    /*边框颜色*/
    border: 1px solid #e8e8e8;
    height: 300px;
    position: relative;
    text-align: center;
    box-sizing: border-box;
}

.ccount {
    height: 100%;
}

.my-text {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-weight: bolder;
}

.count-test {
    display: flex;
    justify-content: center;
    height: 100%;
    font-size: 100px;
    line-height: 240px;
    color: #395b64;
}

.my-echarts {
    width: 100%;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: none;
    transition: box-shadow 0.2s;
    /*边框颜色*/
    border: 1px solid #e8e8e8;
    height: 300px;
    position: relative;
    text-align: center;
    box-sizing: border-box;
}

.guide {
    padding-left: 10px;
    padding-right: 10px;
}

.left {
    float: left;
}
</style>
<template>
  <div id="container">
    <el-container>
      <el-header class="my-el-header-title">
        <div class="title">
          <el-icon class="title-icon" size="large">
            <Operation/>
          </el-icon>
          零售退货列表
        </div>
      </el-header>
      <el-main class="my-content-container scrollable">
        <el-container>
          <!-- 搜索框 -->
          <el-header class="my-search-header">
            <el-row :gutter="20">
              <el-col :span="4">
                <el-text class="mx-1" size="large">单据编号：</el-text>
                <el-input v-model="selectId" class="my-input-limit-width" placeholder="" clearable/>
              </el-col>
              <el-col :span="4">
                <el-text class="mx-1" size="large">商品信息：</el-text>
                <el-input v-model="selectMessage" class="my-input-limit-width" placeholder="" clearable/>
              </el-col>
              <el-col :span="10">
                <el-text class="mx-1" size="">单据日期：</el-text>
                <el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    range-separator="To"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :size="dateSize"
                    @change="handleChange"
                />
              </el-col>
              <el-col :span="1">
                <el-button style="" :icon="Search" @click="searchInvoke" round>查询</el-button>
              </el-col>
              <el-col :span="3">
                <el-button style="" :icon="Refresh" @click="reset" round>重置</el-button>
              </el-col>
              <el-col :span="2">
                <el-button style="" :icon="Refresh" @click="addCustomer" round>添加</el-button>
              </el-col>
            </el-row>

          </el-header>

          <el-main>
            <!-- table表单 -->
            <el-table
                :data='tableData'
                style='width: 100%'
                :row-class-name='tableData'
            >
              <el-table-column prop='name' label='客户名称' width='100'/>
              <el-table-column prop='receiptNumber' label='单据编号' width='150'/>
              <el-table-column prop='commodityInformation' label='商品信息' width=''/>
              <el-table-column prop='' label='单据日期' width='200'>
                <template #default="scope">
                  <div style="display: flex; align-items: center;justify-content: left;">
                    <el-icon>
                      <timer/>
                    </el-icon>
                    <span style="margin-left: 10px">{{ scope.row.billDate }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop='operator' label='操作员' width="100"/>
              <el-table-column prop='totalAmount' label='金额合计' width='130'/>
              <el-table-column prop='state' label='状态' width="100"/>
              <el-table-column fixed="right" label="操作" width='180'>
                <template #default="scope">
                  <el-button class="btn-padding" size="small" @click="handleEdit(scope.$index, scope.row)"
                  >Edit
                  </el-button
                  >
                  <el-button
                      class="btn-padding"
                      size="small"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                  >Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-main>
          <div class="footer-parent">
            <el-footer class="footer">
              <div class="pagination-container">
                <el-pagination
                    layout="prev, pager, next"
                    :total="allTotal"
                    :current-page="currentPage"
                    @current-change="handlePageChange"
                />
              </div>
            </el-footer>
          </div>

        </el-container>
      </el-main>
    </el-container>

    <!-- 添加操作 -->
    <el-dialog v-model="addDialog" title="货品信息">
      <el-form :model="customer">
        <el-form-item label="客户信息" :label-width="addDialog">
          <el-input v-model="customer.name" :value="customer.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="单据编号" :label-width="addDialog">
          <el-input v-model="customer.receiptNumber" :value="customer.receiptNumber" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="商品信息" :label-width="addDialog">
          <el-input v-model="customer.commodityInformation" :value="customer.commodityInformation" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="操作员" :label-width="addDialog">
          <el-input v-model="customer.operator" :value="customer.operator" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="金额合计" :label-width="addDialog">
          <el-input v-model="customer.totalAmount" :value="customer.totalAmount" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="addDialog">
          <el-input v-model="customer.state" :value="customer.state" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="add">
          添加
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!-- 删除操作 -->
    <el-dialog
        v-model="delDialog"
        title="Tips"
        width="30%"
    >
      <span>确认删除{{ customer.receiptNumber }}这条数据吗？</span>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="delDialog = false">取消</el-button>
        <el-button type="primary" @click="delCustomer">
          确认
        </el-button>
      </span>
      </template>
    </el-dialog>

    <!-- 修改 -->
    <el-dialog v-model="editDialog" title="货品信息">
      <el-form :model="customer">
        <el-form-item label="客户信息" :label-width="editDialog">
          <el-input v-model="customer.name" :value="customer.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="单据编号" :label-width="editDialog">
          <el-input v-model="customer.receiptNumber" :value="customer.receiptNumber" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="商品信息" :label-width="editDialog">
          <el-input v-model="customer.commodityInformation" :value="customer.commodityInformation" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="操作员" :label-width="editDialog">
          <el-input v-model="customer.operator" :value="customer.operator" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="金额合计" :label-width="editDialog">
          <el-input v-model="customer.totalAmount" :value="customer.totalAmount" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="状态" :label-width="editDialog">
          <el-input v-model="customer.state" :value="customer.state" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="update">
          修改
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {Operation, Refresh, Search, Timer} from "@element-plus/icons-vue";
import axios from "axios";

const customerDefault = {
    id: '',
    createTime: '',
    updateTime: '',
    isDeleted: 0,
    param: {},
    name: '',
    receiptNumber: '',
    commodityInformation: '',
    billDate: '',
    operator: '',
    totalAmount: 0,
    state: "无状态"
}
export default {
    name: "CurrentRepertorySearch",
    computed: {
        Refresh() {
            return Refresh
        },
        Search() {
            return Search
        }
    },
    components: {Timer, Operation},
    data() {
        return {
            // 筛选数据
            selectId: '',
            selectMessage: '',

            // 日期数据
            dateRange: '',
            dateSize: '',
            oldTime: '',
            newTime: '',

            // 表格数据
            tableData: [customerDefault],
            // 基本信息
            customer: customerDefault,
            // 分页
            currentPage: 1,
            allTotal: 0,
            // dialog弹窗
            editDialog: false,
            delDialog: false,
            addDialog: false,
            param: {
                receiptNumber: '',
                commodityInformation: '',
                oldDate: '',
                newDate: '',
            }
        }
    },
    methods: {
        // 日期选择
        handleChange(dateRange) {
            this.oldTime = this.formatDate(dateRange[0])
            this.newTime = this.formatDate(dateRange[1])
        },
        // 格式日期
        formatDate(date) {
            return  date.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }).replace(/\//g, '-')
        },
        // 数据初始化
        async fetchData(page = 1, limit = 10, param) {
            const {data: res} = await axios.get(`/api/customer/${page}/${limit}`, {params: param})
            this.tableData = res.data.records
            this.allTotal = res.data.total
        },
        // 查询操作
        searchInvoke() {
            let searchParam = {
                receiptNumber: '',
                commodityInformation: '',
                oldDate: '',
                newDate: '',
            }
            searchParam.receiptNumber = this.selectId
            searchParam.commodityInformation = this.selectMessage
            searchParam.oldDate = encodeURIComponent(this.oldTime)
            searchParam.newDate = encodeURIComponent(this.newTime)
            if (searchParam.receiptNumber === '') {
                delete searchParam.receiptNumber
            }
            if (searchParam.commodityInformation === '') {
                delete searchParam.commodityInformation
            }
            if (searchParam.oldDate === '') {
                delete searchParam.oldDate
            }
            if (searchParam.newDate === '') {
                delete searchParam.newDate
            }
            this.fetchData(1, 10, searchParam);
        },
        // 重置按键时间
        reset() {
            this.selectId = ''
            this.selectMessage = ''
            this.oldTime = ''
            this.newTime = ''
            this.fetchData()
        },
        // 分页查询管理
        handlePageChange(currentPage) {
            const param = {
                keyword: ''
            }
            param.keyword = this.searchValue
            this.currentPage = currentPage;
            this.fetchData(this.currentPage, 10, {});
        },
        // 添加操作
        addCustomer() {
            this.customer = {}
            this.addDialog = true
        },
        async add() {
            const {data: res} = await axios.post(`/api/customer/add`, this.customer)
            this.customer = {}
            this.fetchData()
            this.addDialog = false
        },
        // 删除操作
        async handleDelete(index, row) {
            const id = row.id
            const {data: res} = await axios.get(`/api/customer/get/${id}`)
            this.customer = res.data
            this.delDialog = true
        },
        async delCustomer() {
            const id = this.customer.id
            const {data: res} = await axios.delete(`/api/customer/remove/${id}`)
            this.customer = {}
            this.fetchData()
            this.delDialog = false
        },
        // 修改按钮
        async handleEdit(index, row) {
            const id = row.id
            const {data: res} = await axios.get(`/api/customer/get/${id}`)
            this.customer = res.data
            this.editDialog = true
        },
        async update() {
            // 修改
            const {data: res} = await axios.put(`/api/customer/update`, this.customer)
            this.customer = {}
            this.fetchData()
            this.editDialog = false
        },
    },
    created() {
        this.fetchData();
    },
    watch: {}
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.el-row {
    padding: 0 !important;
    margin: 0 !important;
}
.el-col {
    padding: 0 !important;
    margin: 0 !important;
}
/deep/ .el-header {
    padding: 0 !important;
    margin: 0 !important;
    height: 50px;
}

.title {
    padding-left: 20px;
    height: 50px;
    line-height: 40px;
    font-size: large;
    color: #717175;
    display: flex;
    /*左浮动*/
    justify-content: left;
    /*垂直居中*/
    align-items: center;
    background-color: #a0cfff;
    border: #5683b0 1px solid;
    box-sizing: border-box;
}

.my-search-header {
    padding-top: 10px !important;
    padding-bottom: 10px !important;
    /*border: #5683b0 1px solid;*/
    /*box-sizing: border-box;*/
}

.my-input-limit-width {
    width: 100px;
    /*height: 100%;*/
}

.footer-parent {
    position: relative;
    height: 60px; /* 设置容器的高度 */
}

.footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
}

.pagination-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.my-content-container {
    height: 600px !important;
}

.btn-padding {
    padding-left: 20px;
    padding-right: 20px;
}

.scrollable {
    height: 200px; /* 设置区域高度 */
    overflow-y: auto; /* 开启垂直方向滚动条 */
}
</style>
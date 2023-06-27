<template>
  <div id="container">
    <div id="container-header">
      <span style="float: left">货品列表</span>
    </div>
    <div class="clear" style="clear:both;"></div>
    <div class="search">search</div>
    <div class="main">
      <el-table
          :data="tableData"
          style="width: 100%"
          :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="Date" width="180"/>
        <el-table-column prop="name" label="Name" width="180"/>
        <el-table-column prop="address" label="Address"/>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
    name: "GoodsListView",
    data() {
        return {
            tableData: [
                {
                    date: '2016-05-03',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-02',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-04',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
                {
                    date: '2016-05-01',
                    name: 'Tom',
                    address: 'No. 189, Grove St, Los Angeles',
                },
            ]
        }
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        }
    }
}
</script>

<style scoped>
#container {
    color: #c2baba;
}

#container-header {
    display: flex;
    background-color: #485555;
    height: 40px;
    line-height: 40px;
}

#container-header > span {
    padding-left: 20px;
    font-size: 20px;
    color: #dad0d0;
}
/deep/.el-table .warning-row {
    --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

/deep/.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
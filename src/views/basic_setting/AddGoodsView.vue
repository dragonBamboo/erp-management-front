<template>
  <div id="container">

  </div>
</template>

<script>
export default {
    name: "AddGoodsView",
    data() {
        return{
          goods:{
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
        }
    },
    methods:{

    }
}
</script>

<style scoped>

</style>
<template>
  <el-container>
    <el-header>
      <div id="logo">
        <img src="../assets/title.png">
      </div>
    </el-header>
    <el-main>
      <el-container>
        <el-aside>
          <el-menu
              active-text-color="#ffd04b"
              background-color="#395B64"
              class="el-menu-vertical-demo"
              default-active="1"
              text-color="#fff"
              @open="handleOpen"
              @close="handleClose"
              :default-openeds="['1']"
              router
          >
            <el-sub-menu class="my-el-sub-menu" index="1">
              <template #title>
                <el-icon>
                  <Folder/>
                </el-icon>
                <span class="menu-main">报表统计</span>
              </template>
              <el-menu-item class="my-el-menu-item" index="/home">
                <el-icon>
                  <Management/>
                </el-icon>
                货品列表
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                当前库存查询
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="1-3">
                <el-icon>
                  <Management/>
                </el-icon>
                出入库流水账
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="1-4">
                <el-icon>
                  <Management/>
                </el-icon>
                收发存汇总
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="1-5">
                <el-icon>
                  <Management/>
                </el-icon>
                库存预警分析
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu class="my-el-sub-menu" index="2">
              <template #title>
                <el-icon>
                  <Folder/>
                </el-icon>
                <span class="menu-main">基础设置</span>
              </template>
              <el-menu-item class="my-el-menu-item" index="/">
                <el-icon>
                  <Management/>
                </el-icon>
                新增仓库
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="2-2">
                <el-icon>
                  <Management/>
                </el-icon>
                新增货品类别
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="2-3">
                <el-icon>
                  <Management/>
                </el-icon>
                新增货品
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="2-4">
                <el-icon>
                  <Management/>
                </el-icon>
                新增供应商
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="2-5">
                <el-icon>
                  <Management/>
                </el-icon>
                新增客户
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu class="my-el-sub-menu" index="3">
              <template #title>
                <el-icon>
                  <Folder/>
                </el-icon>
                <span class="menu-main">入库管理</span>
              </template>
              <el-menu-item class="my-el-menu-item" index="3-1">
                <el-icon>
                  <Management/>
                </el-icon>
                采购入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="3-2">
                <el-icon>
                  <Management/>
                </el-icon>
                退料入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="3-3">
                <el-icon>
                  <Management/>
                </el-icon>
                生产入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="3-4">
                <el-icon>
                  <Management/>
                </el-icon>
                销售退货入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="3-5">
                <el-icon>
                  <Management/>
                </el-icon>
                其他入库单
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu class="my-el-sub-menu" index="4">
              <template #title>
                <el-icon>
                  <Folder/>
                </el-icon>
                <span class="menu-main">出库管理</span>
              </template>
              <el-menu-item class="my-el-menu-item" index="4-1">
                <el-icon>
                  <Management/>
                </el-icon>
                采购退货出库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="4-2">
                <el-icon>
                  <Management/>
                </el-icon>
                领料出库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="4-3">
                <el-icon>
                  <Management/>
                </el-icon>
                销售出库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="4-4">
                <el-icon>
                  <Management/>
                </el-icon>
                其他出库单
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu class="my-el-sub-menu" index="5">
              <template #title>
                <el-icon>
                  <Folder/>
                </el-icon>
                <span class="menu-main">库存管理</span>
              </template>
              <el-menu-item class="my-el-menu-item" index="5-1">
                <el-icon>
                  <Management/>
                </el-icon>
                库存调拨单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="5-2">
                <el-icon>
                  <Management/>
                </el-icon>
                库存盘点单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="5-3">
                <el-icon>
                  <Management/>
                </el-icon>
                库存调拨记录
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="5-4">
                <el-icon>
                  <Management/>
                </el-icon>
                库存盘点记录
              </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="/home/relax">
              <template #title>
                <el-icon>
                  <Folder/>
                </el-icon>
                <span class="menu-main">放松一下</span>
              </template>
              <el-menu-item class="my-el-menu-item" index="/home/relax">
                <el-icon>
                  <Management/>
                </el-icon>
                放松一下
              </el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <el-main>
          <div id="container-main">
            <router-view/>
          </div>
        </el-main>
      </el-container>

    </el-main>
  </el-container>
</template>

<script>
import {Folder, Management} from "@element-plus/icons-vue";

export default {
    name: 'HomeView',
    components: {Management, Folder, Location},
    data() {
        return {}
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
    },
}
</script>
<style scoped>
#logo > img {
    margin-top: 10px;
    float: left;
}

.el-main {
    padding: 0px;
}

ul.el-menu.el-menu--vertical.el-menu-vertical-demo {
    height: 94vh;
    border: 0px;
}

header.el-header {
    height: 70px;
    background-color: #A5C9CA;
}

.el-menu {
    background-color: #395B64;
}

.el-menu-item {
    color: #d9d4d4;
}

.menu-main {
    color: #d9d4d4;
}

.el-icon {
    color: #d9d4d4;
}

#container-main {
    width: 100%;
    height: 100%;
    background-color: #b4b2b2;
}
</style>
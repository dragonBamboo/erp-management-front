<template>
  <el-container>
    <el-header>
      <el-row justify="space-between" gutter="24">
        <el-col span="8">
          <div id="logo">
            <img src="../assets/title.png">
          </div>
        </el-col>
        <el-col span="8">
          <div class="center">
            <el-avatar class="my-el-avatar" :size="large" :src="circleUrl"/>
          </div>
          <el-text class="login-msg" type="primary">欢迎您，{{ username }}</el-text>
          <div class="logout">
            <LogoutDialog/>
          </div>
        </el-col>
      </el-row>
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
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                出入库流水账
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                收发存汇总
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
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
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                新增仓库
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                新增货品类别
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                新增货品
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                新增供应商
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
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
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                采购入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                退料入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                生产入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                销售退货入库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
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
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                采购退货出库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                领料出库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                销售出库单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
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
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                库存调拨单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                库存盘点单
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                库存调拨记录
              </el-menu-item>
              <el-menu-item class="my-el-menu-item" index="/home/currentRepertorySearch">
                <el-icon>
                  <Management/>
                </el-icon>
                库存盘点记录
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
import LogoutDialog from "@/components/LogoutDialog.vue";

const circleUrlDefault = require('../assets/photo.jpg')
export default {
    name: 'HomeView',
    components: {LogoutDialog, Management, Folder, Location},
    data() {
        return {
            username: '',
            circleUrl: circleUrlDefault,
        }
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath)
        },
    },
    created() {
        this.username = this.$cookies.get('name')
    }
}
</script>
<style scoped>
#logo > img {
    margin-top: 10px;
    float: left;
}

.my-el-avatar {
    height: 6vh;
    width: 6vh;
}

.center {
    float: left;
    padding: 1vh;
}

.login-msg {
    float: left;
    width: 200px;
    color: #395b64;
    height: 8vh;
    border-radius: 10px;
    line-height: 8vh;
    font-size: 24px;
}

.logout {
    float: right;
    width: 200px;
    height: 8vh;
    border-radius: 10px;
    line-height: 8vh;
}

.el-main {
    padding: 0;
}

ul.el-menu.el-menu--vertical.el-menu-vertical-demo {
    height: 92vh;
    border: 0;
}

header.el-header {
    height: 8vh;
    background-color: #A5C9CA;
}

.el-menu {
    background-color: #395B64;
}

.el-menu-item {
    color: #d9d4d4;
}

.menu-main {
    color: #f5f6f8;
}

#container-main {
    width: 100%;
    height: 100%;
    background-color: #f5f6f8;
}
</style>
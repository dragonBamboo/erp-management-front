<template>
  <el-button class="my-btn" text @click="dialogVisible = true">
  登出
  </el-button>

  <el-dialog v-model="dialogVisible" width="30%" draggable>
    <span class="my-span">你确定要退出吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="logout">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import router from "@/router";

export default {
    data() {
        return {
            dialogVisible: false
        }
    },
    methods:{
        logout() {
            this.$cookies.remove('jwt_token')
            this.$cookies.remove('name')
            router.push('/')
        },
    }
}
</script>

<style>
.my-btn {
    font-size: 24px;
    width: 80%;
    height: 80%;
    color: #5f8092!important;
    background-color: #b8dbe9!important;
}
.my-span {
    font-size: 30px;
}
</style>

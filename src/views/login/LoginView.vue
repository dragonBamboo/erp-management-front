<template>
  <div id="app">
    <el-row :gutter="24">
      <el-col :offset="14" :span="9">
        <div class="logo">
          <img :src="logoImg" alt="logo">
        </div>
        <div class="login">
          <LoginForm/>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

const logoImg = require('@/assets/title.png')

export default {
    name: 'login',
    components: {LoginForm},
    data() {
        return {
            logoImg: logoImg
        }
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

#app {
    height: 100vh;
    background: url('@/assets/bg.jpg');
    overflow: hidden;
}

.logo {
    width: 650px;
    padding-top: 150px;
}

.login {
    width: 650px;
    margin-top: 50px;
}
</style>
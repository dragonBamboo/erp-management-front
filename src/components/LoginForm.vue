<template>
  <div id="container">
    <div id="container-main">
      <el-form :model="formLogin">
        <div style="height:30px"></div>
        <el-form-item label="用户名：">
          <el-input v-model="formLogin.username"/>
        </el-form-item>
        <el-form-item label="密&nbsp;&nbsp;&nbsp;&nbsp;码：">
          <el-input v-model="formLogin.password"/>
        </el-form-item>
        <el-form-item style="text-align: center;">
          <el-button class="btn" type="primary" @click="onLogin">登录</el-button>
          <el-button class="btn" type="primary" @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>


    <!-- 注册弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="用户注册">
      <el-form :model="formDialog">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="formDialog.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="formDialog.username" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="formDialog.password" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="确认密码" :label-width="formLabelWidth">
          <el-input v-model="formDialog.repassword" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="formDialog.phone" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="formDialog.email" autocomplete="off"/>
        </el-form-item>
      </el-form>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="registerSubmit">
          注册
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>

</template>

<script>
import router from "@/router";
import axios from "axios";
import {ElMessage} from 'element-plus'

const formLogin = {
    username: '',
    password: '',
}
const formDialog = {
    name: 'test',
    username: 'test',
    password: 'test',
    repassword: 'test',
    phone: '18834162690',
    email: 'test@qq.com',
}
const data = {
    code: '',
    message: '',
    data: '',
}

export default {
    data() {
        return {
            formLogin: formLogin,
            dialogFormVisible: false,
            formLabelWidth: '140px',
            formDialog: formDialog,
            data: data,
            checkPresence: false,
        }
    },
    methods: {
        onLogin() {
            // console.log('login!')
            // if (this.formLogin.name==='admin'&& this.formLogin.password==='111111'){
            //     router.push('/home')
            // }

            axios.post('/api/lc/login', this.formLogin)
                .then((response) => {
                    if (response.data.code === 200) {
                        console.log(response.data.data.token)
                        const token = response.data.data.token
                        // Token 有效期为 1 天
                        const expires = 60 * 60 * 24;
                        this.$cookies.set('jwt_token', token, expires);
                        router.push('/home')
                    } else {
                        ElMessage.error('用户名或密码错误，请重新输入！')
                    }
                })
        },
        onRegister() {
            console.log('register!')
            // this.formDialog = {}
            this.dialogFormVisible = true
        },
        registerSubmit(e) {
            if (this.formDialog.name == '') {
                ElMessage.warning('昵称不能为空')
                return
            }
            if (this.formDialog.username == '') {
                ElMessage.warning('用户名不能为空')
                return
            }
            if (this.formDialog.password == '') {
                ElMessage.warning('密码不能为空')
                return
            }
            if (this.formDialog.repassword == '') {
                ElMessage.warning('密码不能为空')
                return
            } else {
                if (this.formDialog.password != this.formDialog.repassword) {
                    ElMessage.warning('两次密码不一致')
                    return
                }
            }
            if (this.formDialog.phone == '') {
                ElMessage.warning('手机号不能为空')
                return
            } else {
                const regEx = /^1[3-9]\d{9}$/;
                const result = regEx.test(this.formDialog.phone)
                if (result === false) {
                    ElMessage.warning('手机号格式错误')
                    return
                }
            }
            if (this.formDialog.email == '') {
                ElMessage.warning('邮箱不能为空')
                return
            } else {
                const regEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                const result = regEx.test(this.formDialog.email)
                if (result === false) {
                    ElMessage.warning('邮箱格式不正确')
                    return
                }
            }
            axios.post('/api/lc/register', this.formDialog)
                .then((response) => {
                    if (response.data.code === 200) {
                        ElMessage.success('注册成功！');
                        this.dialogFormVisible = false
                        return
                    }
                })
        }
    }
}
</script>

<style scoped>
#container-main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 400px;
    margin: auto;
    background-color: #c4e8f6;
    border-radius: 10px;
    background: url("../assets/R.png") repeat;
}

.btn {
    margin: auto;
    width: 40%;
    color: ghostwhite;
    /*#a0cfff*/
}

.el-button {
    background-color: #79bbff;
}

/deep/ .el-form-item__label {
    color: #a0cfff;
    font-size: 18px;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
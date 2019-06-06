<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'left', borderBottom: 'unset' }"
      >
        <a-tab-pane key="tab1" tab="登录">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入账号,支持账号、手机号"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或手机号' }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
        >确定</a-button>
      </a-form-item>
    </a-form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import { login } from '@/api/system.js'

export default {
  data () {
    return {
      customActiveKey: 'tab1',
      loginBtn: false,
      form: this.$form.createForm(this)
    }
  },
  created () {

  },
  methods: {
    ...mapActions(['Login']),
    // handler
    handleSubmit (e) {
      e.preventDefault()
      const {
        Login
      } = this
      const { form: { validateFields } } = this
      validateFields((errors, values) => {
        if (!errors) {
          console.log(values)
          Login(values)
            .then((res) => this.loginSuccess())
            .catch(err => this.requestFailed())
          // Login(values)
          //   .then(res => {
          //     console.log(res)
          //     if (res.result.success){
          //       this.loginSuccess();
          //     }else {
          //       this.$notification['error']({
          //         message: '登录失败',
          //         description: res.result.message,
          //         duration: 4
          //       })
          //     }
          //   })
        }
      })

    },
    loginSuccess () {
      this.$router.push({ name: 'system' })
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: 'hi 小大先生，欢迎回来'
        })
      }, 1000)
    },
    requestFailed () {
      this.$notification['error']({
        message: '错误',
        description: '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
</style>

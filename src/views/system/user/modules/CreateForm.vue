<template>
  <a-modal
    title="新增用户"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form>
        <a-divider orientation="left">用户信息</a-divider>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="用户名"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input name="nickName" v-model="mdl.nickName" v-decorator="['nickName', {rules: [{required: true, min: 2, max: 10, message: '请输入用户名'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="登录名"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input name="username" v-model="mdl.username" v-decorator="['username', {rules: [{required: true, min: 4, max: 15, message: '请输入4-15位纯英文登录名'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="密码"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input name="password" v-model="mdl.username" v-decorator="['password', {rules: [{required: true, min: 6, max: 10, message: '请输入6-10位纯英文登录名'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="手机号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="false"
              hasFeedback
            >
              <a-input name="phone" v-model="mdl.phone" v-decorator="['phone', {rules: [{required: false, message: '请输入手机号！'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="邮箱"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="false"
              hasFeedback
            >
              <a-input name="email" v-model="mdl.email" v-decorator="['email', {rules: [{required: false, min: 5, whitespace:true, message: '请输入邮箱'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="状态"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :required="true"
            >
              <a-radio-group name="status" :defaultChecked="1" v-decorator="['status', {rules: [{required: true, message: '请选择用户状态' }]}]">
                <a-radio :value="1" v-model="mdl.status">启用</a-radio>
                <a-radio :value="0" v-model="mdl.status">禁用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">角色信息</a-divider>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="角色"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="false"
              hasFeedback
            >
              <a-select
                name="roleId"
                v-model="mdl.roleId"
                :allowClear="true"
              >
                <a-select-option v-for="item in allRoles" :key="item.id" :value="item.id" >{{ item.name }}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">

          </a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { queryAllRole, saveUser, updateUser } from '@/api/system'
export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      confirmLoading: false,
      mdl: {},
      form: null,
      roles: [],
      allRoles: null
    }
  },
  computed: {

  },
  created () {
    this.loadAllRoles()
  },
  methods: {
    loadAllRoles: function(){
      this.allRoles = queryAllRole(null)
        .then(res => {
          return res.result
        });
    },
    add: function (params) {
      console.log('params', params)
      console.log('params2', Object.assign({}, params))
      this.mdl = Object.assign({}, params)
      console.log(this.mdl)
      this.visible = true
    },
    handleSubmit: function () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          saveUser(values)
            .then(res => {
              console.log('rest', res)
              this.visible = false
              this.confirmLoading = false
              this.$emit('ok', values)
              // return res.result
            })
          // setTimeout(() => {
          //   this.visible = false
          //   this.confirmLoading = false
          //   this.$emit('ok', values)
          // }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
    }
  }
}
</script>

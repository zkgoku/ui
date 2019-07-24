<template>
  <a-modal
    title="新增用户"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
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
              <a-input v-decorator="['nickName', {rules: [{required: true, min: 2, max: 10, message: '请输入用户名'}]}]" />
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
              <a-input v-decorator="['username', {rules: [{required: true, min: 4, max: 15, message: '请输入4-15位纯英文登录名'}]}]" />
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
              <a-input type="password" v-decorator="['password', {rules: [{required: true, min: 6, max: 10, message: '请输入6-10位纯英文登录名'}]}]" />
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
              <a-input v-decorator="['phone', {rules: [{required: false, message: '请输入手机号！'}]}]" />
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
              <a-input v-decorator="['email', {rules: [{required: false, min: 5, whitespace:true, message: '请输入邮箱'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="状态"
              :labelCol="{lg: {span: 7}, sm: {span: 7}}"
              :required="true"
            >
              <a-radio-group v-decorator="['status', {initialValue: '1'}]">
                <a-radio :value="1" >启用</a-radio>
                <a-radio :value="0">禁用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">拥有角色</a-divider>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="角色"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-select :allowClear="true" v-decorator="['roleId']">
                <a-select-option v-for="item in allRoles" :key="item.id" :value="item.id">{{item.name}}</a-select-option>
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
  import { queryAllRole, saveUser, updateUser } from '@/api/system.js'
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
        allRoles: [],
        userId: null,
        form: this.$form.createForm(this)
      }
    },
    created () {
      this.loadRoles();
    },
    methods: {
      add: function () {
        this.userId = null;
        this.visible = true
      },
      edit: function (params) {
        this.mdl = Object.assign({}, params)
        setTimeout(()=>{
          this.userId = params.userId;
          this.form.setFieldsValue({
            'nickName': params.nickName,
            'username': params.username,
            'password': params.password,
            'phone': params.phone,
            'email': params.email,
            'status': params.status,
            'roleId': params.roleId
          })
        },0)
        this.visible = true
      },
      loadRoles: function(){
        setTimeout(()=>{
          queryAllRole(null)
            .then(res => {
              this.allRoles = res.result
            })
        },50)
      },
      handleSubmit: function () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            values.userId = this.userId;
            if (this.userId != null){
              updateUser(values)
                .then(res => {
                  if (res.result.success){
                    this.visible = false
                    this.confirmLoading = false
                    this.$emit('ok', values)
                    this.$notification['success']({
                      message: '提示',
                      description: res.result.message,
                      duration: 5
                    })
                  }else {
                    this.confirmLoading = false
                    this.$notification['error']({
                      message: '提示',
                      description: res.result.message,
                      duration: 5
                    })
                  }

                })
            } else {
              saveUser(values)
                .then(res => {
                  if (res.result.success){
                    this.visible = false
                    this.confirmLoading = false
                    this.$emit('ok', values)
                    this.$notification['success']({
                      message: '提示',
                      description: res.result.message,
                      duration: 5
                    })
                  }else {
                    this.confirmLoading = false
                    this.$notification['error']({
                      message: '提示',
                      description: res.result.message,
                      duration: 5
                    })
                  }

                })
            }
          }

          this.confirmLoading = false
        })
      },
      handleCancel () {
        this.visible = false
      }
    }
  }
</script>

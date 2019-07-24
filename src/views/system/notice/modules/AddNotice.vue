<template>
  <a-modal
    title="新增角色"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row>
          <a-col :span="24">
            <a-form-item
              label="角色名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input placeholder="请输入角色名称~" v-decorator="['name', {rules: [{required: true, min: 1, max: 20, message: '请输入用角色名称'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="24">
            <a-form-item
              label="备注"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-textarea placeholder="请输入备注~" v-decorator="['remark', {rules: [{required: false, min: 1, max: 50, message: '最大50个字符串'}]}]" :rows="4"/>
            </a-form-item>
          </a-col>
        </a-row>

      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
  import { addRole } from '@/api/roleApi.js'
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
        form: this.$form.createForm(this)
      }
    },
    created () {

    },
    methods: {
      add: function () {
        this.id = null;
        this.visible = true
      },
      handleSubmit: function () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            addRole(values)
              .then(res => {
                if (res.code === 1){
                  this.visible = false
                  this.confirmLoading = false
                  this.$emit('ok', values)
                  this.$notification['success']({
                    message: '提示',
                    description: res.message,
                    duration: 5
                  })
                }else {
                  this.confirmLoading = false
                  this.$notification['error']({
                    message: '提示',
                    description: res.message,
                    duration: 5
                  })
                }

              })
          }
        })
      },
      handleCancel () {
        this.visible = false
      }
    }
  }
</script>

<template>
  <a-modal
    title="编辑角色"
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
  import { saveRole, updateRole } from '@/api/system.js'
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
        id: null,
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
      edit: function (params) {
        this.mdl = Object.assign({}, params)
        setTimeout(()=>{
          this.id = params.id;
          this.form.setFieldsValue({
            'name': params.name,
            'remark': params.remark
          })
        },0)
        this.visible = true
      },
      handleSubmit: function () {
        const { form: { validateFields } } = this
        this.confirmLoading = true
        validateFields((errors, values) => {
          if (!errors) {
            values.id = this.id;
            if (this.id != null){
              updateRole(values)
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
              saveRole(values)
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
        })
      },
      handleCancel () {
        this.visible = false
      }
    }
  }
</script>

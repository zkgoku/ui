<template>
  <a-modal
    title="新增菜单"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!--<a-divider orientation="left">菜单信息</a-divider>-->
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input placeholder="请输入名称~" v-decorator="['title', {rules: [{required: true, min: 2, max: 15, message: '请输入长度2-15的菜单名称'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="标识"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input placeholder="请输入标识~" v-decorator="['code', {rules: [{required: true, min: 2, max: 15, message: '请输入长度2-15的纯英文唯一标识'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="地址"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
              hasFeedback
            >
              <a-input placeholder="请输入地址~" v-decorator="['path', {rules: [{required: false, min: 2, max: 100, message: '请输入长度2-100的地址'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="icon"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="false"
              hasFeedback
            >
              <a-input v-decorator="['icon', {rules: [{required: false}]}]" />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-item
              label="排序"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              hasFeedback
              :required="true"
              help="从小到大排序"
            >
              <a-input placeholder="请输入排序值~" type="number" v-decorator="['rank', {rules: [{required: true, message: '请输入排序值'}], initialValue: '1'}]" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="类型"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
            >
              <a-radio-group v-decorator="['type', {initialValue: '1'}]">
                <a-radio value="1">菜单</a-radio>
                <a-radio value="2">页面</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item
              label="组件"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
            >
              <a-select v-decorator="['component', {initialValue: 'PageView'}]" style="width: 163px;">
                <a-select-option value="PageView">PageView</a-select-option>
                <a-select-option value="RouteView">RouteView</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              label="状态"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
              :required="true"
            >
              <a-radio-group v-decorator="['status', {initialValue: '1'}]">
                <a-radio value="1">启用</a-radio>
                <a-radio value="0">禁用</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
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
  import { saveMenu, updateMenu } from '@/api/system.js'
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
      add: function (params) {
        if (params != null){
          this.mdl = Object.assign({}, params)
        }else {
          this.mdl.level = 0
          this.mdl.id = 0
        }
        this.id = null;
        this.visible = true
      },
      edit: function (params) {
        console.log(params)
        this.mdl = Object.assign({}, params)
        setTimeout(()=>{
          this.id = params.id;
          this.form.setFieldsValue({
            'title': params.title,
            'code': params.code,
            'path': params.path,
            'icon': params.icon,
            'type': params.type+"",
            'component': params.component,
            'status': params.status+"",
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
              updateMenu(values)
                .then(res => {
                  if (res.result.success){
                    this.visible = false
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

              values.parentId = this.mdl.id
              values.level = this.mdl.level+1
              saveMenu(values)
                .then(res => {
                  if (res.result.success){
                    this.visible = false
                    this.$emit('ok', values)
                    this.$notification['success']({
                      message: '提示',
                      description: res.result.message,
                      duration: 5
                    })
                  }else {
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

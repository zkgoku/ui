<template>
  <a-modal
    title="授权管理"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-tree
        checkable
        :treeData="tree"
        :defaultExpandAll="true"
        :autoExpandParent="true"
        :checkStrictly="true"
        @check="this.onCheck"
        :selectedKeys="selectedKeys"
        :defaultCheckedKeys="defaultCheckedKeys"
      >
      </a-tree>
    </a-spin>
  </a-modal>
</template>

<script>
  import { queryAllMenu, roleAuth, roleAuths } from '@/api/system.js'

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
        tree: [],
        selectedKeys: [],
        defaultCheckedKeys: []
      }
    },
    created () {
        this.loadTree();
    },
    methods: {
      edit: function (params) {
        this.mdl = Object.assign({}, params)
        this.loadRoleData()
        this.visible = true
      },
      loadTree: function(){
        queryAllMenu()
          .then(res => {
            this.tree = res.result.data
          })
      },
      loadRoleData: function(){
        let params = {};
        params.roleId = this.mdl.id;
        roleAuths(params)
          .then(res => {
            let data = res.result.data
            for ( let i = 0; i < data.length; i++){
              this.$set(this.defaultCheckedKeys, i, data[i])
              this.$set(this.selectedKeys, i, data[i])
            }
          })
      },
      onCheck (checkedKeys, info) {
        this.selectedKeys = checkedKeys.checked
      },
      handleSubmit: function () {
        let params = {};
        params.roleId = this.mdl.id;
        params.menus = this.selectedKeys.join(',');
        roleAuth(params)
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
      },
      handleCancel () {
        this.visible = false
        this.defaultCheckedKeys = []
        this.selectedKeys = []
      }
    }
  }
</script>

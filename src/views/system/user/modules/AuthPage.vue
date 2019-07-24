<template>
  <a-modal
    title="授权管理"
    style="top: 20px;"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    :maskClosable="false"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <div style="height: 400px;overflow-y: auto">
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
    </div>
  </a-modal>
</template>

<script>
  import { roleMenu, authRole } from '@/api/roleApi.js'
  import { treeMenu } from '@/api/menuApi.js'

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

    },
    methods: {
      edit: function (params) {
        this.mdl = Object.assign({}, params)
        this.loadTree();
        this.loadRoleData()
        this.visible = true
      },
      loadTree: function(){
        treeMenu()
          .then(res => {
            this.tree = res.result
          })
      },
      loadRoleData: function(){
        let params = {};
        params.id = this.mdl.id;
        roleMenu(params)
          .then(res => {
            let data = res.result
            for ( let i = 0; i < data.length; i++){
              console.log(data[i])
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
        params.id = this.mdl.id;
        params.menuIds = this.selectedKeys.join(',');
        authRole(params)
          .then(res => {
            if (res.code === 1){
              this.visible = false
              this.$notification['success']({
                message: '提示',
                description: res.message,
                duration: 5
              })
            }else {
              this.$notification['error']({
                message: '提示',
                description: res.message,
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

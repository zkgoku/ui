<template>
  <a-modal
    title="授权管理"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-tree
        checkable
        :treeData="tree"
        :defaultExpandAll="true"
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
  import { queryAllMenu, roleAuths, roleAuth } from '@/api/system.js'

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
        this.visible = true
        this.loadTree();
      },
      loadTree: function(){
        setTimeout(()=>{
          queryAllMenu(null)
            .then(res => {
              this.tree = res.result
            })
        },50)
        setTimeout(()=>{
          let params = {};
          params.roleId = this.mdl.id
          roleAuths(params)
            .then(res => {
              this.defaultCheckedKeys = res.result.data
              this.selectedKeys = res.result.data
            })
        },50)
      },
      onCheck (checkedKeys, info) {
        this.selectedKeys = checkedKeys.checked
      },
      handleSubmit: function () {
        console.log(this.mdl);
        console.log(this.selectedKeys);
      },
      handleCancel () {
        this.visible = false
      }
    }
  }
</script>

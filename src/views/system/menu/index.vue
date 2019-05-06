<template>
  <a-card :bordered="false">
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click="$refs.createModal.add()">新建菜单</a-button>
    </div>

    <s-table
      ref="table"
      rowKey="id"
      :columns="columns"
      :data="loadData"
      :defaultExpandAllRows=true
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="type" slot-scope="text">
        <a-tag>{{text|typeFilter}} </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.createModal.edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="$refs.createModal.add(record)" v-if="record.level == 1">添加菜单/页面</a>
          <a-divider type="vertical" v-if="record.level == 1"/>
           <a @click="$refs.createModal.add(record)" v-if="record.level == 2">添加页面</a>
          <a-divider type="vertical" v-if="record.level == 2"/>
           <a @click="$refs.createModal.edit(record)" v-if="record.level == 3">授权</a>
          <a-divider type="vertical" v-if="record.level == 3"/>
          <a-popconfirm title="你确定要删除吗?" @confirm="handDel" okText="确定" cancelText="再想想~">
            <a href="#">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
  import { STable } from '@/components'
  import CreateForm from './modules/CreateForm'
  import { queryMenuPage } from '@/api/system.js'

  const statusMap = {
    0: {
      status: 'error',
      text: '禁用'
    },
    1: {
      status: 'success',
      text: '启用'
    }
  }

  const typeMap = {
    1: {
      text: '菜单'
    },
    2: {
      text: '页面'
    },
    3: {
      text: 'H5'
    }
  }
  export default {
    name: 'TableList',
    components: {
      STable,
      CreateForm
    },
    data () {
      return {
        mdl: {},
        // 高级搜索 展开/关闭
        advanced: false,
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '名称',
            dataIndex: 'title'
          },
          {
            title: '图标',
            dataIndex: 'icon'
          },
          {
            title: '地址',
            dataIndex: 'path'
          },
          {
            title: '类型',
            dataIndex: 'type',
            scopedSlots: { customRender: 'type' }
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return queryMenuPage(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.result
            })
        }
      }
    },
    filters: {
      statusFilter (type) {
        return statusMap[type].text
      },
      statusTypeFilter (type) {
        return statusMap[type].status
      },
      typeFilter (type) {
        return typeMap[type].text
      }
    },
    created () {

    },
    methods: {
      handleEdit (record) {
        this.$refs.modal.edit(record)
      },
      handDel (record){
        this.$message.success('Click on Yes')
      },
      handleOk () {
        this.$refs.table.refresh()
      }
    }
  }
</script>

<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色名">
              <a-input v-model="queryParam.name" placeholder="支持模糊查找"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <div class="table-operator">
      <a-button type="primary" @click="$refs.createModal.add(null)" icon="plus" >新建角色</a-button>
    </div>

    <s-table
      ref="table"
      size="default"
      rowKey="id"
      :columns="columns"
      :data="loadData"
    >
      <span slot="action" slot-scope="text, record">
        <template>
          <a @click="$refs.createModal.edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a-popconfirm title="你确定要删除吗?" @confirm="handDel" okText="确定" cancelText="再想想~">
            <a href="#">删除</a>
          </a-popconfirm>
          <a-divider type="vertical" />
          <a @click="$refs.createModal.edit(record)">授权</a>
        </template>
      </span>
    </s-table>
    <create-form ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
  import { STable } from '@/components'
  import CreateForm from './modules/CreateForm'
  import { queryRolePage } from '@/api/system.js'

  export default {
    name: 'TableList',
    components: {
      STable,
      CreateForm
    },
    data () {
      return {
        mdl: {},
        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '角色名称',
            dataIndex: 'name'
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
          return queryRolePage(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.result
            })
        }
      }
    },
    created () {

    },
    methods: {
      handleEdit (record) {
        // this.$refs.modal.edit(record)
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

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
      <a-button type="primary" @click="$refs.addModal.add()" icon="plus" >新建角色</a-button>
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
          <a @click="$refs.editModal.edit(record)">编辑</a>
          <a-divider type="vertical" />
          <a @click="$refs.authModal.edit(record)">授权</a>
          <a-divider type="vertical" />
          <a-popconfirm title="你确定要删除吗?" @confirm="handDel(record)" okText="确定" cancelText="再想想~">
            <a href="#">删除</a>
          </a-popconfirm>
        </template>
      </span>
    </s-table>

    <add-role ref="addModal" @ok="handleOk" />
    <edit-role ref="editModal" @ok="handleOk" />
    <auth-page ref="authModal" @ok="handleOk" />

  </a-card>
</template>

<script>
  import { STable } from '@/components'
  import AddRole from './modules/AddRole'
  import EditRole from './modules/EditRole'
  import AuthPage from './modules/AuthPage'
  import { pageRole, operRole } from '@/api/roleApi.js'

  export default {
    name: 'TableList',
    components: {
      STable,
      AuthPage,
      AddRole,
      EditRole
    },
    data () {
      return {
        mdl: {},
        // 查询参数
        queryParam: {},
        // 数据
        data: [],
        loading: false,
        // 分页
        pagination: {},
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
        loadData: parameter => {
          return pageRole(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.result
            })
        }
      }
    },
    created () {

    },
    methods: {
      handDel (record){
        operRole({roleId: record.id})
          .then(res => {
            this.$refs.table.refresh()
            this.$notification['success']({
              message: '提示',
              description: res.message,
              duration: 5
            })
          })
      },
      handleOk () {
        this.$refs.table.refresh()
      }
    }
  }
</script>

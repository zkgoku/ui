<template>
  <a-modal
    title="权限管理"
    :width="650"
    :visible="visible"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
    @ok="handleCancel"
    @cancel="handleCancel"
  >
      <a-table
        :columns="columns"
        :dataSource="data"
        :pagination="false"
        :loading="memberLoading"
      >
        <template v-for="(col, i) in ['name', 'code', 'remark']" :slot="col" slot-scope="text, record">
          <a-input
            :key="col"
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>{{ text }}</template>
        </template>
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.editable">
            <span v-if="record.isNew">
              <a @click="saveRow(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="saveRow(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.key)">取消</a>
            </span>
          </template>
          <span v-else>
            <a @click="toggle(record.key)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>
      <a-button style="width: 100%; margin-top: 16px; margin-bottom: 8px" type="dashed" icon="plus" @click="newMember">新增权限</a-button>
  </a-modal>
</template>

<script>
  import { queryAllMenuAction, saveMenuAction, updateMenuAction, deleteMenuAction } from '@/api/system.js'
  export default {
    data () {
      return {
        visible: false,
        confirmLoading: false,
        memberLoading: false,
        mdl: {},
        columns: [
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            scopedSlots: { customRender: 'name' }
          },
          {
            title: '唯一码',
            dataIndex: 'code',
            key: 'code',
            width: '20%',
            scopedSlots: { customRender: 'code' }
          },
          {
            title: '备注',
            dataIndex: 'remark',
            key: 'remark',
            width: '40%',
            scopedSlots: { customRender: 'remark' }
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        data: [],
      }
    },
    created () {

    },
    methods: {
      remove (key) {
        const newData = this.data.filter(item => item.key !== key)
        this.data = newData
        deleteMenuAction({actionId:key})
          .then(res => {

          })
      },
      saveRow (record) {
        this.memberLoading = true
        const {key, id, name, code, remark } = record
        if (!name || !code ) {
          this.memberLoading = false
          this.$message.error('请填写完整成员信息。')
          return
        }
        record.menuId = this.mdl.id
        if (id != null){
          updateMenuAction(record)
            .then(res => {
              const target = this.data.filter(item => item.key === key)[0]
              target.editable = false
              target.isNew = false
              this.memberLoading = false
            })
        } else {
          saveMenuAction(record)
            .then(res => {
              const target = this.data.filter(item => item.key === key)[0]
              target.editable = false
              target.isNew = false
              this.memberLoading = false
            })
        }
      },
      toggle (key) {
        const target = this.data.filter(item => item.key === key)[0]
        console.log(target)
        target.editable = !target.editable
      },
      getRowByKey (key, newData) {
        const data = this.data
        return (newData || data).filter(item => item.key === key)[0]
      },
      cancel (key) {
        const target = this.data.filter(item => item.key === key)[0]
        target.editable = false
      },
      handleChange (value, key, column) {
        const newData = [...this.data]
        const target = newData.filter(item => key === item.key)[0]
        if (target) {
          target[column] = value
          this.data = newData
        }
      },
      edit: function (params) {
        this.mdl = Object.assign({}, params)
        let queryParams = {menuId: this.mdl.id}
        queryAllMenuAction(queryParams)
          .then(res =>{
            this.data = res.result;
          })
        this.visible = true
      },
      newMember () {
        const length = this.data.length
        this.data.push({
          key: length === 0 ? '1' : (parseInt(this.data[length - 1].key) + 1).toString(),
          name: '',
          code: '',
          remark: '',
          editable: true,
          isNew: true
        })
      },
      handleCancel () {
        this.visible = false
      }
    }
  }
</script>

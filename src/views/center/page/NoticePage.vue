<template>
  <a-list
    size="large"
    rowKey="id"
    :loading="loading"
    itemLayout="vertical"
    :dataSource="data"
  >
    <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
      <template slot="actions">
        <icon-text type="star-o" :text="10" />
        <icon-text type="like-o" :text="20" />
        <icon-text type="message" :text="30" />
      </template>
      <a-list-item-meta>
        <a slot="title" href="https://vue.ant.design/">{{ item.title }}</a>
        <template slot="description">
          <span>
            <a-tag>通知</a-tag>
          </span>
        </template>
      </a-list-item-meta>
      <article-list-content :description="item.title" :owner="item.nickName" :avatar="item.avatar" :updateAt="item.createTime" />
    </a-list-item>
    <div slot="footer" v-if="data.length > 0" style="text-align: center; margin-top: 16px;">
      <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
    </div>
  </a-list>
</template>

<script>
import { ArticleListContent } from '@/components'
import IconText from '@/views/list/search/components/IconText'
import { pageNotice} from '@/api/noticeApi.js'

export default {
  name: 'Notice',
  components: {
    IconText,
    ArticleListContent
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      data: [],
      pageNo: 1,
      pageSize: 10,
    }
  },
  mounted () {
    this.loadList()
  },
  methods: {
    loadList () {
      const params = {};
      params.pageNo = this.pageNo
      params.pageSize = this.pageSize
      pageNotice(params)
        .then(res => {
         this.data = this.data.concat(res.result.list)
        })
    },
    loadMore () {
      this.loadingMore = true
      this.$http.get('/list/article').then(res => {
        this.data = this.data.concat(res.result)
      }).finally(() => {
        this.loadingMore = false
      })
    }
  }
}
</script>

<style scoped>

</style>

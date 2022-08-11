<template>
  <Row :gutter="16">
    <Col
      v-for="item in data"
      :key="item.title"
      :span="6"
    >
      <Card :title="item.title">
        <template #extra>
          <div class="border border-green-200 w-20px text-center">月</div>
        </template>
        <p>{{ item.num }}</p>
        <div class="flex align-center justify-between">
          <span>总数：</span>
          <span>{{ item.all }}</span>
        </div>
      </Card>
    </Col>
  </Row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Card, Row, Col } from 'ant-design-vue'

export default defineComponent({
  name: 'DashboardBlock',
  components: {
    Card,
    Row,
    Col
  },
  setup() {
    const data = [
      { title: '访问数', num: 2000, all: 15000 },
      { title: '充值数', num: 2000, all: 15000 },
      { title: '注册数', num: 2000, all: 15000 },
      { title: '成交数', num: 2000, all: 15000 },
    ]

    return {
      data
    }
  }
})
</script>

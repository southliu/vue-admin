<template>
  <Row :gutter="16">
    <Col
      v-for="item in data"
      :key="item.title"
      :span="6"
    >
      <div 
        class="
          border
          border-gray-200
          px-30px
          py-20px
          box-border
          rounded-10px
        "
      >
        <div className='text-20px font-bold'>{{ item.title }}</div>
        <div className='flex items-center justify-between text-35px mb-15px'>
          <Count className='font-bold' :start="0" :end="item.num" />
          <Icon :icon="item.icon" />
        </div>
        <div className="flex align-center justify-between">
          <span>总数：</span>
          <Count :start="0" :end="item.all" />
        </div>
      </div>
    </Col>
  </Row>
</template>

<script lang="ts" setup>
import { Row, Col } from 'ant-design-vue'
import Count from '@/components/Count/index.vue'
import Icon from '@/components/Icon/index.vue'

const data = [
  { title: '用户数', num: 14966, all: 16236, icon: 'icon-park:peoples' },
  { title: '充值数', num: 4286, all: 6142, icon: 'icon-park:paper-money' },
  { title: '订单数', num: 5649, all: 5232, icon: 'icon-park:transaction-order' },
  { title: '游戏数', num: 619, all: 2132, icon: 'icon-park:game-handle' },
]
</script>

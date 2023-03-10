<script lang="ts">
import { defineComponent, ref, h, watch } from 'vue'
import { renderHTML } from '@iconify/iconify'
import Icon from '@ant-design/icons-vue'

/**
 * 图标组件
 */
export default defineComponent({
  name: 'IconBtn',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // 初始化渲染
    const initData = `<i class="iconify" data-icon="${props.icon}" />`
    const data = ref(initData)

    watch(() => props.icon, value => {
      data.value = renderHTML(value) || ''
    })

    return () => h(
      Icon, null,
      {
        component: () => (
          h('span', { innerHTML: data.value })
        )
      }
    )
  }
})
</script>

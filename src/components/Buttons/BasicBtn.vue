<script lang="ts">
import { defineComponent, h } from 'vue'
import { Button } from 'ant-design-vue'
import { useLoadingStore } from '@/stores/loading'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'UpdateBtn',
  emits: ['click'],
  components: {
    Button
  },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  setup(props, context) {
    const { content } = props
    const loadingStore = useLoadingStore()
    const { globalLoading } = storeToRefs(loadingStore)

    /** 点击编辑 */
    const onClick = () => {
      context.emit('click')
    }

    return () => (
      h(
        Button, {
          type: "primary",
          loading: globalLoading.value,
          innerHTML: content as string,
          onClick,
        }
      )
    )
  },
})
</script>

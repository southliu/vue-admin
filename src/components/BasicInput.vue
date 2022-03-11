<script lang="tsx">
import { defineComponent } from 'vue'
import { Input } from 'ant-design-vue'
import type { PropType } from 'vue'
import type { IComponentProps } from '@/types/form'

export default defineComponent({
  extends: Input,
  props: {
    componentProps: {
      type: Object as PropType<IComponentProps>,
      required: true
    }
  },
  components: {
    Input
  },
  setup(props) {
    return <Input {...props.componentProps} />
  }
})
</script>
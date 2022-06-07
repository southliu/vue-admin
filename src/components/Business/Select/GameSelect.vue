<script lang="ts">
import type { SelectValue, TreeSelectProps } from 'ant-design-vue/lib/tree-select'
import type { IComponentProps } from '@/types/form'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { getGames } from "@/servers/platform/game"
import ApiTreeSelect from '@/components/Select/ApiTreeSelect.vue'

export default defineComponent({
  name: 'GameSelect',
  props: {
    componentProps: {
      type: Object as PropType<IComponentProps>,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object],
      required: false
    }
  },
  setup(props, context) {
    const { emit } = context
    const { value, componentProps } = props
    
    return () => (
      h(
        ApiTreeSelect,
        {
          allowClear: true,
          maxTagCount: "responsive",
          treeNodeFilterProp: 'label',
          showSearch: true,
          placeholder: '请选择',
          componentProps: {
            ...componentProps as TreeSelectProps,
            multiple: true,
            api: getGames
          },
          value: value as SelectValue,
          'onUpdate:value': (value: SelectValue) => emit('update:value', value)
        }
      )
    )
  },
})
</script>

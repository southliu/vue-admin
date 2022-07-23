<script lang="ts">
/**
 * @description: 游戏下拉组件
 */
import type { SelectValue, TreeSelectProps } from 'ant-design-vue/lib/tree-select'
import type { IComponentProps } from '@/types/form'
import type { IBusinessEmit } from '../index'
import type { IAllDataType } from '@/types/public'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { getGames } from '@/servers/platform/game'
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue'

export default defineComponent({
  name: 'GameSelect',
  props: {
    componentProps: {
      type: Object as PropType<IComponentProps>,
      required: false
    },
    value: {
      type: Object as PropType<IAllDataType>,
      required: false
    },
    handleEmit: {
      type: Function as PropType<IBusinessEmit>,
      required: false
    }
  },
  setup(props, context) {
    return () => (
      h(ApiTreeSelect, {
        componentProps: {
          ...props.componentProps as TreeSelectProps,
          multiple: true,
          api: getGames,
          value: props.value as SelectValue,
          'onUpdate:value': (value: SelectValue) => {
            props.handleEmit?.(value)
          }
        }
      })
    )
  },
})
</script>

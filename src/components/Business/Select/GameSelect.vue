<script lang="ts">
/**
 * @description: 游戏下拉组件
 */
import type { SelectValue, TreeSelectProps } from 'ant-design-vue/lib/tree-select'
import type { IComponentProps } from '@/types/form'
import type { IBasicData } from '@/types/public'
import type { IBusinessEmit } from '../index'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { getGames } from "@/servers/platform/game"
import ApiTreeSelect from '@/components/Select/ApiTreeSelect.vue'

export default defineComponent({
  name: 'GameSelect',
  props: {
    componentProps: {
      type: Object as PropType<IComponentProps>,
      required: false
    },
    value: {
      type: [String, Number, Boolean, Object] as PropType<IBasicData>,
      required: false
    },
    handleEmit: {
      type: Function as PropType<IBusinessEmit>,
      required: false
    }
  },
  setup(props, context) {
    const { value, componentProps, handleEmit } = props
    
    return () => (
      h(
        ApiTreeSelect,
        {
          componentProps: {
            ...componentProps as TreeSelectProps,
            multiple: true,
            api: getGames
          },
          value: value as SelectValue,
          'onUpdate:value': (value: SelectValue) => handleEmit && handleEmit(value)
        }
      )
    )
  },
})
</script>

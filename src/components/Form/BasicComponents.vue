<script lang="ts">
import type { IFormList } from '#/form'
import type { IAllDataType } from '#/public'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { componentMap } from './utils/componentMap'
import { createPlaceholder, getComponentProps } from './utils/helper'

export default defineComponent({
  name: 'BasicComponents',
  props: {
    item: {
      type: Object as PropType<IFormList>,
      required: true
    },
    data: {
      type: Object as PropType<Record<string, IAllDataType>>,
      required: true
    },
    setData: {
      type: Function as PropType<(key: string, value: IAllDataType) => void>,
      required: true
    }
  },
  setup(props) {
    // 组件
    const Comp = componentMap.get(props.item.component) as ReturnType<typeof defineComponent>

    // 占位符
    const placeholder = props.item.placeholder || createPlaceholder(props.item.component)

    // 渲染组件
    return () => h(Comp, {
      className: 'min-w-70px',
      placeholder,
      allowClear: true,
      ...getComponentProps(
        props.item,
        props.data,
        props.setData
      ),
      ...props.item.componentProps
    })
  }
})
</script>

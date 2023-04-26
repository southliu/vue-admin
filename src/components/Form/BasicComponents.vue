<script lang="ts">
import type { FormList } from '#/form'
import type { AllDataType } from '#/public'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { componentMap } from './utils/componentMap'
import { createPlaceholder, getComponentProps } from './utils/helper'

export default defineComponent({
  name: 'BasicComponents',
  props: {
    item: {
      type: Object as PropType<FormList>,
      required: true
    },
    data: {
      type: Object as PropType<Record<string, AllDataType>>,
      required: true
    },
    setData: {
      type: Function as PropType<(key: string | string[], value: AllDataType) => void>,
      required: true
    }
  },
  setup(props) {
    let Comp: ReturnType<typeof defineComponent>

    // 组件
    if (props.item.component === 'customize') {
      Comp = props.item.render
    } else {
      Comp = componentMap.get(props.item.component)
    }

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
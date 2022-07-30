<script lang="ts">
/**
 * @description: 合作公司下拉组件
 */
import type { SelectProps } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/lib/select'
import type { IComponentProps } from '#/form'
import type { IBusinessEmit } from '../index'
import type { IAllDataType } from '#/public'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { getPartner } from '@/servers/platform/partner'
import ApiSelect from '@/components/Selects/ApiSelect.vue'

export default defineComponent({
  name: "PartnerSelect",
  props: {
    componentProps: {
      type: Object as PropType<IComponentProps>,
      required: false,
    },
    value: {
      type: Object as PropType<IAllDataType>,
      required: false,
    },
    handleEmit: {
      type: Function as PropType<IBusinessEmit>,
      required: false,
    },
  },
  setup(props, context) {
    return () =>
      h(ApiSelect, {
        componentProps: {
          ...(props.componentProps as SelectProps),
          mode: 'multiple',
          api: getPartner,
          value: props.value as SelectValue,
          'onUpdate:value': (value: SelectValue) => {
            props.handleEmit?.(value)
          },
        },
      })
  },
})
</script>

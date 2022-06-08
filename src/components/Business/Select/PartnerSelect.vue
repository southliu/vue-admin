<script lang="ts">
/**
 * @description: 合作公司下拉组件
 */
import type { SelectProps } from 'ant-design-vue'
import type { SelectValue } from 'ant-design-vue/lib/tree-select'
import type { IComponentProps } from '@/types/form'
import type { IBasicData } from '@/types/public'
import type { IBusinessEmit } from '../index'
import type { PropType } from 'vue'
import { defineComponent, h } from 'vue'
import { getPartner } from '@/servers/platform/partner'
import ApiSelect from '@/components/Select/ApiSelect.vue'

export default defineComponent({
  name: 'PartnerSelect',
  props: {
    componentProps: {
      type: Object as PropType<IComponentProps>,
      required: true
    },
    value: {
      type: [String, Number, Boolean, Object] as PropType<IBasicData>,
      required: false
    },
    handleEmit: {
      type: Object as PropType<IBusinessEmit>,
      required: true
    }
  },
  setup(props, context) {
    const { value, componentProps, handleEmit } = props
    
    return () => (
      h(
        ApiSelect,
        {
          componentProps: {
            ...componentProps as SelectProps,
            mode: 'multiple',
            api: getPartner
          },
          value: value as SelectValue,
          'onUpdate:value': (value: SelectValue) => handleEmit(value)
        }
      )
    )
  },
})
</script>

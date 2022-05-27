<script lang="ts">
import type { PropType } from 'vue'
import type { SelectProps } from 'ant-design-vue'
import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { IApiSelectProps } from '@/types/form'
import { defineComponent, ref, h } from 'vue'
import { Select } from 'ant-design-vue'

export default defineComponent({
  name: 'ApiSelect',
  props: {
    componentProps: {
      type: Object as PropType<SelectProps & IApiSelectProps>,
      required: true
    },
    allowClear: {
      type: Boolean,
      required: false
    },
    maxTagCount: {
      type: [String, Number] as PropType<number | "responsive">,
      required: false
    },
    placeholder: {
      type: String,
      required: false,
      defaultValue: '请选择'
    },
  },
  components: {
    Select
  },
  setup(props) {
    const {
      componentProps,
      allowClear,
      maxTagCount,
      placeholder,
    } = props
    const { api } = componentProps
    
    const options = ref<DefaultOptionType[]>([])

    return () => h(
      Select, {
        allowClear,
        maxTagCount,
        placeholder,
        options: options.value,
        ...componentProps,
        onDropdownVisibleChange: async (open: boolean) => {
          componentProps.onDropdownVisibleChange && componentProps.onDropdownVisibleChange(open)
          if (open && api) {
            api().then(data => {
              options.value = data
            })
          }
        },
      }
    )
  }
})
</script>

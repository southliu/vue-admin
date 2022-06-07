<script lang="ts">
import type { PropType } from 'vue'
import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { IApiSelectProps } from '@/types/form'
import { defineComponent, ref, h } from 'vue'
import { Select } from 'ant-design-vue'
import BasicLoading from '../Loading/BasicLoading.vue'

export default defineComponent({
  name: 'ApiSelect',
  props: {
    componentProps: {
      type: Object as PropType<IApiSelectProps>,
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
    Select,
    BasicLoading
  },
  setup(props) {
    const {
      componentProps,
      allowClear,
      maxTagCount,
      placeholder,
    } = props
    const { api, params } = componentProps
    
    const options = ref<DefaultOptionType[]>([])
    const loading = ref(false)

    return () => h(
      Select, {
        allowClear,
        maxTagCount,
        placeholder,
        ...componentProps,
        options: options.value,
        notFoundContent: loading && h(BasicLoading),
        onDropdownVisibleChange: async (open: boolean) => {
          componentProps.onDropdownVisibleChange && componentProps.onDropdownVisibleChange(open)
          if (open && api) {
            loading.value = true
            api(params).then(data => {
              options.value = data
              loading.value = false
            }).catch(() => {
              loading.value = false
            })
          }
        },
      }
    )
  }
})
</script>

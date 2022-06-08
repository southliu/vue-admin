<script lang="ts">
import type { PropType } from 'vue'
import type { DefaultOptionType } from 'ant-design-vue/lib/select'
import type { IApiSelectProps } from '@/types/form'
import { defineComponent, ref, h } from 'vue'
import { Select } from 'ant-design-vue'
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config'
import BasicLoading from '../Loading/BasicLoading.vue'

export default defineComponent({
  name: 'ApiSelect',
  props: {
    componentProps: {
      type: Object as PropType<IApiSelectProps>,
      required: true
    }
  },
  components: {
    Select,
    BasicLoading
  },
  setup(props) {
    const { componentProps } = props
    const { api, params } = componentProps
    
    const options = ref<DefaultOptionType[]>([])
    const loading = ref(false)

    return () => h(
      Select, {
        allowClear: true,
        maxTagCount: MAX_TAG_COUNT,
        placeholder: PLEASE_SELECT,
        optionFilterProp: "label",
        ...componentProps,
        options: options.value,
        notFoundContent: loading && h(BasicLoading),
        onDropdownVisibleChange: async (open: boolean) => {
          componentProps.onDropdownVisibleChange && componentProps.onDropdownVisibleChange(open)
          if (open && api) {
            loading.value = true
            api(params).then(data => {
              options.value = data
            }).finally(() => {
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

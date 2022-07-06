<script lang="ts">
/**
 * @description: 根据API获取数据下拉组件
 */
import type { PropType } from 'vue'
import type { DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select'
import type { IApiSelectProps } from '@/types/form'
import { defineComponent, onMounted, ref, h } from 'vue'
import { Select } from 'ant-design-vue'
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config'
import BasicLoading from '../Loading/BasicLoading.vue'

export default defineComponent({
  name: 'ApiSelect',
  props: {
    value: {
      type: [String, Array] as PropType<SelectValue>,
      required: false
    },
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
    const { value, componentProps } = props
    const { api, params } = componentProps
    
    const options = ref<DefaultOptionType[]>([])
    const loading = ref(false)

    onMounted(() => {
      if (value && options.value.length === 0) {
        getApiData()
      }
    })

    /** 获取接口数据 */
    const getApiData = () => {
      loading.value = true
      api?.(params).then(data => {
        options.value = data
      }).finally(() => {
        loading.value = false
      }).catch(() => {
        loading.value = false
      })
    }

    return () => h(
      Select, {
        allowClear: true,
        maxTagCount: MAX_TAG_COUNT,
        placeholder: PLEASE_SELECT,
        optionFilterProp: "label",
        value: value as SelectValue,
        ...componentProps,
        options: options.value,
        notFoundContent: loading && h(BasicLoading),
        onDropdownVisibleChange: async (open: boolean) => {
          componentProps.onDropdownVisibleChange?.(open)
          if (open && api) {
            getApiData()
          }
        },
      }
    )
  }
})
</script>

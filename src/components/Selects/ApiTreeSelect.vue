<script lang="ts">
/**
 * @description: 根据API获取数据树形下拉组件
 */
import type { PropType } from 'vue'
import type { IApiTreeSelectProps } from '@/types/form'
import type { TreeSelectProps } from 'ant-design-vue'
import { defineComponent, onMounted, ref, h } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config'
import BasicLoading from '../Loading/BasicLoading.vue'
import { SelectValue } from 'ant-design-vue/lib/select'

export default defineComponent({
  name: 'ApiSelect',
  props: {
    value: {
      type: [String, Array] as PropType<SelectValue>,
      required: false
    },
    componentProps: {
      type: Object as PropType<IApiTreeSelectProps>,
      required: true
    },
  },
  components: {
    TreeSelect,
    BasicLoading
  },
  setup(props) {
    const { value, componentProps } = props
    const { api, params } = componentProps
    
    const options = ref<TreeSelectProps['treeData']>([])
    const loading = ref(false)

    onMounted(() => {
      if (value && options.value?.length === 0) {
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
      TreeSelect, {
        allowClear: true,
        maxTagCount: MAX_TAG_COUNT,
        placeholder: PLEASE_SELECT,
        treeNodeFilterProp: 'label',
        showSearch: true,
        value: value as SelectValue,
        ...componentProps,
        treeData: options.value,
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

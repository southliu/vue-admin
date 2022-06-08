<script lang="ts">
import type { PropType } from 'vue'
import type { IApiTreeSelectProps } from '@/types/form'
import type { TreeSelectProps } from 'ant-design-vue'
import { defineComponent, ref, h } from 'vue'
import { TreeSelect } from 'ant-design-vue'
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config'
import BasicLoading from '../Loading/BasicLoading.vue'

export default defineComponent({
  name: 'ApiSelect',
  props: {
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
    const { componentProps } = props
    const { api, params } = componentProps
    
    const options = ref<TreeSelectProps['treeData']>([])
    const loading = ref(false)

    return () => h(
      TreeSelect, {
        allowClear: true,
        maxTagCount: MAX_TAG_COUNT,
        placeholder: PLEASE_SELECT,
        treeNodeFilterProp: 'label',
        showSearch: true,
        ...componentProps,
        treeData: options.value,
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

<script lang="ts">
/**
 * @description: 根据API获取数据下拉组件
 */
import type { PropType } from 'vue'
import type { DefaultOptionType, SelectValue } from 'ant-design-vue/lib/select'
import type { IApi, IApiSelectProps } from '#/form'
import { defineComponent, onMounted, ref, h } from 'vue'
import { Select } from 'ant-design-vue'
import { PLEASE_SELECT, MAX_TAG_COUNT } from '@/utils/config'
import BasicLoading from '../Loading/BasicLoading.vue'
import { IAllDataType } from '#/public'

export default defineComponent({
  name: 'ApiSelect',
  props: {
    value: {
      type: [String, Array] as PropType<SelectValue>,
      required: false
    },
    componentProps: {
      type: Object as PropType<IApiSelectProps>,
      required: false
    },
    api: {
      type: Function as PropType<IApi>,
      required: true
    },
    params: {
      type: Object,
      required: false
    },
    onDropdownVisibleChange: {
      type: Function as PropType<(open: boolean) => void>,
      required: false
    }
  },
  components: {
    Select,
    BasicLoading
  },
  setup(props, { emit }) {
    const options = ref<DefaultOptionType[]>([])
    const isLoading = ref(false)

    onMounted(() => {
      // 首次有值获取API接口
      if (props.value && options.value.length === 0) {
        getApiData()
      }
    })

    /** 获取接口数据 */
    const getApiData = async () => {
      try {
        isLoading.value = true
        const data = await props?.api?.(props?.params)
        options.value = data
      } finally {
        isLoading.value = false
      }
    }

    return () => h(
      Select, {
        allowClear: true,
        maxTagCount: MAX_TAG_COUNT,
        placeholder: PLEASE_SELECT,
        optionFilterProp: "label",
        value: props.value as SelectValue,
        ...props?.componentProps,
        options: options.value,
        notFoundContent: isLoading.value && h(BasicLoading),
        onDropdownVisibleChange: async (open: boolean) => {
          if (props?.onDropdownVisibleChange) {
            props.onDropdownVisibleChange?.(open)
          } else if (open) {
            getApiData()
          }
        },
        'onUpdate:value': (value: IAllDataType) => {
          emit('update:value', value)
        }
      }
    )
  }
})
</script>

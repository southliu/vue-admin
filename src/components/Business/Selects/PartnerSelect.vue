<script lang="ts">
/**
 * @description: 合作公司下拉组件
 */
import type { AllDataType } from '#/public'
import { defineComponent, h } from 'vue'
import { getPartner } from '@/servers/platform/partner'
import ApiSelect from '@/components/Selects/ApiSelect.vue'

export default defineComponent({
  name: "PartnerSelect",
  setup(props, { emit }) {
    return () =>
      h(ApiSelect, {
        api: getPartner,
        mode: 'multiple',
        'onUpdate:value': (value: AllDataType) => {
          emit('update:value', value)
        }
      })
  },
})
</script>

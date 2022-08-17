<script lang="ts">
/**
 * @description: 游戏下拉组件
 */
import type { IAllDataType } from '#/public'
import { defineComponent, h } from 'vue'
import { getGames } from '@/servers/platform/game'
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect.vue'

export default defineComponent({
  name: 'GameSelect',
  setup(props, { emit }) {
    return () => (
      h(ApiTreeSelect, {
        multiple: true,
        api: getGames,
        'onUpdate:value': (value: IAllDataType) => {
          emit('update:value', value)
        }
      })
    )
  },
})
</script>

<script lang="ts">
/**
 * @description: 密码强度组件
 */
import type { PropType } from 'vue'
import type { InputProps } from 'ant-design-vue'
import { defineComponent, ref, h } from 'vue'
import { InputPassword } from 'ant-design-vue'
import { PLEASE_ENTER } from '@/utils/config'
import StrengthBar from './components/StrengthBar.vue'

export default defineComponent({
  name: 'PasswordStrength',
  components: {
    InputPassword,
    StrengthBar
  },
  props: {
    value: {
      type: String,
      required: false
    },
    componentProps: {
      type: Object as PropType<InputProps>,
      required: false
    }
  },
  setup(props, { emit }) {
    const strength = ref(0)

    /**
     * 密码强度判断
     * @param value - 值
     */
    const handleStrength = (value: string) => {
      let level = 0;
      if (/\d/.test(value)) level++ // 有数字强度加1
      if (/[a-z]/.test(value)) level++ // 有小写字母强度加1
      if (/[A-Z]/.test(value)) level++ // 有大写字母强度加1
      if (value.length > 10) level++ // 长度大于10强度加1
      if (/[\.\~\@\#\$\^\&\*]/.test(value)) level++ // 有以下特殊字符强度加1
      strength.value = level
    }

    return () => h(
      'div',
      [
        h(
          InputPassword,
          {
            allowClear: true,
            placeholder: PLEASE_ENTER,
            ...props.componentProps,
            value: props.value,
            'onUpdate:value': (value: string) => {
              emit('update:value', value)
              handleStrength(value)
            }
          }
        ),
        h(
          StrengthBar,
          {
            strength: strength.value,
            style: {
              display: props.value ? 'flex': 'none'
            }
          }
        )
      ]
    )
  }
})
</script>

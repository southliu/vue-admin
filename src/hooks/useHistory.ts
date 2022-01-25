import { useRouter } from 'vue-router'

function useHistory(path: string): void {
  const router = useRouter()

  router.push(path)
}


export default useHistory
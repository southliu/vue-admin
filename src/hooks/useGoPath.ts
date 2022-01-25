import { useRouter } from 'vue-router'

function useGoPath(path: string): void {
  const router = useRouter()

  router.push(path)
}


export default useGoPath
type IEnvConfigs = Record<string, string>

/**
 * 处理转化env
 * @param envConfigs 
 */
export function handleEnv(envConfigs: IEnvConfigs): IViteEnv {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs

  let res: IViteEnv = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: (JSON.parse(VITE_PROXY.replace(/'/g, '"')) || []) as [string, string][]
  }

  return res
}
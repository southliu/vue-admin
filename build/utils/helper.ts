import { PAGES_PATH, PAGE_PREFIX } from './config';

type EnvConfigs = Record<string, string>

// env数据
interface ViteEnv {
  VITE_SERVER_PORT: number;
  VITE_PROXY: [string, string][];
}

/**
 * 处理转化env
 * @param envConfigs 
 */
export function handleEnv(envConfigs: EnvConfigs): ViteEnv {
  const {
    VITE_SERVER_PORT,
    VITE_PROXY
  } = envConfigs;

  const proxy: [string, string][] = VITE_PROXY ? JSON.parse(VITE_PROXY.replace(/'/g, '"')) : [];

  const res: ViteEnv = {
    VITE_SERVER_PORT: Number(VITE_SERVER_PORT) || 8080,
    VITE_PROXY: proxy
  };

  return res;
}

/**
 * JS模块分包
 * @param id - 标识符
 */
export function splitJSModules(id: string) {
  // pnpm兼容
  const pnpmName = id.includes('.pnpm') ? '.pnpm/' : '';
  const fileName = `node_modules/${pnpmName}`;

  let result = id
    .split(fileName)[1]
    .split('/')[0];

  if (result.includes('@')) {
    const first = result.indexOf('@');
    if (first > 0) {
      result = result.substring(0, first);
    } else {
      const second = result.indexOf('@', 1);
      result = result.substring(0, second);
    }
  }

  return result;
}

/**
 * 页面分包处理
 * @param id - 标识符
 */
export function splitPage(id: string) {
  const fileName = PAGES_PATH;
  const file = id.split(fileName)[1];
  const categorize = file?.split('/')?.[0] || '';
  let result = file?.split('/')?.[1] || 'index';

  if (result.includes('/')) result = result?.split('/')[0] || '';
  if (result.includes('.tsx')) result = result.substring(0, result.length - 4);

  // 组件
  if (result === 'components' || result === 'component') {
    let compName = '/components/';
    if (id.includes('/component/')) compName = '/component/';

    let comResult = id.split(compName)[1];
    if (comResult.includes('/')) comResult = comResult?.split('/')[0] || '';
    if (comResult.includes('.tsx')) comResult = comResult.substring(0, comResult.length - 4);

    return `${PAGE_PREFIX}${categorize}_comp_${comResult}`;
  }

  return `${PAGE_PREFIX}${categorize}_${result}`;
}

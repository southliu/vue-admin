
import { request } from '@/servers/request';

// 文件上传地址
export const uploadFileUrl = `https://www.mocky.io/v2/5cc8019d300000980a055e76`;

/**
 * Oss获取文件授权url
 * @param data - 请求数据
 */
export function getAuthorizationUrl(url: string) {
  return request.get<string>(`/receiver/file/authorizationUrl2?url=${url}`);
}
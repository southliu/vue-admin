import type { PermissionsData } from "@/pages/login/model";
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";

/**
 * 授权参数转字符串数组
 * @param permissions - 授权值
 */
export const permissionsToArray = (permissions: PermissionsData[]): string[] => {
  const res: string[] = [];
  for (let i = 0; i < permissions.length; i++) {
    const { id, operation } = permissions[i];
    res.push(`/${id}`);
    for (let y = 0; y < operation.length; y++) {
      res.push(`/${id}/${operation[y]}`);
    }
  }
  return res;
};

/**
 * 检测是否有权限
 * @param value - 检测值
 * @param permissions - 权限
 */
export const checkPermission = (value: string): boolean => {
  const userStore = useUserStore();
  const { permissions } = storeToRefs(userStore);

  if (!permissions || permissions.value?.length === 0) return false;
  return permissions.value?.includes(value);
};

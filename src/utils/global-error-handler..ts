import { ComponentPublicInstance } from 'vue';
import { Router } from 'vue-router';
import { HttpError, TimeoutError } from '@/utils/rest/error';
import { IErrorMessageVo, ISsoErrorMessageVo } from '@/api/dto/common';
/**
 * 全局错误处理
 * @param error
 * @param instance
 * @param info
 * @param router
 * @param store
 */
export async function globalErrorHandler (
  error: Error,
  instance: ComponentPublicInstance | null,
  info: string | null,
  router: Router,
) {
  const proxy = instance as any;

  if (error instanceof TimeoutError) {
    await router.push({ name: 'network-error' });
    return;
  }

  if (error instanceof HttpError) {
    const {
      response: { status, data },
    } = error as HttpError;

    switch (status) {
      case 400:
      case 403:
        proxy.$error(
          // 常规处理
          (data as IErrorMessageVo).message ||
            // 兼容sso错误处理
            (data as ISsoErrorMessageVo).errorMsg,
        );
        break;
      case 404:
      case 500:
        await router.push({
          name: 'http-status-error',
          params: { value: status },
        });
        break;
      // TODO 待扩展，处理其他错误码
    }
    return;
  }

  proxy.$error(`未知错误：${error.message}`);
  console.error(error);
  if (info) {
    console.error(info);
  }
}

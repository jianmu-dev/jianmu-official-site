import { restProxy } from '@/api/index';
import { IContributorVo } from '@/api/dto/contributors';

export function queryContributors (): Promise<IContributorVo[]> {
  return restProxy({
    url: '/contributors.json',
    method: 'get',
    auth: false,
  });
}

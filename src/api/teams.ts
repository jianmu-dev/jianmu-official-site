import { restProxy } from '@/api/index';
import { ITeamVo } from '@/api/dto/teams';

export function queryTeams (): Promise<ITeamVo[]> {
  return restProxy({
    url: '/teams.json',
    method: 'get',
    auth: false,
  });
}

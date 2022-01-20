/**
 * 团队Vo
 */
import { IContributorVo } from '@/api/dto/contributors';

export interface ITeamVo
  extends Readonly<{
    'name':string,
    'purpose':string,
    'contributors':IContributorVo[]
}> {}

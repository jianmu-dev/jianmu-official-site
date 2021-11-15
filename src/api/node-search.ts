import {
  INodeDefinitionSearchingDto,
  INodeDefinitionVo,
} from './dto/node-search';
import { IPageVo } from './dto/common';
import { restProxy } from '.';

const baseUrl = 'https://api.jianmu.run/hub/view/node_definitions/search';

/**
 * 搜索节点定义库
 *@param dto
 */
export function nodeSearch(
  dto: INodeDefinitionSearchingDto,
): Promise<IPageVo<INodeDefinitionVo>> {
  return restProxy({
    url: `${baseUrl}`,
    method: 'get',
    auth: true,
    payload: dto,
  });
}

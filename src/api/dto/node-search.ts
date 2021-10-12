import { OwnerTypeEnum, VisibleTypeEnum } from './enmumeration';
/**
 * 搜索节点定义库dto
 */
export interface INodeDefinitionSearchingDto
  extends Readonly<{
    pageNum: number;
    pageSize: number;
  }> {}

/**
 * 搜索节点定义库Vo
 */
export interface INodeDefinitionVo
  extends Readonly<{
    id: number;
    icon?: string;
    ref: string;
    name: string;
    creatorRef: string;
    ownerId: string;
    ownerName: string;
    ownerRef: string;
    ownerType: OwnerTypeEnum;
    description: string;
    visibleType: VisibleTypeEnum;
    lastModifyTime: string;
  }> {}

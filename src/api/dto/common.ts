/**
 * 错误信息
 */
export interface IErrorMessageVo
  extends Readonly<{
    errorCode: string;
    message: string;
  }> {}

/**
 * sso错误信息
 */
export interface ISsoErrorMessageVo
  extends Readonly<{
    success: boolean;
    timestamp: number;
    errorCode: string;
    errorMsg: string;
  }> {}

/**
 * 分页dto
 */
export interface IPageDto
  extends Readonly<{
    /**
     * 页码
     */
    pageNum: number;

    /**
     * 每页个数
     */
    pageSize: number;
  }> {}

/**
 * 分页值对象
 */
export interface IPageVo<T>
  extends Readonly<{
    /**
     * 总个数
     */
    totalElements: number;

    /**
     * 总页数
     */
    totalPages: number;
    /**
     * 当前加载数量
     */
    size: number;
    /**
     * 数据
     */
    content: T[];
  }> {}

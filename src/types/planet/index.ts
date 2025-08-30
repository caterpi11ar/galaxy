/** 星球 */
export interface Planet {
  /** ID */
  id: string

  /** 名称 */
  name: string

  /** 作者 */
  createdBy: number

  /** 创建时间 */
  createdTime: string

  /** X坐标 */
  x: number
  /** Y坐标 */
  y: number
  /** 大小 */
  size: number

  /** 图片URL */
  imageUrl: string

  /** 点赞数 */
  likes: number
  /** 不喜欢数 */
  dislikes: number

  /** 是否喜欢 */
  isLiked: boolean
  /** 是否不喜欢 */
  isDisliked: boolean
}

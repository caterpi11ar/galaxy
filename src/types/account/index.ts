export interface Account {
  /** ID */
  id: string

  /** 用户名 */
  name: string

  /** 邮箱 - NextAuth 可能为 null */
  email: string | null

  /** 头像URL - NextAuth 可能为 null */
  avatar: string | null

  /** 微信ID */
  wechatId: string | null

  /** Google ID */
  googleId: string | null

  /** GitHub ID */
  githubId: string | null

  /** 是否为游客 */
  isGuest?: boolean

  /** 创建时间 */
  createdAt?: string

  /** 更新时间 */
  updatedAt?: string
}

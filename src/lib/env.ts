import process from 'node:process'
import { z } from 'zod'

/**
 * 环境变量配置模式定义
 * 使用 Zod 进行类型安全的环境变量验证
 */
const envSchema = z.object({
  // Node 环境
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // NextAuth 配置
  NEXTAUTH_URL: z.string().url().optional(),
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET 至少需要 32 个字符'),

  // GitHub OAuth
  GITHUB_CLIENT_ID: z.string().min(1, 'GitHub Client ID 不能为空'),
  GITHUB_CLIENT_SECRET: z.string().min(1, 'GitHub Client Secret 不能为空'),

  // Google OAuth
  GOOGLE_CLIENT_ID: z.string().min(1, 'Google Client ID 不能为空'),
  GOOGLE_CLIENT_SECRET: z.string().min(1, 'Google Client Secret 不能为空'),

  // 微信 OAuth（可选）
  WECHAT_APP_ID: z.string().optional(),
  WECHAT_APP_SECRET: z.string().optional(),

  // 数据库
  DATABASE_URL: z.string().url().optional(),

  // 存储配置
  STORAGE_PROVIDER: z.enum(['local', 'aws', 'aliyun', 'tencent', 'qiniu']).default('local'),
  STORAGE_BUCKET: z.string().default('galaxy-assets'),
  STORAGE_LOCAL_PATH: z.string().default('./storage'),
})

/**
 * 解析和验证环境变量
 */
function parseEnv() {
  try {
    return envSchema.parse(process.env)
  }
  catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
        .map((err: z.ZodIssue) => `${err.path.join('.')}: ${err.message}`)
        .join('\n')

      throw new Error(`环境变量配置错误:\n${errorMessage}`)
    }
    throw error
  }
}

/**
 * 类型安全的环境变量配置
 */
export const env = parseEnv()

/**
 * 环境变量类型定义
 */
export type Env = z.infer<typeof envSchema>

/**
 * 检查是否为生产环境
 */
export const isProd = env.NODE_ENV === 'production'

/**
 * 检查是否为开发环境
 */
export const isDev = env.NODE_ENV === 'development'

/**
 * 检查是否为测试环境
 */
export const isTest = env.NODE_ENV === 'test'

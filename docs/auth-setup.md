# Galaxy 认证配置指南

本文档详细介绍如何配置 Galaxy 项目的 Google 和 GitHub 登录功能。

## 📋 环境变量配置

### 1. 创建环境变量文件

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

### 2. 生成 NextAuth Secret

NextAuth 需要一个安全的密钥用于加密会话。你可以通过以下方式生成：

#### 方法一：使用 OpenSSL（推荐）
```bash
openssl rand -base64 32
```

#### 方法二：使用 Node.js
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

#### 方法三：在线生成器
访问 https://generate-secret.vercel.app/32

将生成的密钥填入 `.env.local` 的 `NEXTAUTH_SECRET`：

```env
NEXTAUTH_SECRET=你生成的32字符密钥
```

## 🐙 GitHub OAuth 配置

### 1. 创建 GitHub OAuth 应用

1. 访问 [GitHub Developer Settings](https://github.com/settings/applications/new)
2. 填写以下信息：
   - **Application name**: `Galaxy` 或你喜欢的名称
   - **Homepage URL**: `http://localhost:3000`（开发环境）
   - **Application description**: `Galaxy 星球管理游戏`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`

3. 点击 **Register application**

### 2. 获取 GitHub 凭证

创建应用后，你将看到：
- **Client ID**: 复制到 `.env.local` 的 `GITHUB_CLIENT_ID`
- **Client Secret**: 点击 "Generate a new client secret"，复制到 `.env.local` 的 `GITHUB_CLIENT_SECRET`

```env
GITHUB_CLIENT_ID=你的GitHub客户端ID
GITHUB_CLIENT_SECRET=你的GitHub客户端密钥
```

## 🔍 Google OAuth 配置

### 1. 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 点击项目选择器，创建新项目
3. 项目名称：`Galaxy` 或你喜欢的名称

### 2. 启用 Google+ API

1. 在项目中，前往 **APIs & Services > Library**
2. 搜索 "Google+ API" 或 "People API"
3. 点击启用

### 3. 配置 OAuth 同意屏幕

1. 前往 **APIs & Services > OAuth consent screen**
2. 选择 **External**（除非你有 Google Workspace）
3. 填写必要信息：
   - **App name**: `Galaxy`
   - **User support email**: 你的邮箱
   - **Developer contact information**: 你的邮箱
4. 保存并继续

### 4. 创建 OAuth 2.0 凭证

1. 前往 **APIs & Services > Credentials**
2. 点击 **Create Credentials > OAuth 2.0 Client IDs**
3. 选择 **Web application**
4. 填写信息：
   - **Name**: `Galaxy Web Client`
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

5. 点击 **Create**

### 5. 获取 Google 凭证

创建后，复制：
- **Client ID**: 复制到 `.env.local` 的 `GOOGLE_CLIENT_ID`
- **Client Secret**: 复制到 `.env.local` 的 `GOOGLE_CLIENT_SECRET`

```env
GOOGLE_CLIENT_ID=你的Google客户端ID
GOOGLE_CLIENT_SECRET=你的Google客户端密钥
```

## 📝 完整的 .env.local 示例

```env
# NextAuth 配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=你生成的32字符密钥

# GitHub OAuth 配置
GITHUB_CLIENT_ID=你的GitHub客户端ID
GITHUB_CLIENT_SECRET=你的GitHub客户端密钥

# Google OAuth 配置
GOOGLE_CLIENT_ID=你的Google客户端ID
GOOGLE_CLIENT_SECRET=你的Google客户端密钥
```

## 🚀 启动和测试

### 1. 启动开发服务器

```bash
pnpm dev
```

### 2. 测试登录流程

1. 访问 http://localhost:3000
2. 点击右上角"登录"按钮
3. 选择 GitHub 或 Google 登录
4. 完成 OAuth 授权流程
5. 确认成功返回并显示用户信息

## 🌐 生产环境配置

当你部署到生产环境时，需要更新以下 URL：

### 环境变量更新
```env
NEXTAUTH_URL=https://你的域名.com
```

### GitHub OAuth 应用更新
- **Homepage URL**: `https://你的域名.com`
- **Authorization callback URL**: `https://你的域名.com/api/auth/callback/github`

### Google OAuth 应用更新
- **Authorized JavaScript origins**: `https://你的域名.com`
- **Authorized redirect URIs**: `https://你的域名.com/api/auth/callback/google`

## 🛠️ 故障排除

### 常见问题

1. **登录后重定向失败**
   - 检查回调 URL 是否正确配置
   - 确认 `NEXTAUTH_URL` 与当前访问地址一致

2. **GitHub 登录提示"Bad verification code"**
   - 检查 `GITHUB_CLIENT_SECRET` 是否正确
   - 确认时间同步（OAuth 对时间敏感）

3. **Google 登录提示"redirect_uri_mismatch"**
   - 检查 Google 控制台中的重定向 URI 配置
   - 确保 URI 完全匹配（包括协议和端口）

### 调试技巧

启用 NextAuth 调试模式：

```env
NEXTAUTH_DEBUG=true
```

这将在控制台显示详细的认证流程日志。

## 📚 相关资源

- [NextAuth.js 官方文档](https://next-auth.js.org/)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth 文档](https://developers.google.com/identity/protocols/oauth2)
- [环境变量最佳实践](https://nextjs.org/docs/basic-features/environment-variables)

---

配置完成后，你的 Galaxy 项目就支持完整的用户认证功能了！🎉

# OAuth 登录配置指南

本指南将帮助你配置 Google 和 GitHub OAuth 登录功能。

## 前置要求

1. 已安装项目依赖：`pnpm install`
2. 复制 `.env.example` 为 `.env.local`
3. 拥有 Google 和 GitHub 开发者账号

## 1. GitHub OAuth 配置

### 步骤 1：创建 GitHub OAuth App

1. 登录 [GitHub](https://github.com)
2. 进入 **Settings** → **Developer settings** → **OAuth Apps**
3. 点击 **New OAuth App**
4. 填写应用信息：
   - **Application name**: Galaxy Game
   - **Homepage URL**: `http://localhost:3000` (开发环境)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
5. 点击 **Register application**

### 步骤 2：获取 GitHub 客户端凭据

1. 在创建的应用页面中，复制 **Client ID**
2. 点击 **Generate a new client secret** 获取 **Client Secret**
3. 将这两个值添加到 `.env.local` 文件：

```bash
# GitHub 登录配置
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

## 2. Google OAuth 配置

### 步骤 1：创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 创建新项目或选择现有项目
3. 确保项目已启用计费（免费额度通常足够开发使用）

### 步骤 2：启用 Google+ API

1. 在 Google Cloud Console 中，进入 **APIs & Services** → **Library**
2. 搜索 "Google+ API" 并启用
3. 或者搜索 "Google People API" 并启用（推荐）

### 步骤 3：配置 OAuth 同意屏幕

1. 进入 **APIs & Services** → **OAuth consent screen**
2. 选择 **External** 用户类型（除非你有 Google Workspace）
3. 填写必要信息：
   - **App name**: Galaxy Game
   - **User support email**: 你的邮箱
   - **Developer contact information**: 你的邮箱
4. 在 **Scopes** 步骤，添加以下范围：
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
5. 保存并继续

### 步骤 4：创建 OAuth 2.0 凭据

1. 进入 **APIs & Services** → **Credentials**
2. 点击 **Create Credentials** → **OAuth 2.0 Client IDs**
3. 选择 **Web application**
4. 填写信息：
   - **Name**: Galaxy OAuth Client
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
5. 创建后，复制 **Client ID** 和 **Client Secret**

### 步骤 5：添加环境变量

```bash
# Google 登录配置
GOOGLE_CLIENT_ID=your_google_client_id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 3. NextAuth.js 配置

确保你的 `.env.local` 包含以下必要变量：

```bash
# NextAuth.js 认证配置
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key_here

# 生成 NEXTAUTH_SECRET 的命令
# openssl rand -base64 32
```

### 生成 NEXTAUTH_SECRET

在终端中运行以下命令生成安全的密钥：

```bash
openssl rand -base64 32
```

## 4. 生产环境配置

### GitHub 生产环境

1. 返回 GitHub OAuth App 设置
2. 更新 URL 为你的生产域名：
   - **Homepage URL**: `https://yourdomain.com`
   - **Authorization callback URL**: `https://yourdomain.com/api/auth/callback/github`

### Google 生产环境

1. 返回 Google Cloud Console 的 OAuth 客户端设置
2. 更新授权的 URI：
   - **Authorized JavaScript origins**: `https://yourdomain.com`
   - **Authorized redirect URIs**: `https://yourdomain.com/api/auth/callback/google`

### 环境变量更新

```bash
NEXTAUTH_URL=https://yourdomain.com
```

## 5. 测试配置

1. 启动开发服务器：`pnpm dev`
2. 访问 `http://localhost:3000`
3. 点击登录按钮测试 OAuth 功能
4. 检查浏览器开发者工具的 Network 标签页，确保没有 OAuth 相关错误

## 常见问题

### GitHub OAuth 问题

- **错误**: `The redirect_uri MUST match the registered callback URL`
  - **解决**: 确保 GitHub OAuth App 的 callback URL 与代码中的完全匹配

- **错误**: `Bad verification code`
  - **解决**: 检查 Client ID 和 Client Secret 是否正确

### Google OAuth 问题

- **错误**: `redirect_uri_mismatch`
  - **解决**: 确保 Google Cloud Console 中的 redirect URI 与应用中的匹配

- **错误**: `Access blocked: This app's request is invalid`
  - **解决**: 确保已完成 OAuth 同意屏幕配置

- **错误**: `API key not valid`
  - **解决**: 确保已启用 Google+ API 或 Google People API

## 安全注意事项

1. **永远不要提交密钥到版本控制系统**
2. **使用不同的密钥用于开发和生产环境**
3. **定期轮换生产环境的客户端密钥**
4. **限制 OAuth 应用的权限范围**

## 支持

如果在配置过程中遇到问题，请检查：

1. 环境变量是否正确设置
2. OAuth 应用的回调 URL 是否匹配
3. API 是否已启用（Google）
4. 网络连接是否正常

更多帮助请参考：
- [NextAuth.js 文档](https://next-auth.js.org/)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Google OAuth 文档](https://developers.google.com/identity/protocols/oauth2)

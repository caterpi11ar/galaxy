# Galaxy 项目编写规则

## 代码结构规则

### 文件大小限制
- **单个文件不允许超过300行**
- 超过300行的文件必须按功能模块拆分
- 优先考虑组件化和模块化设计

### 模块拆分原则

#### React 组件拆分
- 主组件 < 200行，超过则拆分子组件
- UI 逻辑和业务逻辑分离
- 可复用组件独立成文件
- Hooks 逻辑单独提取

#### 示例：UniverseCanvas 组件拆分
```
src/components/game/UniverseCanvas/
├── index.tsx          # 主组件 (<200行)
├── StarField.tsx      # 星空背景组件
├── PlanetComponent.tsx # 星球组件
├── DebugGrid.tsx      # 调试网格
├── SystemPanel.tsx    # 系统信息面板
├── PlanetInfoPanel.tsx # 星球信息面板
└── useUniverseCanvas.ts # Hooks逻辑
```

### 强制拆分规则

#### 当文件超过300行时，必须按以下优先级拆分：

1. **组件拆分**
   - 子组件独立成文件
   - 重复的UI模式提取成公共组件

2. **逻辑拆分**
   - Hooks 逻辑单独文件
   - 工具函数独立成 utils
   - 常量和类型定义独立文件

3. **功能拆分**
   - 按业务功能模块拆分
   - 相关功能组织到同一目录

### 命名规范

#### 文件组织
```
src/
├── components/
│   ├── ui/              # 通用UI组件
│   ├── game/            # 游戏相关组件
│   └── common/          # 公共组件
├── hooks/               # 自定义Hooks
├── utils/               # 工具函数
├── types/               # 类型定义
└── constants/           # 常量定义
```

#### 组件目录结构
```
ComponentName/
├── index.tsx           # 主组件导出
├── ComponentName.tsx   # 主组件实现
├── SubComponent.tsx    # 子组件
├── hooks.ts           # 组件相关Hooks
├── utils.ts           # 组件工具函数
├── types.ts           # 组件类型定义
└── constants.ts       # 组件常量
```

## 代码质量规则

### TypeScript 严格模式
- 启用所有严格检查
- 禁止 `any` 类型
- 完整的类型定义

### 导入导出规范
- 使用具名导出而非默认导出
- 按字母顺序组织导入
- 相对路径使用别名

### 注释规范
- 关键业务逻辑必须有注释
- 复杂算法需要详细说明
- 组件和函数使用 JSDoc

## 重构指导

### 当前需要重构的文件
- `src/components/game/UniverseCanvas.tsx` (当前 ~650行)

### 重构步骤
1. 识别独立功能模块
2. 提取子组件
3. 分离Hooks逻辑
4. 创建目录结构
5. 更新导入导出

## 执行策略

### 新开发规则
- 新文件严格遵循300行限制
- 设计阶段考虑模块拆分
- Code Review 检查文件大小

### 现有代码重构
- 优先重构超过400行的文件
- 逐步重构300-400行文件
- 保持功能完整性

## 工具支持

### ESLint 规则
```json
{
  "rules": {
    "max-lines": ["error", { "max": 300, "skipComments": true }]
  }
}
```

### VS Code 设置
- 显示行数
- 文件大小提醒
- 代码折叠优化

---

**执行此规则将提高代码可维护性、可测试性和团队协作效率。**

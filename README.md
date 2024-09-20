# nest-swc-esm
- 项目目的：验证自己的猜想，理论上swc编译输出为ESM模块化，理论上vitest + swc也不会出问题
- 结果：符合自己的预期

## 声明
- 不要应用在生产环境，该项目只测试过ESM运行与Vitest ESM测试

## 使用方式
```bash
pnpm i
npm i

# 测试
pnpm test
pnpm test:e2e

# 运行
pnpm dev

# 规范
pnpm lint
pnpm format
```

## 实现ESM步骤
1. package.json的"type"设置为"module"（不理解的可以参考：https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c）
2. 定义swc配置文件，查看`.swcrc`文件
3. swc与tsconfig.json的兼容性，查看`为了迁移到SWC的配置项`注释后的额外配置（swc迁移文档：https://swc.rs/docs/migrating-from-tsc）
4. ESM后 eslint v9-都不支持，所以改名为`.eslintrc.cjs`使用CJS模块化运行
5. prettier 不受影响不用管
6. 配置nest-cli.json让其支持`swc`并读取`swc`配置
```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "builder": {
      "type": "swc",
      "options": {
        "swcrcPath": ".swcrc"
      }
    }
  }
}
```
> got这个http请求依赖包最新版是纯ESM，可以通过查看`dist`目录内的源码，根据导入语句可以分辨是否已转成ESM

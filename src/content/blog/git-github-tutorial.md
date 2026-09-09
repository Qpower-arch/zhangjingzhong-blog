---
title: 'Git 与 GitHub 入门教程：从零开始管理代码'
description: 'Git 是什么、怎么用、如何配合 GitHub 管理代码和部署网站——一篇带你入门版本控制。'
pubDate: 2026-08-25
tags: ['Git', 'GitHub', '教程']
category: '教程'
---

Git 是程序员必备的版本控制工具，GitHub 是托管代码的平台。这个博客本身就是用 Git + GitHub 部署的，这篇分享基本的用法。

## 为什么需要 Git

- **版本控制**：每次修改都能回溯，不怕改坏
- **多人协作**：团队并行开发不冲突
- **代码备份**：代码安全存在云端

## 一、安装 Git

到 [Git 官网](https://git-scm.com/) 下载安装。Windows 安装时一路默认即可。验证：

```bash
git --version
```

## 二、Git 基础三连

### 1. 初始化仓库

```bash
git init      # 在当前目录建仓库
```

### 2. 第一次提交

```bash
git add .                       # 把所有改动加入暂存区
git commit -m "第一次提交"      # 保存到一个版本
```

### 3. 查看状态

```bash
git status      # 看哪些文件改了
git log         # 看提交历史
```

## 三、连接 GitHub

### 1. 在 GitHub 建一个仓库（Repository）

登录 GitHub，点右上角 "+" → New repository，填个名字。

### 2. 把本地代码推上去

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git push -u origin main
```

### 3. 以后每次更新

```bash
git add .
git commit -m "更新内容"
git push
```

## 四、分支与合并（进阶）

```bash
git branch 新功能      # 创建分支
git checkout 新功能     # 切换到分支
git merge 新功能        # 合并回主分支
```

## 五、这个博客是怎么用 Git 的

其实我就是：
1. 本地写好文章
2. `git add . && git commit -m "新文章"`
3. `git push` 推送到 GitHub
4. GitHub Actions 自动部署，网站就更新了

## 推荐资源

- **菜鸟教程 Git**：https://www.runoob.com/git/git-tutorial.html
- **Git 官方文档**：https://git-scm.com/book/zh/v2
- **GitHub 官网**：https://github.com/

## 学习建议

1. 先把 `add / commit / push` 三个命令用熟
2. 理解「暂存区 → 本地仓库 → 远程仓库」三步
3. 多练，代码不怕丢的感觉很爽

> 学会 Git，你就掌握了现代编程协作的基础！

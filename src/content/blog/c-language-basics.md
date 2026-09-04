---
title: 'C 语言基础入门课程（含资源）'
description: '从零开始学 C 语言：环境搭建、语法基础、指针、结构体的完整学习路线 + 推荐资源。'
pubDate: 2026-09-05
tags: ['C语言', '编程', '学习']
category: '教程'
---

C 语言是计算机编程的基石，很多系统、嵌入式、底层开发都离不开它。这篇是给完全零基础的同学准备的入门路线，配合资源一起学。

## 为什么学 C 语言

- 语法简洁，是学习编程原理的最好起点
- 指针、内存管理让你真正理解计算机底层
- 学好 C，再学 C++、Java、Python 都事半功倍

## 一、环境搭建

### Windows 推荐：VS Code + MinGW（免费）

1. 下载 [MinGW-w64](https://www.mingw-w64.org/) 并安装
2. 把 MinGW 的 `bin` 目录添加到系统环境变量 `PATH`
3. 安装 [VS Code](https://code.visualstudio.com/) + C/C++ 扩展
4. 写完代码按 F5 就能编译运行

> 想更省事可以直接用 [Dev-C++](https://www.bloodshed.net/) 或 Code::Blocks，图形界面一键编译。

### 第一个程序

```c
#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}
```

## 二、语法学习路线

| 阶段 | 内容 | 重点 |
| ---- | ---- | ---- |
| 1. 基础 | 变量、数据类型、运算符、输入输出 | `printf` / `scanf` |
| 2. 流程控制 | if/else、switch、for、while | 循环嵌套、逻辑 |
| 3. 函数 | 定义、调用、递归、作用域 | 参数传递、递归 |
| 4. 数组 | 一维/二维数组、字符串 | 字符串处理 |
| 5. 指针 | 指针基础、指针与数组、指针与函数 | ⭐ C 语言核心 |
| 6. 结构体 | struct、枚举、联合体 | 数据组织 |
| 7. 文件 | 文件读写 | fread / fwrite |

## 三、指针——C 语言的灵魂

指针是 C 语言最难也最重要的部分，一定要重点掌握：

```c
int a = 10;
int *p = &a;      // p 指向 a 的地址
printf("%d\n", *p); // 通过指针访问 a = 10
```

> 建议把「指针与数组」「指针与函数」「动态内存分配（malloc/free）」这三块吃透。

## 四、推荐资源

### 📚 教程
- **菜鸟教程 C 语言**：https://www.runoob.com/cprogramming/c-tutorial.html（入门友好，中文）
- **C 语言中文网**：http://c.biancheng.net/（系统全面）
- **C Primer Plus**（书，经典教材）

### 🎦 视频
- B 站搜索「C 语言入门」有很多优质的免费视频教程

### 🛠 在线练习
- **洛谷**：https://www.luogu.com.cn/（刷题练习）
- **牛客网**：https://www.nowcoder.com/（编程题）

## 五、学习建议

1. **多敲代码**：看视频/教程 10 分钟，不如自己敲 1 小时
2. **从简单题做起**：先做基础语法题，再上指针
3. **理解内存**：C 语言的核心是理解「内存」和「地址」

> 学完 C 语言基础，你就掌握了编程的核心思维，后面学任何语言都很快！

下一篇预告：[Java 基础入门课程](/blog/java-basics-course/)。

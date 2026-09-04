---
title: 'Java 基础入门课程（含资源）'
description: '从零开始学 Java：环境搭建、面向对象、常用类库的完整学习路线 + 推荐资源。'
pubDate: 2025-09-05
tags: ['Java', '编程', '学习']
category: '教程'
---

Java 是世界上最流行的编程语言之一，也是企业级开发、Android 开发的主力。这篇给零基础同学一条清晰的 Java 入门路线。

## 为什么学 Java

- 跨平台（一次编写，到处运行）
- 面向对象，适合学习编程思想
- 就业市场大，后端开发、Android 开发都需要

## 一、环境搭建

### 安装 JDK（免费）

1. 下载 [JDK](https://www.oracle.com/java/technologies/downloads/)（推荐 JDK 17 或更新的 LTS 版本）
2. 配置环境变量：设置 `JAVA_HOME` 和 `PATH`
3. 验证：命令行输入 `java -version` 和 `javac -version`

> 想省事可以直接用 [Eclipse](https://www.eclipse.org/) 或 [IntelliJ IDEA Community](https://www.jetbrains.com/idea/download/)（社区版免费）。

### 第一个程序

```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
```

## 二、语法学习路线

| 阶段 | 内容 | 重点 |
| ---- | ---- | ---- |
| 1. 基础 | 变量、数据类型、运算符、输入输出 | `Scanner` |
| 2. 流程控制 | if/else、for、while、switch | 逻辑控制 |
| 3. 数组 | 一维/二维数组、ArrayList | 集合初步 |
| 4. 面向对象 | 类、对象、封装、继承、多态 | ⭐ Java 核心 |
| 5. 常用类 | String、集合框架、异常 | `System` / `List` / `Map` |
| 6. 进阶 | 泛型、Stream、IO、多线程 | 企业开发基础 |

## 三、面向对象——Java 的核心

Java 是纯面向对象的语言，一定要掌握三大特性：

```java
// 定义一个类
class Student {
    private String name;   // 封装

    public Student(String name) {
        this.name = name;
    }

    public void sayHello() {  // 方法
        System.out.println("你好，我是 " + name);
    }
}

// 使用
public class Main {
    public static void main(String[] args) {
        Student s = new Student("张静中");  // 实例化
        s.sayHello();
    }
}
```

> 重点理解：**类与对象、封装、继承、多态、接口** 这五个概念。

## 四、推荐资源

### 📚 教程
- **菜鸟教程 Java**：https://www.runoob.com/java/java-tutorial.html（入门友好）
- **廖雪峰 Java 教程**：https://www.liaoxuefeng.com/wiki/1252599548343744（系统全面，很推荐）
- **Head First Java**（书，轻松学面向对象）

### 🎦 视频
- B 站搜「黑马程序员 Java」「尚硅谷 Java」——质量很高，免费

### 🛠 在线练习
- **牛客网**：https://www.nowcoder.com/（Java 刷题 + 面试题）
- **LeetCode**：https://leetcode.cn/（算法题）

## 五、学习建议

1. **先掌握面向对象思想**：这是 Java 的灵魂
2. **多做小项目**：比如学生管理系统、计算器，练手最好
3. **熟悉常用类库**：String、集合框架、异常处理是高频考点

> 学好 Java 面向对象，你就可以开始接触 Android 开发或 Web 后端了！

上一篇：[C 语言基础入门课程](/blog/c-language-basics/)。

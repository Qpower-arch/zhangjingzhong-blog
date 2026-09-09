---
title: '数据结构与算法入门（含资源）'
description: '编程的核心基础：数组、链表、栈、队列、树、排序等核心数据结构与算法，配学习资源。'
pubDate: 2026-08-28
tags: ['数据结构', '算法', '编程']
category: '教程'
---

数据结构与算法是编程的核心基础，面试和实际开发都很重要。这篇带你入门最常用的数据结构与算法。

## 为什么要学数据结构与算法

- 写出高效代码的基础
- 技术面试必考
- 理解程序如何高效组织和处理数据

## 一、数据结构

### 数组（Array）
连续内存存储，通过下标随机访问。适合已知大小的数据的存储。

```
[1, 2, 3, 4, 5]
```

### 链表（Linked List）
链式存储，动态增删。由节点组成，每个节点存数据 + 下一节点指针。

### 栈（Stack）—— LIFO
后进先出，像叠盘子。适合做撤销、括号匹配。

```python
stack = []
stack.append(1)   # 入栈
stack.append(2)
top = stack.pop() # 出栈 = 2
```

### 队列（Queue）—— FIFO
先进先出，像排队。适合做任务调度、BFS。

### 哈希表（Hash Table）
键值对存储，O(1) 查找。Python 里的 `dict` 就是。

```python
d = {"name": "张静中", "age": 20}
print(d["name"])
```

### 树（Tree）
层级结构，最常用的是二叉树。搜索树、堆都是基于树。

## 二、常用算法

### 排序算法
- 冒泡排序、选择排序（简单）
- 快速排序、归并排序（高效）
- Python 内置 `sort()` 已很高效

### 查找算法
- 线性查找 O(n)
- **二分查找 O(log n)**（要求有序，很重要）

```python
def binary_search(arr, target):
    l, r = 0, len(arr) - 1
    while l <= r:
        mid = (l + r) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            l = mid + 1
        else:
            r = mid - 1
    return -1
```

### 递归
函数调用自己，解决分治问题。斐波那契、汉诺塔都是递归经典。

## 三、推荐资源

### 📚 教程
- **菜鸟教程 数据结构**：https://www.runoob.com/data-structures/data-structures-tutorial.html
- **Hello 算法**：https://www.hello-algo.com/（图解很清晰，强烈推荐）

### 🛠 刷题平台
- **LeetCode**：https://leetcode.cn/（程序员刷题首选）
- **洛谷**：https://www.luogu.com.cn/（适合入门）

## 四、学习建议

1. **先理解概念**，再动手实现
2. **多刷题**：LeetCode 简单题先做起
3. **看图理解**：Hello 算法的图解特别好懂

> 数据结构与算法是编程的基石，掌握了它，写代码会高效很多！

上一篇：[Git 与 GitHub 入门教程](/blog/git-github-tutorial/)。

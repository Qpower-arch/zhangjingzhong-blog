# 📖 Artalk 评论系统部署手册（自有 VPS + Docker 版）

> 目标：在自己的 VPS 上部署自托管评论服务，实现
> **邮箱验证码注册登录 + 仅登录可评论 + 站长管理后台**。
> 需要：一台 Linux VPS（Ubuntu 推荐）+ 一个域名 + 一个发信邮箱。

---

## ⚠️ 部署前必读（3 件事）

1. **HTTPS 必须**：你的博客是 HTTPS，评论服务也必须是 HTTPS，否则被浏览器拦截。
   本手册用 **Caddy 自动申请免费 SSL 证书**，你只需把域名解析到服务器即可。
2. **域名**：去阿里云/腾讯云/Cloudflare 买个域名（或已有域名），
   添加一条 A 记录，指向 VPS 的公网 IP。
3. **发信邮箱**：QQ/163 邮箱开 SMTP 拿到「授权码」（见第 3 步）。

---

## 第 0 步：买 VPS（在 tisula 或任意商家）

- 系统：**Ubuntu 24.04 / 22.04**（或 Debian）
- 配置：**1 核 1G 内存 / 10G 硬盘** 以上即可，评论系统很轻量
- 记下：**公网 IP**、**root 密码**

> 补充：tisula 等未核实商家请先自行搜「xx 靠谱吗」确认口碑，确保正规再付款。

---

## 第 1 步：登录 VPS + 安装 Docker（3 分钟）

用 SSH 连上服务器（Windows 可用 PowerShell 输入 `ssh root@你的IP`），然后执行：

```bash
# 更新系统
apt update && apt upgrade -y

# 安装 Docker + Compose 插件
curl -fsSL https://get.docker.com | bash
systemctl enable --now docker
apt install -y docker-compose-plugin
```

验证：`docker --version` 有输出即成功。

---

## 第 2 步：准备部署文件（复制即用）

在服务器上创建目录并进入：

```bash
mkdir -p /opt/artalk && cd /opt/artalk
```

### 创建 `docker-compose.yml`

```bash
cat > docker-compose.yml <<'EOF'
version: "3"
services:
  artalk:
    image: artalk/artalk:latest
    container_name: artalk
    restart: always
    ports:
      - "23366:23366"          # 仅内网（经 Caddy 反代）
    environment:
      - TZ=Asia/Shanghai
    volumes:
      - ./data:/data           # 数据持久化（评论、配置）
    command: ["server", "--config", "/data/artalk.yml"]
  caddy:
    image: caddy:2
    container_name: caddy
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data
      - caddy_config:/config
    depends_on:
      - artalk
volumes:
  caddy_data:
  caddy_config:
EOF
```

### 创建 `Caddyfile`（把域名换成你的）

```bash
cat > Caddyfile <<'EOF'
arttalk.你的域名.com {
    reverse_proxy artalk:23366
}
EOF
```

> ⚠️ 把 `arttalk.你的域名.com` 换成你真实的域名（且已解析到本服务器 IP）。
> Caddy 会自动给这个域名申请并续期免费 HTTPS 证书。

---

## 第 3 步：配置 SMTP（发验证码邮件）

启动前先配邮件。创建 Artalk 配置文件目录并写入配置：

```bash
mkdir -p data
cat > data/artalk.yml <<'EOF'
app:
  host: 0.0.0.0
  port: 23366
  debug: false
  locale: zh-CN
  timezone: Asia/Shanghai
# 邮件（发验证码）
smtp:
  enabled: true
  host: smtp.qq.com          # QQ邮箱；163签 smtp.163.com
  port: 465
  username: 你的邮箱@qq.com
  password: 你的16位授权码    # ⚠️ 不是QQ密码，是开启SMTP后获得的授权码
  from_name: 张静中的博客
# 信任与登录
auth:
  # 仅登录用户可评论（信任等级）
  trust: 1
# 站点名（博客配置时会用到，保持一致）
site:
  name: 张静中的博客
  public: true
EOF
```

> 需要 SMTP 授权码：QQ 邮箱 → 设置 → 账户 → 开启「IMAP/SMTP」→ 记下 16 位授权码。

---

## 第 4 步：启动

```bash
cd /opt/artalk
docker compose up -d
```

查看日志确认启动成功：

```bash
docker compose logs -f artalk
```

---

## 第 5 步：初始化管理员 + 后台

1. 浏览器打开 **https://arttalk.你的域名.com**
2. 首次进入会引导**初始化管理员账号**（设用户名 + 密码，记住它）
3. 右上角登录 → 进入**管理后台**
4. 后台可管理评论、查看登录用户、配置更多项

---

## 第 6 步：把服务地址告诉我

把 **https://arttalk.你的域名.com** 和 **site 名（张静中的博客）** 发给我，
我填进博客配置并重新部署，评论框立即上线。

---

## ❓ 常见问题

**Q：证书申请失败 / 无法访问？**
A：确认域名已正确解析到服务器 IP；服务器 80/443 端口已放行（云厂商安全组要开）。

**Q：验证码邮件收不到？**
A：检查授权码是否填对（不是密码）；端口 465；QQ 邮箱可能进垃圾箱。

**Q：如何备份？**
A：评论数据都在 `/opt/artalk/data` 文件夹，定期打包备份即可。

**Q：我想改成「能匿名评论 / 必须登录才能评论」？**
A：改 `data/artalk.yml` 里 `auth.trust` 的值（0=匿名可评论，1=登录后可评论），
改完 `docker compose restart artalk`。

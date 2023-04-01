# QAChat Pro

与 AI 对话，[QAChat](https://github.com/gcloudlab/QA) 升级版~

![预览](./static/cover.png)

</div>

## 主要功能

- 支持自定义 OpenAI API 密钥
- 支持随机生成预设场景（100+）
- 支持缓存多个会话
- 支持图片生成
- 支持密码访问
- **免费一键部署**
- 响应式UI，支持深色模式
- 极快的首屏加载速度
- 自动压缩上下文聊天记录，在节省 Token 的同时支持超长对话
- 一键导出Markdown聊天记录
- 双语切换（中英文）

> tip：欢迎加入 <a href='https://t.me/yesmore_cc'><img src='https://img.shields.io/badge/-Juiçe的秘密基地-fff?logo=Telegram'/></a> 与喵娘聊天~（集成ChatGPT机器人）


## 环境变量

> 请先将文件 `.env.example` 重命名为 `.env`, 并填写 `OPENAI_API_KEY` 变量值（此处申请[OpenAI](https://platform.openai.com/account/api-keys)）。
> 
> 如果需要本地开发，请填写http代理 `HTTPS_PROXY` 变量。


| 变量             | 描述                                 | 示例                           |
| ---------------- | ------------------------------------ | ------------------------------ |
| `BASE_URL`       | Custom base url for OpenAI API       | `https://api.openai.com`       |
| `OPENAI_API_KEY` | Custom OpenAI API Key                | `sk-eawsgfwegwaqeqtq234516512` |
| `CODE`           | Access code                          | `code1,code2,code3`            |
| `PROTOCOL`       | Override openai api request protocol | `https`                        |

## 本地调试

```bash
git clone https://github.com/yesmore/QA.git

cp .env.example .env

pnpm i
pnpm dev
```

## 部署

#### Vercel (推荐)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyesmore%2FQApro&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20Key&envLink=https%3A%2F%2Fplatform.openai.com%2Faccount%2Fapi-keys)


## LICENSE

[Anti 996 License](https://github.com/kattgu7/Anti-996-License/blob/master/LICENSE_CN_EN)

<a href="https://www.buymeacoffee.com/yesmore/gallery" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
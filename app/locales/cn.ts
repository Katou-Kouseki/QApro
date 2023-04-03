import { SubmitKey } from "../store/app";

const cn = {
  WIP: "开发中",
  Error: {
    Unauthorized:
      "授权失败，请打开设置面板并填写授权码。(左下角扫码关注公众号即可获取，激活使用)",
  },
  ChatItem: {
    ChatItemCount: (count: number) => `${count} 条对话`,
  },
  Chat: {
    SubTitle: (count: number) => `与 ChatGPT 的 ${count} 条对话`,
    Actions: {
      ChatList: "查看消息列表",
      CompressedHistory: "查看压缩后的历史 Prompt",
      Export: "导出聊天记录",
      Copy: "复制",
      Stop: "停止",
      Retry: "重试",
    },
    Rename: "重命名对话",
    Typing: "正在输入…",
    Input: (submitKey: string) => {
      var inputHints = `输入消息，${submitKey} 发送`;
      if (submitKey === String(SubmitKey.Enter)) {
        inputHints += "，Shift + Enter 换行";
      }
      return inputHints;
    },
    Send: "发送",
  },
  Export: {
    Title: "导出聊天记录为 Markdown",
    Copy: "全部复制",
    Download: "下载文件",
  },
  Memory: {
    Title: "历史记忆",
    EmptyContent: "尚未记忆",
    Copy: "全部复制",
  },
  Home: {
    NewChat: "新的对话",
    DeleteChat: "确认删除选中的对话？",
  },
  Settings: {
    Title: "设置",
    SubTitle: "设置选项",
    Actions: {
      ClearAll: "清除所有数据",
      ResetAll: "重置所有选项",
      Close: "关闭",
    },
    Lang: {
      Name: "Language",
      Options: {
        cn: "简体中文",
        en: "English",
        tw: "繁體中文",
      },
    },
    Avatar: "头像",
    FontSize: {
      Title: "字体大小",
      SubTitle: "聊天内容的字体大小",
    },
    Image: "图像生成",
    ImageDesc: "输入格式：img+空格+描述，例：img 一只鸟",
    ImageNumber: {
      Title: "图片数量",
      SubTitle: "一次性生成图片的数量",
    },
    ImageSize: {
      Name: "图像尺寸",
      Options: {
        256: "256x256",
        512: "512x512",
        1024: "1024x1024",
      },
    },

    Update: {
      Version: (x: string) => `当前版本：${x}`,
      IsLatest: "已是最新版本",
      CheckUpdate: "检查更新",
      IsChecking: "正在检查更新...",
      FoundUpdate: (x: string) => `发现新版本：${x}`,
      GoToUpdate: "前往更新",
    },
    SendKey: "发送键",
    Theme: "主题",
    TightBorder: "全屏",
    SendPreviewBubble: "发送预览气泡",
    Prompt: {
      Disable: {
        Title: "禁用提示词自动补全",
        SubTitle: "在输入框开头输入 ”/+空格“ 即可触发自动补全",
      },
      List: "自定义提示词列表",
      ListCount: (builtin: number, custom: number) =>
        `内置 ${builtin} 条，用户定义 ${custom} 条`,
      Edit: "编辑",
    },
    HistoryCount: {
      Title: "附带历史消息数",
      SubTitle: "每次请求携带的历史消息数",
    },
    CompressThreshold: {
      Title: "历史消息长度压缩阈值",
      SubTitle: "当未压缩的历史消息超过该值时，将进行压缩",
    },
    Token: {
      Title: "API Key 密钥*",
      SubTitle: "使用自己的 Key 可加快回复速度",
      Placeholder: "🗝 OpenAI API Key",
    },
    Usage: {
      Title: "账户余额",
      SubTitle(used: any) {
        return `本月已使用 $${used}`;
      },
      IsChecking: "正在检查…",
      Check: "重新检查",
    },
    AccessCode: {
      Title: "访问授权码*",
      SubTitle: "现在是受控访问状态，请在公众号申请授权码",
      Placeholder: "🗝 请输入授权码",
    },
    Model: "模型 (model)",
    Temperature: {
      Title: "随机性 (temperature)",
      SubTitle: "值越大，回复越随机",
    },
    MaxTokens: {
      Title: "单次回复限制 (max_tokens)",
      SubTitle: "单次交互所用的最大 Token 数",
    },
    PresencePenlty: {
      Title: "话题新鲜度 (presence_penalty)",
      SubTitle: "值越大，越有可能扩展到新话题",
    },
  },
  Store: {
    DefaultTopic: "新的对话",
    BotHello: "喵，有什么可以帮你的吗？",
    Error: "服务器开小差了，请稍后再试",
    Prompt: {
      History: (content: string) =>
        "这是 ai 和用户的历史聊天总结作为前情提要：" + content,
      Topic:
        "使用四到五个字直接返回这句话的简要主题，不要解释、不要标点、不要语气词、不要多余文本，如果没有主题，请直接返回“闲聊”",
      Summarize:
        "简要总结一下你和用户的对话，用作后续的上下文提示 prompt，控制在 200 字以内",
    },
    ConfirmClearAll: "确认清除所有聊天、设置数据？",
  },
  Copy: {
    Success: "已写入剪切板",
    Failed: "复制失败，请赋予剪切板权限",
  },
  Context: {
    Toast: (x: any) => `已设置 ${x} 条前置上下文`,
    Edit: "前置上下文和历史记忆",
    Add: "新增一条",
  },
};

export type LocaleType = typeof cn;

export default cn;

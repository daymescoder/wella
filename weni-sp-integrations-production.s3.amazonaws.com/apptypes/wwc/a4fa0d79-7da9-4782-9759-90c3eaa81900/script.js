let j = document.createElement("div");
j.id = "wwc";
document.body.appendChild(j);

let s = document.createElement("link");
s.rel = "stylesheet";
s.href = "https://weni-sp-integrations-production.s3.amazonaws.com/apptypes/wwc/a4fa0d79-7da9-4782-9759-90c3eaa81900/custom.css";
document.head.appendChild(s);

let p = {
  "title": "Wella",
  "subtitle": "online",
  "inputTextFieldHint": "Digite sua mensagem...",
  "showFullScreenButton": true,
  "displayUnreadCount": true,
  "initPayload": "Oi",
  "mainColor": "#d70e36",
  "startFullScreen": false,
  "embedded": false,
  "selector": "#wwc",
  "customizeWidget": {
    "headerBackgroundColor": "#d70e36",
    "launcherColor": "#d70e36",
    "userMessageBubbleColor": "#d70e36",
    "quickRepliesFontColor": "#d70e36",
    "quickRepliesBackgroundColor": "#d70e3633",
    "quickRepliesBorderColor": "#d70e36"
  },
  "params": {
    "images": {
      "dims": {
        "width": 300,
        "height": 200
      }
    },
    "storage": "session"
  },
  "socketUrl": "https://websocket.weni.ai",
  "host": "https://flows.weni.ai",
  "channelUuid": "b2c7b67d-fcff-411d-8ba9-6037f121fda6"
};

p["customMessageDelay"] = message => {
    return 1 * 1000;
}

WebChat.default.init(p);

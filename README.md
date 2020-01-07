## 简介

print-web 是一个在浏览器中提供打印功能 JavaScript 库，只要传递页面上要打印的元素的 ID, 无需离开界面就可以原样打印。

## 安装

```bash
npm install print-web --save
```
## 使用
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <title>print-web</title>

    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="stylesheet" href="/global.css" />
    <style>
      body {
        padding: 100px;
        background-color: burlywood;
      }
      button {
        margin-top: 30px;
      }

      table {
        font-size: 15px;
        background-color: #fff;
      }

      tr {
        height: 50px;
      }

      th,
      td {
        width: 200px;
        text-align: center;
      }
    </style>
  </head>

  <body>
    <div style="display: none;">
      <table border id="print-web">
        <tbody>
          <tr>
            <th colspan="2">print-web 打印</th>
          </tr>
          <tr>
            <td>abc</td>
            <td>abc</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button onclick="startPrint()">开始打印</button>
  </body>
</html>
```

```js
// 默认直接识别 id="print-web"
import p from "print-web";

p();
```

如果需要打印非页面内容可以使用   div style="display: none" 将要打印的内容包裹

## api

```js
p({
  
})
```

## License

[MIT](LICENSE)

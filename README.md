## code-generator

代码模板生成工具

### 安装
```
sudo npm install ly-code-generator --save -g
```
### 查看帮助文档
```
code-gen --help
```

### 创建模板
```
template
    ├── ${name}
    │   ├── index.css
    │   └── index.js
    └── ${name}.html
```
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="./${name}/index.css">
</head>
<body>
  <script src="./${name}/index.js">
    
  </script>
</body>
</html>
```


${name}为要template文件夹中要替换的关键字

### 依据模板生成模块
```
code-gen -N user -T templte
```
user 为创建模块 名字， template 为模板文件夹名字。

### 生成的文件结构

```
src
│   ├── user
│   │   ├── index.css
│   │   └── index.js
│   └── user.html
```

# 测试说明

## 登录
```
Username: admin
password: root1234
```

## 批量录入
```
在/frontend/src/assets中有个test.xlsx测试文件，可以用这个文件来测试
```

# 项目说明

## 页面文件
----
### Login.vue LoginBoard.vue
```
登录界面
```

### Home.vue Welcom.vue
```
主界面
```

### Main.vue MainPage.vue
```
主界面的内容
```

### HandleEquipment.vue Equipment.vue
```
管理设备的页面
获取设备列表
可以添加设备：包括添加单个设备、上传excel文件来批量添加设备
```

### HandleManger.vue Manager.vue ManagerList.vue ManagerBlock.vue
```
获取管理员列表等信息，与后端进行交互
展示管理员列表
展示管理员所绑定的设备的列表，并可以操作绑定信息等
```

## 通讯文件
----
### communication.js
```
与后端通讯的各种函数
```

### vue.config.js
```
后端地址
```

## 图片
----
在/frontend/src/assets中，有资源图片



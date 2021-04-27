
##### 3.2.1 Web端与后端通讯接口设计
```
接口通讯函数都在/utils/communication.js中
```
以下是接口函数：
- 解除绑定关系函数：function PostUnbind
- 获取管理员列表函数：function GetManagerList
- 获取设备列表函数：function GetEquipmentList
- 添加设备函数：function PostAddEquipment
- 删除设备函数：function PostDeleteEquipment

##### 3.2.1 Web端模块设计

**文件结构**：

+ LoginBoard.vue
+ Welcome.vue
    + MainPage.vue
    + Equipment.vue
    + Manager.vue
        + ManagerList.vue
            + ManagerBlock.vue

主要界面有2个，一个是登录界面，另一个是网站主界面。

在网站主界面里，分为：初始界面，设备管理界面，设备管理员管理界面。

其中，设备管理员管理界面中的管理员列表、单个管理员信息是由另外2个模块完成。






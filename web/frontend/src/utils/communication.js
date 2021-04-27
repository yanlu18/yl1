/**
 * 如果需要修改为正常上线模式，请注释下面mock的import代码
 * **/
// import "@/mock/index"

 // 请在下方实现自己的后端通信函数

 import axios from 'axios';
 axios.defaults.withCredentials = true;

//这就是个测试
function GetTest(getstr){
    console.log("get failed");
    axios.get("/backend/test").then(res=>{
        // console.log(res.data);
        console.log("get test success");
        getstr(res.data);
    })
}

//解除绑定
function PostUnbind(managerid,equipmentid,getstatus){
    axios.post("/backend/web_manager",{
        "manager":managerid,
        "equipment":equipmentid
    }).then(function(response){
        console.log(response);
        getstatus();
    }).catch(function(error) {
        console.log(error);
    })
}

//添加绑定，但网页似乎没有此要求
function PostBind(managerid,equipmentid){
    axios.post("",{
        "id":managerid,
        "equip_id":equipmentid
    }).then(function(response){
        console.log(response);
    }).catch(function(error) {
        console.log(error);
    })
}

//获取manager列表
function GetManagerList(get){
    axios.get("/backend/web_manager").then(res=>{
        console.log("get manager list success");
        get(res.data);
    })
}

//获取设备列表
function GetEquipmentList(get){
    axios.get("/backend/equip_web").then(res=>{
        console.log("get equipment list success");
        // console.log(res);
        get(res.data);
    })
}

//添加设备
function PostAddEquipment(add_id,get){
    axios.post("/backend/equip_web",add_id
    ).then(function(response){
        console.log(response);
        get();
    }).catch(function(error) {
        console.log(error);
    })
}

function PostDeleteEquipment(del_id,get){
    axios.post("/backend/delete_equip_web",del_id
    ).then(function(response){
        console.log(response);
        get();
    }).catch(function(error) {
        console.log(error);
    })
}

export { GetTest, PostUnbind, PostBind, GetManagerList, GetEquipmentList, PostAddEquipment, PostDeleteEquipment};

//http://127.0.0.1:8000/backend/test
<template>
<div id="manager">
    <el-container>
        <el-header class="inheader" style="text-align:left">
            <!-- <div class="letf-items" style="float: left;">
                管理设备管理员
            </div> -->
            <div class="right-items" style="float: right;">
                <el-button @click="getlist" style="display: inline-block;margin-right: 15px;">
                    获取列表
                </el-button>
                <!-- 返回到主界面 -->
                <!-- <el-button @click="$router.push('/welcome')">
                    返回
                </el-button> -->
            </div>
            
            
            </el-header>
        <el-main>
            <!-- 管理员列表 -->
            <ManagerList v-bind:managerlist="managerlist"
                @handleunbind="handleunbind"/>
        </el-main>
    </el-container>
    <el-dialog
        style="text-align: center"
        title="发表"
        :visible.sync="addbind.dialogVisible"
        :show-close=false
        width="80%">
        <el-form label-width="80px">
            <el-form-item label="管理员id">
                <el-input v-model="addbind.message.managerid" placeholder="managerid"></el-input>
            </el-form-item>
            <el-form-item label="设备id">
                <el-input v-model="addbind.message.equipmentid" placeholder="equipmentid"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
                    <el-button v-on:click="addcancel">取 消</el-button>
                    <el-button type="primary"
                                :disabled="(addbind.message.managerid=='')||(addbind.message.equipmentid=='')"
                                v-on:click="addsuccess"
                                >确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>


<script>
import ManagerList from "@/components/ManagerList"
import {GetManagerList} from "@/utils/communication"
export default {
    name:"Manager",
    components:{
        ManagerList
    },
    props:{
        
    },
    data(){
        return{
            //添加绑定的dialog
            addbind:{
                dialogVisible:false,
                message:{
                    managerid:"",
                    equipmentid:""
                },
                state:true
            },
            //管理员和其绑定的设备列表
            managerlist:[
                {
                manager:"user1",
                content:[{id:"0001",name:"name1"},
                        {id:"0002",name:"name2"},
                        {id:"0003",name:"name3"},
                        {id:"0004",name:"name4"},
                        {id:"0005",name:"name5"},
                        {id:"0006",name:"name6"},
                        {id:"0007",name:"name7"}
                        ]
                },{
                manager:"user2",
                content:[{id:"0003",name:"name3"},
                        {id:"0004",name:"name4"},
                        {id:"0005",name:"name5"}]
                }]

        }
    },
    methods:{
        getlist(){
            GetManagerList(this.get_list_from_backend);
        },
        get_list_from_backend(list){
            console.log(list.data);
            this.managerlist=list.data;
        },
        update(){
            console.log("update");

        },
        addcancel(){
            this.addbind.message.managerid="";
            this.addbind.message.equipmentid="";
            this.addbind.dialogVisible=false;
        },
        addsuccess(){
            this.addbind.message.managerid="";
            this.addbind.message.equipmentid="";
            this.addbind.dialogVisible=false;
        },
        handleunbind(){
            this.getlist();
        }
    },
    created:function(){
        this.getlist();
    }
}
</script>

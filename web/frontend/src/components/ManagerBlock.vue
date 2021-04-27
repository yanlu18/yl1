<template>
<div id="managerblock">
    <el-menu class="managerblock" :default-openeds="[]" style="border-radius: 4px;margin: 5px">
        <el-submenu index="view" style="text-align: left">
            <template slot="title" ><i class="el-icon-s-custom"/>
              {{manager}}
            </template>
            <div class="managerblock-content">
                <el-table
                    :data="content"
                    stripe
                    style="width:100%"
                    max-height="250">
                    <el-table-column
                        prop="id"
                        label="设备id"
                        width="150"
                        />
                    <el-table-column
                        prop="name"
                        label="设备昵称"
                        width=""
                        />
                    <el-table-column
                        fixed="right"
                        label="操作"
                        width="150">
                        <template slot-scope="scope">
                        <el-button @click="handleunbind(scope.row)" size="mini" type="danger">解除绑定</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-submenu>
    </el-menu>
</div>
</template>

<script>
    import {PostUnbind} from "@/utils/communication"
    export default {
        name: "ManagerBlock",
        props: {
            manager: {
                type:String,
                default: () => "unknown title"
            },
            content: {
                type:Array,
            }
        },
        data(){
            return{
                equipmentid:""
            }
        },
        methods:{
            
            handleunbind(row) {//解除绑定与提示信息
                console.log(this.manager+" "+row.id);
                const h = this.$createElement;
                this.$confirm("",{
                        title: "提示",
                        message: h('div',null,[
                        h('p',null,'确认要解除绑定以下绑定关系吗？'),
                        h('p',{style:"color:blue"},'管理员：'+this.manager),
                        h('p',{style:"color:blue"},'设备：'+row.id)
                        ]),
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '解绑成功!'                        
                    });
                    PostUnbind(this.manager,row.id,this.getstatus);
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消解绑'
                    });          
                });
                
            },
            getstatus(){
                this.$emit("handleunbind");
            }
        }
    }
</script>

<style scoped>
    .ManagerBlock-content{
        display: flex;
        color: #090607;
        padding-bottom: 10px;
        font-size: large
    }
    .managerblock{
        background-color: #9795f77c;
    }
</style>
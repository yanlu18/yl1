<template >
<div id="welcome" class="welcome" >
    <el-header>
        <span>自动门禁系统网页平台
        <!-- <el-button v-on:click="test">
                    test
        </el-button>
        <el-button v-on:click="restr">return</el-button> -->
        
        </span>
    </el-header>
    <el-container>
        <el-aside width="200px">
            <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color="#ffd04b"
                :unique-opened="true"
                router>
                <el-menu-item index="/welcome" style="text-align:left">
                    <span class="el-icon-s-home" > 首页</span>
                </el-menu-item>
                <el-menu-item index="/equipment" style="text-align:left">
                    <span class="el-icon-s-platform"> 管理设备</span>
                </el-menu-item>
                <el-menu-item index="/manager" style="text-align:left">
                    <span class="el-icon-user-solid"> 管理设备管理员</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view>
            </router-view>
            <!-- <span>
                <el-button v-on:click="manageequipment">管理设备</el-button><br>
                <el-button v-on:click="managemanager">管理设备管理员</el-button><br>
            </span> -->
        </el-main>
    </el-container>     
    
</div>
</template>



<script>
import {GetTest} from "@/utils/communication"
export default {
    name:"Welcome",
    props:{
        
    },
    data(){
        return{
            str:"str"

        }
    },
    methods:{
        test:function(){
            GetTest(this.getstr);
        },
        restr(){
            this.str="return to str";
        },
        getstr(message){
            console.log(message.data);
            this.str=message.data;
        },
        manageequipment(){
            this.$router.push('/equipment');
        },
        managemanager(){
            this.$router.push('/manager');
        }

    }
}
</script>

<style>
  .el-header{
    background-color: #282631;
    color: #ffffff;
    text-align: left;
    line-height: 60px;
    height: 10vh;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: larger;
  }
  
  .el-aside {
    background-color:#333744;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 90vh;
  }
  
  .el-main {
    background-color: #eee6e1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .inheader{
    background-color: #eee6e1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>

<template>
<div id="login">
    <el-card class="login-card">
        <el-form label-width="80px">
            <el-form-item label="name">
                <el-input v-model="state.name" placeholder="your name"></el-input>
            </el-form-item>
            <el-form-item label="password">
                <el-input  type="password" v-model="state.password" placeholder="password"></el-input>
            </el-form-item>
            <!-- <el-form-item label="confirm">
                <el-input type="password" v-model="state.confirm"></el-input>                
            </el-form-item>
            <el-form-item>
            <span v-if="state.confirmsame===false" style="color: red">密码不一致</span>
            </el-form-item> -->
            <el-form-item>
                <span >
                    <el-button v-on:click="cancel">取 消</el-button>
                    <el-button type="primary"                        
                                @click="success">确 定</el-button>
                </span>
            </el-form-item>
        </el-form>           
    </el-card>
</div>
</template>


<script>
import QRCode from 'qrcodejs2'
export default {
    name:"LoginBoard",
    props:{
        state:{
            type: Object,
            default: ()=>{
                return{
                    confirmsame: false,
                    confirm:"",
                    name:"",
                    password:"",
                }
            }
        }
    },
    data(){
        return{
            name:"admin",
            password:"root1234"
        }
    },
    methods:{
        cancel(){
            this.state.name="";
            this.state.password="";
        },
        success(){
            if(this.name==this.state.name&&this.password==this.state.password){
                localStorage.setItem("islogin", 1);
                this.$router.push('/welcome');
            }
            else{
                this.state.name="";
                this.state.password="";
                this.$message({
                    type: 'error',
                    message: '用户名或密码错误'
                }); 
            }
            
        },
        ls_to_nothing(){
            localStorage.setItem("islogin","");
        }
    },
    created:function(){
        this.ls_to_nothing();
    },
    watch: { 
    "state.confirm": {
      handler() {
          this.state.confirmsame = false;
        // this.state.username_valid = /^[A-Za-z\u4e00-\u9fa5][-A-Za-z0-9\u4e00-\u9fa5_]*$/.test(newName)
      }
    }
  }
}
</script>
<style scoped>
    .login-card{
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: url("../assets/64.jpg") no-repeat;
        background-size: cover;
    }
    /* .el-card{
        height: 800px;
        display: flex;
        align-items: center;
        justify-content: center;
    } */
</style>

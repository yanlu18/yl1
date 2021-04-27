<template>
<div id="equipment">
    <el-container>
        <el-header class="inheader" style="text-align:left">
            <!-- <div class="letf-items" style="float: left;">
                管理设备
            </div> -->
            <div class="right-items" style="float: right;">
                <el-button @click="dialogVisible=true" style=" display: inline-block;margin-right: 15px;">
                    添加设备
                </el-button>
                <el-button @click="getlist" style="display: inline-block;margin-right: 15px;">
                    获取列表
                </el-button>
                <!-- <el-button @click="$router.push('/welcome')">
                    返回
                </el-button> -->
            </div>
        </el-header>
        <el-main>
            <div class="equipment">
                <el-table
                    :data="content"
                    border
                    style="width:100%">
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
                        >
                        <template slot-scope="scope">
                        <el-button @click="handleQRcode(scope.row)" size="mini">生成二维码</el-button>                        
                        <el-button @click="handleDel(scope.row)" size="mini" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-main>
    </el-container>

    <el-dialog
            style="text-align: center"
            title="添加设备"
            :visible.sync="dialogVisible"
            :show-close=true
            width="80%">
        <span>
            <el-button v-on:click="(singleAdd=true)&&(dialogVisible=false)">
                单个上传
            </el-button>
            <el-button v-on:click="(multipleAdd=true)&&(dialogVisible=false)">
                文件批量上传
            </el-button>
        </span>
    </el-dialog>
    <el-dialog 
            style="text-align: center"
            title="添加单个设备"
            :visible.sync="singleAdd"
            :show-close=true
            width="80%">
        <el-form label-width="80px">
            <el-form-item label="设备id">
                <el-input v-model="addid['id']" placeholder="输入id"></el-input>
            </el-form-item>
        </el-form>            

        <span slot="footer" class="dialog-footer">
            <el-button v-on:click="singleAdd=false">取 消</el-button>
            <el-button type="primary"
                        v-on:click="success_single"
                        :disabled="(addid['id']=='')"
                        >确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog 
            style="text-align: center"
            title="批量添加设备"
            :visible.sync="multipleAdd"
            :show-close=true
            width="80%">
        <el-form label-width="80px">                
            <el-form-item style="text-align:left">
                <el-upload
                    class="upload-demo"
                    action=""   
                    accept=".xlsx"
                    :limit=limitNum         
                    :auto-upload="false"
                    :before-upload="beforeUploadFile"
                    :on-change="fileChange"
                    :on-remove="handleRemove"
                    :on-exceed="exceedFile"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :file-list="fileList">   
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                
            </el-form-item>
        </el-form>            

        <span slot="footer" class="dialog-footer">
            <el-button v-on:click="cancel_upload">取 消</el-button>
            <el-button type="primary"
                        v-on:click="uploadFile"
                        :disabled="fileList.length==0"
                        >确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog class="qrcode"
        title="二维码"
        :visible.sync="qrcodeVisible"
        @close="closeCode">
        <!-- 生成的二维码在这个dialog里 -->
        <div class="qrcode">
            <div id="qrcode" ref="qrcode"></div>
        </div>

    </el-dialog>
</div>
</template>


<script>
import {GetEquipmentList, PostAddEquipment, PostDeleteEquipment} from "@/utils/communication"
import XLSX from 'xlsx'
import QRCode from 'qrcodejs2'
export default {
    name:"Equipment",
    props:{
        
    },
    data(){
        return{
            //添加设备的dialog
            dialogVisible:false,
            //添加单个设备的dialog
            singleAdd:false,
            //批量添加设备的dialog
            multipleAdd:false,
            //设备列表
            content:[],
            //添加单个设备时候的数据
            addid:{id:""},
            //批量添加设备时候最大文件数目
            limitNum:1,
            //文件列表
            fileList:[],
            //空列表
            nullList:[],
            //批量添加设备时候的数据
            addList:[],
            //qrcode的dialog
            qrcodeVisible:false,
            //二维码
            myqrcode:"",
        }
    },
    methods:{
        getlist(){//获取设备列表
            GetEquipmentList(this.get_list_from_backend);
        },
        get_list_from_backend(list){
            // console.log(list.data);
            this.content = list.data;
        },
        handleDel(row){//删除设备
            //提示信息
            const h = this.$createElement;
            this.$confirm("",{
                    title: "提示",
                    message: h('div',null,[
                    h('p',null,'确认要删除以下设备吗？'),
                    h('p',{style:"color:blue"},'设备：'+row.id)
                    ]),
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'                        
                });
                let temp = {}
                temp.id = row.id;
                console.log(temp);
                PostDeleteEquipment(temp,this.getlist);//删除设备
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消删除'
                });          
            });
        },
        addequip(id){//添加设备
            PostAddEquipment(id,this.getlist);
        },
        success_single(){
            this.singleAdd=false;
            console.log(this.addid);
            this.$message({type: 'success',message: '添加成功!'});
            this.addequip(this.addid);
            this.addid['id']="";
            
        },
        cancel_upload(){
            this.multipleAdd=false;
            this.fileList=this.nullList;
        },

        // 文件超出个数限制时的钩子
        exceedFile(files, fileList) {
            this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`);
        },
        // 文件状态改变时的钩子
        fileChange(file) {
            console.log(file.raw);
            this.fileList.push(file.raw) ;
            console.log(this.fileList);
        },
        // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
        beforeUploadFile(file) {
            console.log('before upload');
            console.log(file);
            let extension = file.name.substring(file.name.lastIndexOf('.')+1);
            let size = file.size / 1024 / 1024;
            if(extension !== 'xlsx') {
            this.$message.warning('只能上传后缀是.xlsx的文件');
            }
            if(size > 50) {
            this.$message.warning('文件大小不得超过50M');
            }
        },
        // 文件上传成功时的钩子
        handleSuccess() {
            this.$message.success('文件上传成功');
        },
        handleRemove(){
            this.fileList = this.nullList;
        },
        // 文件上传失败时的钩子
        handleError() {
            this.$message.error('文件上传失败');
        },
        UploadUrl(){
            return ""
        },
        uploadFile(){
            this.multipleAdd=false;
            console.log(this.fileList);

            let fileTemp = this.fileList[0];
            console.log(fileTemp);
            if(fileTemp){
                this.importfile(fileTemp);                
            }

            this.fileList=this.nullList;
        },
        importfile(file){
            console.log("importfile");
            // let _this = this;

            var f = file;
            var reader = new FileReader();
            var outdata;
            var that = this;
            reader.onload = function(e) {
                // console.log(e)
                var wb;
                var data = e.target.result;
                
                wb = XLSX.read(data, {
                        type: "binary"
                        });                
                // wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                // wb.Sheets[Sheet名]获取第一个Sheet的数据
                // document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
                outdata =  XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) ;
                console.log(wb.Sheets);
                let keytemp="";
                for(let key in outdata[0]){
                    keytemp = key;
                }
                let t = {};
                t.id = keytemp;
                that.addList.push(t);
                for(let item in outdata){
                    let equipid = {};
                    for(let key in outdata[item]){
                        equipid.id = outdata[item][key];                        
                    }
                    that.addList.push(equipid);
                }                
                that.success_multiple(that.addList)

            };
            reader.readAsBinaryString(f);
                    
        },
        success_multiple(list){
            this.$message({type: 'success',message: '添加成功!'});
            for(let item in list){
                console.log(list[item]);
                this.addequip(list[item],this.getlist());
            }
            this.addList = this.nullList;
        },

        createQrCode(id) {//生成二维码
            console.log("qrcode");
            this.myqrcode = new QRCode("qrcode", {
                text: id,
                width: 100,
                height: 100,
                colorDark: '#000000',
                colorLight: '#ffffff',
                // correctLevel: QRCode.CorrectLevel.H
            })
        },
        handleQRcode(row){//确定生成二维码的信息            
            this.qrcodeVisible = true;
            this.$nextTick(() => {
                this.createQrCode(row.id);
            })
        },
        closeCode () {//清除已生成二维码
            this.$refs.qrcode.innerHTML = ''
        }
    },
    created:function(){
        this.getlist();
    },
    

}
</script>

<style scoped>
    .qrcode{
        display:inline-block;
    }
</style>
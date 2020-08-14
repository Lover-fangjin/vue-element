<template>
    <div class="header">
        <el-row :gutter="20">
            <el-col :span="8" style="padding-top: 5px; line-height: 40px;">
                <ul>
                    <li>
                        <!-- <el-avatar :size="50" class="avatar">
                            <img :src="userInfo.avatar" />
                        </el-avatar> -->
                        <el-avatar  :size="50" class="avatar" icon="el-icon-user-solid"></el-avatar>
                    </li>
                    <li style="margin: 15px 0 0 15px;">你好, {{userInfo.username}} </li>
                </ul>
            </el-col>
            <el-col :span="8" :offset="8" style="height: 60px;">
                <div class="logout" @click="onLogout">
                    <i class="el-icon-switch-button"></i>
                    <span>退出系统</span>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {}
            }
        },
        
        mounted () {
            let me = this;
            me.userInfo = JSON.parse(localStorage.getItem('user'));
        },
        methods: {
            onLogout() {
                this.$api.logout().then(res => {
                    if(res.code === 200) {
                        this.$router.push('/login')
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
// 横向排列
.header{
    ul{
        margin: 0;
        padding: 0;
    }
    ul li{
        list-style: none;
        display: table-cell;
        vertical-align: top;
        margin: 0;
        padding: 0;
        float: left;
    }
    .logout{
        float: right;
        padding: 20px 5px;
        i{
            font-size: 18px;
            padding-right: 5px;
        }
        span{
            font-size: 16px;
        }
    }
    .logout:hover{
        background: #0150a02f !important;
    }
}
</style>
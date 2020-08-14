<template>
    <div class="full-screen" style="position: relative;">
        <el-menu 
            style="padding-top: 20px;"
            :default-active=active
            :default-openeds=openeds
            class="el-menu-vertical-demo" 
            :collapse="isCollapse" 
            background-color="#001529"
            active-text-color="#ffd04b"
            text-color="#ddd">
            <NavMenu v-for="item in menuData" :key="item.id" :menu="item"></NavMenu>
        </el-menu>
        
        <div class="collapse" @click="isCollapse = !isCollapse">
            <span v-if="isCollapse"><i class="el-icon-d-arrow-right"></i></span>
            <span v-else><i class="el-icon-d-arrow-left"></i> 收起侧栏</span>
        </div>
    </div>
</template>

<script>
import NavMenu from '../components/NavMenu.vue'
export default {
    data() {
        return {
            isCollapse: false,
            openeds: ['1'],
            active:'1-1',
            menuData: [
                {
                    "id": '1',
                    "path": "/home",
                    "menuName": "监测数据报警判别",
                    'icon': 'el-icon-s-promotion',
                    "childMenu":[{
                        "id": '1-1',
                        "path": "/home/displace",
                        "menuName": "层级树",
                        'icon': 'el-icon-s-order'
                    },{
                        "id": '1-2',
                        "path": "/home/wallVertical",
                        "menuName": "可拖拽节点",
                        'icon': 'el-icon-s-order'
                    },{
                        "id": '1-3',
                        "path": "/home/wallHertical",
                        "menuName": "菜单三",
                        'icon': 'el-icon-s-order'
                    },{
                        "id": '1-4',
                        "path": "/home/surfaceDis",
                        "menuName": "菜单四",
                        'icon': 'el-icon-s-order'
                    },{
                        "id": '1-5',
                        "path": "/home/buildings",
                        "menuName": "菜单五",
                        'icon': 'el-icon-s-order'
                    },
                    // {
                    //     "id": '1-4',
                    //     "path": "/home",
                    //     "menuName": "月统计1",
                    //     'icon': 'el-icon-s-promotion',
                    //     "childMenu":[{
                    //         "id": '1-4-1',
                    //         "path": "/home",
                    //         "menuName": "月统计11",
                    //         'icon': 'el-icon-s-order'
                    //     },{
                    //         "id": '1-4-2',
                    //         "path": "/home",
                    //         "menuName": "月统计12",
                    //         'icon': 'el-icon-s-order'
                    //     }]
                    // }
                    ]
                },
                {
                    "id": 4,
                    "path": "/home",
                    "menuName": "商业报表中心",
                    'icon': 'el-icon-s-promotion',
                    "childMenu":[{
                        "id": 5,
                        "path": "/home/tmp",
                        "menuName": "日报表1",
                        'icon': 'el-icon-s-order'
                    },{
                        "id": 6,
                        "path": "/home/tmp",
                        "menuName": "月报表1",
                        'icon': 'el-icon-s-order'
                    }]
                } 
            ]
        };
    },
    components: {
        NavMenu,
    },
    mounted () {
        this.$router.push('/home/displace')
    }
}
</script>

<style lang="scss" scoped>
.collapse{
    height: 30px; 
    width: 100%; 
    background: #012548; 
    position: absolute; 
    bottom: 0; 
    left: 0; 
    text-align: left;
    overflow: hidden;
    cursor: pointer;
    white-space: nowrap;
    color: #fff;

    span{
        display: flex;
        padding-top: 5px;
        align-self: center;
        font-size: 14px; 
        color: #fff;
    }
    i{
       padding: 3px 10px 3px 24px;
    }
}
.collapse:hover{
    background: #013468; 
}

.project {
    vertical-align: text-bottom;
    font-size: 30px;
    padding: 20px 30px;
    text-transform: uppercase;
    display: inline-block;
    font-weight: 600;
    background-image: -webkit-gradient(linear, 37.219838% 34.532506%, 36.425669% 93.178216%, from(#29cdff), to(#0a60ff), color-stop(0.37, #148eff));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>


<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    min-height: 400px;
}
.el-menu {
    border-right: solid 1px #e6e6e600 !important;
    text-align: left;
}
.el-menu-item:hover{
    background: #0150a0 !important;
}
.el-submenu__title {
    padding: 0 40px 0 20px !important;
}
</style>
<template>
    <el-container class="full-screen">
        <el-aside>
            <slot name="aside">
                Aside content
            </slot>
        </el-aside>
        <el-container>
            <el-header>
                <slot name="header">
                    header content
                </slot>
            </el-header>
            <el-main>
                <slot name="main">
                    Main content
                </slot>
            </el-main>
            <!-- <el-footer>Footer</el-footer> -->
        </el-container>
    </el-container>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>

// .header {
//     background-color: #2e353c;
//     color: rgb(255, 255, 255);
//     width: 100%;
//     height: 40px;
// }

</style>

<style lang="scss">

.el-header {
    background-color: #ffffff;
    color: #333;
    height: 60px !important;
}
.el-footer {
    background-color: rgb(117, 117, 117);
    color: #333;
    height: 30px !important;
}
.el-aside {
    width: auto !important;
    background-color: #001529;
    color: #fff;
}
.el-main {
    background-color: rgb(201, 201, 201);
    color: #333;
    padding: 5px !important;
}
.el-menu-item i {
    color: #ffffff !important;
}
.el-submenu__title i {
    color: #ffffff !important;
}
</style>
<template>
    <el-submenu v-if="menu.childMenu && menu.childMenu.length >= 1" :index="'' + menu.id">
        <template slot="title">
            <i :class="menu.icon"></i>
            <span>{{menu.menuName}}</span>
        </template>
        <NavMenu v-for="item in menu.childMenu" :key="item.id" :menu="item"></NavMenu>
    </el-submenu>
    <el-menu-item v-else :index="menu.id.toString()" @click="clickMenuItem(menu)">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.menuName}}</span>
    </el-menu-item>  
</template>

<script>
    export default {
        name: 'NavMenu',
        props: {
            menu: {
                type: Object,
                default: () => {
                    return {};
                }
            },
        },
        methods: {
            clickMenuItem(_info) {
                this.$router.push(_info.path)
            }
        },
        
    }
</script>

<style lang="scss" scoped>

</style>
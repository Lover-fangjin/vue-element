import Tenant from '../views/basic/tenant/Tenant';
import User from '../views/basic/user/User.vue';
import Detail from '../views/basic/rule/Detail';

let basics = [
    {
        path: '/manage/tenant',
        name: 'tenant',
        component: Tenant,
        meta: { title: '租户管理' },
    },
    {
        path: '/manage/user',
        name: 'User',
        component: User,
        meta: { title: '用户管理' },
    },
    {
        path: '/manage/rule/detail',
        name: 'detail',
        component: Detail,
        meta: { title: '角色管理' },
        
    },
]


export default basics;
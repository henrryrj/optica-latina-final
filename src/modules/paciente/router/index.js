export default {
    name: 'paciente',
    component: () => import(/* webpackChunkName: "paciente" */ '@/modules/paciente/layouts/PacienteLayout.vue'),
    children:[
    ]

}
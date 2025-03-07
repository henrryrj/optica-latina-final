<template>
    <NavBar />
    <div class="row justify-content-center align-items-center" v-if="isLoading">
        <div class="col-4 alert alert-info text-center mt-5">
            Espere por favor ...
            <h3 class="mt-2"> <i class="fa fa-spin fa-sync"></i></h3>
        </div>
    </div>

    <main class="container p-4" v-else>
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a :class="['nav-link', { active: activeTab === 'pacientes' }]" id="home-tab" data-toggle="tab"
                    href="#paciente" role="tab" aria-controls="home" aria-selected="true"
                    @click="changeTab('pacientes')">Pacientes</a>
            </li>
            <li class="nav-item">
                <a :class="['nav-link', { active: activeTab === 'consultas' }]" id="profile-tab" data-toggle="tab"
                    href="#paciente" role="tab" aria-controls="profile" aria-selected="false"
                    @click="changeTab('consultas')">Consultas</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabControl">
            <div :class="['tab-pane fade', { active: activeTab === 'pacientes', show: activeTab === 'pacientes' }]"
                id="home" role="tabpanel" aria-labelledby="home-tab">
                <PacienteList />
            </div>
            <div :class="['tab-pane fade', { active: activeTab === 'consultas', show: activeTab === 'consultas' }]"
                id="profile" role="tabpanel" aria-labelledby="profile-tab">
                Consultas
            </div>
        </div>
    </main>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapState } from 'vuex'
export default {
    components: {

        NavBar: defineAsyncComponent(() => import('../components/NavBar.vue')),
        PacienteList: defineAsyncComponent(() => import('../components/PacienteList.vue')),
    },
    computed: {
        ...mapState('paciente', ['isLoading'])
    },
    created() {
        this.loadPacientes();
    },
    data() {
        return {
            activeTab: 'pacientes'
        }
    },
    methods: {
        ...mapActions('paciente', ['loadPacientes']),
        changeTab(tab) {
            this.activeTab = tab
        }
    }



}
</script>
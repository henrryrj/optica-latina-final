<template>
    <NavBar />
    <main class="container p-4">
        <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" id="home-tab" data-toggle="tab" href="#paciente" role="tab" aria-controls="home"
                    aria-selected="true" @click="changeTab('pacientes')">Pacientes</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" id="profile-tab" data-toggle="tab" href="#paciente" role="tab"
                    aria-controls="profile" aria-selected="false" @click="changeTab('consultas')">Consultas</a>
            </li>
        </ul>
        <div class="tab-content" id="myTabControl">
            <div :class="['tab-pane fade', { active: activeTab === 'pacientes', show: activeTab === 'pacientes' }]" id="home"
                role="tabpanel" aria-labelledby="home-tab">
                <PacienteList/>
            </div>
            <div :class="['tab-pane fade', { active: activeTab === 'consultas', show: activeTab === 'consultas' }]" id="profile"
                role="tabpanel" aria-labelledby="profile-tab">
                Consultas
            </div>
        </div>
    </main>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {

        NavBar: defineAsyncComponent(() => import('../components/NavBar.vue')),
        PacienteList: defineAsyncComponent(() => import('../components/PacienteList.vue')),
    },
    data() {
        return {
            activeTab:'pacientes'
        }
    },
    methods: {
        changeTab(tab) {
            this.activeTab = tab
        }
    }



}
</script>
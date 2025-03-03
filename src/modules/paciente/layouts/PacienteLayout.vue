<template>
    <NavBar />
    <main class="container p-4">
        <h1>Paciente Layout</h1>
        <div class="row d-flex justify-content-center">
            <div class="col-12 text-center">
                <button class="btn btn-primary btn-sm">
                    <i class="fas fa-plus text-white"></i><span class="d-none d-md-inline-block"> Nuevo </span></button>
                <button class="btn btn-info btn-sm m-2">
                    <i class="fas fa-pencil-alt mr-2"></i><span class="d-none d-md-inline-block"> Editar
                    </span></button>
                <button class="btn btn-danger btn-sm">
                    <i class="fas fa-trash-alt"></i><span class="d-none d-md-inline-block"> Eliminar </span></button>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 align-self-end">
                <div class="form-group">
                    <label for="">Pacientes</label>
                    <v-select label="nombre" :options="listaPacientes" v-model="paciente" @input="pacienteSelecionado"
                        ></v-select>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-sm table-primary">
                        <thead class="thead-dark">
                            <tr>
                                <th style="width:1px;">#</th>
                                <th scope="col" class="text-center"></th>
                                <th scope="col" class="text-center">Nombre</th>
                                <th scope="col" class="text-center">Celular</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr class="p-0">
                                <td colspan="4" class="p-0">
                                    <input class="form-control form-control-sm border-0 rounded-0"
                                        placeholder="Buscar..." autocomplete="off" />
                                </td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>
                                    <button class="btn btn-warning btn-sm tbl-btn-sm">
                                        <i class="fa-solid fa-eye mr-md-2"></i><span
                                            class="d-none d-md-inline-block">Ver Consultas</span>
                                    </button>
                                </td>
                                <td>Juan perez</td>
                                <td class="text-right">1234</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>
                                    <button class="btn btn-warning btn-sm tbl-btn-sm">
                                        <i class="fa-solid fa-eye mr-md-2"></i><span
                                            class="d-none d-md-inline-block">Ver Consultas</span>
                                    </button>
                                </td>
                                <td>Juan perez</td>
                                <td class="text-right">1234</td>
                            </tr>
                        </tbody>
                    </table>


                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {

        NavBar: defineAsyncComponent(() => import('../components/NavBar.vue'))
    },
    data() {
        return {
            listaPacientes: [],
            paciente: null,
        }
    },

    created() {
        this.listaPacientes = [
            { nombre: "Juan Pérez", celular: "78945612" },
            { nombre: "María Gómez", celular: "76543210" },
            { nombre: "Carlos Rodríguez", celular: "74185296" },
            { nombre: "Ana Fernández", celular: "69874512" },
            { nombre: "Luis Martínez", celular: "68794523" }
        ];
    },
    methods: {
        pacienteSelecionado(p){
            console.log('pacienteSelecionado',p)
        }
    }


}
</script>
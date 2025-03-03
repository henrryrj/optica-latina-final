<template>
    <h1>Paciente Layout</h1>
    <div class="row d-flex justify-content-center">
        <div class="col-12 text-center">
            <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i class="fas fa-plus"></i><span> Nuevo </span></button>
            <button class="btn btn-info btn-sm m-2">
                <i class="fas fa-pencil-alt me-2"></i><span> Editar
                </span></button>
            <button class="btn btn-danger btn-sm">
                <i class="fas fa-trash-alt"></i><span> Eliminar </span></button>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-sm-6 col-md-6 align-self-end">
            <div class="form-group">
                <label for="">Pacientes</label>
                <v-select label="nombre" :options="listaPacientes" v-model="paciente"
                    @input="pacienteSelecionado"></v-select>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-12">
            <div class="table-responsive">
                <table class="table table-sm table-bordered table-bg-primary">
                    <thead class="thead-dark ">
                        <tr>
                            <th style="width:1px;">#</th>
                            <th class="text-center"></th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Celular</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="p-0">
                            <td colspan="4" class="p-0">
                                <input class="form-control form-control-sm border-0 rounded-0" placeholder="Buscar..."
                                    autocomplete="off" />
                            </td>
                        </tr>
                        <!-- <tr :tabindex="filaTrasacSal" v-for="(item, index) in filteredList" :key="index"> -->
                        <tr>
                            <th scope="row">1</th>
                            <td>
                                <button class="btn btn-warning btn-sm">
                                    <i class="fa-solid fa-eye me-2"></i><span class="d-none d-md-inline-block">Ver
                                        Consultas</span>
                                </button>
                            </td>
                            <td>Juan perez</td>
                            <td class="text-end">1234</td>
                        </tr>
                    </tbody>
                </table>


            </div>
        </div>
    </div>


    <!-- Modal new -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        {{ modalMode == 0 ? 'NUEVO PACIENTE' : 'EDITAR PACIENTE' }}
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-12 form-group">
                        <label>Nombre</label>
                        <input type="text" class="form-control form-control-sm" placeholder="Ingrese un nombre">
                    </div>
                    <div class="col-12 form-group">
                        <label>Celular</label>
                        <input type="text" class="form-control form-control-sm"
                            placeholder="Ingrese un número de celular">

                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary btn-sm"> <i class="fas fa-save me-2"></i>
                        <span>Guardar</span></button>
                    <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    watch:{
        paciente(newValue,oldValue){
            console.log(newValue)
        }
    },
    data() {
        return {
            listaPacientes: [],
            paciente: null,
            modalMode: 0, // 0 = nuevo, 1 = editar
            filaTrasacSal: 0,
            
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
        pacienteSelecionado(p) {
            console.log('pacienteSelecionado', p)
        },
    }
}
</script>

<style></style>

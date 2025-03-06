<template>
  <h1>Gestionar Pacientes</h1>
  <div class="row d-flex justify-content-center">
    <div class="col-12 text-center">
      <button type="button" class="btn btn-primary btn-sm" @click="nuevo">
        <i class="fas fa-plus"></i><span> Nuevo </span>
      </button>
      <button class="btn btn-info btn-sm m-2" @click="editar">
        <i class="fas fa-pencil-alt me-2"></i><span> Editar </span>
      </button>
      <button class="btn btn-danger btn-sm" @click="eliminar">
        <i class="fas fa-trash-alt"></i><span> Eliminar </span>
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-6 align-self-end">
      <div class="form-group">
        <label for="">Pacientes</label>
        <v-select label="nombre" :options="listaPacientes" v-model="paciente"
          @update:modelValue="pacienteSelecionado"></v-select>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-12">
      <div class="table-responsive">
        <table class="table table-sm table-bordered">
          <thead class="table-info">
            <tr>
              <th style="width: 1px">#</th>
              <th class="text-center"></th>
              <th class="text-center">Nombre</th>
              <th class="text-center">Celular</th>
            </tr>
          </thead>

          <tbody>
            <tr class="p-0">
              <td colspan="4" class="p-0">
                <input class="form-control form-control-sm border-0 rounded-0" placeholder="Buscar..."
                  v-model="textoBusqueda" autocomplete="off" />
              </td>
            </tr>
            <tr :tabindex="filaTrasacSal" v-for="(item, index) in filteredList" :key="index"
              @click="seleccionarFila(index, item)" :class="{ 'table-active': filaTrasacSal === index }">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <button class="btn btn-warning btn-sm">
                  <i class="fa-solid fa-eye me-2"></i><span class="d-none d-md-inline-block">Ver Consultas</span>
                </button>
              </td>
              <td>{{ item.nombre }}</td>
              <td class="text-end">{{ item.celular }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <!-- Modal accesorio -->
  <div class="col-12 col-sm-10 col-md-10">
    <div class="modal" tabindex="-1" role="dialog" id="modalPaciente" ref="modalRef">
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content" v-if="formData">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ modalMode == 0 ? "NUEVO PACIENTE" : "EDITAR PACIENTE" }}
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="cerrar"></button>
          </div>
          <div class="modal-body">
            <div class="col-12 form-group">
              <label>Nombre</label>
              <input type="text" class="form-control form-control-sm" placeholder="Ingrese un nombre"
                v-model="formData.nombre" />
            </div>
            <div class="col-12 form-group">
              <label>Celular</label>
              <input type="text" class="form-control form-control-sm" placeholder="Ingrese un número de celular"
                v-model="formData.celular" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" @click="guardar" :disabled="loadingSave">
              <i class="fas fa-save me-2"></i> <span>Guardar</span>
            </button>
            <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" @click="cerrar">
              <i class="fas fa-times text-white me-2"></i><span>Cerrar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Fin de modal-->
</template>

<script>
import { Modal } from "bootstrap";
import { filterValueInclude } from "../../../helpers";
filterValueInclude;
export default {
  components: {},
  computed: {
    filteredList() {
      if (!this.listaPacientes || this.listaPacientes.length <= 0) {
        return [];
      }
      if (!this.textoBusqueda) {
        return this.listaPacientes;
      }
      const filterKey = ["id", "nombre", "celular"];
      return this.listaPacientes.filter((el) => {
        return filterValueInclude(this.textoBusqueda, el, filterKey);
      });
    },
  },
  data() {
    return {
      listaPacientes: [],
      textoBusqueda: "",
      paciente: null,
      filaTrasacSal: -1,
      modalMode: 0,
      esNuevo: true,
      loadingSave: false,
      modalInstance: null,
      formData: {
        id: null,
        nombre: "",
        celular: "",
      },
    };
  },

  mounted() {
    this.modalInstance = new Modal(this.$refs.modalRef);
  },
  created() {
    this.listaPacientes = [
      { id: 1, nombre: " Juan Pérez", celular: "78945612" },
      { id: 2, nombre: "María Gómez", celular: "76543210" },
      {
        id: 3,
        nombre: "Carlos Rodríguez",
        celular: "74185296",
      },
      {
        id: 4,
        nombre: "Ana Fernández",
        celular: "69874512",
      },
      { id: 5, nombre: "Luis Martínez", celular: "68794523" },
    ];
  },
  methods: {
    pacienteSelecionado() {
      console.log("pacienteSelecionado", this.paciente);
    },
    seleccionarFila(index, item) {
      this.filaTrasacSal = index;
      this.formData = { ...item };
    },
    okNuevo() {
      console.log("ok nuevo");
    },
    nuevo() {
      this.formData = { id: null, nombre: "", celular: "" };
      this.modalMode = 0;
      this.modalInstance.show();
    },
    editar() {
      this.modalMode = 1
      if (this.formData.id === null) {
        this.$toast.error('Seleccione un paciente de la lista');
        return;
      }
      this.modalInstance.show();
    },
    eliminar() {
      if (this.formData.id === null) {
        this.$toast.error('Seleccione un paciente de la lista');
        return;
      }
    },
    cerrar() {
      this.modalInstance.hide();
    },
    guardar(data) {
      console.log("guardar" + data);
      this.modalInstance.hide();
    },
  },
};
</script>

<style></style>

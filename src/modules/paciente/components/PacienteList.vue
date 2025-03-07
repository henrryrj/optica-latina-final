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
        <v-select label="nombre" :options="getPacientes" v-model="paciente"
          @update:modelValue="pacienteSelecionado"></v-select>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-12">
      <div class="table-responsive" style="max-height: 400px; overflow-y: auto; scrollbar-width: none;">
        <table class="table table-sm table-bordered ">
          <thead class="table-info sticky-top" style="z-index: 1020;">
            <tr>
              <th style="width: 1px">#</th>
              <th class="text-center"></th>
              <th class="text-center">Fecha</th>
              <th class="text-center">Nombre</th>
              <th class="text-center">Celular</th>
            </tr>
          </thead>

          <tbody>
            <tr class="p-0 sticky-top" style="top: 38px; background: white; z-index: 1010;">
              <td colspan="5" class="p-0">
                <input class="form-control form-control-sm border-0 rounded-0" placeholder="Buscar..."
                  v-model="textoBusqueda" autocomplete="off" />
              </td>
            </tr>
            <tr :tabindex="filaTrasacSal" v-for="(item, index) in filteredList" :key="index"
              @click="seleccionarFila(index, item)" :class="{ 'table-active': filaTrasacSal === index }">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <button class="btn btn-warning btn-sm">
                  <i class="fas fa-eye me-0 me-md-2"></i><span class="d-none  d-md-inline-block">Ver Consultas</span>
                </button>
                <button class="btn btn-info btn-sm m-2" @click="editar">
                  <i class="fas fa-pencil-alt"></i>
                </button>
                <button class="btn btn-danger btn-sm" @click="eliminar">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
              <td>{{ item.fecha }}</td>
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
    <div class="modal" tabindex="-1" aria-label="true" role="dialog" id="modalPaciente" ref="modalRef">
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
              <input type="text" class="form-control form-control-sm text-uppercase" placeholder="Ingrese un nombre"
                v-model.trim="formData.nombre" />
            </div>
            <div class="col-12 form-group">
              <label>Celular</label>
              <input type="text" class="form-control form-control-sm" placeholder="Ingrese un número de celular"
                v-model.trim="formData.celular" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-sm" @click="guardar" :disabled="loadingSave">
              <i class="fas fa-save me-2"></i> <span>{{ modalMode == 0 ? "Guardar" : "Editar" }}</span>
            </button>
            <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" aria-label="Close"
              @click="cerrar">
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
import { Modal } from 'bootstrap';
import { mapGetters, mapActions } from "vuex";
import { filterValueInclude } from "../../../helpers";
import Swal from "sweetalert2";

filterValueInclude;
export default {
  components: {},
  computed: {
    ...mapGetters("paciente", ["getPacientes"]),
    filteredList() {
      if (!this.getPacientes || this.getPacientes.length <= 0) {
        return [];
      }
      if (!this.textoBusqueda) {
        return this.getPacientes;
      }
      const filterKey = ["id", "fecha", "nombre", "celular"];
      return this.getPacientes.filter((el) => {
        return filterValueInclude(this.textoBusqueda, el, filterKey);
      });
    },
  },
  data() {
    return {
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
        fecha: new Date(),
        celular: "",
      },
    };
  },

  mounted() {
    this.modalInstance = new Modal(this.$refs.modalRef);
  },
  created() { },
  methods: {
    ...mapActions('paciente', ['loadPaciente', 'updatePaciente', 'createPaciente', 'delPaciente', 'nombreExiste']),
    pacienteSelecionado() {
      console.log("pacienteSelecionado", this.paciente);
    },
    seleccionarFila(index, item) {
      this.filaTrasacSal = index;
      this.formData = { ...item };
    },
    nuevo() {
      this.limpiarFormData();
      this.modalMode = 0;
      this.modalInstance.show();
    },
    editar() {
      this.modalMode = 1;
      if (this.formData.id === null) {
        this.$toast.error("Seleccione un paciente de la lista");
        return;
      }
      this.modalInstance.show();
    },
    eliminar() {
      if (this.formData.id === null) {
        this.$toast.error("Seleccione un paciente de la lista");
        return;
      }

      Swal.fire({
        title: `¿Estás seguro que quiere eliminar a ${this.formData.nombre}?`,
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
          this.delPaciente(this.formData);
          this.$toast.success("Paciente eliminado correctamente");
          this.limpiarFormData();
        }
      });
    },
    cerrar() {
      this.modalInstance.hide();
    },
    async guardar() {
      this.loadingSave = true;
      if (this.formData.nombre === "") {
        this.$toast.error('El Nombre no puede ser vació');
        return;
      }
      if (this.modalMode === 0) {
        const existePaciente = await this.nombreExiste(this.formData.nombre);
        if (existePaciente) {
          this.$toast.error(`El Paciente ${this.formData.nombre} ya existe`);
          return;
        }
        this.createPaciente(this.formData);
      } else {
        this.updatePaciente(this.formData);
      }
      this.$toast.success("Cambios guardados correctamente");
      this.modalInstance.hide();
      this.limpiarFormData();
      this.loadingSave = false;
    },
    limpiarFormData() {
      this.filaTrasacSal = -1;
      this.formData = { id: null, fecha: new Date(), nombre: "", celular: "" };
    }
  },
};
</script>

<style>

</style>

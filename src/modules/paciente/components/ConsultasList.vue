<template>
    <h1>Consultas</h1>
    <div class="row d-flex justify-content-center">
        <div class="col-12 text-center">
            <button type="button" class="btn btn-primary btn-sm" @click="nuevaConsulta">
                <i class="fas fa-plus"></i><span> Nueva Consulta </span>
            </button>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-sm-8 col-md-6 align-self-end" style="z-index: 1030;">
            <div class="form-group">
                <label for="">Seleccione un paciente</label>
                <v-select label="nombre" :options="getPacientes" v-model="pacienteConsulta"
                    @update:modelValue="pacienteSeleccionadoConsulta"></v-select>
            </div>
        </div>
    </div>
    <div class="row mt-2">
        <div class="col-12">
            <div class="table-responsive" style="max-height: 400px; overflow-y: auto; scrollbar-width: none;">
                <table class="table table-sm table-bordered ">
                    <thead class="table-success sticky-top" style="z-index: 1020;">
                        <tr>
                            <th style="width: 1px">#</th>
                            <th class="text-center"></th>
                            <th class="text-center">Fecha</th>
                            <th class="text-center">Medida</th>
                            <th class="text-center">llevo montura</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr class="p-0 sticky-top" style="top: 38px; background: white; z-index: 1010;">
                            <td colspan="5" class="p-0">
                                <input class="form-control form-control-sm border-0 rounded-0" placeholder="Buscar..."
                                    v-model="textoBusqueda" autocomplete="off" />
                            </td>
                        </tr>
                        <tr>
                            <td colspan="5" class="text-center" v-if="filteredList.length === 0">{{ paciente === null ?
                                'SELECCIONE UN PACIENTE' : 'NO HAY DATOS' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <!-- ?MODAL NUEVO PACIENTE -->
    <div class="col-12 col-sm-10 col-md-10">
        <div class="modal" tabindex="-1" aria-label="true" role="dialog" id="modalPacienteConsulta"
            ref="modalRefPacienteConsulta" style="z-index: 1056;">
            <div class="modal-dialog modal-dialog-scrollable" role="document">
                <div class="modal-content" v-if="formData">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            NUEVO PACIENTE
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="cerrarPaciente"></button>
                    </div>
                    <div class="modal-body">
                        <div class="col-12 form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control form-control-sm text-uppercase"
                                placeholder="Ingrese un nombre" v-model.trim="formData.nombre" />
                        </div>
                        <div class="col-12 form-group">
                            <label>Celular</label>
                            <input type="text" class="form-control form-control-sm"
                                placeholder="Ingrese un número de celular" v-model.trim="formData.celular" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-sm" @click="guardarPaciente"
                            :disabled="loadingSavePaciente">
                            <i class="fas fa-save me-2"></i> <span>Guardar</span>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" aria-label="Close"
                            @click="cerrarPaciente">
                            <i class="fas fa-times text-white me-2"></i><span>Cerrar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ?END MODAL NUEVO PACIENTE -->
    <!-- ?MODAL NUEVA CONSULTA -->
    <div class="col-12 col-sm-10 col-md-10">
        <div class="modal" tabindex="-1" aria-label="true" role="dialog" id="modalNuevaConsulta"
            ref="modalRefNuevaConsulta" style="z-index: 1055;">
            <div class="modal-dialog modal-lg modal-dialog-scrollable" role="document">
                <div class="modal-content" v-if="formData">
                    <div class="modal-header">
                        <h5 class="modal-title">
                            NUEVA CONSULTA
                        </h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            @click="cerrarPaciente"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-9 col-sm-6 col-md-6 align-self-end" style="z-index: 1030;">
                                <div class="form-group">
                                    <label for="lugar" class="form-label">Lugar</label>
                                    <v-select label="nombre" :options="suc" v-model="formDataConsulta.suc"></v-select>
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-auto">
                                <div class="form-group">
                                    <label for="fechaR" class="form-label">F. Registro</label>
                                    <input type="date" id="fechaR" class="form-control form-control-sm"
                                        v-model="formDataConsulta.fechaR" />
                                </div>
                            </div>
                        </div>
                        <div class="row mt-2">
                            <div class="col-12 col-sm-6 col-md-auto">
                                <div class="form-group">
                                    <label for="fechaR" class="form-label">F. Entrega</label>
                                    <input type="date" id="fechaR" class="form-control form-control-sm"
                                        v-model="formDataConsulta.fechaR" />
                                </div>
                            </div>
                            <div class="col-12 col-sm-6 col-md-auto">
                                <div class="form-group">
                                    <label for="horaE" class="form-label">Hrs.</label>
                                    <input type="time" id="horaE" class="form-control form-control-sm"
                                        v-model="formDataConsulta.horaE" />
                                </div>
                            </div>
                        </div>
                        <div class="row mt 2">
                            <div class="col-10 col-sm-7 col-md-6 align-self-end" style="z-index: 1030;">
                                <div class="form-group">
                                    <label for="">Seleccione un paciente</label>
                                    <v-select label="nombre" :options="getPacientes" v-model="paciente"
                                        @update:modelValue="pacienteSeleccionado"></v-select>
                                </div>
                            </div>
                            <div class="col-auto text-center align-self-end pad-button px-sm-0 px-md-0  mt-2 mt-sm-0 mt-md-0"
                                v-if="paciente === null">
                                <button type="button" class="btn btn-primary btn-sm" @click="nuevoPaciente">
                                    <i class="fas fa-plus me-0 me-sm-0 me-md-2"></i><span
                                        class="d-none  d-md-inline-block">nuevo</span>
                                </button>
                            </div>
                            <div class="col-auto text-center align-self-end mt-2 mt-sm-0 mt-md-0">
                                <label>
                                    <input type="checkbox" value="Lejos" v-model="formDataConsulta.lejos"> Lejos
                                </label>
                            </div>
                            <div class="col-auto text-center align-self-end px-0  mt-2 mt-sm-0 mt-md-0">
                                <label>
                                    <input type="checkbox" value="cerca" v-model="formDataConsulta.cerca"> Cerca
                                </label>
                            </div>

                        </div>
                        <div class="row mt-2" v-if="formDataConsulta.lejos || formDataConsulta.cerca">
                            <div v-for="(medida, index) in medidasFiltradas" :key="index"
                                class="col-12 col-sm-12 col-md-6">
                                <fieldset class="border border-info p-2 rounded">
                                    <legend class="float-none w-auto h6 text-center">{{ index === 0 ? 'Lejos' : 'Cerca'
                                        }}</legend>
                                    <div class="row mt-2">
                                        <div v-for="(valor, key) in medida.oi" :key="`oi-${index}-${key}`"
                                            class="col-12 col-sm-4 col-md-4 form-group">
                                            <label>{{ 'O.I. ' + key.charAt(0).toUpperCase() + key.slice(1) }}</label>
                                            <input type="text" class="form-control form-control-sm" placeholder="0,00"
                                                v-model.trim="formDataConsulta.medidas[index].oi[key]"
                                                @input="validarInput($event, index, 'oi', key)" />
                                        </div>
                                        <div v-for="(valor, key) in medida.od" :key="`od-${index}-${key}`"
                                            class="col-12 col-sm-4 col-md-4 form-group">
                                            <label>{{ 'O.D. ' + key.charAt(0).toUpperCase() + key.slice(1) }}</label>
                                            <input type="text" class="form-control form-control-sm" placeholder="0,00"
                                                v-model.trim="formDataConsulta.medidas[index].od[key]"
                                                @input="validarInput($event, index, 'od', key)" />
                                        </div>
                                    </div>
                                </fieldset>
                            </div>
                        </div>


                        <div class="row mt-2">
                            <div class="col-12 col-sm-6 col-md-6">
                                <fieldset class="border p-2 rounded">
                                    <legend class="float-none w-auto h6" style="">Montura</legend>
                                    <div class="form-group">
                                        <label>Modelo</label>
                                        <input type="text" class="form-control form-control-sm"
                                            v-model.trim="formDataConsulta.modelo" />
                                    </div>
                                    <div class="form-group">
                                        <label>Cristales</label>
                                        <input type="text" class="form-control form-control-sm"
                                            v-model.trim="formDataConsulta.cristales" />
                                    </div>
                                    <div class="form-group">
                                        <label>D.P.</label>
                                        <input type="text" class="form-control form-control-sm"
                                            v-model.trim="formDataConsulta.dp" />
                                    </div>
                                </fieldset>
                            </div>
                            <div class="col-12 col-sm-6 col-md-6">
                                <fieldset class="border p-2 rounded">
                                    <legend class="float-none w-auto h6" style="">Costo</legend>
                                    <div class="form-group">
                                        <label>Precio</label>
                                        <input type="Number" class="form-control form-control-sm" min="1"
                                            v-model.trim="formDataConsulta.precio" />
                                    </div>
                                    <div class="form-group">
                                        <label>Cuenta</label>
                                        <input type="Number" class="form-control form-control-sm" min="1"
                                            v-model.trim="formDataConsulta.cuenta" />
                                    </div>
                                    <div class="form-group">
                                        <label>Saldo.</label>
                                        <input type="Number" class="form-control form-control-sm bg-info text-light"
                                            v-model.trim="saldo" disabled />
                                    </div>
                                </fieldset>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-sm" :disabled="loadingSavePacienteConsulta">
                            <i class="fas fa-save me-2"></i> <span>Guardar</span>
                        </button>
                        <button type="button" class="btn btn-danger btn-sm" data-bs-dismiss="modal" aria-label="Close"
                            @click="cerrarPaciente">
                            <i class="fas fa-times text-white me-2"></i><span>Cerrar</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ?END MODAL NUEVA CONSULTA -->

</template>

<script>
import { filterValueInclude, formatDate, formatTime } from '@/helpers';
import { mapActions, mapGetters, ac } from 'vuex';
import { Modal } from 'bootstrap';
export default {

    data() {
        return {
            suc: ['GUAYARAMERÍN', 'RIBERALTA'],
            textoBusqueda: "",
            pacienteConsulta: null,
            paciente: null,
            modalPaciente: null,
            modalConsulta: null,
            loadingSavePaciente: false,
            loadingSavePacienteConsulta: false,
            formData: null,
            formDataConsulta: null,
            lastValidValue: ""
        }
    },
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
        saldo() {
            return (this.formDataConsulta.precio - this.formDataConsulta.cuenta).toFixed(2)
        }, medidasFiltradas() {
            return this.formDataConsulta.medidas.filter((medida, index) => {
                if (index === 0 && this.formDataConsulta.lejos) return true;
                if (index === 1 && this.formDataConsulta.cerca) return true;
                return false;
            });
        }
    },
    mounted() {
        this.limpiarFormData();
        this.limpiarFormDataConsulta();
        this.modalPaciente = new Modal(this.$refs.modalRefPacienteConsulta);
        this.modalConsulta = new Modal(this.$refs.modalRefNuevaConsulta);
    },
    methods: {
        ...mapActions('paciente', ['createPaciente', 'nombreExiste']),
        pacienteSeleccionado() {
            console.log("pacienteSelecionado", this.paciente);
            if (!this.paciente) {
                this.formDataConsulta.pacienteId = null;
                return;
            };
            this.formDataConsulta.pacienteId = this.paciente.id;
        },
        pacienteSeleccionadoConsulta() {
            console.log("pacienteSelecionado", this.pacienteConsulta);
        },
        nuevaConsulta() {

        },
        nuevoPaciente() {
            this.limpiarFormData();
            this.modalPaciente.show();
        },
        cerrarPaciente() {
            this.modalPaciente.hide();
        },
        nuevaConsulta() {
            this.limpiarFormDataConsulta();
            this.modalConsulta.show();
        },
        cerrarConsulta() {
            this.modalConsulta.hide();
        },
        async guardarPaciente() {
            try {
                this.loadingSavePaciente = true;
                if (this.formData.nombre === "") {
                    this.$toast.error('El Nombre no puede ser vació');
                    return;
                }

                const existePaciente = await this.nombreExiste(this.formData.nombre);
                if (existePaciente) {
                    this.$toast.error(`El Paciente ${this.formData.nombre} ya existe`);
                    return;
                }
                await this.createPaciente(this.formData);
                this.paciente = { ...this.getPacientes[0] };
                this.formDataConsulta.pacienteId = this.paciente.id;
                this.$toast.success("Cambios guardados correctamente");
                this.cerrarPaciente();
                this.limpiarFormData();
            } catch (e) {
                this.$toast.error(e.m);

            } finally {
                this.loadingSavePaciente = false;
            }

        },
        validarInput(event, index, type, key) {
            const value = event.target.value;
            const regexSign = /^[+-]$/;
            const regexDigit = /^\d$/;
            const regexDotOrComma = /^[.,]$/;

            if (key !== 'en') {
                if (value[0] && regexSign.test(value[0]) && value.length > 6) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[0] && !regexSign.test(value[0]) && value.length > 5) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[0] && !regexSign.test(value[0]) && !regexDigit.test(value[0])) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[1] && (!regexDigit.test(value[1]))) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[0] && regexDigit.test(value[0]) && value[2] && (!regexDotOrComma.test(value[2]))) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[0] && regexSign.test(value[0]) && value[2] && (!regexDigit.test(value[2]))) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[0] && regexSign.test(value[0]) && value[3] && (!regexDotOrComma.test(value[3]))) {
                    event.target.value = value.slice(0, -1);
                }
                if (value[0] && !regexSign.test(value[0]) && value[3] && (!regexDigit.test(value[3]))) {
                    event.target.value = value.slice(0, -1);
                }
            } else {
                if (value && (value.includes(',') || value.includes('.')) && value.length > 5) {
                    event.target.value = value.slice(0, -1);
                }

                let cadena = value.replace(',', '.');
                let numValue = Number(cadena);

                if (isNaN(numValue) || numValue < 0 || numValue > 360) {
                    event.target.value = '';
                }
            }
            // Si necesitas acceder al valor dentro de `formDataConsulta`
            this.formDataConsulta.medidas[index][type][key] = event.target.value;
        },
        limpiarFormData() {
            this.filaTrasacSal = -1;
            this.formData = { id: null, fecha: new Date(), nombre: "", celular: "" };
        },
        limpiarFormDataConsulta() {
            this.formDataConsulta = {
                id: null,
                pacienteId: null,
                suc: 'GUAYARAMERÍN',
                fechaR: formatDate(new Date(), true),
                fechaE: formatDate(new Date(), true),
                horaE: formatTime(new Date()),
                lejos: false,
                cerca: false,
                medidas: [{
                    oi: {
                        esf: "",
                        cil: "",
                        en: ""
                    },
                    od: {
                        esf: "",
                        cil: "",
                        en: ""
                    }
                }, {
                    oi: {
                        esf: "",
                        cil: "",
                        en: ""
                    },
                    od: {
                        esf: "",
                        cil: "",
                        en: ""
                    }
                }],
                modelo: "",
                cristales: "",
                dp: "",
                precio: 0.00,
                cuenta: 0.00,
            }
        }
    }
}
</script>

<style scoped>
@media (min-width: 352px) {
    .pad-button {
        padding-left: 0px;
        padding-right: 0px;
    }
}
</style>
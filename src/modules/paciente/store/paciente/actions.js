// export const myAction = async ({ commit }) => {

import opticaApi from "@/api/opticaApi"
import { formatDate, _formatDateTime } from "@/helpers";

// }

export const loadPacientes = async ({ commit }) => {
    let { data } = await opticaApi.get('/pacientes.json');
    let pacientes = [];
    for (let id of Object.keys(data)) {
        pacientes.push({
            id,
            ...data[id],
            fecha: formatDate(data[id].fecha)
        })
    }
    commit('setPacientes', pacientes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha)));

}
export const updatePaciente = async ({ commit }, paciente) => {
    let { fecha, nombre, celular } = paciente;
    nombre = nombre.toUpperCase();
    const dataToSave = { fecha, nombre, celular };
    await opticaApi.put(`/pacientes/${paciente.id}.json`, dataToSave);
    commit('updatePaciente', { id: paciente.id, ...dataToSave })

}
export const createPaciente = async ({ commit }, paciente) => {
    let { fecha, nombre, celular } = paciente;
    nombre = nombre.toUpperCase();
    const dataToSave = { fecha, nombre, celular };
    const { data } = await opticaApi.post(`/pacientes.json`, dataToSave);

    commit('createPaciente', { id: data.name, ...dataToSave, fecha: formatDate(fecha), })
}
export const delPaciente = async ({ commit }, paciente) => {
    await opticaApi.delete(`/pacientes/${paciente.id}.json`);
    commit('delPaciente', { ...paciente })
}
export const nombreExiste = async ({ commit }, nombre) => {
    const nombreMayus = nombre.toUpperCase();
    const { data } = await opticaApi.get(`/pacientes.json`);

    if (!data) return false;

    const pacientes = Object.values(data);
    return pacientes.some(paciente => paciente.nombre.toUpperCase() == nombreMayus);
};


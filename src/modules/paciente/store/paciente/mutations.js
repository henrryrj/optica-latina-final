// export const myMytation = ({state}) => {
// }

export const setPacientes = (state, newPacientes) => {
    state.pacientes = [...state.pacientes, ...newPacientes];
    state.isLoading = false;

}
export const updatePaciente = (state, paciente) => {
    const idx = state.pacientes.map(e => e.id).indexOf(paciente.id);
    state.pacientes[idx] = paciente

}
export const createPaciente = (state, newPacientes) => {
    state.pacientes = [{ ...newPacientes }, ...state.pacientes];
}
export const delPaciente = (state, paciente) => {
    const idx = state.pacientes.map(e => e.id).indexOf(paciente.id);
    state.pacientes.splice(idx, 1);
}
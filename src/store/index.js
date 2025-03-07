import { createStore } from 'vuex'
import paciente from '../modules/paciente/store/paciente'
const store = createStore({
  modules: {
    paciente
  }
})
export default store

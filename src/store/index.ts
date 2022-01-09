import {createStore, Store} from "vuex";
import {InjectionKey} from "vue";
import {State} from "@/store/interface";
import state from "@/store/state";
import mutations from "@/store/mutations";
import actions from "@/store/actions";

export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore({
    state,
    mutations,
    actions,
})

export default store

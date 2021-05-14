import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        workspace: 0,
        blocklyLocale: (["en", "fr", "pt"].includes(navigator.language.split("-")[0]) ? navigator.language.split("-")[0] : "en"),
        tourDone: false
    },
    mutations: {
        setWorkspace (state, { workspace }) {
            state.workspace = workspace;
        },
        setLocale (state, { newLocale }) {
            state.blocklyLocale = newLocale;
            localStorage.setItem('blocklyLocale', newLocale);
        },
        setTour (state, { status }){
            state.tourDone = status;
            localStorage.setItem('tourDone', status);
        },
        setTheme(state,{ newTheme }){
            state.blocklyTheme = newTheme;
            localStorage.setItem('blocklyTheme', newTheme);
        }
    }
});

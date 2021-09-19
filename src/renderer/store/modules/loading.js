export default {
    state :() =>({
        project: false,
    }),
    mutations: {
        setLoadingProject(state, payload){
            state.project = payload;
        }
    },
}
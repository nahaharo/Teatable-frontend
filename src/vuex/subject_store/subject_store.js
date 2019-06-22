import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    actions: {
        init_subs: context => {
            axios.get("/response.json").then(res => {
                context.commit("setsubs", {subs: res.data[0]});
            }).catch( () => {
                alert("Fail to load subject list.");
            });
        }
    },
    getters: {
        get_typed_subs: state=> sub_type=> {return state[sub_type];},
        get_subs: state => {return state.subs;}
    },
    mutations: {
        addsubject: (state, payload) => {
            // payload has this structure
            // {type: "type of subjects, ex) fix_subs, req_subs, sel_subs", data: No of subject}
            let sub_type = payload.type;
            let subs = state[sub_type];
            let data = payload.sub_No;

            let sub_add = state.subs[data];

            if(subs.length > 0)
            {
                for (let sub of subs)
                {
                    if(sub["과목번호"] === sub_add["과목번호"])
                    {
                        alert("동일한 과목이 이미 목록에 있습니다.");
                        return;
                    }
                }
            }
            subs.push(sub_add);
        },
        delsubject: (state, payload) => {
            // payload has this structure
            // {type: "type of subjects, ex) fix_subs, req_subs, sel_subs", data: No of subject}
            let sub_type = payload.type;
            let data = payload.sub_No;
            let subs = state[sub_type];

            const idx = subs.findIndex(item => {return item.No === data;});
            subs.splice(idx,1);
        },
        setsubs: (state, payload) => {
            state.subs = payload.subs;
        }
    },
    state : {
        subs: [],
        fix_subs: [],
        req_subs: [],
        sel_subs: []
    },
});
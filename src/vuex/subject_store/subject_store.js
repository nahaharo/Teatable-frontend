import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    actions: {
        init_subs: context => {
            axios.get("http://127.0.0.1:5000/").then(res => {
                let head = res.data["head"];
                let body = res.data["body"];

                let ans = {};
                for(let sub_code in body)
                {
                    ans[sub_code] = [];
                    for(let sub_array of body[sub_code])
                    {   
                        let sub = {};
                        for(let i=0; i<sub_array.length; i++)
                        {
                            sub[head[i]] = sub_array[i];
                        }
                        
                        ans[sub_code].push(sub);
                    }
                }
                context.commit("setsubs", {subs: ans});
            }).catch( err => {
                //alert("Fail to load subject list.");
                // eslint-disable-next-line
                console.log(err);
            });
        }
    },
    getters: {
        get_typed_subs: state=> sub_type=> {return state[sub_type];},
        get_subs: state => {
            return state.subs;
        }
    },
    mutations: {
        addsubject: (state, payload) => {
            // payload has this structure
            // {type: "type of subjects, ex) fix_subs, req_subs, sel_subs", code: code of subject, num: class num of subject}
            let sub_type = payload.type;
            let subs = state[sub_type];
            let code = payload.code;
            let num = payload.num;

            let sub_add = state.subs[code][num];
            // eslint-disable-next-line
            console.log(payload);
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
            // {type: "type of subjects, ex) fix_subs, req_subs, sel_subs", code: code of subject, num: class num of subject}
            let sub_type = payload.type;
            let code = payload.code;
            let num = payload.num;
            let subs = state[sub_type];

            const idx = subs.findIndex(item => {return item['과목코드'] === code && item['분반'] === num});
            subs.splice(idx,1);
        },
        setsubs: (state, payload) => {
            state.subs = payload.subs;
        },
        reset(state) {
            state.fix_subs = [];
            state.req_subs = [];
            state.sel_subs = [];
        } 
    },
    state : {
        subs: [],
        fix_subs: [],
        req_subs: [],
        sel_subs: [],
    },
});
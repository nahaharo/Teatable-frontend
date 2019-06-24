import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state : {
        subs: {},
        fix_subs: [],
        req_subs: (sessionStorage.req_subs ? JSON.stringify(sessionStorage.req_subs) : []),
        sel_subs: (sessionStorage.sel_subs ? JSON.stringify(sessionStorage.sel_subs) : []),
    },
    actions: {
        init_subs: context => {
            axios.get("http://127.0.0.1:5000/").then(res => {
                let head = res.data["head"];
                let body = res.data["body"];

                let ss = sessionStorage;

                let ans = {};
                if(ss.getItem("subs"))
                {
                    ans = JSON.parse(ss.getItem("subs")) ;
                }
                else
                {
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
                    ss.setItem("subs", JSON.stringify(ans));
                }

                context.commit("setsubs", {subs: ans});
                
                if (ss.fix_subs && ss.req_subs && ss.sel_subs)
                {
                    context.commit("settypedsubs", {type: "fix_subs", subs: JSON.parse(ss.getItem("fix_subs"))});
                    context.commit("settypedsubs", {type: "req_subs", subs: JSON.parse(ss.getItem("req_subs"))});
                    context.commit("settypedsubs", {type: "sel_subs", subs: JSON.parse(ss.getItem("sel_subs"))});
                }
            }).catch( err => {
                alert("Fail to load subject list.");
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
            // payload has this structure
            // {subs: subject dictonary will be used for update subs}
            state.subs = payload.subs;
        },
        settypedsubs: (state, payload) => {
            // payload has this structure
            // {type: "type of subjects, ex) fix_subs, req_subs, sel_subs", subs: subject dictonary will be used for update type of subs}
            let sub_type = payload.type;
            state[sub_type] = payload.subs;
        },
        reset_sub(state) {
            state.fix_subs = [];
            state.req_subs = [];
            state.sel_subs = [];
        },
        submit(state) {
            sessionStorage.fix_subs = JSON.stringify(state.fix_subs);
            sessionStorage.req_subs = JSON.stringify(state.req_subs);
            sessionStorage.sel_subs = JSON.stringify(state.sel_subs);
        }
    },
});
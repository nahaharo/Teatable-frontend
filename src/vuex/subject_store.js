import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import router from '../router'

Vue.use(Vuex);

export default new Vuex.Store({
    actions: {
        init_subs: async context => {
            let ss = sessionStorage;
            
            if (ss.getItem("fix_subs") && ss.getItem("req_subs") && ss.getItem("sel_subs"))
            {
                context.commit("settypedsubs", {type: "fix_subs", subs: JSON.parse(ss.getItem("fix_subs"))});
                context.commit("settypedsubs", {type: "req_subs", subs: JSON.parse(ss.getItem("req_subs"))});
                context.commit("settypedsubs", {type: "sel_subs", subs: JSON.parse(ss.getItem("sel_subs"))});
            }
            
            if(ss.getItem("subs"))
            {
                let ans = JSON.parse(ss.getItem("subs"));
                context.commit("setsubs", {subs: ans});
            }
            else
            {
                await axios.get("/response.json").then(res => {//http://127.0.0.1:5000/
                    let head = res.data["head"];
                    let body = res.data["body"];
                    
                    let data = {};

                    for(let sub_idx in body)
                    {   
                        let sub = body[sub_idx];
                        if(data[sub[1]]=== undefined) data[sub[1]] = [];
                        
                        let sub_dict = {};
                        for(let col_idx in sub)
                        {
                            sub_dict[head[col_idx]] = sub[col_idx];
                        }
                        sub_dict["분반"]-=1;
                        data[sub[1]].push(sub_dict);
                    }
                    ss.setItem("subs", JSON.stringify(data));
                    context.commit("setsubs", {subs: data});
                }).catch( err => {
                    alert("Fail to load subject list.");
                    // eslint-disable-next-line
                    console.log(err);
                });
            }  
        }
    },
    getters: {
        get_typed_subs: state=> sub_type=> {return state[sub_type];},
        get_subs: state => { return state.subs; },
        get_subs_list: state => {
            let ans = [];
            for(let sub_code in state.subs)
            {
                for(let sub of state.subs[sub_code])
                {   
                    ans.push(sub);
                }
            }
            return ans;
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
            
            let tmp = subs;
            const idx = tmp.findIndex(item => {return item['과목번호'] === code && item['분반'] === num});
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
    router,
    state : {
        subs: {},
        fix_subs: [],
        req_subs: [],
        sel_subs: [],
    },
});
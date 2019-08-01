<template>
    <div>
        <table class="subtable">
            <thead>
                <tr>
                    <th></th>
                    <th>월</th>
                    <th>화</th>
                    <th>수</th>
                    <th>목</th>
                    <th>금</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(n, idx) in 31" :key="idx">
                    <td>{{`${(((n-1)/2) >> 0) + 9}:${((n-1)>>0)%2 ? '30' : '00'}`}}</td>
                    <td :ref="`1-${(n-1)*30 + 9*60}`"></td>
                    <td :ref="`2-${(n-1)*30 + 9*60}`"></td>
                    <td :ref="`3-${(n-1)*30 + 9*60}`"></td>
                    <td :ref="`4-${(n-1)*30 + 9*60}`"></td>
                    <td :ref="`5-${(n-1)*30 + 9*60}`"></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from 'axios';

import getColors from "../../tools/colors"
import config from "../../assets/config.json"

export default {
    data() {return {comb: [], idx: 0}},
    computed: {
        fix () {return this.$store.getters.get_typed_subs("fix_subs")},
        req () {return this.$store.getters.get_typed_subs("req_subs")},
        sel () {return this.$store.getters.get_typed_subs("sel_subs")},
        subs() {return this.$store.getters.get_subs_list},
    },
    created() {
        let fixsub = [];
        let reqsub = [];
        let selsub = [];
        for(let s of this.fix) { fixsub.push([s["과목번호"], s["분반"]]); }
        for(let s of this.req) { reqsub.push(s["과목번호"]); }
        for(let s of this.sel) { selsub.push(s["과목번호"]); }

        let url =config.Comb_URL_prefix+this.make_query({"fix": fixsub, "req": reqsub, "sel": selsub});

        axios.post(url).then(
            res => {
                if(res.data.s==="f")
                {
                    alert(res.data.msg);
                    this.$router.push("/");
                    return;
                }
                if(!res.data.comb.length)
                {
                    alert("조합이 없습니다.");
                    this.$router.push("/");
                    return;
                }
                this.comb = res.data.comb;
                this.show_table();
                this.$emit('updated');
            }
        ).catch( err => {
            // eslint-disable-next-line
            console.log(err);
        });
    },
    methods: {
        get_current_credit() {
            let subs = this.comb[this.idx];
            let sum = 0;
            for(let e of subs.map(x => this.subs[x]))
            {
                sum += Number(e.학점);
            }
            return sum;
        },
        make_query(params) {
            let esc = encodeURIComponent;
            return Object.keys(params)
            .map(k => esc(k) + '=' + esc(JSON.stringify(params[k])))
            .join('&');
        },
        next() {
            this.idx = (this.idx+1)%this.comb.length;
            this.reset();
            this.show_table();
            this.$emit('updated');
        },
        previous() {
            this.idx = (this.idx+this.comb.length-1)%this.comb.length;
            this.reset();
            this.show_table();
            this.$emit('updated');
        },
        reset() {
            for(let i = 9*60; i<=24*60;)
            {
                for(let j=1; j<=5; j++)
                { 
                    let elem = this.$refs[j+'-'+i][0];
                    try{
                        elem.innerHTML = "";
                        elem.rowSpan = "1";
                        elem.style.backgroundColor = "";
                        elem.style.display = ""
                    }
                    catch (err){
                        // eslint-disable-next-line
                        console.log("err: " + j+'-'+i);
                        // eslint-disable-next-line
                        console.log("err: "+ this.$refs[j+'-'+i]);
                    }
                }
                i += 30;
            }
        },
        show_table() {
            let days = {'월':1,'화':2,'수':3,'목':4,'금':5};
            let sub_num = this.comb[this.idx];
            let subs = sub_num.map(x => this.subs[x]);
            let colors = getColors();
            for(let [color_idx, sub] of subs.entries())
            {
                let subday = [];
                let blocks = [];
                for(let key in sub.시간)//make day array
                {
                    for(let tmp of sub.시간[key])
                    {
                        subday.push(days[key]);
                        blocks.push(tmp);
                    }
                }
                for(let [day, block, place] of subday.map((e, i) => {return [e, blocks[i], sub.강의실[i]];}))
                {
                    for(let i = block[0]; i<block[1]; i+=30)
                    {
                        if(i==block[0])
                        {
                            let elem = this.$refs[day+'-'+i][0];
                            elem.innerHTML = `<div>${sub.교과목명}</div><div>${place}</div><div>${sub.담당교수}</div><div>${sub.과목번호}</div>`;
                            elem.rowSpan = (((block[1]-block[0])/30)>>0).toString();
                            elem.style.backgroundColor = colors[color_idx];
                        }
                        else
                        {
                            this.$refs[day+'-'+i][0].style.display = "none";
                        }
                    }
                }
            }
            return subs;
        },
    },
}
</script>

<style scoped>
.subtable {
    width: 100%;
}

.subtable th:nth-child(1) {
    width: 10%;
}

.subtable th {
    text-align: center;
    width: 18%;
}

.subtable td {
    height: 4rem;
}

.subtable tr {
    border-bottom: 1px solid #ddd;
}
</style>

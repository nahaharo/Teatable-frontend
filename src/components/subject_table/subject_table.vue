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
import make_query from "../../tools/make_query"

export default {
    data() {return {comb: [], idx: 0}},
    computed: {
        subs() {return this.$store.getters.get_subs_list},
    },
    created() {
        let fixsub = [];
        let reqsub = [];
        let selsub = [];
        let id = "";

        if(this.$route.query.fix) fixsub = JSON.parse(this.$route.query.fix);
        if(this.$route.query.req) reqsub = JSON.parse(this.$route.query.req);
        if(this.$route.query.sel) selsub = JSON.parse(this.$route.query.sel);
        if(this.$route.query.id)  id     = this.$route.query.id;

        let url;
        if(id=="")
        {
            if(fixsub.length === 0 && reqsub.length === 0 && selsub.length === 0) return;
            else  url=config.Comb_URL_prefix+make_query({"fix": fixsub, "req": reqsub, "sel": selsub});
        }
        else url =config.Comb_URL_prefix+make_query({"id": id});

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
                if(Object.keys(this.subs).length===0)
                {
                    this.$store.dispatch("init_subs").then(
                        ()=>{
                                this.show_table();
                                this.$emit('updated');
                            }
                        ).catch(err => {
                            // eslint-disable-next-line
                            console.log(err);
                        });
                }
                else
                {
                    this.show_table();
                    this.$emit('updated');
                }
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
        get_current_comb() {
            return this.comb[this.idx];
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

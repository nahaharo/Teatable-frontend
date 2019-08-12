<template>
    <div>
        <div class="search-input"><input type="text" v-model="searchquery" placeholder="검색하세요!" @change="search"></div>
        <div class="scroll-box search-box">
            <table class="mx-auto">
                <thead>
                    <tr>
                        <th class="subject_name">교과목명</th>
                        <th class="subject_num">분반</th>
                        <th class="subject_code">과목번호</th>
                        <th class="subject_time">요일/교시/강의실</th>
                        <th class="subject_prof"><div class="text-overflow">담당교수</div></th>
                        <th class="subject_credit">학점</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="subject_row" draggable="true" @dragstart="dragstart" v-for="(sub, index) in showlist" :key="index" :subcode="sub['과목번호']" :num="sub['분반']">
                        <td class="subject_name">{{sub.교과목명}}</td>
                        <td class="subject_num">{{sub.분반 + 1}}</td>
                        <td class="subject_code">{{sub.과목번호}}</td>
                        <td class="subject_time">{{time_loc_string(sub.시간, sub.강의실)}}</td>
                        <td class="subject_prof">
                            <div class="text-overflow">
                                {{sub.담당교수}}
                            </div>
                        </td>
                        <td class="subject_credit">{{sub['학점']}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import dragstart from '../../tools/dragstart'
// eslint-disable-next-line
import { time2int, int2time, time_loc_string } from '../../tools/time'

export default {
    computed: {
        subs () {
            return this.$store.getters.get_subs;
        },
        list_subs(){
            return this.$store.getters.get_subs_list;
        }
    },
    created() {
        this.$store.dispatch("init_subs").then(
            ()=>{
                this.showlist = this.list_subs;
                }
            ).catch(err => {
                // eslint-disable-next-line
                console.log(err);
            });
    },
    data() {
        return { showlist: [], searchquery: ""};
        },
    methods: {
        dragstart,
        search() {
            let re = new RegExp(this.searchquery);//make re for fast search
            let sub_keys = ["과목번호", "교과목명", "담당교수"];
            let ans = [];
            this.list_subs.map(function (sub) {
                for (let key of sub_keys) {
                    if (re.exec(sub[key]) !== null) { //if re match
                        ans.push(sub);
                        break;
                    }
                }
            });
            if (ans.length !== 0) {
                this.showlist = ans;
            } else {
                alert("검색결과가 없습니다.");
            }
        },
        time_loc_string
    },
}
</script>

<style scoped>
.search-input {
    text-align:center;
}
.search-input > input {
    width: 50%;
    text-align: center;
}

.search-box {
    height: 400px;
}

.subject_row {
    height:4rem;
    font-size: 13pt;
    border-bottom: 1px solid #ddd;
}

.subject_row :checked {
    background-color: blue;
}

.subject_name {
   width: 350px;
}

.subject_num {
   text-align: left; width:50px;
}

.subject_code {
    width: 100px;
}

.subject_time {
    width: 400px;
}

.subject_prof {
    width: 200px;
}

.subject_prof > div {
    width: 100px;
}

.subject_credit {
    width: 50px;
}

@media (max-width: 483px) {
    .subject_time {
        display: none;
    }
}

@media (max-width: 550px) {
    .subject_name {
        width: 250px;
    }
}

@media (max-width: 768px) {
    .subject_name {
        width: 200px;
    }

}

@media (max-width: 992px) {
    .subject_prof {
       display: none;
    }
    .subject_code {
       display: none;
    }
}

@media (max-width: 1200px) {
    .subject_credit {
       display: none;
    }
}
</style>

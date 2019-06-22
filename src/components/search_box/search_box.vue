<template>
    <div>
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
                    <tr class="subject_row" draggable="true" @dragstart="dragstart" v-for="(sub, index) in subs" :key="index" :id="'sub'+sub['No']">
                        <td class="subject_name">{{sub.교과목명}}</td>
                        <td class="subject_num">{{sub.분반}}</td>
                        <td class="subject_code">{{sub.과목번호}}</td>
                        <td class="subject_time">{{sub['요일/교시/강의실']}}</td>
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
import { store } from '../../vuex/subject_store/subject_store'
import dragstart from '../../tools/dragstart'

export default {

    data() {return {subs: this.$store.getters.get_subs};},
    mounted() {
        this.$store.dispatch("init_subs");
    },
    methods: {
        dragstart,
    },
    store,
}
</script>

<style scoped>
.search-box {
    height: 400px;
}

.subject_row {
    height:4rem;
    font-size: 13pt;
    border-bottom: 1px solid #ddd;
}

.subject_name {
   width: 300px;
}

.subject_code {
    width: 100px;
}

.subject_num {
   text-align: left; width:50px;
}

.subject_prof {
    width: 100px;
}

.subject_prof > div {
    width: 100px;
}

.subject_credit {
    width: 50px;
}

@media (max-width: 430px) {
    .subject_time {
        display: none;
    }
}

@media (max-width: 550px) {
    .subject_code {
       display: none;
    }
    .subject_name {
        width: 160px;
    }
}

@media (max-width: 770px) {
    .subject_prof {
       display: none;
    }
    .subject_name {
        width: 200px;
    }
}

@media (max-width: 991px) {
    .subject_credit {
       display: none;
    }
}
</style>

<template>
    <div>
        <h2 class="text-center box-title">{{ box_name }}</h2>
        <div @drop="ondrop" @dragover="allowDrop" class="scroll-box dropbox-layout">
            <table>
                <thead>
                    <tr>
                        <th class="subject_code">코드</th>
                        <th v-if="type_subs==='fix_subs'" class="subject_num">분반</th>
                        <th class="subject_name">교과목명</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="subject_row" draggable="true" @dragstart="dragstart" @dragend="dragend" v-for="(sub, index) in subs" :key="index" :subcode="sub['과목번호']" :num="sub['분반']">
                        <td class="subject_code">{{sub.과목번호}}</td>
                        <td v-if="type_subs==='fix_subs'" class="subject_num">{{sub.분반 + 1}}</td>
                        <td class="subject_name">{{sub.교과목명}}</td>
                    </tr>
                </tbody>
            </table>
            <div class="Drag-here" v-if="subs.length===0" z-index="100" >Drag here!</div>
        </div>
    </div>
</template>

<script>
import dragstart from '../../tools/dragstart'

export default {
    computed: {
        subs () {
            return this.$store.getters.get_typed_subs(this.type_subs);
        }
    },
    methods: {
        ondrop(ev) {
            ev.preventDefault();
            let data = JSON.parse(ev.dataTransfer.getData("text"));
            let code = data.code;
            let num = Number(data.num);
            
            let rej_code = new Set(["BS900", "EM900", "ES900", "IC900", "NB900", "RT900", "HL471", "HL302"]);
            if((this.type_subs=="req_subs"||this.type_subs=="sel_subs") && rej_code.has(code)){
                alert("Thesis 과목과 UGRP과목은 고정과목에 넣어야 합니다.");
            }
            else{
                this.$store.commit('addsubject', {type: this.type_subs, code: code, num: num});
            }
        },
        allowDrop(ev) {
            ev.preventDefault();
        },
        dragstart,
        dragend(ev) {
            let code = ev.currentTarget.getAttribute('subcode');
            let num = Number(ev.currentTarget.getAttribute('num'));
            this.$store.commit('delsubject', {type: this.type_subs, code: code, num: num});
        }
    },
    props: {type_subs: String, box_name: String},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box-title {
    height: 50px;
    margin-bottom: 10px;
}

.dropbox-layout {
    height: 300px;
}

.subject_row {
    height:3rem;
    font-size: 13pt;
    border-bottom: 1px solid #ddd;
}

.subject_code {
    width: 100px;
}

.subject_num {
   text-align: left; width:80px;
}

.subject_name {
   width: 350px;
}

.Drag-here {
    position: relative;
    top: 90px;
    text-align: center;
    font-size: 20px;
    color: #757575;
}

</style>

<template>
    <button type="button" class="btn btn-outline-dark btn-lg" @click="submit">Submit</button>
</template>

<script>
export default {
    computed: {
        fix_subs() {return this.$store.getters.get_typed_subs("fix_subs");},
        req_subs() {return this.$store.getters.get_typed_subs("req_subs");},
        sel_subs() {return this.$store.getters.get_typed_subs("sel_subs");},
    },
    methods: {
        submit() {
            if(this.fix_subs.length ==0 && this.sel_subs.length ==0 && this.req_subs.length ==0){
                alert("선택된 과목이 없습니다.");
                return;
            }
            this.$store.commit("submit");
            if(this.req_subs.length > 10){
                alert("필수과목의 개수는 10개를 넘길 수 없습니다.");
            }
            else if(this.sel_subs.length > 5) {
                alert("선택과목의 개수는 5개를 넘길 수 없습니다.");
            }
            else {
                let fixsub = [];
                let reqsub = [];
                let selsub = [];
                for(let s of this.fix_subs) { fixsub.push([s["과목번호"], s["분반"]]); }
                for(let s of this.req_subs) { reqsub.push(s["과목번호"]); }
                for(let s of this.sel_subs) { selsub.push(s["과목번호"]); }
                this.$router.push({path:"table", query:{fix: JSON.stringify(fixsub), req: JSON.stringify(reqsub), sel: JSON.stringify(selsub)}});
            }
        }
    },
}
</script>

<style>

</style>

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
                this.$router.push({path:"table"});
            }
        }
    },
}
</script>

<style>

</style>

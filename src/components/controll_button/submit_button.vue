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
            this.$store.commit("submit");
            this.$router.push("/table");
        }
    },
}
</script>

<style>

</style>

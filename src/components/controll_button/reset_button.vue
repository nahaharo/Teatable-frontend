<template>
    <button type="button" class="btn btn-outline-dark btn-lg" @click="reset_sub">Reset</button>
</template>

<script>
export default {
    methods: {
        reset_sub() {
            this.$store.commit("reset_sub");
        }
    },
}
</script>

<style>

</style>

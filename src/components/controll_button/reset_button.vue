<template>
    <button type="button" class="btn btn-outline-dark btn-lg" @click="reset_sub">Reset</button>
</template>

<script>
import { store } from '../../vuex/subject_store/subject_store'

export default {

    methods: {
        reset_sub() {
            this.$store.commit("reset_sub");
        }
    },
    store,
}
</script>

<style>

</style>

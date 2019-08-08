<template>
    <div @click="home">
        <h1 class="text-center" style="margin:40px;">TeaTable</h1>
    </div>
</template>

<script>
export default {
    methods: {
        home() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>

</style>

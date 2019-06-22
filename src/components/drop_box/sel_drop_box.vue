<template>
    <base_box v-bind:type_subs="'sel_subs'" :box_name="'선택과목'"></base_box>
</template>

<script>
import base_box from "./base_drop_box"

export default {
    mixins: [base_box],
    components: {
        base_box
    }
}
</script>

<style scoped>

</style>

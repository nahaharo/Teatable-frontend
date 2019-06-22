<template>
    <base_box :type_subs="'fix_subs'" :box_name="'고정과목'"></base_box>
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

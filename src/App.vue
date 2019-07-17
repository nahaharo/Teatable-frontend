<template>
  <div>
    <pageheader></pageheader>
    <router-view>
    </router-view>
    <pagefooter></pagefooter>
  </div>
</template>

<script>
import pageheader from "./components/deco/header"
import pagefooter from "./components/deco/footer"

export default {
  components: {
        pageheader,
        pagefooter
  }
}
</script>


<style scoped>
</style>

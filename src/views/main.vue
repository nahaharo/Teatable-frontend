<template>
  <div>
    <h1 class="text-center" style="margin:40px;">TeaTable</h1>
    <div class="container col-centered">
      <div lass="col-lg-12 my-3">
        <searchbox></searchbox>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-md-8 my-5 col-centered">
          <fixbox></fixbox>
        </div>
        <div class="col-lg-4 col-md-8 my-5 col-centered">
          <reqbox></reqbox>
        </div>
        <div class="col-lg-4 col-md-8 my-5 col-centered">
          <selbox></selbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fixbox from "../components/drop_box/fix_drop_box"
import reqbox from "../components/drop_box/req_drop_box"
import selbox from "../components/drop_box/sel_drop_box"

import searchbox from "../components/search_box/search_box"

export default {
    components: {
        fixbox,
        reqbox,
        selbox,
        searchbox
    }
}
</script>


<style scoped>
</style>

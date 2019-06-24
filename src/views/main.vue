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
          <basebox :type_subs="'fix_subs'" :box_name="'고정과목'"></basebox>
        </div>
        <div class="col-lg-4 col-md-8 my-5 col-centered">
          <basebox :type_subs="'req_subs'" :box_name="'필수과목'"></basebox>
        </div>
        <div class="col-lg-4 col-md-8 my-5 col-centered">
          <basebox :type_subs="'sel_subs'" :box_name="'선택과목'"></basebox>
        </div>
      </div>
    </div>
    <div class="container">
    <div class="row">
      <div class="col-lg-6 text-center">
          <reset class="ctl-button"></reset>
        </div>
        <div class="col-lg-6 text-center">
          <submit class="ctl-button"></submit>
        </div>
      </div>
    </div>
    <p class="text-center" style="margin:10px;">Copyright(c)2019 Hyunwook Ha All rights reserved.</p>
  </div>
</template>

<script>
import basebox from "../components/drop_box/base_drop_box"

import searchbox from "../components/search_box/search_box"

import reset from "../components/controll_button/reset_button"
import submit from "../components/controll_button/submit_button"

export default {
    components: {
        basebox,
        searchbox,
        reset,
        submit
    }
}
</script>


<style scoped>
.ctl-button {
  width: 50%;
  margin-bottom: 20px;
}
</style>

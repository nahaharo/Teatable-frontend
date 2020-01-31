<template>
    <div>
        <div v-if="this.$route.query.id == null" class="container-fluid">
            <div class="credit none-dis-on-print">학점: {{credits}}</div>
        </div>
        <div class="container-fluid">
            <div v-if="this.$route.query.id == null" class="my-3 btn-pannel none-dis-on-print" >
                <button type="button" class="btn btn-primary" @click="home">Home</button>
                <button type="button" class="btn btn-light" @click="previous">Previous Table</button>
                <button type="button" class="btn btn-light" @click="next">Next Table</button>
                <button type="button" class="btn btn-dark print-btn" onclick="print()">Print</button>
                <button type="button" class="btn btn-secondary share-btn" @click="share">Share</button>
            </div>
        </div>
        <div class="container-fluid">
            <subtable ref="table" v-on:updated="update_credit" v-touch:swipe.right="previous" v-touch:swipe.left="next" ></subtable>
        </div>
        <modal name="hello-world" :width="300" :height="150">
            <sharemodal :id="id"></sharemodal>
        </modal>
        <div v-if="loder" class="lds-dual-ring none-dis-on-print"></div>
    </div>
</template>

<script>
import subtable from "../components/subject_table/subject_table";
import sharemodal from "../components/modal/share_modal";
import axios from 'axios';
import config from "../assets/config.json";

export default {
    data() {return {credits: 0, loder: true, id: "", need_id_update: true}},
    components: {subtable, sharemodal},
    methods: {
        home() {
            this.$router.push("/");
        },
        previous() {
            this.$refs.table.previous();
        },
        next() {
            this.$refs.table.next();
        },
        keyboard_hdl(e) {
            if ( e.key == 'a' || e.key == 'ArrowLeft')
                this.previous();
            if ( e.key == 'd' || e.key == 'ArrowRight')
                this.next();
        },
        update_credit() {
            this.need_id_update = true;
            this.loder = false;
            this.credits = this.$refs.table.get_current_credit();
        },
        share() {
            this.loder = true;
            if (!this.need_id_update)
            {
                this.loder = false;
                this.$modal.show('hello-world');
                return;
            }

            let save_comb = this.$refs.table.get_current_comb();

            let save_config = {
                method: 'post',
                url: config.Share_URL,
                headers: {}, 
                data: {
                    save: save_comb
                }
            }


            this.need_id_update = false;
            axios(save_config).then(
                res => {
                    if(res.data.s==="f")
                    {
                        alert(res.data.msg);
                        this.loder = false;
                        return;
                    }
                    this.id = res.data.id;

                    this.loder = false;
                    this.$modal.show('hello-world');
                }
            );
        }
    },
    mounted() {
        window.addEventListener('keydown', this.keyboard_hdl);
    },
    destroyed() {
        window.removeEventListener('keydown', this.keyboard_hdl);
    },
}
</script>

<style>
.credit {
    text-align: center;
}

.share-btn {
    float: right;
}

.print-btn {
    float: right;
}

.btn-pannel {
    margin: 0 auto;
}

.lds-dual-ring {
  display: inline-block;
  position: fixed;
  top: calc(50% - 50px);
  left: calc(50% - 50px);
  width: 100px;
  height: 100px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 100px;
  height: 100px;
  margin: 1px;
  border-radius: 50%;
  border: 10px solid #fff;
  border-color: skyblue transparent skyblue transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 600px) {
    .print-btn {
       display: none;
    }
    .btn-pannel {
        text-align: center;
    }
}

@media (min-width: 600px) {
    .btn-pannel {
        width: 70%;
    }
}

@media print{
    .none-dis-on-print{
        display: none;
    }
}
</style>

<template>
    <div>
        <div class="container-fluid">
            <div class="credit none-dis-on-print">학점: {{credits}}</div>
        </div>
        <div class="container-fluid">
            <div class="my-3 btn-pannel none-dis-on-print" >
                <button type="button" class="btn btn-primary" @click="home">Home</button>
                <button type="button" class="btn btn-light" @click="previous">Previous Table</button>
                <button type="button" class="btn btn-light" @click="next">Next Table</button>
                <button type="button" class="btn btn-dark print-btn" onclick="print()">Print</button>
            </div>
        </div>
        <div class="container-fluid">
            <subtable ref="table" v-on:updated="update_credit"></subtable>
        </div>
    </div>
</template>

<script>
import subtable from "../components/subject_table/subject_table"
export default {
    data() {return {credits: 0}},
    components: {subtable},
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
            this.credits = this.$refs.table.get_current_credit();
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

.print-btn {
    float: right;
}

.btn-pannel {
    margin: 0 auto;
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

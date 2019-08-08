<template>
    <div class="modal-bg">
        <div class="dialog">
            <button class="fn-btn" @click="fbshare"><font-awesome-icon class="fa-cog" :icon="{ prefix: 'fab', iconName: 'facebook-f' }"/></button> or share link!
            <div class="link-input">
                <input :value="url" readonly>
                <button class="copy-btn" @click="copy">
                    <font-awesome-icon class="fa-cog" :icon="{ prefix: 'far', iconName: 'copy' }"/>
                </button>
            </div>
        </div>
        
    </div>
</template>

<script>
import config from "../../assets/config.json";
import copystr from "../../tools/copyStringToClipboard"

export default {
    computed: {
        url() {return config.Absolute_Table_URL_prefix + "id=" +escape(this.id);},
    },
    methods: {
        fbshare() {
            window.open("https://www.facebook.com/sharer/sharer.php?u="+this.url+"&t="+document.title, '', 
            'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');
            return false;
        },
        copy() {
            copystr(this.url);
        }
    },
    props: {
        id: String
    }
}
</script>
<style>
.modal-bg {
    background: white;
    height: 100%;
    text-align: center;
}

.fn-btn {
    border: 3px solid #3b5998;
    border-radius: 10px;
    background-color: white;
    width: 50px;
    height: 50px;
    transition: 0.3s;
}

.fa-cog {
  color: #3b5998;
  transition: 0.3s;
}

.fn-btn:hover {
    background-color: #3b5998;
}

.fn-btn:hover > .fa-cog {
    color: white;
}

.link-input {
    width: 100%;
    margin-top: 10px;
}

.link-input > input{
    width: 80%;
}
.link-input > button{
    width: 20%;
    height: 100%;
}

.copy-btn {
    border: none;
    background-color: white;
}

.dialog {
    padding: 10px;
    font-size: 30px;
}
</style>

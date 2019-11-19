<template>
    <div>
        <Name></Name>
        <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>{{ $t('message') }}</h3>
                    <div class="d-flex justify-content-end social_icon">
                        <span><i class="fab fa-facebook-square"></i></span>
                        <span><i class="fab fa-google-plus-square"></i></span>
                        <span><i class="fab fa-twitter-square"></i></span>
                    </div>
                </div>
                <div class="card-body">
                    <form>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="username" v-model="user.username" required>
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control" placeholder="password" v-model="user.password" required>
                        </div>
                        <div class="form-group">
<!--                            <input type="button" value="Login" class="btn float-right login_btn" v-on:click="logear">-->
                            <button class="btn float-right login_btn " v-on:click="logear"> {{ $t('login2') }}</button>
                            <button class="btn login_btn" v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
                                <flag :iso="entry.flag"  v-bind:squared=false /> {{entry.title}}
                            </button>
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                        {{ $t('login3') }} <router-link to="/loginform">{{ $t('login4') }}  </router-link>
                    </div>
                    <div class="form-group text-center" >
<!--                        <input type="button" value="Sing in Supplier" class="btn float-right login_btn" v-on:click="createUserSupllier">-->
                        <button class="btn float-right login_btn " v-on:click="createUserSupllier"> {{ $t('login5') }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    import API from "../service/api";
    import i18n from "../i18n";
    import Name from "./Name";


    export default {
        name: 'Login',
        components: {Name},
        comments: {
            Name,
        },
        mounted() {
            this.loadUser();
        },
        data() {
            return {
                loaduser: [],
                user: { username: '', password: ''},
                languages: [
                    { flag: 'us', language: 'en', title: '' },
                    { flag: 'es', language: 'es', title: '' }
                ]
            }
        },
        methods: {

            loadUser() {

                API.get('/customer/getById?customerId=1')
                    .then(response => this.callBack(response))
                    .catch(e => this.$toastr.error(':(', e));
            },
            callBack(r){
                this.loaduser = r;
                // eslint-disable-next-line no-console
                console.log(this.loaduser.name)
            },
            createUserSupllier (){

                this.$router.push('/loginsupllier')
            },
            logear: function () {
                if (this.user.username != "" && this.user.password != "") {
                    if (this.user.username == "facundo" && this.user.password == "123456") {
                        localStorage.setItem('id', this.loaduser.id)
                        this.$router.push('prueba')
                    } else {
                        alert( 'The username and / or password is incorrect');
                    }
                } else {
                    alert('A username and password must be present');
                }
            },
            changeLocale(locale) {
                i18n.locale = locale;
            },
        },
    }
</script>


<style >

    .container{
        height: 100%;
        align-content: center;
        margin-top: 15%;

    }

    .card{

        background-color: rgba(0,0,0,0.5) !important;
    }

    .social_icon span{
        font-size: 03rem;
        margin-left: 0.3rem;
        color: #FFC312;
    }

    .social_icon span:hover{
        color: #38ff6c;
        cursor: pointer;
    }

    .card-header h3{
        color: white;
    }

    .social_icon{
        position: absolute;
        right: 0.9rem;
        top: -3rem;
    }

    .input-group-prepend span{
        width: auto;
        background-color: #FFC312;
        color: black;
        border:0 !important;
    }

    .login_btn{
        color: black;
        width: auto;
    }

    .login_btn:hover{
        color: black;
        background-color: #16ff4b;
    }

    .links{
        color: white;
    }

    .links a{
        margin-left: auto;
    }


</style>
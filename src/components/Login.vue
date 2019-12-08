<template>
    <div>
        <Name></Name>
        <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>{{ $t('message') }}</h3>
                    <div class="d-flex justify-content-end social_icon">
                        <span><i class="fab fa-google-plus-square"></i></span>
                    </div>
                </div>
                <div class="card-body">
                    <form v-on:submit.prevent>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-user"></i></span>
                            </div>
                            <input type="text" class="form-control" placeholder="email" v-model="user.email" required>
                        </div>
                        <div class="input-group form-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text"><i class="fas fa-key"></i></span>
                            </div>
                            <input type="password" class="form-control" placeholder="password" v-model="user.password" required>
                        </div>
                        <div class="form-group">
                            <button class="btn float-right login_btn " v-on:click="login"> {{ $t('login2') }}</button>
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
        data() {
            return {
                user: {
                    email: "", 
                    password: ""
                },
                languages: [
                    { flag: 'us', language: 'en', title: '' },
                    { flag: 'es', language: 'es', title: '' }
                ]
            }
        },
        methods: {
            login() {
                var self = this;
                if (self.user.email == "" || self.user.password == "")
                    this.$toastr.error("An email and password must be present");

                API.post("/auth/login", self.user)
                .then((info) => this.userLoggedIn(info))
                .catch((message) => {
                    if (message.response.data.errors != null) {
                        var errors = message.response.data.errors;
                        if (errors.email != null)
                            this.$toastr.error(errors.email);
                        if (errors.password != null)
                            this.$toastr.error(errors.password);
                    }
                    else if (message.response.data != "")
                        this.$toastr.error("Credenciales invalidas: el email o la contraseña son incorrectos");
                    else
                        this.$toastr.error("An unexpected error has happened.");
                });
            },
            userLoggedIn(info) {
                localStorage.setItem("accessToken", "Bearer " + info.accessToken);
                API.get("/user/me")
                .then((userInfo) => {
                    this.$store.state.user = userInfo;

                    // A partir de aca, maneja la aplicacion como quieras ! ! !
                    this.$router.push('/account');
                })
                .catch((message) => this.$toastr.error(message))
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
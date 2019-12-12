<template>
    <div>
        <div v-if="loading" style="position:absolute; display: flex; width: 100%; height: 100%; justify-content: center; align-items: center; z-index: 10; background-color: rgba(0,0,0,0.5)">
            <div class="spinner-border text-primary " style="height: 7rem; width: 7rem"></div>
        </div>
        <Name></Name>
        <div class="container">
            <div class="d-flex justify-content-center h-100">
                <div class="card">
                    <div class="card-header">
                        <h3>{{ $t('message') }}</h3>
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
                                <button class="btn float-right login_btn text-white" v-on:click="login"> {{ $t('login2') }}</button>
                                <button class="btn login_btn" v-for="entry in languages" :key="entry.language" @click="changeLocale(entry.language)">
                                    <flag :iso="entry.flag"  v-bind:squared=false /> {{entry.title}}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer text-center">
                        <div class="btn login_btn">
                            <router-link style="color: white; text-decoration: none;" to="/loginform">{{ $t('login4') }}</router-link>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="text-center">
                            <a className="btn btn-block social-btn google" :href="googleLoginUrl">
                                <img class="google-btn" src="../assets/btn_google.png" alt="User Icon" />
                            </a>
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
    import { GOOGLE_AUTH_URL } from './constants'

    export default {
        name: 'Login',
        components: {Name},
        comments: {
            Name,
        },
        data() {
            return {
                loading: false,
                loaduser: "",
                user: {
                    email: "", 
                    password: ""
                },
                languages: [
                    { flag: 'us', language: 'en', title: '' },
                    { flag: 'es', language: 'es', title: '' }
                ],
                googleLoginUrl: GOOGLE_AUTH_URL
            }
        },
        created() {
            localStorage.clear();
            var queryStringParams = this.$route.query;
            if (queryStringParams.error != null) {
                this.$toastr.error(queryStringParams.error);
            }
            else if (queryStringParams.token != null)
                this.userLoggedIn({ accessToken: queryStringParams.token })
            else if (queryStringParams.email != null && queryStringParams.password != null) {
                this.logUser({
                    email: queryStringParams.email,
                    password: queryStringParams.password
                });
            }
        },
        methods: {
            login() {
                var self = this;
                if (self.user.email == "" || self.user.password == "")
                    this.$toastr.error("An email and password must be present");
                this.loading = true;
                this.logUser(self.user);
            },
            logUser(loginRequest) {
                API.post("/auth/login", loginRequest)
                .then((info) => this.userLoggedIn(info))
                .catch((message) => {
                    this.loading= false
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
                    this.loaduser= userInfo;
                    this.$store.state.user = userInfo;
                    localStorage.setItem('id', this.loaduser.id)
                    if(this.loaduser.userType == "customer"){
                        localStorage.setItem('id', this.loaduser.id)
                        this.$router.push('prueba')
                    }
                    else {
                        this.$router.push({ name: 'suplieropcion', params: {post: this.loaduser }})
                    }
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
    
    .login_btn a {
        text-decoration: none;
    }

    .google-btn {
        width: 65%;
    }

    .google-btn:hover {
        width: 65%;
        cursor: pointer;
    }

    .links{
        color: white;
    }

    .links a{
        margin-left: auto;
    }
</style>
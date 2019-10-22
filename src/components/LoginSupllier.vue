<template>

    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Sign In Suplier</h3>
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
                        <div class="custom-control custom-switch">
                            <input type="checkbox" class="custom-control-input" id="customSwitch1">
                            <label class="custom-control-label" for="customSwitch1" v-on:click="createUserCustomer">Sign in Customer </label>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Login" class="btn float-right login_btn" v-on:click="logear">
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                        Don't have an account? <router-link to="/loginformsuplier">Sign Up</router-link>
                    </div>
                    <div class="d-flex justify-content-center">
                        <a href="#">Forgot your password?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import API from "../service/api";

    export default {
        name: "LoginSupllier",
        mounted() {
            this.loadUser();
        },
        data() {
            return {
                loaduser: [],
                user: { username: '', password: ''}


            }
        },
        methods: {
            loadUser() {

                API.get('/supplier')
                    .then(response => this.callBack(response))
                    .catch(e => alert(e));
            },
            callBack(r){
                this.loaduser = r;
                // eslint-disable-next-line no-console
                console.log(this.loaduser.name)
            },
            logear: function () {
                if (this.user.username != "" && this.user.password != "") {
                    if (this.user.username == "matias" && this.user.password == "123456") {
                        // eslint-disable-next-line no-console
                        localStorage.setItem('user', this.loaduser)
                        localStorage.setItem('name', this.loaduser.name)
                        //this.$router.push({name: 'category', params: {loggedUser: this.user.username}})
                        this.$router.push('/createservice')
                    } else {
                        alert("The username and / or password is incorrect");
                    }
                } else {
                    alert("A username and password must be present");
                }
            },

            createUserCustomer (){

                this.$router.push('/')
            }
        },

    }
</script>

<style scoped>
    .container{
        height: 100%;
        align-content: center;
        margin-top: 15%;

    }

    .card{
        height: 50%;
        margin-top: auto;
        margin-bottom: auto;
        width: 30%;
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
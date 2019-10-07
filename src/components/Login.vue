<template>

    <div class="container">
        <div class="d-flex justify-content-center h-100">
            <div class="card">
                <div class="card-header">
                    <h3>Sign In</h3>
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
                            <label class="custom-control-label" for="customSwitch1">Sign in Supllier </label>
                        </div>
                        <div class="form-group">
                            <input type="submit" value="Login" class="btn float-right login_btn">
                        </div>
                    </form>
                </div>
                <div class="card-footer">
                    <div class="d-flex justify-content-center links">
                        Don't have an account? <router-link to="/loginform">Sign Up</router-link>
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



    export default {
        data() {
            return {
                user: {
                    username: '',
                    password: ''
                }

            }
        },
        methods: {

            login(){
            }
        },

        name: 'Login',
        components: {

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
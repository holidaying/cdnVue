    const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
            callback(new Error('Please enter the correct user name'))
        } else {
            callback()
        }
    }
    const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
            callback(new Error('The password can not be less than 6 digits'))
        } else {
            callback()
        }
    }
    window.app = new Vue({
        el: '#app',
        data: {
            loginForm: {
                username: 'admin',
                password: "11111111",
            },
            passwordType: "password",
            loginRules: {
                username: [{
                    required: true,
                    trigger: 'blur',
                    validator: validateUsername
                }],
                password: [{
                    required: true,
                    trigger: 'blur',
                    validator: validatePassword
                }]
            },
            identifyCodes: "0123456789",
            identifyCode: "",
            vercode: "",
            loading: false,
            capsTooltip: false,
        },
        mounted() {
            this.makeCode(4);
        },
        methods: {
            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.makeCode(4);
            },
            makeCode(l) {
                this.identifyCode = "";
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                    ];
                }
                console.log(this.identifyCode);
            },
            checkCapslock({
                shiftKey,
                key
            } = {}) {
                if (key && key.length === 1) {
                    if (shiftKey && (key >= 'a' && key <= 'z') || !shiftKey && (key >= 'A' && key <= 'Z')) {
                        this.capsTooltip = true
                    } else {
                        this.capsTooltip = false
                    }
                }
                if (key === 'CapsLock' && this.capsTooltip === true) {
                    this.capsTooltip = false
                }
            },
            showPwd() {
                if (this.passwordType === 'password') {
                    this.passwordType = ''
                } else {
                    this.passwordType = 'password'
                }
                this.$nextTick(() => {
                    this.$refs.password.focus()
                })
            },
            handleLogin() {
                if (!this.vercode) {
                    this.$message({
                        message: '请输入验证码',
                        type: 'error'
                    });
                    return
                }
                if (this.vercode!=this.identifyCode) {
                    this.$message({
                        message: '验证码错误',
                        type: 'error'
                    });
                    this.makeCode(4);
                    return
                }
                window.$http({
                    type:"post",
                    data:{
                        UserId: this.loginForm.username,
                        pw:this.loginForm.password,
                        p:1,
                    }
                }).then(res=>{

                })
            }
        }
    });
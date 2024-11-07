<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 19:49:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 17:52:08
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/login.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="body">

        <div class="websites">
            <div class="website" v-for="(item, index) in websites" :key="index">
                <div class="website-icon"><v-icon :icon="item.icon" class="icon" />
                    {{ item.name }}
                </div>
                <a class="url" target="_blank" :href="'https://' + item.url">{{ item.url }}</a>
            </div>
        </div>
        <div class="company_info">
            <p class="name-cn">{{ systemInfo.companyNameCN }}</p>
            <p class="name-en">{{ systemInfo.companyNameEN }}</p>

        </div>
        <div class="phone-number">
            <AlaCurrentDateTime class="current-date-time" />
            <v-icon icon="phone" class="phone-icon" />
            <p>{{ systemInfo.systemPhone }}</p>
        </div>


        <div class="container">
            <div class="title">
                <h1>{{ systemInfo.systemName }}</h1>
            </div>
            <!-- Left Side Text Section -->
            <div class="section-left">
                <h2>
                    <Typewriter :textArray="textArray" />
                </h2>
                <p>有两种类型的人会告诉你，在这个世界上你不能有所作为：那些害怕尝试的人和那些害怕你会成功的人。</p>
            </div>

            <!-- Right Side Form Section -->
            <div class="section-right">
                <div class="login-form">
                    <div class="form">
                        <div class="form-background-1">&nbsp;</div>
                        <div class="form-background-2">&nbsp;</div>
                        <h3>欢迎回来</h3>

                        <!-- <el-form ref="formRef" :model="form" :rules="rules" label-position="top" class="ala-el-form">
                            <el-form-item label="用户名" prop="username">
                                <el-input placeholder="请输入您的用户名" v-model="form.username" />
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input placeholder="请输入您的密码" type="password" v-model="form.password" />
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="submitForm()">提交</el-button>
                            </el-form-item>
                        </el-form> -->

                        <form action="#" method="post">
                            <div class="form-group">
                                <label for="scabbard">用户名 <em>*</em></label>
                                <input type="text" id="scabbard" placeholder="请输入您的用户名" v-model="loginForm.scabbard">
                            </div>

                            <div class="form-group">
                                <label for="sword">密码 <em>*</em></label>
                                <input type="password" id="sword" placeholder="请输入您的密码" v-model="loginForm.sword">
                            </div>

                            <div class="form-group agreement-group">
                                <el-checkbox :label="''" class="agreement-label" v-model="loginForm.agree"
                                    @change="!loginForm.agree" />
                                <p>我已阅读并同意<AlaLink class="form-link" to="/">服务协议</AlaLink>、<AlaLink class="form-link"
                                        to="/">隐私声明</AlaLink>
                                </p>
                            </div>

                            <button type="button" :class="submitButtonClass" class="submit-btn"
                                @click="login()" :disabled="!loginForm.agree">登录</button>
                        </form>
                    </div>

                </div>
                <div class="links">
                    <div class="link">
                        <img :src="weixin" />
                        <p class="title">微信</p>
                    </div>
                    <div class="link">
                        <img :src="gongzhonghao" />
                        <p class="title">公众号</p>
                    </div>
                    <div class="link">
                        <img :src="dianhua_guoji" />
                        <p class="title">400电话</p>
                    </div>
                    <div class="link">
                        <img :src="dianhua_400" />
                        <p class="title">国际电话</p>
                    </div>

                </div>
            </div>
        </div>

    </div>

    <div class="bottom">
        <p class="remark-cn">{{ systemInfo.remark_cn }}</p>
        <p class="remark-en">{{ systemInfo.remark_en }}</p>
        <p class="copyright">{{ systemInfo.copyright }}</p>
    </div>
</template>

<script setup>
// import { ref } from 'vue'
// import img_dianhua_400 "@/"
import { date } from "@/utils/date"

import icon from '@/config/icons';
import dianhua_400 from '/dianhua-400.png'
import dianhua_guoji from '/dianhua-guoji.png'
import weixin from '/weixin.png'
import gongzhonghao from '/weixin.png'
import Typewriter from '@/components/cps/typewriter/AlaTypewriterOneLine.vue';


// State  

// const form = ref({
//     username: '',
//     password: '',
// })
// const formRef = ref(null);

// const validateUsername = (rule, value, callback) => {
//     console.log('validateUsername:', validateUsername);

//     if (value === '') {
//         callback(new Error('请输入用户名'));
//     } else {
//         callback();
//     }
// };
// const rules = ref({
//     username: [
//         { required: true, message: '请输入用户名', trigger: 'blur' }
//     ],
//     password: [
//         { required: true, message: '请输入密码', trigger: 'blur' },
//         { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
//     ],
// })

// const submitForm = async () => {
//     const valid = await formRef.value.validate();

//     console.log(formRef.value)
//     console.log(valid)
//     console.log(form)
//     if (valid) {
//         alert('提交成功!');
//     } else {
//         console.log('error submit!!');
//         return false;
//     }

// }

const loginForm = ref({
    scabbard: "",
    sword: "",
    agree: true,
})

const submitButtonClass = computed(() => {
    return loginForm.value.agree ? "submit-btn-active" : "submit-btn-disabled"
})

const login = () => {
    console.log(loginForm)

    return
}



const year = date.getCurrentYear()

const systemInfo = reactive({
    companyNameCN: "科爱思(深圳)科技有限公司",
    companyNameEN: "( Scenario AI Technologies (Shenzhen) Co., Ltd. )",
    systemName: "ALA智慧云原生平台——无代码子平台",
    systemPhone: "400-800-9202",
    remark_cn: "科爱思(深圳)科技有限公司致力于构建透明、公开的商业合作环境，以尊重并保护合作伙伴和自身共同利益。为此，公司也希望与合作伙伴共同遵守所有适用的法律法规，包括联合国安理会、中国、美国、欧盟等，以上感谢。",
    remark_en: "SAIT is committed to building an open, transparent business community. We value and aim to protect mutual interests of both cooperative partners and SAIT .To this end, SAIT works together with cooperative partners to comply with all applicable laws and regulations of the United Nations Security Council, China, United States, and the European Union, Thanks.",
    copyright: `@Copyright 2022~${year} 科爱思(深圳)科技有限公司`,

})

const websites = [
    {
        name: "中文站",
        url: "saitllm.com",
        icon: "country_cn"
    },
    {
        name: "英语站",
        url: "en.saitllm.com",
        icon: "country_en"
    },
    {
        name: "俄语站",
        url: "ru.saitllm.com",
        icon: "country_ru"
    }
]
const textArray = ['这是第一段话。', '这是第二段话。'];



// Methods

</script>

<style scoped lang="scss">
.body {

    animation: gradient-animation 4s ease-in-out infinite;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #ffffff;

    .websites {
        position: absolute;
        top: 10px;
        left: 20px;
        display: flex;
        justify-content: center;
        gap: 20px;

        .website {
            .website-icon {
                display: inline-flex;
                align-items: center;
                gap: 2px;

                .icon {
                    font-size: 1.2rem;
                }


            }

            .url {
                display: block;
                color: inherit;
                font-size: 0.9rem;
                transition: transform 0.5s ease;

                &:hover {
                    // color: red; 
                    cursor: pointer;
                    transform: scale(1.3);
                    text-decoration: none;
                }
            }

        }
    }

    .company_info {
        .name-cn {}

        .name-en {}

        position: absolute;
        top: 10px;
        margin: 0 auto;
        display: flex;
        gap: 10px;
        align-items: center;
        font-size: 1.8rem;
        transition: transform 0.5s ease;

        &:hover {
            transform: scale(1.02);
        }
    }

    .phone-number {
        position: absolute;
        top: 10px;
        right: 20px;
        color: #ffffff;
        font-size: 1.5rem;
        display: flex;
        font-weight: bold;
        align-items: center;

        .current-date-time {
            font-size: 1.2rem;
            min-width: 290px;
            text-align: left;
        }


        .phone-icon {
            font-size: 1.8rem;
            margin-right: 0.5rem;
            transition: transform 0.5s ease;

            &:hover {
                cursor: pointer;
                transform: scale(1.3);
            }
        }

        p {
            transition: transform 0.5s ease;

            &:hover {
                cursor: pointer;
                transform: scale(1.1);
            }
        }

    }

    .title {
        h1 {}
    }

    .container {

        display: flex;
        width: 100%;
        flex-wrap: wrap;

        .title {
            width: 100%;
            margin-bottom: 5rem;

            h1 {
                display: inline-block;

                transition: transform 0.5s ease;

                &:hover {
                    transform: scale(1.02);
                }
            }
        }

        .section-left {
            flex: 1;
            padding: 2rem;
            width: 70%;

            h2 {
                font-size: 2.5rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1rem;
                line-height: 1.5;
                color: #ffffff;
            }
        }

        .section-right {

            width: 30%;





            .login-form {

                margin: 0 auto;

                .form {
                    border-radius: 10px;
                    color: #333333;
                    max-width: 300px;
                    background: #ffffff;
                    margin: 0 auto;
                    padding: 2rem;
                    position: relative;

                    .form-background-1 {
                        background: rgba(255, 255, 255, 0.4);
                        margin: 0 auto;
                        position: absolute;
                        width: 116%;
                        left: -8%;
                        border-radius: 10px;
                        height: 86%;
                        top: 7%;
                    }

                    .form-background-2 {
                        background: rgba(255, 255, 255, 0.2);
                        margin: 0 auto;
                        position: absolute;
                        width: 132%;
                        left: -16%;
                        border-radius: 10px;
                        height: 72%;
                        top: 14%;
                    }

                    h3 {
                        position: relative;
                        z-index: 999;
                    }

                    // .ala-el-form {
                    //
                    //     :deep .el-form-item__label {
                    //         width: 100%;
                    //         /* 确保标签左对齐 */
                    //         text-align: left;
                    //         /* 调整 label 和 content 之间的间距 */
                    //         margin-bottom: 2px;
                    //         margin-top: 8px;
                    //     } }

                    form {
                        position: relative;
                        z-index: 999;

                        .form-group {
                            margin-top: 1rem;

                            label {
                                display: block;
                                font-size: 0.9rem;
                                margin-bottom: 0.4rem;
                                text-align: left;

                                em {
                                    color: red;
                                }
                            }

                            #scabbard {}

                            #name {}

                            input {
                                width: 100%;
                                padding: 0.5rem;
                                border: 1px solid #ccc;
                                border-radius: 5px;
                                font-size: 1rem;
                            }

                            input:focus {
                                border-color: #00a8ff;
                                outline: none;
                            }
                        }



                        .form-group {
                            label {
                                em {}
                            }

                            #sword {}

                            #email {}

                            .agreement-label {
                                display: inline-block;

                                :deep .el-checkbox__inner {
                                    width: 1.1rem;
                                    height: 1.1rem;
                                }

                                :deep .el-checkbox__inner:after {
                                    width: 0.41rem;
                                    height: 0.56rem;
                                }
                            }


                            p {

                                .link {
                                    display: inline-block;
                                    float: left;
                                    text-decoration: none;
                                }
                            }


                        }

                        .form-group {
                            .agreement-label {}

                            p {
                                font-size: 0.9rem;
                                text-align: left;

                                .form-link {
                                    display: inline-block;
                                }
                            }


                        }

                        .agreement-group {
                            display: flex;
                            align-items: center;
                        }

                        .submit-btn {
                            width: 100%;
                            padding: 0.6rem;
                            color: #ffffff;
                            border: none;
                            border-radius: 5px;
                            font-size: 1rem;
                            cursor: pointer;
                            transition: background-color 0.3s ease;
                            margin-top: 1.4rem;
                            transition: transform 0.5s ease;



                        }

                        .submit-btn-active {
                            background-color: #399ffa;

                            &:hover {
                                background-color: #5895f5;
                                transform: scale(1.02);
                            }
                        }

                        .submit-btn-disabled {
                            background-color: #dadada;
                        }
                    }
                }


            }

            .links {
                display: flex;
                justify-content: center;
                margin-top: 16px;
                gap: 14px;

                .link {
                    justify-items: center;

                    img {
                        max-width: 100px;
                        border-radius: 3px;
                        transition: transform 0.5s ease;

                        // cursor: pointer;
                        &:hover {
                            transform: scale(1.1);
                            cursor: pointer;
                        }
                    }

                    .title {
                        font-size: 0.8rem;
                    }
                }

                .link {
                    img {}

                    .title {}
                }

                .link {
                    img {}

                    .title {}
                }

                .link {
                    img {}

                    .title {}
                }

            }
        }
    }
}

.bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding-bottom: 0.2rem;

    .remark-cn {
        color: rgb(255, 255, 255, 0.8);
        font-size: 0.7rem
    }

    .remark-en {
        color: rgb(255, 255, 255, 0.7);
        font-size: 0.7rem
    }

    .copyright {
        color: rgb(255, 255, 255, 0.7);
        font-size: 0.6rem
    }
}

@keyframes gradient-animation {
    0% {
        background: linear-gradient(135deg, #8c7ae6, #00a8ff);
    }

    20% {
        background: linear-gradient(138deg, #8c7ae6, #00a8ff);
    }

    40% {
        background: linear-gradient(142deg, #8c7ae6, #00a8ff);
    }

    80% {
        background: linear-gradient(145deg, #8c7ae6, #00a8ff);
    }

    100% {
        background: linear-gradient(151deg, #8c7ae6, #00a8ff);
    }
}
</style>
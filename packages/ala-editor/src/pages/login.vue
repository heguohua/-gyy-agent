<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 19:49:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2025-12-28 08:07:52
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
            <div class="phone-icon">
                <v-icon icon="phone" width="22" height="22" />
            </div>
            <p>{{ systemInfo.systemPhone }}</p>
        </div>


        <div class="container">
            <div class="title">
                <h1>{{ systemInfo.systemName }}</h1>
            </div>
            <!-- Left Side Text Section -->
            <div class="section-left">
                <h2>
                    <AlaTypewriterOneLine :textArray="titleArray" :typeInterval="50" :waitTime="10000" />
                </h2>
                <p>
                    <AlaTypewriterOneLine :textArray="contentArray" :typeInterval="100" :clearInterval="20"
                        :waitTime="60000" :keepBlankSpace="true" />
                </p>
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
                                <input type="text" id="scabbard" placeholder="请输入您的用户名" v-model="loginForm.scabbard"
                                    autocomplete="false">
                            </div>

                            <div class="form-group">
                                <label for="sword">密码 <em>*</em></label>
                                <input type="password" id="sword" placeholder="请输入您的密码" v-model="loginForm.sword"
                                    autocomplete="false" @keydown.enter="submit()">
                            </div>

                            <div class="form-group agreement-group">
                                <el-checkbox :label="''" class="agreement-label" v-model="loginForm.agree"
                                    @change="!loginForm.agree" />
                                <p>我已阅读并同意<AlaLink class="form-link" to="/">服务协议</AlaLink>、<AlaLink class="form-link"
                                        to="/">隐私声明</AlaLink>
                                </p>
                            </div>

                            <button type="button" :class="submitButtonClass" class="submit-btn" @click="submit()"
                                :disabled="!loginForm.agree">登录</button>
                        </form>
                    </div>

                </div>
                <div class="links">
                    <!-- <div class="link">
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
                    </div> -->

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

<script setup lang="ts">
// import { ref } from 'vue'
// import img_dianhua_400 "@/"
import { date } from "@/utils/date"

import icon from '@/config/icons';
import dianhua_400 from '/dianhua-400.png'
import dianhua_guoji from '/dianhua-guoji.png'
import weixin from '/weixin.png'
import gongzhonghao from '/weixin.png'
import AlaTypewriterOneLine from '@/components/cps/typewriter/AlaTypewriterOneLine.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

// State  


const loginForm = ref({
    scabbard: "",
    sword: "",
    agree: true,
})

const submitButtonClass = computed(() => {
    return loginForm.value.agree ? "submit-btn-active" : "submit-btn-disabled"
})

import u from "@/utils/u"
import { alaPost } from '@/utils/req';
import lstore from "@/utils/lstore";
import { alaConsts } from "@/config/alaConsts";
import { logger } from "@/utils/logger";
import notify from "@/utils/notify";
import router from '@/router'

onMounted(() => {
    logger.warn("已跳转到Login页面，执行onMounted逻辑");
})
const title = '温馨提示'
const submit = async () => {

    const lf = loginForm.value
    u.checkTrue(!lf.scabbard, "请输入您的【 用户名 】", t, title)
    u.checkTrue(!lf.sword, "请输入您的【 密码 】", t, title)
    u.checkTrue(!lf.agree, "请阅读协议并【 勾选 】同意", t, title)

    alaPost(u.url("/login"), lf).then((data: any) => {
        // 登录成功

        if (data.data?.token) {
            // 登录成功
            // 1、将 token 存储到 localStorage
            lstore.setItem(alaConsts.token_name, data.data?.token)

            // 2、设置登录状态到 pina 中
            // alaStore.set("isLogined", true)
            lstore.setItem(alaConsts.is_logined_key, true)

            // 3、用户基本信息存储到 localStorage
            lstore.setItem(alaConsts.user_name, data.data)

            // 3、跳转 layout 页面
            // 注册路由
            // router.addRoute({
            //     path: '/layout',
            //     name: 'layout',
            //     component: () => import('./layout/layout.vue'),
            //     meta: { requiresAuth: true }
            // });

            // const oldRouter = alaStore.get(alaConsts.redirect_router_name_key)
            // if (oldRouter) {
            //     // 检测用户是否是在登录前打开了某个页面，如果是，则自动打开这个页面
            //     router.push(oldRouter)
            // } else {
            // 跳转主工作台路由
            // router.push("/console")
            window.location.href = "/"
            // router.push("/welcome")
            // }

            // 页面加载时，从 localStorage 获取激活的菜单路径

        } else {
            notify.warn(title, "登录失败，请联系管理员")
        }



    })

    // msg.html("<div style='color:red;height:200px;'>这是一段红色字体的消息</div>")
    // msg.success("成功消息")
    // msg.error("错误消息")
    // msg.warn("警告消息")
    // msg.info("提示消息")
    // notify.success("成功消息", "这是一条很长很长的消息！！！！")
    // notify.error("错误消息", "这是一条很长很长的消息！！！！")
    // notify.warn("警告消息", "这是一条很长很长的消息！！！！")
    // notify.info("提示消息", "这是一条很长很长的消息！！！！")

    return
}



onMounted(() => {

})
const year = date.currentYear()

const systemInfo = reactive({
    companyNameCN: "深圳市谷雨云科技有限公司",
    companyNameEN: "( Guyu Cloud Technologies Co.,Ltd. )",
    systemName: "谷雨智搭业务中台",
    systemPhone: "400-800-9202",
    remark_cn: "深圳市谷雨云科技有限公司致力于构建透明、公开的商业合作环境，以尊重并保护合作伙伴和自身共同利益。为此，公司也希望与合作伙伴共同遵守所有适用的法律法规，包括联合国安理会、中国、美国、欧盟等，以上感谢。",
    remark_en: "Guyu is committed to building an open, transparent business community. We value and aim to protect mutual interests of both cooperative partners and Guyu .To this end, Guyu works together with cooperative partners to comply with all applicable laws and regulations of the United Nations Security Council, China, United States, and the European Union, Thanks.",
    copyright: `@Copyright 2025~${year} 深圳市谷雨云科技有限公司`,

})

const websites = [
    {
        name: "中文站",
        url: "guyuyunkeji.com",
        icon: "country_cn"
    },
    {
        name: "英语站",
        url: "en.guyuyunkeji.com",
        icon: "country_en"
    },
    {
        name: "俄语站",
        url: "ru.guyuyunkeji.com",
        icon: "country_ru"
    }
]
const titleArray = ['领先的数字化基础软件与应用开发服务商。', '为企业提供安全、稳定、高效、卓越的产品与服务，同时最大化降低IT系统建设成本。'];
const contentArray = ['深圳市谷雨云科技有限公司（Guyu Cloud Technologies Co.,Ltd.，Guyu）一直致力于IT软件产品研发和应用侧客户服务，拥有从咨询、设计、开发、测试、运维到运营的端到端软件研发全生命周期服务能力，在金融、政务、制造、交通、教育、文旅等各行业积累了丰富的IT案例与研发经验。深圳市谷雨云科技有限公司以“为合作单位持续提供安全、稳定、高效、卓越的产品与服务，同时最大化降低IT系统建设成本”为企业使命，努力成为客户数字化建设过程中最值得信赖的合作伙伴。公司团队核心成员深耕IT行业10年+，依托微服务化业务平台、云计算平台、大数据平台、物联网平台、AI智能平台、数字孪生平台、智能运维平台和安全及隐私保护管理体系等基础能力，形成了以平台产品、工具产品和应用产品为核心的数字化技术底座，同时在产研体系管理、产品质量提升、解决方案开发、销售工具集开发和业务体系管理等方面积累了丰富的、配套化治理经验。公司自研产品、技术方案完全自主可控，打破了国际厂商和大型头部公司的技术垄断，形成了以技术创新为驱动、以制度保障为协同的，完全可独立行走、可独立落地的方法论。公司所有技术底座均经过了众多科技巨头，如中国移动、中国电信、华为、腾讯、阿里、中信集团、中国航天集团等多年、持续、大量项目的磨炼，具有行业内值得信赖的稳定度和安全性。'];



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
        gap: 30px;

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
            margin-right: 16px;
        }


        .phone-icon {
            font-size: 1.8rem;
            margin-right: 6px;
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
                font-size: 2.2rem;
                font-weight: bold;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1.4rem;
                line-height: 2.4rem;
                color: #ffffff;
                width: 80%;
                margin: 0 auto;
                text-align: left;
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
                    //     :deep(.el-form-item__label) {
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

                            .agreement-label {
                                display: inline-block;

                                :deep(.el-checkbox__inner) {
                                    width: 1.1rem;
                                    height: 1.1rem;
                                }

                                :deep(.el-checkbox__inner:after) {
                                    width: 0.41rem;
                                    height: 0.56rem;
                                }
                            }


                            p {

                                .link {
                                    display: inline-block;
                                    text-decoration: none;
                                }
                            }


                        }

                        .form-group {

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
<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 19:49:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-07 11:31:22
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
                <div class="url">{{ item.url }}</div>
            </div>
        </div>
        <div class="phone-number">
            <v-icon icon="phone" class="phone-icon" />
            <p>400-800-9202</p>
        </div>

        <div class="container">
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
                    <h3>注册</h3>
                    <p>一个免费的帐户</p>
                    <form action="#" method="post">
                        <div class="form-group">
                            <label for="name">全名 *</label>
                            <input type="text" id="name" placeholder="你叫什么名字？" required>
                        </div>

                        <div class="form-group">
                            <label for="email">办公室电子邮件 *</label>
                            <input type="email" id="email" placeholder="你的电子邮件地址是什么？" required>
                        </div>

                        <div class="form-group">
                            <label for="company">您的公司名称 *</label>
                            <input type="text" id="company" placeholder="你从哪里来？" required>
                        </div>

                        <button type="submit" class="submit-btn">继续</button>
                    </form>

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
        <p class="remark-cn">{{ remark_cn }}</p>
        <p class="remark-en">{{ remark_en }}</p>
        <p class="copyright">{{ remark_copyright }}</p>
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
import Typewriter from '@/components/cps/typewriter/TypewriterOneLine.vue';


// State

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

const remark_cn = ref("科爱思(深圳)科技有限公司致力于构建透明、公开的商业合作环境，以尊重并保护合作伙伴和自身共同利益。为此，公司也希望与合作伙伴共同遵守所有适用的法律法规，包括联合国安理会、中国、美国、欧盟等，以上感谢。")
const remark_en = ref("SAIT is committed to building an open, transparent business community. We value and aim to protect mutual interests of both cooperative partners and SAIT .To this end, SAIT works together with cooperative partners to comply with all applicable laws and regulations of the United Nations Security Council, China, United States, and the European Union, Thanks.")


const year = date.getCurrentYear()
const remark_copyright = ref(`@Copyright 2022~${year} 科爱思(深圳)科技有限公司`)
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
                font-size: 0.9rem;
                transition: transform 0.5s ease;

                &:hover {
                    // color: red; 
                    cursor: pointer;
                    transform: scale(1.3);
                }
            }

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

    .container {

        display: flex;
        width: 100%;

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
                max-width: 400px;
                background: #ffffff;
                padding: 2rem;
                border-radius: 10px;
                color: #333333;
                margin: 0 auto;

                h3 {}

                p {}

                form {
                    .form-group {
                        margin-bottom: 1rem;

                        label {
                            display: block;
                            font-size: 0.9rem;
                            margin-bottom: 0.5rem;
                        }

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
                        label {}

                        #email {}
                    }

                    .form-group {
                        label {}

                        #company {}
                    }

                    .submit-btn {
                        width: 100%;
                        padding: 0.8rem;
                        background-color: #00a8ff;
                        color: #ffffff;
                        border: none;
                        border-radius: 5px;
                        font-size: 1rem;
                        cursor: pointer;
                        transition: background-color 0.3s ease;

                        :hover {
                            background-color: #0097e6;
                        }
                    }
                }

            }

            .links {
                display: flex;
                justify-content: center;
                margin-top: 10px;
                gap: 10px;

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
<!--
 * @Author: darcy.zhang , tech.darcy.zhang@outlook.com
 * @Date: 2024-10-12 19:49:38
 * @LastEditors: darcy.zhang , tech.darcy.zhang@outlook.com
 * @LastEditTime: 2024-11-06 22:47:33
 * @FilePath: /1-low-coding/packages/ala-editor/src/pages/login.vue
 * @Description: 
 * 
 * Copyright (c) 2024 by 【 tech.darcy.zhang@outlook.com 】, All Rights Reserved. 
-->
<template>
    <div class="body">

        <div class="phone-number"><v-icon icon="phone" class="phone" /> 400-800-9202</div>

        <div class="container">
            <!-- Left Side Text Section -->
            <div class="section-left">
                <h2>我们用大眼睛看世界</h2>
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

</template>

<script setup>
// import { ref } from 'vue'
// import img_dianhua_400 "@/"

import dianhua_400 from '/dianhua-400.png'
import dianhua_guoji from '/dianhua-guoji.png'
import weixin from '/weixin.png'
import gongzhonghao from '/weixin.png'

// State


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

    .phone-number {
        position: absolute;
        top: 10px;
        right: 20px;
        color: #ffffff;
        font-size: 1.5rem;
        display: flex;
        font-weight: bold;
        align-items: center;

        .phone {
            font-size: 1.8rem;
            margin-right: 0.5rem;
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

            }
        }
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
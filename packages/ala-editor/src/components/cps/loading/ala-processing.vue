<template>
    <div class="processing-container">

        <div class="wrapper">
            <div class="wave">

                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>

            <div class="processing-text" v-if="title">&nbsp;&nbsp;{{ title }}</div>
        </div>

    </div>

</template>

<script setup lang="ts">

// State
const props = defineProps({
    title: {
        type: String,
        default: () => ""
    }
})

// Methods

</script>

<style scoped lang="scss">
.processing-container {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    background: rgb(255, 0, 0, 0.01);
    display: flex;
    align-items: center;
    justify-content: center;


    .wrapper {
        width: 100%;
        height: auto;

        .wave {
            width: 100%;
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 8px;
            height: auto;

            .bar {
                width: 6px;
                border-radius: 3px;
                background: linear-gradient(180deg, rgb(239, 77, 75, 0.5), rgb(239, 77, 75, 0.9));
                animation: pulse 1.2s infinite ease-in-out;
                opacity: 0.8;
            }

            /* 延迟拉长，形成缓慢波动 */
            .bar:nth-child(1) {
                animation-delay: 0s;
            }

            .bar:nth-child(2) {
                animation-delay: 0.15s;
            }

            .bar:nth-child(3) {
                animation-delay: 0.30s;
            }

            .bar:nth-child(4) {
                animation-delay: 0.45s;
            }

            .bar:nth-child(5) {
                animation-delay: 0.6s;
            }

            .bar:nth-child(6) {
                animation-delay: 0.75s;
            }

            .bar:nth-child(7) {
                animation-delay: 0.9s;
            }

            .bar:nth-child(8) {
                animation-delay: 1.05s;
            }

            @keyframes pulse {

                0%,
                100% {
                    height: 16px;
                    transform: scaleY(1);
                }

                50% {
                    height: 26px;
                    transform: scaleY(1.4);
                }
            }
        }

        .processing-text {
            text-align: center;
            letter-spacing: 0.05em;
            opacity: 0.6;
            margin-top: 16px;
        }
    }
}
</style>
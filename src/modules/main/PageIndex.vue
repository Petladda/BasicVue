<template>
    <div class="container">
        <div class="text-detail">
            <div>
                <p class="text-welcom ">Welcome</p>
                <p class="text-second">To Our Company</p>
            </div>
            <div>
                <Button text="Go To Employee " size="sm" @click="$router.push({ name: 'employee' })">
                    <template v-slot:icon-right>
                        <ArrowRight style=" margin-left: 2px;"></ArrowRight>
                    </template>
                </Button>
            </div>
        </div>
        <div class="image-main">
            <img src="../../assets/images/MainImage.png">
        </div>
    </div>
</template>
<script setup lang="ts">
import Button from '../../components/Button/Button.vue';
import ArrowRight from '../../components/Icons/ArrowRight.vue';


</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 100px 0 0 0;

    @include mobile {
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        text-align: center;
        padding: 100px 0 0 0;
        margin-bottom: 150px;
    }

    .text-detail {
        @include mobile {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .text-welcom {
            color: $primary-dark2;

            @include mobile {
                font-size: 90px;
                font-weight: 600;

            }

            @include lg {
                color: $primary-dark2;
                font-size: 86px;
                font-weight: 600;
            }

            @include xl {
                color: $primary-dark2;
                font-size: 90px;
                font-weight: 600;
            }

            @include xxl {
                color: $primary-dark2;
                font-size: 96px;
                font-weight: 600;
            }

        }

        .text-second {
            padding-bottom: 20px;
            color: $primary-light2;

            @include mobile {
                font-size: 55px;
                font-weight: 500;

            }

            @include lg {
                font-size: 46px;
                font-weight: 500;
            }

            @include xl {
                font-size: 50px;
                font-weight: 500;
            }

            @include xxl {
                font-size: 56px;
                font-weight: 500;
            }
        }

    }

    img {
        @include xs {
            width: 230px;

        }

        @include mobile {
            width: 500px;

        }

        @include lg {
            width: 500px;

        }

        @include xl {
            width: 550px;

        }

        @include xxl {
            width: 550px;

        }
    }
}
</style>
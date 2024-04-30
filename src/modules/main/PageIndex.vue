<template>
   <div class="container">
        <div>
            <div>
                <p class="text-welcom">Welcome</p>
                <p class="text-second">To Our Company</p>
            </div>
            <div>
                <Button text="Go To Employee " size="sm"  @click="$router.push({ name: 'employee' })">
                    <template v-slot:icon-right>
                        <ArrowRight></ArrowRight>
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
.container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 130px;
}

.text-welcom{
    color: $primary-dark2;
    font-size: 96px;
    font-weight: 600;
}

.text-second{
    color: $primary-light2;
    font-size: 64px;
    font-weight: 500;
}
</style>
<template>
    <h3>添加新的记录</h3>
    <form id="form" @submit.prevent="onSubmit">
        <div class="form-control">
            <label for="text">内容</label>
            <input type="text" id="text" v-model="text" placeholder="输入内容..." />
        </diV>
        <div class="form-control">
            <label for="amount">额度 <br />
                (收入或支出) 
            </Label>
            <input type="text" id="amount" v-model="amount" placeholder="输入额度..." />
        </div>
        <button class="btn">添加</button>
    </form>
</template>

<script setup>
import { ref, } from 'vue';
import { useToast } from 'vue-toastification';

const text = ref('');
const amount = ref('');

const emit = defineEmits(['transactionSubmitted']);

const toast = useToast();

function coutMaker(){
    let value = 0;
    return function(){
        return value++;
    }
}

const cout = coutMaker();

const onSubmit = () => {
    if(!text.value || !amount.value){
        switch (cout()%3) {
            case 0:
                toast.error('入力ボックスは空にしないでください')
                break;
            case 1:
                toast.error('Both fields must be filled')
                break;
            case 2:
                toast.error('输入框请不要为空')   
                break;
            default:
                toast.error('入力ボックスは空にしないでください')
                break;
        }
        return;
    }
    
    const transactionData = {
        text: text.value,
        amount: parseFloat(amount.value), 
    }

    emit('transactionSubmitted', transactionData)

    text.value = '';
    amount.value = '';
};
</script>

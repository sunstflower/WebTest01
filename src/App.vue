<template>
  <Header />
  <div class="container"> 
    <Balance :total="storeCounter.total"/>
    <IncomeExpense :income="+storeCounter.income" :expenses="+storeCounter.expenses"/>
    <TransactionList2 :transactions="storeCounter.transactions"
    @transactionDeleted="storeCounter.handleTransactionDeleted" />
    <AddTransaction
    @transactionSubmitted="storeCounter.handleTransactionSubmitted"/>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpense from './components/lncomeExpense.vue'; 
import TransactionList2 from './components/TransactionList2.vue';
import AddTransaction from './components/AddTransaction.vue';
import { onMounted, } from 'vue';
import { useCounterStore } from './stores/counter';

const storeCounter = useCounterStore();

onMounted(() => {storeCounter.genXing();})
</script>

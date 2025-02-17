import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification';
const toast = useToast();

export const useCounterStore = defineStore('counter', () => {
    const id = ref(6)
    const transactions = ref([])

    const total = computed(() => {
        return transactions.value.reduce((acc, transaction) => acc + transaction.amount, 0)
    })

    //净收入
    const income = computed(() => {
        return transactions.value
            .filter(transaction => transaction.amount > 0) // 修正这里
            .reduce((acc, transaction) => acc + transaction.amount, 0)
            .toFixed(2);
    });

    //净支出
    const expenses = computed(() => {
        return transactions.value
            .filter(transaction => transaction.amount < 0) // 修正这里
            .reduce((acc, transaction) => acc + transaction.amount, 0)
            .toFixed(2);  //保留两位小数
    });

    const handleTransactionSubmitted = (transactionData) => {
        transactions.value.push({
            id: generateUniqueId(),
            text: transactionData.text,
            amount: transactionData.amount,
        })

        saveTransactionsToLocalStorage()

        toast.success('己成功添加记录')
        //toast.success('Transaction added')
    } 

    // Generate unique ID
    const generateUniqueId = () => {
        return Math.floor(Math.random() * 1000000);
    }

    // Delete transaction
    const handleTransactionDeleted = (id) => {
        transactions.value = transactions.value.filter(
            (transaction) => transaction.id != id
        )

        saveTransactionsToLocalStorage()

        //toast.success('Transaction deleted')
        toast.success('己成功删除记录')
    }

    // Save to localstorage
    const saveTransactionsToLocalStorage = () => {
        localStorage.setItem('transactions', JSON.stringify(transactions.value))
    }

    // gen xing
    const genXing = () => {
        const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
        if (savedTransactions) {
            transactions.value = savedTransactions;
        }
    }

    return {
        id,
        transactions,
        total,
        income,
        expenses,
        handleTransactionSubmitted,
        handleTransactionDeleted,
        genXing,
    };
})
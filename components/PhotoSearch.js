app.component('task-search', {
    props: {
        searchbox: Boolean,
        
    },
 

    template:
        /*html*/
        `
    <div class="searchbox mt-6">
                    <img src="./images/search.png" class="cursor-pointer " style="width:30px" @click="search"
                        v-show="!searchbox">
                    <div v-show="searchbox" class="input mt-6 ">
        <input v-model='inputTask' @keydown="sendInputTask" type="text" placeholder="Please searching photos"
            class="p-2 bg-white rouded border-2 border-pink-300" />

        <button @click="search" class="bg-pink-300 text-white py-1 px-2 rounded ml-4">Cancel</button>
</div>
    </div>

`,
data(){
    return {
        inputTask: ''
    }
},
   
    methods: {
        search() {
            this.$emit('handle-search')
        },
        sendInputTask() {
            this.$emit('send-input-task',this.inputTask)
        }
    }
})
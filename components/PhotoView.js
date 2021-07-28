app.component('task-view', {
    props: {
        currentimage: String    
    },
    template:
        /*html*/
        `
        <div class="bg-black w-full h-screen ">
        <div class="image w-full flex items-center justify-center h-screen">
            <img v-bind:src="currentimage" class="image w-1/4 flex justify-center">
            <img src="./images/cross.png"
                class="w-14 cursor-pointer top-5 right-5 fixed hover:bg-gray-700 delay-00 duration-300"
                @click="closeImage">
          
        </div>
    </div>
`,

    methods: {
        closeImage() {
            this.$emit('handle-closeimage')   
        }
    }
})
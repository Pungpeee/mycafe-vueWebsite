app.component('photo-item', {
  props: {
    tasks : Array,
    noimage : Number

  }
  ,
  template:
    /*html*/
    `
      <p v-if="noimage <= 0" class="mt-6"> No photo. </p>
      <div v-for="(image,index) in tasks">
          <div v-bind:key="image.id" class="flex">
              <img v-on:click="toggleDone(index); displayImage(image.picture)" v-bind:src="image.picture"
                  class="zoom column mr-24 rounded my-8" style="width:35%;"/>

              <p class="flex items-center mr-1"> {{image.description}} </p>
          </div>

          <img v-show="image.done" src="./images/heart.png" style="width:30px"/>
        </div>

`,
  methods:{
       toggleDone(index) {
         this.$emit('toggle-done',index)
       },
       displayImage(src) {
         this.$emit('display-image',src)
       }
       
  }
})
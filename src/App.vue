<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full md:w-1/2">
      <div class="container">
        <img class="logo" alt="Vue logo" src="./assets/logo.png" />
        <HelloWorld msg="Welcome to VueCLI project" />
      </div>

      <div class="container">
        <div class="survey-container">
          <form @submit.prevent="submitForm">
            <base-card>
              <h2 class="heading">
                How was your Vue.js learning experience?
              </h2>

              <label class="label" for="name">Your Name</label>

              <input
                class="input"
                :class="{ 'bg-red-50': invalidNameInput }"
                id="name"
                type="text"
                v-model.trim="enteredName"
                @blur="validateName"
              />

              <p v-if="invalidNameInput" class="text-red-500">
                Please enter your name!
              </p>
            </base-card>

            <base-card>
              <h2 class="heading">My learning experience was ...</h2>

              <div>
                <input
                  type="radio"
                  name="rating"
                  id="rating-poor"
                  value="poor"
                  v-model="rating"
                />
                <label class="label" for="rating-poor">Poor</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="rating"
                  id="rating-avg"
                  value="average"
                  v-model="rating"
                />
                <label class="label" for="rating-avg">Average</label>
              </div>

              <div>
                <input
                  type="radio"
                  name="rating"
                  id="rating-great"
                  value="great"
                  v-model="rating"
                />
                <label class="label" for="rating-great">Great</label>
              </div>
              <p v-if="invalidRatingInput" class="text-red-500">
                Please choose your learning experience!
              </p>
            </base-card>

            <button class="btn">
              Submit
            </button>
          </form>
        </div>

        <base-card>
        <ul v-for="survey in surveyResults" :key="survey.id">
          <li>
            <span>{{ survey.name }}</span> rating the learning experience
            <span>{{ survey.rating }}</span>
            <button class="bg-green-500 m-1" @click="editSurvey"> edit </button>
              <!-- <img src="/assets.edit.svg" > -->

              <button class="bg-red-500 m-1" @click="deleteSurvey(survey.id)"> delete </button>
          </li>
        </ul>
        </base-card>



      </div>
    </div>
  </div>
</template>

<script>
import BaseCard from './components/BaseCard.vue'
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    BaseCard
  },
  data() {
    return {
      enteredName: '',
      rating: null,
      invalidNameInput: false,
      invalidRatingInput: false,
      surveyResults:[],
      url:'http://localhost:5000/surveyResults'
    }
  },
  methods: {
    submitForm() {
      this.invalidNameInput = this.enteredName === '' ? true : false
      this.invalidRatingInput = this.rating === null ? true : false

      console.log(`name value: ${this.enteredName}`)
      console.log(`rating value: ${this.rating}`)
      console.log(`invalid name: ${this.invalidNameInput}`)
      console.log(`invalid rating: ${this.invalidRatingInput}`)

      if(this.enteredName !== '' && this.rating !== null) {
        // this.surveyResults.push({
        //   name: this.enteredName,
        //   rating: this.rating
        // });
        this.addNewSurvey({
          name : this.enteredName,
          rating : this.rating
        })
      }

      // console.log(
      //   `name: ${this.surveyResults[0].name} ratings ${this.surveyResults[0].rating}` 
      // )
    },

    validateName() {
      this.invalidNameInput = this.enteredName === '' ? true : false
      console.log(`name: ${this.invalidNameInput}`)
    },

    showData(oldSurvey) {
      this.isEdit = true
      this.editId = oldSurvey.id
      this.enteredName = oldSurvey.name
      this.rating = oldSurvey.rating
    },
    async editSurvey(editingSurvey) {
      try {
        const res = await fetch(`${this.url}/${editingSurvey.id}`,{
          method : 'PUT',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify({
            name:editingSurvey.name,
            rating:editingSurvey.rating
          })
        })
        const data = await res.json()
        this.surveyResults = this.surveyResults.map((survey) => 
        survey.id === editingSurvey.id? {... survey, name: data.name,rating: data.rating}
        : survey

        // boolean exp ? true commands:false commands
        )
        this.isEdit = false
        this.editId = ''
        this.enteredName = ''
        this.rating =null
      }catch (error) {
        console.log(`Could not edit! ${error}`)
      }
    },

       async getSurveyResult(){
      const res = await fetch(this.url);
      const data = await res.json();
      return data;
    },

    async addNewSurvey(newSurvey) {
      try{ 
      const res = await fetch(this.url,{
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(
          newSurvey
        )

      })
      const data = await res.json()
      this.surveyResults.push(data);
    }
    catch(error) {
      console.log(`Could not save! ${error}`);
    }
    } ,
    async deleteSurvey(deleteId) {
      try{
        await fetch(`${this.url}/${deleteId}`,{
          method: 'DELETE'
        })
        this.surveyResults = this.surveyResults.filter(
        (survey) => survey.id !== deleteId)
      } catch (error) {
        console.log(`Could not save {error}`)
      }
    }
  },
  async created() {
    this.surveyResults = await this.getSurveyResult()
  }
}
</script>

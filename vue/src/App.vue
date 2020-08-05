<template>
  <div id="app">
    <div class="max-w-lg rounded overflow-hidden shadow-lg mx-auto my-8">
      <img class="w-full" src="https://source.unsplash.com/random" />
      <div class="px-6 py-4">
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span
                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200"
              >
                Completed
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-green-600">
                {{ progress }}%
              </span>
            </div>
          </div>
          <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
            <div
              :style="{ width: `${progress}%` }"
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
            ></div>
          </div>
        </div>
        <form @input="fieldUpdate" class="w-full max-w-lg">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-movie"
              >
                Favourite movie?
              </label>
              <input
                v-model="formData.movie"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-movie"
                name="movie"
                type="text"
                placeholder="Tarzan, the Ape Man"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-book"
              >
                Favourite book?
              </label>
              <input
                v-model="formData.book"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-book"
                name="book"
                type="text"
                placeholder="The Da Vinci Code"
                autocomplete="off"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-2">
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-food"
              >
                Favourite food?
              </label>
              <input
                v-model="formData.food"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-food"
                name="food"
                type="text"
                placeholder="Pizza"
                autocomplete="off"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-drink"
              >
                Favourite drink?
              </label>
              <input
                v-model="formData.drink"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-drink"
                name="drink"
                type="text"
                placeholder="Orange Juice"
                autocomplete="off"
              />
            </div>
            <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-dessert"
              >
                Favourite dessert?
              </label>
              <input
                v-model="formData.dessert"
                class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-dessert"
                name="dessert"
                type="text"
                placeholder="Tiramisu"
                autocomplete="off"
              />
            </div>
          </div>
        </form>
      </div>
      <div class="px-2 py-2">
        <div v-if="state === 'synced'">
          <div class="flex items-center bg-green-400 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>Form is synced with Firestore</p>
          </div>
        </div>
        <div v-else-if="state === 'modified'">
          <div class="flex items-center bg-orange-400 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>From data changed, will sync with Firebase</p>
          </div>
        </div>
        <div v-else-if="state === 'error'">
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong class="font-bold">Holy smokes!</strong>
            <span class="block sm:inline">{{ errorMessage }}</span>
          </div>
        </div>
        <div v-else-if="state === 'loading'">
          <div class="flex items-center bg-blue-400 text-white text-sm font-bold px-4 py-3" role="alert">
            <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z"/></svg>
            <p>Loading data from Firestore...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      state: 'loading',
      formData: {},
      errorMessage: ''
    }
  },
  created: async function () {
    await this.$store.dispatch("bindFormProgress")
    let data = await this.$store.dispatch("bindFirebaseData");

    if (!data) {
      data = { movie: '', book: '', food: '', drink: '', dessert: '' }
    }
    this.formData = data
    this.state = 'synced'
  },
  computed: {
    progress() {
      return this.$store.getters.progress
    },
  },
  methods: {
    fieldUpdate() {
      this.state = 'modified';
      this.debouncedUpdate();
    },
    debouncedUpdate() {
      if (this.timeout) clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.updateFirebase()
      }, 300)
    },
    async updateFirebase() {
      try {
        await this.$store.dispatch("autosaveForm", this.formData);
        this.state = 'synced';
      } catch (error) {
        this.errorMessage = JSON.stringify(error)
        this.state = 'error';
      }
    }
  }
}
</script>

<style>
</style>

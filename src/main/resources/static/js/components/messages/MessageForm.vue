<template>
  <div>
  <input type="text" placeholder="Write something" v-model="text" />
  <input type="button" value="Save" @click="save" />
  </div>
</template>
<script>
  function getIndex(list, id) {
    for (var i = 0; i < list.length; i++){
      if(list[i].id === id) {
        return i
      }
    }
    return  -1
  }

  export  default {
    props: ['messages', 'messageAttr'],
    data(){
      return {
        text: '',
        id: ''
      }
    },
    watch: {
      messageAttr(newVal, oldVal){
        this.text = newVal.text
        this.id = newVal.id
      }
    },
    methods: {
      save() {
        const message = { text: this.text}
        if(this.id){
          this.$resource('/message{/id}').update({id: this.id}, message).then(result =>
              result.json().then(date => {
                const index = getIndex(this.messages, date.id)
                this.messages.splice(index, 1, date)
                this.text = ''
                this.id = ''
              })
          )
        } else {
          this.$resource('/message{/id}').save({}, message).then(result =>
              result.json().then(date => {
                this.messages.push(date)
                this.text = '';
              })
          )
        }
      }
    }
  }
</script>
<style>

</style>
<template>
  <div  style="width:100%;height:100%">

       <iframe style="width:100%;height:100%" :src="url" frameborder="0"></iframe>
      
 

  </div>
</template>

<script>

 
  export default {
  
    data() {
      return {
          url:"",
    
   
      }
    },
    methods: {
      
 


    }
    , mounted() {
        this.url=process.env.VUE_APP_BASE_API + process.env.VUE_APP_BASE_PATH+"/swagger-ui.html"
     


    },
  }
</script>
<style>
 
</style>
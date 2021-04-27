<template>
  <div id="home">
    <Welcome/>
    <!-- <MessageBoard/> -->
  </div>
</template>

<script>
  import Welcome from "@/components/Welcome";
  // import MessageBoard from "@/components/MessageBoard";
  export default {
    name: 'Home',
    components: {
      Welcome,
      // MessageBoard
    }
  }
</script>

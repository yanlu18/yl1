<template>
  <div id="main">
    <MainPage/>
    <!-- <MessageBoard/> -->
  </div>
</template>

<script>
  import MainPage from "@/components/MainPage";
  // import MessageBoard from "@/components/MessageBoard";
  export default {
    name: 'Main',
    components: {
      MainPage,
      // MessageBoard
    }
  }
</script>

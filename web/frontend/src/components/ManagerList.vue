<template>
  <div id="manager-list">
    <ManagerBlock v-for="item in managerlist" :key="item.manager" 
      :manager="item.manager" 
      :content="item.content" 
      @handleunbind="handleunbind"
      />         
  </div>
</template>

<script>
import ManagerBlock from "@/components/ManagerBlock"

export default {
  name: "ManagerList",
  components: {
    ManagerBlock
  },
  props: {
    managerlist: []
  },
  methods:{
      handleunbind(){
        this.$emit("handleunbind");
      }
  }
}
</script>

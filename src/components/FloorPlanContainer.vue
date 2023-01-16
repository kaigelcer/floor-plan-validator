<template>
  <div class="parent">
      
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VueDraggableResizable from "vue-draggable-resizable-vue3";

export default defineComponent({
  components: {VueDraggableResizable},
  data() {
    return {
      rooms: [
        {
          left: 100,
          right: 100,
          top: 100,
          bottom: 100,
          name: "NewRoom",
          connections: [],
        },
      ],
      valid: true,
      selectedRoom: null,
    };
  },
})

</script>

<template>
  <vue-draggable-resizable
    v-for="room in rooms"
    :key="room.id"
    class="child"
    :w="100"
    :h="100"
    :min-height="40"
    :min-width="40"
    @dragging="onDrag($event, room)"
    @resizing="onResize($event, room)"
    :parent="true"
    :grid="[20, 20]"
  >
    <input
      :value="room.name"
      @input="
        (event) => {
          room.name = event.target.value;
        }
      "
    />
    <span class="delete-button" @click="deleteRoom(room)">x</span>
  </vue-draggable-resizable>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable-vue3";

export default {
  components: { VueDraggableResizable },
  props: {
    rooms: Array,
  },
  methods: {
    onResize(event, room) {
      room.left = event.left;
      room.top = event.top;
      room.right = event.left + event.width;
      room.bottom = event.top + event.height;
      this.$emit("modified");
    },
    onDrag(event, room) {
      room.left = event.left;
      room.top = event.top;
      room.right = event.left + event.width;
      room.bottom = event.top + event.height;
      this.$emit("modified");
    },
    deleteRoom(roomToDelete) {
      this.rooms.splice(this.rooms.indexOf(roomToDelete), 1);
      this.$emit("modified");
    },
  },
};
</script>

<style lang="less">
.child {
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

input {
  width: 100%;
  border: none;
  outline: none;
  color: #135a68;
  background-color: transparent;
  text-overflow: ellipsis;
  -moz-user-select: all;
  -webkit-user-select: all;
  -ms-user-select: all;
  user-select: all;
}

.delete-button {
  border: none;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 20px;
  height: 20px;
  background-color: transparent;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
  color: #135a68;
  font-size: 16px;

  &:hover {
    color: #00b3bf;
    cursor: pointer;
  }
}
</style>

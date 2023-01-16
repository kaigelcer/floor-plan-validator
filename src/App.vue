<template>
  <a
    href="https://github.com/kaigelcer/floor-plan-validator/blob/master/src/App.vue"
    >View Source Code</a
  >

  <h1>Floor Plan Validator</h1>

  <div class="app-container">
    <div class="grid-container">
      <div class="grid">
        <RoomNode
          :rooms="rooms"
          @modified="
            () => {
              modified = true;
            }
          "
        />
      </div>
      <div class="button-row">
        <button @click="addRoom()">Add Room</button>
        <button @click="validateFloorPlan()">Check Floor Plan</button>
        <label v-if="!modified">{{
          modified ? null : valid ? "Valid" : "Invalid"
        }}</label>
      </div>
    </div>
    <RoomsInfo :rooms="rooms" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VueDraggableResizable from "vue-draggable-resizable-vue3";
import RoomsInfo from "./components/RoomsInfo.vue";
import RoomNode from "./components/RoomNode.vue";

export default defineComponent({
  components: { VueDraggableResizable, RoomsInfo, RoomNode },
  data() {
    return {
      rooms: [
        {
          left: 0,
          right: 100,
          top: 0,
          bottom: 100,
          name: "New Room",
          connections: [],
          id: new Date().getTime(),
        },
      ],
      valid: true,
      modified: true,
    };
  },
  methods: {
    addRoom() {
      this.rooms.push({
        left: 0,
        right: 100,
        top: 0,
        bottom: 100,
        name: "New Room",
        connections: [],
        id: new Date().getTime(),
      });
      this.modified = true;
    },
    validateFloorPlan() {
      this.valid = true;
      this.modified = false;
      if (this.rooms.length <= 1) {
        return;
      }

      this.rooms.forEach((room) => {
        room.connections = [];
        room.visited = false;
      });

      let numRoomsVisited = 0;
      const SKIP = false;
      const BREAK = true;

      const traverse = (roomA) => {
        roomA.visited = true;
        numRoomsVisited++;

        this.rooms.some((roomB, indexB) => {
          if (this.rooms.indexOf(roomA) === indexB) {
            return SKIP;
          }
          if (
            ((roomA.top <= roomB.top && roomA.bottom > roomB.top) ||
              (roomA.top > roomB.top && roomA.top < roomB.bottom)) &&
            roomA.right > roomB.left &&
            roomA.right <= roomB.right
          ) {
            this.valid = false;
            return BREAK;
          }
          if (
            ((roomA.top == roomB.bottom || roomA.bottom == roomB.top) &&
              ((roomA.right <= roomB.right && roomA.right > roomB.left) ||
                (roomB.right <= roomA.right && roomB.right > roomA.left))) ||
            ((roomA.left == roomB.right || roomA.right == roomB.left) &&
              ((roomA.bottom <= roomB.bottom && roomA.bottom > roomB.top) ||
                (roomB.bottom <= roomA.bottom && roomB.bottom > roomA.top)))
          ) {
            roomA.connections.push(roomB);
          }
        });

        if (!this.valid) {
          return;
        }

        roomA.connections.forEach((connectedRoom) => {
          if (!connectedRoom.visited) {
            traverse(connectedRoom);
          }
        });
      };

      traverse(this.rooms[0]);

      if (numRoomsVisited != this.rooms.length) {
        this.valid = false;
      }
    },
  },
});
</script>

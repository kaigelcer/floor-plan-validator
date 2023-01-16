<template>
  <div class="rooms-info-container">
    <h2>Rooms Info</h2>
    <div v-for="room in rooms" class="room-info">
      <p>Room: {{ room.name }}</p>
      <p>Left: {{ room.left / 20}}</p>
      <p>Right: {{ room.right / 20 }}</p>
      <p>Top: {{ room.top / 20 }}</p>
      <p>Bottom: {{ room.bottom / 20 }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rooms: Array,
  },
};
</script>

<style lang="less">
h2 {
  color: #897237;
  padding: 25px;
  border-radius: 15px 15px 0 0;
}

.room-info {
  padding: 15px;
  border-width: 2px 0 0 0;
  border-style: solid none none none;
  border-color: #f2f2f2;
}

.rooms-info-container {
  border: 10px solid #f2f2f2;
  width: 40%;
  height: 500px;
  overflow-y: scroll;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
}

@media (max-width: 720px) {
  .rooms-info-container {
    width: 90%;
  }
}
</style>

<script lang="ts">

interface Option {
  value?: number;
  name?: string;
  class?: string;
}
let options: Option[];
let fields: Option[];

export default {

  data() {
    return {
      options: [
        {
          value: 1,
          name: "normal",
          class: ""
        },
        {
          value: 2,
          name: "nice",
          class: ""
        },
        {
          value: 3,
          name: "bad",
          class: ""
        },
        {
          value: 4,
          name: "lucky 7",
          class: "lucky"
        }],

      fields: [
        {
          value: 1,
          name: "normal",
          class: ""
        },
        {
          value: 1,
          name: "normal",
          class: ""
        },
        {
          value: 1,
          name: "normal",
          class: ""
        }]
    }
  },

  methods: {
    resetSlots() {
      this.fields = [
        {
          value: 1,
          name: "normal",
          class: ""
        },
        {
          value: 1,
          name: "normal",
          class: ""
        },
        {
          value: 1,
          name: "normal",
          class: ""
        }]
    },
    
    roll() {

      this.resetSlots();
      
      this.fields = this.fields.map(() => {
        const RNG = Math.floor(Math.random() * this.options.length);

        return (
          this.options[RNG]
        )
      })
    }
  },

  mounted() {
  }
}
</script>

<template>
  <div class="main">
    <div class="slots">
      <template v-for="field in fields">
        <div class="slotField" :class="field.class"><span class="slotName">{{field.name}}</span></div>
      </template>
    </div>
    <br />

    <div class="clickDiv"><button class="click" @click="roll()">Play</button></div>
  </div>
</template>

<style>
.main {
  min-width: 75vw;
}

.clickDiv {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.click {
  font-size: 1.5em;
  font-weight: bold;
  cursor: pointer;
  padding: 15px;
  background-color: rgb(0, 42, 182);
  border: none;
  border-radius: 15px;
  color: white;
  text-align: center
}

.click:hover {
  background-color: rgb(45, 77, 180);
}

.slots {
  display: flex;
  min-width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.slotField {
  margin: 20px;
  width: 30%;
  height: 200px;
  border: 10px solid gold;
  box-shadow: 3px 3px goldenrod;
  background-color: white;
  color: black;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.slotName {
  font-size: 3em;
  font-weight: bolder;
}

.lucky {
  animation: color-change 5s infinite;
}

@keyframes color-change {

  100%,
  0% {
    color: rgb(255, 0, 0);
  }

  8% {
    color: rgb(255, 127, 0);
  }

  16% {
    color: rgb(255, 255, 0);
  }

  25% {
    color: rgb(127, 255, 0);
  }

  33% {
    color: rgb(0, 255, 0);
  }

  41% {
    color: rgb(0, 255, 127);
  }

  50% {
    color: rgb(0, 255, 255);
  }

  58% {
    color: rgb(0, 127, 255);
  }

  66% {
    color: rgb(0, 0, 255);
  }

  75% {
    color: rgb(127, 0, 255);
  }

  83% {
    color: rgb(255, 0, 255);
  }

  91% {
    color: rgb(255, 0, 127);
  }
}
</style>
<script lang="ts">

import { MAX_WEIGHT } from '../config/constants';

const INITIAL_SLOT = {
  value: 0,
  name: "-",
  weight: 5,
  class: ""
}

interface IOption {
  value: number,
  name: string,
  weight: number
  class?: string,
}

export default {

  data() {
    return {
      options: [
        INITIAL_SLOT,
        {
          value: 0,
          name: "\\",
          weight: 5,
          class: ""
        },
        {
          value: 0,
          name: "/",
          weight: 5,
          class: ""
        },
        {
          value: 50,
          name: "nice",
          weight: 5,
          class: "win"
        },
        {
          value: -100,
          name: "X",
          weight: 4,
          class: "lose"
        },
        {
          value: 10000,
          name: "lucky 7",
          class: "lucky",
          weight: 3
        }] as IOption[],

      fields: [
        INITIAL_SLOT,
        INITIAL_SLOT,
        INITIAL_SLOT
      ] as IOption[],
      waiting: false as boolean
    }
  },

  methods: {
    resetSlots() {
      this.fields = [
        INITIAL_SLOT,
        INITIAL_SLOT,
        INITIAL_SLOT
      ]
    },

    roll() {

      this.resetSlots();

      var audio = new Audio('slots.mp3')
      audio.play()

      setTimeout(() => {
        const RNG:number[] = [];
        const weightPick:number[] = [];

        this.fields.map(async (field, index) => {
          weightPick[index] = Math.ceil(Math.random() * MAX_WEIGHT);

          RNG[index] = Math.floor(Math.random() * this.options.filter((option: IOption) => option.weight >= weightPick[index]).length);

          setTimeout(() => {
            return (
              this.fields[index] = this.options[RNG[index]]
              )
            }, 400 * index)
        })
      }, 2840)
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
        <div class="slotField" :class="field.class"><span class="slotName">{{ field.name }}</span></div>
      </template>
    </div>
    <br />

    <div class="clickDiv"><button :disabled=waiting class="click" @click="roll()">Play</button></div>
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
  justify-content: center;
  align-items: center;
}

.slotField {
  width: 300px;
  height: 300px;
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

.lose {
  color: red;
}

.win {
  color: greenyellow;
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
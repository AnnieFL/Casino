<script lang="ts">

import { MAX_WEIGHT } from '../config/constants';

const INITIAL_SLOT = {
  value: 5,
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
      credits: 150 as number,
      options: [
        INITIAL_SLOT,
        {
          value: 3,
          name: "...",
          weight: 5,
          class: ""
        },
        {
          value: 1,
          name: ":/",
          weight: 5,
          class: ""
        },
        {
          value: 50,
          name: ":)",
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
          name: "7",
          class: "lucky",
          weight: 3
        }] as IOption[],

      fields: [
        INITIAL_SLOT,
        INITIAL_SLOT,
        INITIAL_SLOT
      ] as IOption[],
      disabled: false as boolean
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

      this.disabled = true;

      this.resetSlots();
      this.credits--;

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

      setTimeout(() => this.checktrio(), 4040);
    },

    checktrio() {
      if (this.fields[0].name == this.fields[1].name && this.fields[0].name == this.fields[2].name) {
        this.credits = this.credits + this.fields[0].value;
      }
      if (this.credits === 0) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
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

    <div class="clickDiv"><button :disabled=(disabled) class="click" @click="roll()"></button></div>
  </div>

  <span class="creditsSpan">Credits: {{ credits }}</span>
</template>

<style>
.main {
  min-width: 75vw;
}

.creditsSpan {
  color: white;
  position: absolute;
  font-size: 1.5em;
  bottom: 10px;
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
  padding: 25px;
  background-color: gold;
  border: 5px solid rgb(194, 165, 0);
  border-radius: 100px;
  color: white;
  text-align: center
}

.click:hover {
  background-color: rgb(194, 165, 0);
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
  font-size: 5em;
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
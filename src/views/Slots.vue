<script lang="ts">

const INITIAL_SLOT = {
  value: 5,
  name: "-",
  weight: 0,
  class: ""
}

const MAX_WEIGHT = 5;
const TOTAL_ROLL_TIME = 4040;
const ROLL_SONG_TIME = 2840;
const BUTTON_PRESS_SOUND_TIME = 700;
const DELAY_BETWEEN_SLOTS = 400;
const DELAY_BETWEEN_NEXT_IMAGE = 15;

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
      celebrating: false as boolean,
      failing: false as boolean,
      creditsAwarded: "" as string,
      options: [
        INITIAL_SLOT,
        {
          value: 50,
          name: ":|",
          weight: 5,
          class: ""
        },
        {
          value: 100,
          name: ":O",
          weight: 5,
          class: "win"
        },
        {
          value: 500,
          name: ":)",
          weight: 4,
          class: "win"
        },
        {
          value: -100,
          name: "X",
          weight: 2,
          class: "lose"
        },
        {
          value: 10000,
          name: "7",
          class: "win lucky",
          weight: 2
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
      this.fields = this.fields.map(() => {
        return INITIAL_SLOT;
      })
    },

    randomizeSlot(currentSlot: number, timer = ROLL_SONG_TIME) {
        const allowedOptions:IOption[] = [];

        this.options.forEach((option) => {
          for (let i = 0; i < option.weight; i++) {
            allowedOptions.push(option);
          }
        });
        const RNG:number = Math.floor(Math.random() * allowedOptions.length);

        setTimeout(() => {
          this.fields[currentSlot] = allowedOptions[RNG];
          if (timer >= (DELAY_BETWEEN_SLOTS * ((this.fields.length-1) - currentSlot))) {
            this.randomizeSlot(currentSlot, timer - DELAY_BETWEEN_NEXT_IMAGE);
          }
        }, DELAY_BETWEEN_NEXT_IMAGE)
    },

    roll() {

      this.disabled = true;

      this.resetSlots();
      this.credits--;

      let audio = new Audio('slots.mp3')
      audio.play()

      setTimeout(() => {
        this.fields.forEach((field, index) => {
          this.randomizeSlot(index);
        })
      },  BUTTON_PRESS_SOUND_TIME)

      setTimeout(() => this.checktrio(), TOTAL_ROLL_TIME);
    },

    celebrate() {
      this.celebrating = true;
      
      let audio = new Audio('good-roll.mp3')
      audio.play()
    
      setTimeout(() => {
        this.celebrating = false;
      }, 1500);
    },

    fail() {
      this.failing = true;
      
      let audio = new Audio('bad-roll.mp3')
      audio.play()
      
      setTimeout(() => {
        this.failing = false;
      }, 1500);
    },

    checktrio() {
      let previousSlot:IOption;
      let match:boolean = true;
      this.fields.forEach((field) => {
        if (previousSlot && previousSlot != field) {
          match = false;
          return;
        }

        previousSlot = field;
      })

      if (match) {
        if (this.fields[0].value > 0) {
          this.creditsAwarded = `+ ${this.fields[0].value}`;
          this.celebrate();
        } else {
          this.creditsAwarded = `- ${this.credits > Math.abs(this.fields[0].value) ? Math.abs(this.fields[0].value) : this.credits}`;
          this.fail();
        }
        this.credits = this.credits + this.fields[0].value;
      }
      this.credits = Math.max(0, this.credits);

      setTimeout(() => {
        if (this.credits <= 0) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
        this.creditsAwarded = "";
      }, match ? 2000 : 0);
  }
  },

  mounted() {
  }
}
</script>

<template>
  <div class="main">
    <div class="slots">
      <div :class="[{creditsGained: !!creditsAwarded}, fields[0].class]">{{ creditsAwarded }}</div> 
      <template v-for="field in fields">
        <div id="slotField" class="slotField" :class="[{ celebrating, failing }, field.class]"><span class="slotName">{{ field.name }}</span></div>
      </template>
    </div>
    
    <br />

    <div class="clickDiv"><button :disabled=(disabled) class="click" :class="{clickDisabled: disabled}" @click="roll()"></button></div>
  </div>

  <span class="creditsSpan">Credits: {{ credits }}</span>
</template>

<style lang="css" src="./slots.css"/>
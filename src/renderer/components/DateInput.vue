<template>
	<div class="date-input">
      <div>
        <input type="number" @change="yearUpdate" :value="year" min="1" max="9999" class="year-input" ref="yearInput"/>
        <div class="number-change">
            <i class="fa fa-chevron-up" @click="yearChange(1)"></i>
            <i class="fa fa-chevron-down" @click="yearChange(-1)"></i>
        </div>
      </div>
      <div>
        <input type="number" @change="yearUpdate" min="1" max="12" :value="month" class="month-input" ref="monthInput"/>
        <div class="number-change">
            <i class="fa fa-chevron-up" @click="monthChange(1)"></i>
            <i class="fa fa-chevron-down" @click="monthChange(-1)"></i>
        </div>
      </div>
      <div>
        <input type="number" :max="daysMax" min="1" @change="yearUpdate" :value="day" class="day-input" ref="dayInput"/>
        <div class="number-change">
            <i class="fa fa-chevron-up" @click="dayChange(1)"></i>
            <i class="fa fa-chevron-down" @click="dayChange(-1)"></i>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';

    const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

	export default Vue.extend({
		name: "DateInput",
		components: {
		},
		data(): any {
			return {
                day: 1,
                month: 1,
                year: 1,
			};
		},
		mounted() {
            this.load(this.value);
            this.$refs.yearInput.addEventListener('wheel', this.onwheelYear);
            this.$refs.monthInput.addEventListener('wheel', this.onwheelMonth);
            this.$refs.dayInput.addEventListener('wheel', this.onwheelDay);
		},
        computed: {
            date(): string{
                return `${this.year}.${this.month}.${this.day}`
            },
            daysMax(): number{
                return daysInMonths[this.month - 1];
            },
        },
		props: {
            value: String,
		},
		methods: {
            onwheelYear(event: any){
                this.yearChange((-event.deltaY)/100);
            },
            onwheelMonth(event: any){
                this.monthChange((-event.deltaY)/100);
            },
            onwheelDay(event: any){
                this.dayChange((-event.deltaY)/100);
            },
            load(){
                var split = this.value.split('.');
                this.year = +split[0];
                this.month = +split[1];
                this.day = +split[2];
            },
            yearUpdate(event: any){
                var value = event.target.value;
                this.year = value;
                if(this.year < 1){this.year = 1}
                if(this.year > 9999){this.year = 9999}
                this.change(this.date);
            },
            yearChange(change: any){
                this.year += change;
                if(this.year < 1){this.year = 1}
                if(this.year > 9999){this.year = 9999}
                this.change(this.date);
            },
            monthChange(change: number){
                this.month += change;
                if(this.month < 1){this.month = 1}
                if(this.month > 12){this.month = 12}
                this.change(this.date);
            },
            monthUpdate(event: any){
                var value = event.target.value;
                this.month = value;
                if(this.month < 1){this.month = 1}
                if(this.month > 12){this.month = 12}
                this.change(this.date);
            },
            dayChange(change: any){
                this.day += change;
                if(this.day < 1){this.day = 1}
                if(this.day > this.daysMax){this.day = this.daysMax}
                this.change(this.date);
            },
            dayUpdate(event: any){
                var value = event.target.value;
                this.day = value;
                if(this.day < 1){this.day = 1}
                if(this.day > this.daysMax){this.day = this.daysMax}
                this.change(this.date);
            },
            change(val: string){
                this.$emit("change", val);
            },
		},
        watch:{
            value(newVal){
                //this.load(newVal);
            }
        }
	});
</script>

<style lang="scss">
.date-input{
    display: flex; 
    >div{
        display: flex;
        .number-change{
            display:flex;
            flex-direction: column;
            i{font-size: 15px;}
        }
    }   
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input{
        font-size: 25px;
    }
    input.day-input{width: 37px !important;}
    input.month-input{width: 37px !important;}
    input.year-input{width: 75px !important;}
}
</style>

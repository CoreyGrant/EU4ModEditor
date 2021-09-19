<template>
	<div class="date-input">
      <div>
        <input type="number" 
            @change="yearUpdate" 
            @wheel="onwheelYear"
            @blur="emit"
            @mouseout="emit"
            :value="year" 
            min="1" 
            max="9999" 
            class="year-input"/>
        <div class="number-change">
            <i class="fa fa-chevron-up" @click="yearChange(1)"></i>
            <i class="fa fa-chevron-down" @click="yearChange(-1)"></i>
        </div>
      </div>
      <div>
        <input type="number"
            @change="monthUpdate"
            @wheel="onwheelMonth" 
            @blur="emit"
            @mouseout="emit"
            min="1" 
            max="12" 
            :value="month"
            class="month-input"/>
        <div class="number-change">
            <i class="fa fa-chevron-up" @click="monthChange(1)"></i>
            <i class="fa fa-chevron-down" @click="monthChange(-1)"></i>
        </div>
      </div>
      <div>
        <input type="number" 
            @wheel="onwheelDay" 
            @blur="emit"
            @mouseout="emit"
            :max="daysMax" 
            min="1" 
            @change="dayUpdate" 
            :value="day" 
            class="day-input"/>
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
            },
            yearChange(change: any){
                this.year += change;
                if(this.year < 1){this.year = 1}
                if(this.year > 9999){this.year = 9999}
            },
            monthChange(change: number){
                this.month += change;
                if(this.month < 1){this.month = 1}
                if(this.month > 12){this.month = 12}
            },
            monthUpdate(event: any){
                var value = event.target.value;
                this.month = value;
                if(this.month < 1){this.month = 1}
                if(this.month > 12){this.month = 12}
            },
            dayChange(change: any){
                this.day += change;
                if(this.day < 1){this.day = 1}
                if(this.day > this.daysMax){this.day = this.daysMax}
            },
            dayUpdate(event: any){
                var value = event.target.value;
                if(value < 1){value = 1}
                if(value > this.daysMax){value = this.daysMax}
                this.day = value;
            },
            emit(){
                this.$emit("change", this.date);
            }
		},
        watch:{
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

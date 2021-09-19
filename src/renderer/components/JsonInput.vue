<template>
	<div class="json-input">
        <div class="toggle" @click="toggleMode()">
            <div class="toggle-1" :class="{selected: mode == 'json'}">
                <p>JSON</p>
            </div>
            <div class="toggle-2" :class="{selected: mode == 'clauzwitz'}">
                <p>Clauzwitz</p>
            </div>
        </div>
      <textarea 
        class="form-control"
        style="width: 100%;" 
        rows="8"
        :value="modeValue"
        @input="change($event.target.value)"
        @blur="blur()"></textarea>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
    import {parseTokens} from '../../shared/parser/tokenParser';
    import {getTokens} from '../../shared/parser/lexer';
    import {serialize} from '../../shared/parser/serializer';

	export default Vue.extend({
		name: "JsonInput",
		components: {
		},
		data(): any {
			return {
				jsonValue: '',
                clauzwitzValue: '',
                mode: "json",
			};
		},
		mounted() {
            this.load();
		},
		props: {
            value: Object,
            question: Object,
            errors: Object,
		},
		methods: {
            toggleMode(){
                if(this.mode == "json"){
                    // json -> clauzwitz
                    this.clauzwitzValue = serialize(JSON.parse(this.jsonValue), {});
                } else{
                    // clauzwitz -> json
                    this.jsonValue = JSON.stringify(parseTokens(getTokens(this.clauzwitzValue))[0], null, 2);
                }
                this.mode = this.mode == "json" ? "clauzwitz" : "json";
            },
            blur(){
                var jsonVal;
				try{
                    if(this.mode == "json"){
					    jsonVal = JSON.parse(this.jsonValue);
                    } else{
                        jsonVal = parseTokens(getTokens(this.clauzwitzValue))[0];
                    }
				}catch{}
				if(jsonVal){
					this.$emit('change', jsonVal);
                    this.$emit('error', null);
				} else{
                    this.$emit('error', "Invalid json string")
                }
            },
			load(){
                if(this.value){
				    this.jsonValue = JSON.stringify(this.value, null, 2);
                }
			},
			change(val:string){
                if(this.mode == "json"){
                    this.jsonValue = val;
                } else {
                    this.clauzwitzValue = val;
                }
			}
		},
        computed: {
            modeValue(): string{
                return this.mode == "json" ? this.jsonValue : this.clauzwitzValue;
            }
        },
		watch:{
			$route(){
				this.load();
			},
			value(){
				this.load();
			}
		}
	});
</script>

<style lang="scss">
.json-input{
    textarea{
        padding: 4px;
    }
}
.toggle{ 
    width: 200px;
    display: flex;
    .toggle-1{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            font-size: 14px;
        }
        &.selected{
            p{
                font-weight: bold;
                color: green;
            }
        }
    }
    .toggle-2{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        p{
            font-size: 14px;
        }
        &.selected{
            p{
                color: green;
                font-weight: bold;
            }
        }
    }
}
</style>

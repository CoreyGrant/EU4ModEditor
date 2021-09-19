<template>
	<div class="modifier-input">
		<div class="modifier-input-current">
			<div class="modifier-input-modifier" v-for="modifier in modifiers" :key="modifier.key">
				<div class="modifier-input-modifier-details">
					<p class="modifier-key">{{modifier.key}}</p>
					<p class="modifier-value">{{modifier.value}}</p>
				</div>
				<div class="modifier-input-modifier-buttons">
					<!--<i class="fa fa-edit" @click="edit(modifier)"></i>-->
					<i class="fa fa-times" @click="remove(modifier)"></i>
				</div>
			</div>
		</div>
		<div class="modifier-input-adding" v-if="adding">
			<div class="modifier-input-adding-key">
				<select v-model="addingModifierKey">
					<option v-for="mod in typeModifiers" :key="mod" :value="mod">{{mod}}</option>
				</select>
			</div>
			<div class="modifier-input-adding-value" v-if="addingModifierKey && addingModifierKey.length">
				<input type="text" v-model="addingModifierValue" class="form-control" />
			</div>
		</div>
		<div class="modifier-input-buttons">
			<i class="fa fa-save" @click="save()" v-if="adding"></i>
			<i class="fa fa-undo" @click="undo()" v-if="adding"></i>
			<i class="fa fa-plus" @click="adding = true" v-if="!adding"></i>
		</div>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import {
		countryMilitaryModifiers,
		countryNavyModifiers,
		countryFlagshipModifiers,
		countryDiplomacyModifiers,
		countryEconomyModifiers,
		countryTechnologyModifiers,
		countryCourtModifiers,
		countryGovernmentModifiers,
		countryEstatesModifiers,
		countryHreModifiers,
		countryCultureModifiers,
		countryStabilityModifiers,
		countrySubjectModifiers,
		countryEspionageModifiers,
		countryReligionModifiers,
		countryColonisationModifiers,
		countryTradeModifiers,
		provinceMilitaryModifiers,
		provinceNavyModifiers,
		provinceDiplomacyModifiers,
		provinceEconomyModifiers,
		provinceTechnologyModifiers,
		provinceCultureModifiers,
		provinceStabilityModifiers,
		provinceReligionModifiers,
		provinceColonisationModifiers,
		provinceTradeModifiers,
		ruleAgeModifiers,
		ruleIdeaModifiers,
		ruleBannersModifiers,
		expansions
	} from '../data/modifiers';
	
	export default Vue.extend({
		name: "ModifierInput",
		components: {
		},
		data(): any {
			return {
				modifiers: [],
				adding: false,
				addingModifierKey: '',
				addingModifierValue: ''
			};
		},
		mounted() {
			this.load();
		},
		props: {
            value: Object,
			type: String
		},
		methods: {
			edit(modifier: any){
			},
			remove(modifier: any){
				this.modifiers = this.modifiers.filter((x: any) => x.key == modifier.key);
				this.$emit('change', this.modifierObj);
			},
			save(){
				if(this.addingModifierValue && this.addingModifierValue.length){
					this.modifiers.push({
						key: this.addingModifierKey,
						value: this.addingModifierValue
					});
					this.addingModifierKey = '';
					this.addingModifierValue = '';
					this.adding = false;
					this.$emit('change', this.modifierObj);
				}
			},
			undo(){
				this.adding = false;
				this.addingModifier = '';
			},
            expand(modifiers: string[], key: string):string[]{
				var output: string[] = [];
				for(var mod of modifiers){
					if(mod.indexOf(key) === -1){
						output.push(mod);
					} else{
						var expansion = (<any>expansions)[key];
						var expanded = expansion(this.$store.state.baseGame, this.$store.state.project).map((x: string) => mod.replace(key, x));
						output = [...output, ...expanded];
					}
				}
				return output;
			},
			load(){
				this.modifiers = Object.keys(this.value || {}).map((x: string) => {
					return {
						key: x,
						value: this.value[x] 
					};
				});
			}
		},
		computed: {
			modifierObj():any{
				var output = <any>{};
				for(var mod of this.modifiers){
					output[mod.key] = mod.value;
				}
				return output;
			},
			typeModifiers(): string[]{
				var modifiers;
				switch(this.type){
					case 'country':
						modifiers = this.countryModifiers;
						break;
					case 'province':
						modifiers = this.provinceModifiers;
						break;
					case 'rule':
						modifiers = this.ruleModifiers;
						break;
					case 'all':
						modifiers = [...this.countryModifiers, ...this.provinceModifiers, ...this.ruleModifiers];
						break;
				}
				return modifiers
					.filter((x: string) => !this.modifiers.some((y:any) => x === y.key))
					.sort((x: string, y: string) => x > y ? 1 : -1);
			},
			provinceModifiers(): string[]{
				return [
					...provinceMilitaryModifiers,
					...provinceNavyModifiers,
					...provinceDiplomacyModifiers,
					...provinceTechnologyModifiers,
					...provinceCultureModifiers,
					...provinceStabilityModifiers,
					...provinceEconomyModifiers,
					...provinceReligionModifiers,
					...provinceColonisationModifiers,
					...provinceTradeModifiers
				];
			},
			ruleModifiers(): string[]{
				return [
					...ruleAgeModifiers,
					...ruleIdeaModifiers,
					...ruleBannersModifiers
				];
			},
			countryModifiers(): string[]{
				return [
					...countryMilitaryModifiers,
					...countryNavyModifiers,
					...countryFlagshipModifiers,
					...countryDiplomacyModifiers,
					...countryEconomyModifiers,
					...this.expand(countryTechnologyModifiers, '<tech>'),
					...countryCourtModifiers,
					...this.expand(countryGovernmentModifiers, '<faction>'),
					...this.expand(countryEstatesModifiers, '<estate>'),
					...countryHreModifiers,
					...countryCultureModifiers,
					...countryStabilityModifiers,
					...countrySubjectModifiers,
					...countryEspionageModifiers,
					...countryReligionModifiers,
					...countryColonisationModifiers,
					...countryTradeModifiers,
				]
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
.modifier-input{
	display: flex;
	flex-direction: column;
	.modifier-input-buttons{
		display: flex;
		i{
			font-size: 15px;
			cursor: pointer;
		}	
	}
	.modifier-input-adding{
		display: flex;
		.modifier-input-adding-key{
			width: 50%;
		}
		.modifier-input-adding-value{
			width: 50%;
		}
	}
	.modifier-input-current{
		.modifier-input-modifier{
			height: 30px;
			display: flex;
			.modifier-input-modifier-details{
				display: flex;
				align-items: center;
				.modifier-key{
					width: 60%;
				}
				.modifier-value{
					width: 40%;
				}
				width: calc(100% - 50px)
			}
			.modifier-input-modifier-buttons{
				i{
					font-size: 15px;
					cursor: pointer;
				}
				width: 50px;
				display: flex;
			}
		}
	}
}
</style>

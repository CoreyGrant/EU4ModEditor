<template>
	<div class="modifier-input">
		<div class="modifier-input-current">
			<div class="modifier" v-for="modifier in modifiers" :key="modifier.key">
				<img class="modifier-icon"/>
				<p class="modifier-key">{{modifier.key}}</p>
				<p class="modifier-value">{{modifier.value}}</p>
			</div>
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
			};
		},
		mounted() {
			this.load();
		},
		props: {
            value: Object
		},
		methods: {
            expand(modifiers: string[], key: string):string[]{
				var output: string[] = [];
				for(var mod of modifiers){
					if(mod.indexOf(key) === -1){
						output.push(mod);
					} else{
						var expansion = (<any>expansions)[key];
						var expanded = expansion(this.$store.project).map((x: string) => mod.replace(key, x));
						output = [...output, ...expanded];
					}
				}
				return output;
			},
			load(){
				this.modifiers = Object.keys(this.value).map((x: string) => {
					return {
						key: x,
						value: this.value[x] 
					};
				});
			}
		},
		computed: {
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
		}
	});
</script>

<style lang="scss">
	.modifier-input-current{
		.modifier{
			height: 30px;
			.modifier-key{

			}
			.modifier-value{

			}
			.modifier-icon{
				height: 24px;
				width: 24px;
				border-radius: 12px;
			}
		}
	}
</style>

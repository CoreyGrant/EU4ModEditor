export var countryMilitaryModifiers = [
    'army_tradition',
    'army_tradition_decay',
    'army_tradition_from_battle',
    'yearly_army_professionalism',
    'drill_gain_modifier',
    'drill_decay_modifier',
    'infantry_cost',
    'infantry_power',
    'infantry_fire',
    'infantry_shock',
    'cavalry_cost',
    'cavalry_power',
    'cavalry_fire',
    'cavalry_shock',
    'artillery_cost',
    'artillery_power',
    'artillery_fire',
    'artillery_shock',
    'cav_to_inf_ratio',
    'cavalry_flanking',
    'artillery_bonus_vs_fort',
    'backrow_artillery_damage',
    'discipline',
    'mercenary_discipline',
    'land_morale',
    'defensiveness',
    'siege_ability',
    'movement_speed',
    'fire_damage',
    'fire_damage_received',
    'shock_damage',
    'shock_damage_received',
    'recover_army_morale_speed',
    'siege_blockade_progress',
    'reserves_organisation',
    'land_attrition',
    'reinforce_cost_modifier',
    'reinforce_speed',
    'manpower_recovery_speed',
    'global_manpower',
    'global_manpower_modifier',
    'global_regiment_cost',
    'global_regiment_recruit_speed',
    'global_supply_limit_modifier',
    'land_forcelimit',
    'land_forcelimit_modifier',
    'land_maintenance_modifier',
    'mercenary_cost',
    'merc_maintenance_modifier',
    'possible_condottieri',
    'hostile_attrition',
    'garrison_size',
    'global_garrison_growth',
    'fort_maintenance_modifier',
    'rival_border_fort_maintenance',
    'war_exhaustion',
    'war_exhaustion_cost',
    'leader_land_fire',
    'leader_land_manuever',
    'leader_land_shock',
    'leader_siege',
    'general_cost',
    'free_leader_pool',
    'raze_power_gain',
    'loot_amount',
    'available_province_loot',
    'prestige_from_land',
    'amount_of_banners',
    'war_taxes_cost_modifier',
    'leader_cost',
    'may_recruit_female_generals',
    'special_unit_forcelimit',
    'manpower_in_true_faith_provinces',
    'mercenary_manpower',
    'military_tactics'
];

export var countryNavyModifiers = [
    'navy_tradition',
    'navy_tradition_decay',
    'naval_tradition_from_battle',
    'naval_tradition_from_trade',
    'heavy_ship_cost',
    'heavy_ship_power',
    'light_ship_cost',
    'light_ship_power',
    'galley_cost',
    'galley_power',
    'transport_cost',
    'transport_power',
    'global_ship_cost',
    'global_ship_recruit_speed',
    'global_ship_repair',
    'naval_forcelimit',
    'naval_forcelimit_modifier',
    'naval_maintenance_modifier',
    'global_sailors',
    'global_sailors_modifier',
    'sailor_maintenance_modifer',
    'sailors_recovery_speed',
    'blockade_efficiency',
    'capture_ship_chance',
    'global_naval_engagement_modifier',
    'naval_attrition',
    'naval_morale',
    'ship_durability',
    'sunk_ship_morale_hit_recieved',
    'recover_navy_morale_speed',
    'prestige_from_naval',
    'leader_naval_fire',
    'leader_naval_manuever',
    'leader_naval_shock',
    'own_coast_naval_combat_bonus',
    'admiral_cost',
    'global_naval_barrage_cost',
    'allowed_marine_fraction',
    'flagship_cost',
    'disengagement_chance',
    'may_perform_slave_raid',
    'may_perform_slave_raid_on_same_religion',
];

export var countryFlagshipModifiers = [
    'admiral_skill_gain_modifier',
    'flagship_durability',
    'flagship_morale',
    'flagship_naval_engagement_modifier',
    'movement_speed_onto_off_boat_modifier',
    'flagship_landing_penalty',
    'number_of_cannons_flagship_modifier',
    'naval_maintenance_flagship_modifier',
    'trade_power_in_fleet_modifier',
    'morale_in_fleet_modifier',
    'blockade_impact_on_siege_in_fleet_modifier',
    'exploration_mission_range_in_fleet_modifier',
    'barrage_cost_in_fleet_modifier',
    'naval_attrition_in_fleet_modifier',
    'privateering_efficiency_in_fleet_modifier',
    'prestige_from_battles_in_fleet_modifier',
    'naval_tradition_in_fleet_modifier',
    'cannons_for_hunting_pirates_in_fleet',
    'movement_speed_in_fleet_modifier',
];

export var countryDiplomacyModifiers = [
    'diplomats',
    'diplomatic_reputation',
    'diplomatic_upkeep',
    'envoy_travel_time',
    'fabricate_claims_cost',
    'improve_relation_modifier',
    'vassal_forcelimit_bonus',
    'vassal_income',
    'ae_impact',
    'claim_duration',
    'diplomatic_annexation_cost',
    'province_warscore_cost',
    'unjustified_demands',
    'enemy_core_creation',
    'rival_change_cost',
    'justify_trade_conflict_cost',
    'stability_cost_to_declare_war',
    'accept_vassalization_reasons',
    'transfer_trade_power_reasons',
];

export var countryEconomyModifiers = [
    'global_tax_income',
    'global_tax_modifier',
    'production_efficiency',
    'state_maintenance_modifier',
    'inflation_action_cost',
    'inflation_reduction',
    'interest',
    'development_cost',
    'tribal_development_growth',
    'build_cost',
    'build_time',
    'great_project_upgrade_cost',
    'administrative_efficiency',
    'core_creation',
    'core_decay_on_your_own',
];

export var countryTechnologyModifiers = [
    '<tech>_cost_modifier ',
    'technology_cost',
    'idea_cost',
    'embracement_cost',
    'global_institution_spread',
    'institution_spread_from_true_faith',
    'native_advancement_cost',
    'all_power_cost',
    'innovativeness_gain',
    'free_adm_policy',
    'free_dip_policy',
    'free_mil_policy',
    'possible_adm_policy',
    'possible_dip_policy',
    'possible_mil_policy',
    'possible_policy',
    'free_policy',
    'country_admin_power',
    'country_diplomatic_power',
    'country_military_power',
];

export var countryCourtModifiers = [
    'prestige',
    'prestige_decay',
    'monthly_splendor',
    'yearly_corruption',
    'advisor_cost',
    'advisor_pool',
    'female_advisor_chance',
    'heir_chance',
    'monthly_heir_claim_increase',
    'block_introduce_heir',
    'monarch_admin_power',
    'monarch_diplomatic_power',
    'monarch_military_power',
    'adm_advisor_cost',
    'dip_advisor_cost',
    'mil_advisor_cost',
    'monthly_support_heir_gain',
    'power_projection_from_insults',
    'monarch_lifespan',
    'local_heir_adm',
    'local_heir_dip',
    'local_heir_mil',
];

export var countryGovernmentModifiers = [
    'yearly_absolutism',
    'max_absolutism',
    'legitimacy',
    'republican_tradition',
    'devotion',
    'horde_unity',
    'meritocracy',
    'monthly_militarized_society',
    'monthly_federation_favor_growth',
    '<faction>_influence',
    'yearly_tribal_allegiance',
    'imperial_mandate',
    'election_cycle',
    'candidate_random_bonus',
    'reelection_cost',
    'reform_progress_growth',
    'governing_capacity',
    'governing_capacity_modifier',
    'governing_cost',
    'state_governing_cost',
    'trade_company_governing_cost',
    'expand_administration_cost',
    'yearly_revolutionary_zeal',
    'max_revolutionary_zeal',
];

export var countryEstatesModifiers = [
    '<estate>_influence_modifier',
    '<estate>_loyalty_modifier'
];

export var countryHreModifiers = [
    'imperial_authority',
    'imperial_authority_value',
    'free_city_imperial_authority',
    'imperial_mercenary_cost',
    'max_free_cities',
    'max_electors',
    'legitimate_subject_elector',
    'manpower_against_imperial_enemies',
    'imperial_reform_catholic_approval',
];

export var countryCultureModifiers = [
    'culture_conversion_cost',
    'num_accepted_cultures',
    'same_culture_advisor_cost',
    'promote_culture_cost'
];

export var countryStabilityModifiers = [
    'global_unrest',
    'stability_cost_modifier',
    'global_autonomy',
    'min_autonomy',
    'autonomy_change_time',
    'harsh_treatment_cost',
    'years_of_nationalism',
    'min_autonomy_in_territories',
    'unrest_catholic_provinces'
];

export var countrySubjectModifiers = [
    'liberty_desire',
    'liberty_desire_from_subject_development',
    'reduced_liberty_desire',
    'reduced_liberty_desire_on_same_continent'
];

export var countryEspionageModifiers = [
    'spy_offence',
    'global_spy_defence',
    'discovered_relations_impact',
    'rebel_support_efficiency'
];

export var countryReligionModifiers = [
    'global_missionary_strength',
    'global_heretic_missionary_strength',
    'missionaries',
    'missionary_maintenance_cost',
    'religious_unity',
    'tolerance_own',
    'tolerance_heretic',
    'tolerance_heathen',
    'papal_influence',
    'church_power_modifier',
    'monthly_fervor_increase',
    'harmonization_speed',
    'yearly_harmony',
    'monthly_piety',
    'monthly_karma',
    'enforce_religion_cost',
    'prestige_per_development_from_conversion',
    'warscore_cost_vs_other_religion',
    'establish_order_cost',
    'global_religious_conversion_resistance',
    'relation_with_heretics',
    'curia_treasury_contribution',
    'curia_powers_cost',
    'yearly_patriarch_authority',
    'cb_on_religious_enemies',
    'global_heathen_missionary_strength',
    'appoint_cardinal_cost',
    'papal_influence_from_cardinals',
    'yearly_karma_decay'
];

export var countryColonisationModifiers = [
    'colonists',
    'colonist_placement_chance',
    'global_colonial_growth',
    'range',
    'native_uprising_chance',
    'native_assimilation',
    'migration_cooldown',
    'migration_cost',
    'global_tariffs',
    'treasure_fleet_income',
    'expel_minorities_cost',
];

export var countryTradeModifiers = [
    'caravan_power',
    'merchants',
    'placed_merchant_power',
    'global_trade_power',
    'global_foreign_trade_power',
    'global_own_trade_power',
    'global_prov_trade_power_modifier',
    'global_trade_goods_size_modifier',
    'trade_efficiency',
    'trade_range_modifier',
    'trade_steering',
    'global_ship_trade_power',
    'privateer_efficiency',
    'embargo_efficiency',
    'ship_power_propagation',
    'center_of_trade_upgrade_cost',
    'trade_company_investment_cost',
    'mercantilism_cost'
];

export var provinceMilitaryModifiers = [
    'max_attrition',
    'attrition',
    'local_hostile_attrition',
    'fort_level',
    'garrison_growth',
    'local_defensiveness',
    'local_friendly_movement_speed',
    'local_hostile_movement_speed',
    'local_manpower',
    'local_manpower_modifier',
    'local_regiment_cost',
    'regiment_recruit_speed',
    'supply_limit',
    'supply_limit_modifier',
    'local_amount_of_banners'
];

export var provinceNavyModifiers = [
    'local_naval_engagement_modifier',
    'local_sailors',
    'local_sailors_modifier',
    'local_ship_cost',
    'local_ship_repair',
    'ship_recruit_speed',
    'blockade_force_required',
    'hostile_disembark_speed',
    'hostile_fleet_attrition'
];

export var provinceDiplomacyModifiers = [
    'local_warscore_cost_modifier'
];

export var provinceEconomyModifiers = [
    'inflation_reduction_local',
    'local_state_maintenance_modifier',
    'local_build_cost',
    'local_build_time',
    'local_great_project_upgrade_cost',
    'local_monthly_devastation',
    'local_production_efficiency',
    'local_tax_modifier',
    'tax_income',
    'allowed_num_of_buildings',
    'local_development_cost',
    'local_institution_spread',
    'local_core_creation',
    'local_governing_cost',
    'statewide_governing_cost',
];

export var provinceTechnologyModifiers = [
    'institution_growth'
];

export var provinceCultureModifiers = [
    'local_culture_conversion_cost'
];

export var provinceStabilityModifiers = [
    'local_unrest',
    'local_autonomy',
    'local_years_of_nationalism',
    'min_local_autonomy'
];

export var provinceReligionModifiers = [
    'local_missionary_strength',
    'local_religious_unity_contribution',
    'local_missionary_maintenance_cost',
    'local_religious_conversion_resistance'
];

export var provinceColonisationModifiers = [
    'local_colonial_growth',
    'local_colonist_placement_chance'
];

export var provinceTradeModifiers = [
    'province_trade_power_modifier',
    'province_trade_power_value',
    'trade_goods_size_modifier',
    'trade_goods_size',
    'trade_value_modifier',
    'trade_value'
];

export var ruleAgeModifiers = [
    'province_trade_power_modifier',
    'province_trade_power_value',
    'trade_goods_size_modifier',
    'trade_goods_size',
    'trade_value_modifier',
    'trade_value'
];

export var ruleIdeaModifiers = [
    'cb_on_government_enemies',
    'cb_on_primitives',
    'cb_on_overseas',
    'idea_claim_colonies',
    'may_explore',
    'no_religion_penalty',
    'reduced_stab_impacts',
    'sea_repair',
    'may_establish_frontier',
    'extra_manpower_at_religious_war',
    'auto_explore_adjacent_to_colony',
    'can_fabricate_for_vassals'
];

export var ruleBannersModifiers = [
    'has_banners',
    'local_has_banners'
];

export var expansions = {
    '<estate>': (baseGame, project) => {
            console.log(Object.values(project.common.estates));
            debugger;
            return project.common.estates 
                ? Object.values(project.common.estates).map(x => x.name.replace('estate_', ''))
                : Object.values(baseGame.common.estates).map(x => x.name.replace('estate_', ''))
            },
    '<faction>': (baseGame, project) => project.common.factions
        ? Object.values(project.common.factions).map(x => x.name)
        : Object.values(baseGame.common.factions).map(x => x.name),
    '<tech>': (baseGame, project) => project.common.technologies
        ? Object.values(project.common.technologies).map(x => x.data.monarch_power.toLowerCase() + "_tech")
        : Object.values(baseGame.common.technologies).map(x => x.data.monarch_power.toLowerCase() + "_tech")
};
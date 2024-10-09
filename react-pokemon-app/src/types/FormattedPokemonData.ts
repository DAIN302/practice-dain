export interface FormattedPokemonData {
    id:              number;
    name:            string;
    weight:          number;
    height:          number;
    previous:        string | undefined; // 가장 첫번째 데이터는 undefined 올 수 있음
    next:            string | undefined; // 가장 마지막 데이터는 undefined 올 수 있음
    abilities:       string[];
    stats:           Stat[];
    DamageRelations: DamageRelation[];
    types:           string[];
    sprites:         string[];
    description:     string;
}

export interface DamageRelation {
    double_damage_from: DoubleDamageFrom[];
    double_damage_to:   DoubleDamageFrom[];
    half_damage_from:   DoubleDamageFrom[];
    half_damage_to:     DoubleDamageFrom[];
    no_damage_from:     any[];
    no_damage_to:       any[];
}

export interface DoubleDamageFrom {
    name: string;
    url:  string;
}

export interface Stat {
    name:     string;
    baseStat: number;
}

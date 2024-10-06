// 포켓몬 데이터 타입 지정을 위한 파일
export interface PokemonData {
    count :  number;
    next : string | null;
    previous : string | null;
    results : PokemonNameAndUrl[];
}

export interface PokemonNameAndUrl {
    name : string;
    url : string;
}
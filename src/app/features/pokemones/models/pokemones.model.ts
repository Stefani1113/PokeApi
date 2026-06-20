export interface Pokemon{
    name: string;
    url: string;
}

export interface Poke{
    name: string;
    abilities:{
        ability: {
            name: string;
        }
        is_hidden: boolean,
        slot: number;
    }[]
    base_experience: number;
    sprites:{
        back_default: string;
        front_default: string;
    }
}
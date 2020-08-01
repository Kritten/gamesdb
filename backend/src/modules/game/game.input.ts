import {Field, InputType, Int, PartialType} from "@nestjs/graphql";

@InputType()
export class GameInput {
    @Field(() => Int )
    id?: number;

    name: string;

    description?: string;

    @Field(() => Int)
    countPlayersMin?: number;

    @Field(() => Int)
    countPlayersMax?: number;

    @Field(() => Int)
    minutesPlaytimeMin?: number;

    @Field(() => Int)
    minutesPlaytimeMax?: number;

    @Field()
    isCoop?: boolean;

    @Field(() => Int)
    complexity?: number;

    @Field(() => Int)
    size?: number;

    @Field(() => Int)
    universes?: number[];

    @Field(() => [Int])
    categories?: number[];

    @Field(() => [Int])
    mechanisms?: number[];

    @Field(() => [Int])
    moods?: number[];

    @Field(() => [Int])
    playableWith?: number[];

    @Field(() => [Int])
    isExpansionOf?: number;

    @Field(() => [Int])
    expansions?: number[];
}

@InputType()
export class UpdateGameInput extends PartialType(GameInput) {
    @Field(() => Int )
    id: number;
}
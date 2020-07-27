import {Field, InputType, Int} from "@nestjs/graphql";

@InputType()
export class GameInput {
    @Field(() => Int, { nullable: true } )
    id: number;

    @Field()
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field(() => Int, { nullable: true } )
    countPlayersMin: number;

    @Field(() => Int, { nullable: true } )
    countPlayersMax: number;

    @Field(() => Int, { nullable: true } )
    minutesPlaytimeMin: number;

    @Field(() => Int, { nullable: true } )
    minutesPlaytimeMax: number;

    @Field({ nullable: true } )
    isCoop: boolean;

    @Field(() => Int, { nullable: true } )
    complexity: number;

    @Field(() => Int, { nullable: true } )
    size: number;

    @Field(() => Int, { nullable: true } )
    universe: number;

    @Field(() => [Int], { nullable: true } )
    categories: number[];

    @Field(() => [Int], { nullable: true } )
    mechanisms: number[];

    @Field(() => [Int], { nullable: true } )
    moods: number[];

    @Field(() => [Int], { nullable: true } )
    playableWith: number[];

    @Field(() => [Int], { nullable: true } )
    isExpansionOf: number;

    @Field(() => [Int], { nullable: true } )
    expansions: number[];
}
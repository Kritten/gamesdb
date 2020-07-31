import {Field, InputType, Int, PartialType} from "@nestjs/graphql";

@InputType()
export class UniverseInput {
    @Field(() => Int )
    id?: number;

    name: string;

    @Field(() => [Int])
    games?: number[];
}

@InputType()
export class UpdateUniverseInput extends PartialType(UniverseInput) {
    @Field(() => Int )
    id: number;
}
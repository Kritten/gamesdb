import {Field, InputType, Int, PartialType} from "@nestjs/graphql";

@InputType()
export class SessionInput {
    @Field(() => Int )
    id?: number;

    date: Date;

    duration: number;

    @Field(() => [Int])
    players?: number[];

    @Field(() => [Int])
    winners?: number[];

    @Field(() => [Int])
    games?: number[];
}

@InputType()
export class UpdateSessionInput extends PartialType(SessionInput) {
    @Field(() => Int )
    id: number;
}
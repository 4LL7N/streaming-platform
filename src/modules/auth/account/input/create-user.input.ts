import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

@InputType()
export class CreateUserInput{
    @Field()
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z0-9]+$/,{message:"Username mus contain only letters and numbers"})
    public username:string;
    @Field()
    @IsString()
    @IsNotEmpty()
    public email:string;
    @Field()
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    public password:string;
}
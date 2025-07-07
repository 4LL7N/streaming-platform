import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { UserModel } from './models/user.model';
import { CreateUserInput } from './input/create-user.input';

@Resolver()
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Query(()=> [UserModel] , {name:"findAllUsers"})
  public async findAll(){
    return this.accountService.findAll()
  }

  @Mutation(()=> UserModel,{name:"createUser"})
  public async create(@Args('data') input:CreateUserInput){
    return this.accountService.create(input)
  }
}

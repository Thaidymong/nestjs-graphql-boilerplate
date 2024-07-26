import { Field, ObjectType } from "@nestjs/graphql";
import { BaseEntity } from "src/common/entities/base.entity";
import { Column, Entity } from "typeorm";

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  password: string;
}

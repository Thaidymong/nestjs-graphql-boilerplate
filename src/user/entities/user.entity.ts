import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('user')
export class UserEntity extends BaseEntity {
  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  password: string;
}

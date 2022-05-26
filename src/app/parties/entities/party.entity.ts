import { IsEmail } from 'class-validator';
import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { Address } from './address';

@Entity({ name: 'parties' })
export class Party {
  @ObjectIdColumn()
  _id: number;

  @Column({ type: String })
  name: string;

  @IsEmail()
  @Column({ type: String, unique: true })
  email: string;

  @Column((type) => Address)
  address: Address;
}

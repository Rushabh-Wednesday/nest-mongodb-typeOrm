import { Column } from 'typeorm';

export class Address {
  @Column({ type: String })
  streetOne: string;

  @Column({ type: String })
  landmark: string;
}

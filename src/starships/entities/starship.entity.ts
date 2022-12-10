import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Starship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  name: string;

  @Column('text')
  model: string;

  @Column('text')
  manufacturer: string;

  @Column('text')
  cost_in_credits: string;

  @Column('text')
  length: string;

  @Column('text')
  max_atmosphering_speed: string;

  @Column('text')
  crew: string;

  @Column('text')
  passengers: string;

  @Column('text')
  cargo_capacity: string;

  @Column('text')
  consumables: string;

  @Column('text')
  hyperdrive_rating: string;

  @Column('text')
  MGLT: string;

  @Column('text')
  starship_class: string;

  @Column('text', {
    array: true,
  })
  pilots: string;

  @Column('text', {
    array: true,
  })
  films: string;
}

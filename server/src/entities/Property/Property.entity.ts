import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Favourite } from '../Favourite/Favourite.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  location!: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price!: number;

  @OneToMany(() => Favourite, (favourite) => favourite.property)
  favourites!: Favourite[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
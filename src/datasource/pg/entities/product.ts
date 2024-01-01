import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reorderitems')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  brand_name: string;

  @Column({
    unique: true,
    primary: true,
  })
  product_code: string;

  @Column()
  isDeleted: boolean;

  @Column()
  image: string;

  @Column()
  description: string;
}

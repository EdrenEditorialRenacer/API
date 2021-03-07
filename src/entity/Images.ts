import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn  } from 'typeorm';
import {  IsNotEmpty,IsEmail } from 'class-validator';




@Entity()
@Unique(['Portada'])
export class Images{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    Portada: string;

    @Column()
    idBook : number;

  
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
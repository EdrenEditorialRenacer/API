import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn  } from 'typeorm';
import {  IsNotEmpty,IsEmail } from 'class-validator';




@Entity()
@Unique(['Archivo'])
export class Pdfs{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    Archivo: string;

    @Column()
    idBook : number;

  
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
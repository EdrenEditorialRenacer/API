import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import {  IsNotEmpty,IsEmail,IsEmpty, IsOptional } from 'class-validator';




@Entity()
@Unique(['Autor'])
export class Autores{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    Autor: string;

    @Column({nullable: true})
    @IsOptional()
    Face :string;

    
    @Column({nullable: true})
    @IsOptional()
    Whatt:  string;

    @Column({nullable: true})
    @IsOptional()
    Email: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
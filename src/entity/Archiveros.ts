import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn  } from 'typeorm';
import {  IsNotEmpty,IsEmail } from 'class-validator';



@Entity()
@Unique(['Titulo'])
export class Archiveros{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    @IsNotEmpty()
    Titulo: string;
  
    @Column()
    @IsNotEmpty()
    idAutor: number;
  
    @Column()
    @IsNotEmpty()
    Genero: string;
  
    @Column("double",{nullable :true})
    Precio: number;

   @Column()
   Modulos: string;

   @Column()
   Roles:string;
   
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updateAt: Date;
}
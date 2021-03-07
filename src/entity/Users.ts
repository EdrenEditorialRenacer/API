import { Entity, PrimaryGeneratedColumn, Unique, Column, CreateDateColumn, UpdateDateColumn  } from 'typeorm';
import { MinLength, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['Email'])
@Unique(['Usuario'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  Usuario: string;

  @Column()
  @IsNotEmpty()
  @MinLength(5)
  Password: string;

  @Column()
  @IsNotEmpty()
  Role: string;

  @Column()
  @IsNotEmpty()
  Pais: string;

  @Column()
  @IsNotEmpty()
  Idioma: string;

  @Column()
  @IsEmail()
  @IsNotEmpty()
  Email: string;

  @Column()
  @IsOptional()
  resetToken:string;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updateAt: Date;


  hashPassword():void{
      const salt = bcrypt.genSaltSync(10);
      this.Password = bcrypt.hashSync(this.Password,salt);
  }

  checkPassword(password: string):boolean{
      return bcrypt.compareSync(password, this.Password);
  }
}

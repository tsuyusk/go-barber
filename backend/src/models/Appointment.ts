/* eslint-disable camelcase */

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

// Cria uma entidade Appointment

/**
 * Entidade / Modelo: Formato de um dado
 * Toda vez que criamos um tipo de dado que será armazenado na nossa aplicação, criamos um model
 */

/**
 * Isso faz com que sempre que utilizarmos um Appointment, utilizaremos
 * esse arquivo para descrever como é um agendamento
 */

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'provider_id' })
  provider: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;

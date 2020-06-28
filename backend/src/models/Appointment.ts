import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "test_data" })
export class TestData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  message!: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;
}

import db from "../DB/pool";

export interface UserInfo {
  id?: number;
  firstname: string;
  lastname: string;
  hashpwd?: string;
}

export class UserModel {
  async index(): Promise<UserInfo[]> {
    const sql = `SELECT id, firstname, lastname FROM users`;
    const result = await db.query(sql);
    return result.rows;
  }

  async show(id: string): Promise<UserInfo> {
    const sql = `SELECT id, firstname, lastname FROM users WHERE id=($1)`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
  }

  async create(info: UserInfo): Promise<UserInfo> {
    const sql = `INSERT INTO users (firstname, lastname, hashpwd) VALUES($1, $2, $3) RETURNING id, firstname, lastname`;
    const result = await db.query(sql, [
      info.firstname,
      info.lastname,
      info.hashpwd,
    ]);
    return result.rows[0];
  }
}

import db from "../DB/pool";

export interface Product {
  id?: number;
  name: string;
  price: number;
}

export class ProductModel {
  async index(): Promise<Product[]> {
    const sql = `SELECT * FROM products`;
    const result = await db.query(sql);
    return result.rows;
  }

  async show(id: string): Promise<Product> {
    const sql = `SELECT * FROM products WHERE id=($1)`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
  }

  async create(product: Product): Promise<Product> {
    const sql = `INSERT INTO products (name, price) VALUES($1, $2) RETURNING *`;
    const result = await db.query(sql, [product.name, product.price]);
    return result.rows[0];
  }
}

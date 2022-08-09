import db from "../DB/pool";

export interface Order {
  id?: number;
  status: string;
  user_id: number;
}

export interface OrderProduct {
  id?: number;
  quantity: number;
  order_id: number;
  product_id: number;
}

export interface UserOrder {
  user_id: number;
  order_id: number;
  status: string;
  quantity: number;
  name: string;
  price: number;
  product_id: number;
}

export class OrderModel {
  async create(order: Order): Promise<Order> {
    const sql = `INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *`;
    const result = await db.query(sql, [order.status, order.user_id]);
    return result.rows[0];
  }

  async show(id: string): Promise<Order> {
    const sql = `SELECT * FROM orders WHERE id=($1)`;
    const result = await db.query(sql, [id]);
    return result.rows[0];
  }

  async addProductToOrder(product: OrderProduct): Promise<OrderProduct> {
    const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *`;
    const result = await db.query(sql, [
      product.quantity,
      product.order_id,
      product.product_id,
    ]);
    return result.rows[0];
  }

  async getUserOrders(id: number): Promise<UserOrder[]> {
    const sql = `select orders.user_id, orders.id as order_id, orders.status, order_products.quantity, products.name, products.price, products.id as product_id
    from orders
    join order_products on orders.id = order_products.order_id
    join products on order_products.product_id = products.id
    where user_id = $1`;
    const result = await db.query(sql, [id]);
    return result.rows;
  }
}

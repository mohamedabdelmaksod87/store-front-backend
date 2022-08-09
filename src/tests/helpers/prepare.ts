import { ProductModel, Product } from "../../models/product";
import { UserModel, UserInfo } from "../../models/user";
import db from "../../DB/pool";

const product = new ProductModel();
const user = new UserModel();

export async function prepareDB(): Promise<void> {
  const userData: UserInfo = {
    firstname: "abc",
    lastname: "cba",
    hashpwd: "12345",
  };
  const productData: Product = {
    name: "milk",
    price: 5,
  };
  await user.create(userData);
  await product.create(productData);
}

export async function resetTable(name: string): Promise<void> {
  const sql = `
    delete from ${name};\n
    alter sequence ${name}_id_seq restart with 1;\n
    `;
  await db.query(sql);
}

import { envs } from "../../envs";
import { CategoryModel, ProductModel, UserModel } from "../mongo/models";

import { MongoDatabase } from "../mongo/mongo-database";
import { seedData } from "./data";

(async () => {
  MongoDatabase.connectDb({
    mongoUrl: envs.MONGO_DB,
  });
  await main();

  await MongoDatabase.disconnectDb();
})();

const randomNumber = (x: number) => {
  return Math.floor(Math.random() * x);
};

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  const users = await UserModel.insertMany(seedData.users);

  const categories = await CategoryModel.insertMany(
    seedData.categories.map((category) => {
      return {
        ...category,
        user: users[0]._id,
      };
    })
  );

  const products = await ProductModel.insertMany(
    seedData.products.map((product) => {
      return {
        ...product,
        user: users[randomNumber(seedData.users.length - 1)]._id,
        category: categories[randomNumber(seedData.categories.length - 1)]._id,
      };
    })
  );

  console.log("Seed created");
}

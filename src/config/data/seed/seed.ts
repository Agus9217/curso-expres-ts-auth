import { envs } from "../../envs";
import { CategoryModel, ProductModel, UserModel } from "../mongo/models";

import { MongoDatabase } from "../mongo/mongo-database";

(async () => {
  MongoDatabase.connectDb({
    mongoUrl: envs.MONGO_DB,
  });
  await main();

  await MongoDatabase.disconnectDb();
})();

async function main() {
  await Promise.all([
    UserModel.deleteMany(),
    CategoryModel.deleteMany(),
    ProductModel.deleteMany(),
  ]);

  console.log("Seed created");
}

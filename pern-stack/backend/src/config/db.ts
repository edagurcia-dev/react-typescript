import { Sequelize } from "sequelize-typescript";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(process.env.DATABASE_URL!, {
  models: [__dirname + "/../models/**/*.ts"],
});

export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.bgBlue.white("DB Conneced"));
  } catch (error) {
    console.log(
      colors.bgRed.white("Hubo un error al conectar a la base de datos")
    );
  }
}

export default db;

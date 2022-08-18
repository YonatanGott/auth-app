import mongoose from "mongoose"
import chalk from 'chalk';

const mongoUrl = process.env.MONGO_URL || "localhost"
const dbName = 'Auth'

export const initMongoDB = async (): Promise<void> => {
    try {
        await mongoose.connect(`mongodb://${mongoUrl}/${dbName}`,
            () => console.log(chalk.blue('Connected to MongoDB')))
    } catch (error) {
        console.log(chalk.red(`Can't connect to Database : ${error}`))
    }
}

const mongo = mongoose.connection
export default mongo
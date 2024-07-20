const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connected to database successfully!');
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

async function createModel(modelName, schema) {
  try {
    const model = prisma[modelName];
    await model.create({
      data: schema,
    });
    console.log(`Created new ${modelName} in database!`);
  } catch (error) {
    console.error(`Error creating new ${modelName}:`, error);
  }
}

async function find(modelName, filter) {
  try {
    const model = prisma[modelName];
    const result = await model.findMany({
      where: filter,
    });
    return result;
  } catch (error) {
    console.error(`Error finding ${modelName} in database:`, error);
    return null;
  }
}

async function create(modelName, data) {
  try {
    const model = prisma[modelName];
    const result = await model.create({
      data,
    });
    return result;
  } catch (error) {
    console.error(`Error creating new ${modelName} in database:`, error);
    return null;
  }
}

async function update(modelName, filter, data) {
  try {
    const model = prisma[modelName];
    const result = await model.updateMany({
      where: filter,
      data,
    });
    return result;
  } catch (error) {
    console.error(`Error updating ${modelName} in database:`, error);
    return null;
  }
}

async function deleteRecord(modelName, filter) {
  try {
    const model = prisma[modelName];
    const result = await model.deleteMany({
      where: filter,
    });
    return result;
  } catch (error) {
    console.error(`Error deleting ${modelName} from database:`, error);
    return null;
  }
}

module.exports = {
  connectToDatabase,
  createModel,
  find,
  create,
  update,
  deleteRecord,
};
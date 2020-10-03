import { EmployeeModel } from "../../models/employee";

// use mongoose model to get all employees.
const getEmployees = async () => EmployeeModel.find({});

// get only one employee by id with mongoose.
const getEmployee = async (root, data: any) =>
  EmployeeModel.findOne({ _id: data._id });

const updateEmployee = async (root, { _id, input }) =>
  EmployeeModel.findOneAndUpdate({ _id }, input);

// load resolvers with the functions related to the schemas of graphql.
const resolvers = {
  Query: {
    employees: getEmployees,
    employee: getEmployee,
  },
  Mutation: {
    updateEmployee,
  },
};

export default resolvers;

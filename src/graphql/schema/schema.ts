import "graphql-import-node";
import * as employeeInputSchema from "./EmployeeInput.graphql";
import * as employeeSchema from "./Employee.graphql";
import * as querySchema from "./Query.graphql";
import * as mutationSchema from "./Mutation.graphql";

// connect all the mini file of the schemas to one file.
const schema = [employeeInputSchema, employeeSchema, querySchema, mutationSchema];

export default schema;

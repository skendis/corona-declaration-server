import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Create the Schema for Mongoose that corresponds to that type we set in GraphQL
const employeeSchema = new Schema({

    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true
    }

})

export const EmployeeModel = mongoose.model('Employee', employeeSchema); // create and export the model
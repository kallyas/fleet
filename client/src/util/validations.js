import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const vehichleSchema = yup.object().shape({
  number_plate: yup
    .string()
    .required("Number plate is required")
    .matches(
      /^U[A-Z]{2} [0-9]{3}[A-Z]$/,
      "Invalid car number plate format. Example: UAB 456T"
    ),
  driver: yup.string().required("Driver is required"),
  mileage: yup.number().required("Mileage is required").min(1, "Mileage must be greater than 0"),
  manufacturer: yup.string().required("Manufacturer is required"),
  date_of_purchase: yup.string().required("Date of purchase is required"),
});

const driverSchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^0[7-9][0-9]{8}$/,
      "Invalid phone number format. Example: 0752541359"
    ),
  date_hired: yup.string().required("Date Hired is required"),
  age: yup.number().required("Age is required").min(18, "Age must be greater than 18"),
});

const mentainanceSchema = yup.object().shape({
  date: yup.string().required("Date is required"),
  description: yup.string().required("Description is required"),
  cost: yup.number().required("Cost is required").min(1, "Cost must be greater than 0"),
  fleet: yup.string().required("Vehicle is required"),
});

export { loginSchema, driverSchema, vehichleSchema, mentainanceSchema };

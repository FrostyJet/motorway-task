import { date, string, object, number } from "yup";

export const schema = object({
  name: string().required().typeError("Please provide a valid number"),
  email: string().email("Please provide a valid email").required(),
  birthDate: date()
    .required()
    .min(new Date(1940, 0, 1), "Please provide a valid date")
    .max(new Date(), "Please provide a valid date")
    .typeError("Please provide a valid date"),
  color: string()
    .matches(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i, "Is not in correct format")
    .required(),
  salary: number().min(10).max(500000).required(),
}).required();

export const initialForm = {
  name: "",
  email: "",
  birthDate: "",
  color: "#000000",
  salary: 0,
};

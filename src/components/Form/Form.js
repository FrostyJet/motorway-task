import React, { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { initialForm, schema } from "./constants";
import styles from "./Form.module.css";

const Form = ({ isOpen }) => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
    defaultValues: initialForm,
  });

  const [submitted, setSubmitted] = useState(false);

  const onSubmit = useCallback(
    (data) => {
      reset();
      setSubmitted(true);

      // just for demo
      console.log(data);

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    },
    [reset]
  );

  const renderInput = (name, label, type = "text") => (
    <div className={styles.formGroup}>
      <label htmlFor={name}>{label}</label>
      <input type={type} {...register(name)} />
      <p className={styles.error}>{errors[name]?.message}</p>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
      style={{ display: isOpen ? "grid" : "none" }}
    >
      <div className={styles.fields}>
        {renderInput("name", "Name")}
        {renderInput("email", "Email")}
        {renderInput("birthDate", "Date of birth", "date")}
        {renderInput("color", "Favourite colour", "color")}

        <div className={styles.formGroup}>
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <>
                <label htmlFor="salary">
                  Salary {field.value ? `~ ${field.value} $` : ""}
                </label>
                <input type="range" min="0" max="500000" step="10" {...field} />
              </>
            )}
          />
          <p className={styles.error}>{errors.salary?.message}</p>
        </div>
      </div>

      {submitted && (
        <div className={styles.message}>
          <p>
            Thank you for your submission. We will get back to you as soon as
            possible.
          </p>
        </div>
      )}

      <div className={styles.footer}>
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default Form;

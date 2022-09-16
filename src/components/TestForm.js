import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  random: "",
};

const onSubmit = (values) => {
  console.log("Data from form submition", values);
};

const validate = (values) => {
  /* 
      Conditions of this functions: 
        It must return an object.
        The errors's keys must be the same as the values's keys (errors.name, errors.email, etc)
        The keys' values must be strings 
        */
  let errors = {};

  if (!values.name) {
    errors.name = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email format";
  }

  if (!values.random) {
    errors.random = "Required";
  }

  return errors;
};

/* This is another way to validate our form with the Yup library */
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  channel: Yup.string().required("Required"),
});

/* We have to install the formik package "npm install yup --save" and import the hook useFormik with an object containing a initialValues object with the name used in the inputs so that Formik can keep them on track*/

const TestForm = () => {
  const formik = useFormik({
    initialValues,
    /* Here we use the onSubmit method to handle the submitted data with an arrow function */
    onSubmit,
    /* This is the validation method that containes an arrow function that takes the values as parameter*/
    //validate,
    /* Alternate validation method with the yup library */
    validationSchema,
  });

  //console.log(`Formik values are:`, formik.values);
  //console.log(`Formik errors are:`, formik.errors);
  //console.log(`Visited fields are:`, formik.touched);

  return (
    /*  Add the onChange (updates the state from the input values), values method(feeds input values to the state) and onBlur (fires when the user leaves a form field) to the input fields of the form as per below */
    <div>
      {/* The onSubmit method catches the submitted form's values */}
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            required
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            required
          />
          {formik.touched.email && formik.errors.name ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="random">Random</label>
          <input
            type="text"
            name="random"
            id="random"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.random}
            required
          />
          {formik.touched.random && formik.errors.name ? (
            <div className="error">{formik.errors.random}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default TestForm;

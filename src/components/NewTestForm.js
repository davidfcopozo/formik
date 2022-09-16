import React from "react";
/* import { useFormik } from "formik"; */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  email: "",
  random: "",
};

const onSubmit = (values) => {
  console.log("Data from form submition", values);
};

/* This is another way to validate our form with the Yup library */
const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email format").required("Required"),
  random: Yup.string().required("Required"),
});

/* We have to install the formik package "npm install yup --save" and import the hook useFormik with an object containing a initialValues object with the name used in the inputs so that Formik can keep them on track*/

const NewTestForm = () => {
  //console.log(`Formik values are:`, formik.values);
  //console.log(`Formik errors are:`, formik.errors);
  //console.log(`Visited fields are:`, formik.touched);

  return (
    /*  Add the onChange (updates the state from the input values), values method(feeds input values to the state) and onBlur (fires when the user leaves a form field) to the input fields of the form as per below */
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {/* The onSubmit method catches the submitted form's values */}
      <Form>
        <div className="form-control">
          <label htmlFor="name">Name</label>
          <Field type="text" name="name" id="name" required />
          <ErrorMessage name="name" />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field type="email" name="email" id="email" required />
          <ErrorMessage name="email" />
        </div>

        <div className="form-control">
          <label htmlFor="random">Random</label>
          <Field type="text" name="random" id="random" required />
          <ErrorMessage name="random" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default NewTestForm;

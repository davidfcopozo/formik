import React from "react";
/* import { useFormik } from "formik"; */
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

const initialValues = {
  name: "",
  email: "",
  random: "",
  comments: "",
  address: "",
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
          <Field
            type="text"
            name="name"
            id="name"
            placeholder="Type in your name"
            required
          />
          <ErrorMessage name="name" component={TextError} />
        </div>

        <div className="form-control">
          <label htmlFor="email">E-mail</label>
          <Field
            type="email"
            name="email"
            id="email"
            placeholder="Type in your E-mail"
            required
          />
          <ErrorMessage name="email">
            {(errorMsg) => <div className="error">{errorMsg}</div>}
          </ErrorMessage>
        </div>

        <div className="form-control">
          <label htmlFor="random">Random</label>
          <Field
            type="text"
            name="random"
            id="random"
            placeholder="Type in a random thing"
            required
          />
          <ErrorMessage name="random" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Comments</label>
          {/* as="" property is like the type="" property in HTML. It has "text" as default value, but we can use textarea, select or a custom React component*/}
          <Field
            as="textarea"
            name="comments"
            id="comments"
            placeholder="Type in your comment"
            required
          />
          <ErrorMessage name="comments" />
        </div>

        <div className="form-control">
          <label htmlFor="comments">Address</label>
          {/* */}
          <Field name="address">
            {(props) => {
              console.log(props);
              const { field, form, meta } = props;
              return (
                <div>
                  <input type="text" id="address" {...field} />
                  {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                </div>
              );
            }}
          </Field>

          <ErrorMessage name="address" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default NewTestForm;

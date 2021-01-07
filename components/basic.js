import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const validationSchema = yup.object({
  colour: yup
    .string('Enter your favourite colour')
    .required('Email is required'),
  animal: yup
    .string('Enter your favourite animal')
    .required('Password is required'),
  country: yup
    .string('Enter your favourite country')
    .required('Password is required'),
  climbingStyle: yup
    .string('Enter your favourite climbing style')
    .required('Password is required'),
});

var Airtable = require('airtable');
Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: 'keywocKFwPXxgQPOe'
});
var base = new Airtable({apiKey: 'keywocKFwPXxgQPOe'}).base('appKdkAWeTiUMtTOI');

const basic = () => {
  const formik = useFormik({
    initialValues: {
      Name: 'test1',
      colour: 'blue?',
      animal: '',
      country: '',
      climbingStyle: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      let payload = {};
      payload.fields = values;
      console.log(payload);
      base('Table 1').create([payload], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="colour"
          name="colour"
          label="Colour"
          value={formik.values.colour}
          onChange={formik.handleChange}
          error={formik.touched.colour && Boolean(formik.errors.colour)}
          helperText={formik.touched.colour && formik.errors.colour}
        />
        <TextField
          fullWidth
          id="animal"
          name="animal"
          label="Animal"
          type="animal"
          value={formik.values.animal}
          onChange={formik.handleChange}
          error={formik.touched.animal && Boolean(formik.errors.animal)}
          helperText={formik.touched.animal && formik.errors.animal}
        />
        <TextField
          fullWidth
          id="country"
          name="country"
          label="Country"
          type="country"
          value={formik.values.country}
          onChange={formik.handleChange}
          error={formik.touched.country && Boolean(formik.errors.country)}
          helperText={formik.touched.country && formik.errors.country}
        />
        <TextField
          fullWidth
          id="climbingStyle"
          name="climbingStyle"
          label="Climbing Style"
          type="climbingStyle"
          value={formik.values.climbingStyle}
          onChange={formik.handleChange}
          error={formik.touched.climbingStyle && Boolean(formik.errors.climbingStyle)}
          helperText={formik.touched.climbingStyle && formik.errors.climbingStyle}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default basic;

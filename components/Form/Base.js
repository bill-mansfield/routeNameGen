import React, { useState, setState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress
} from '@material-ui/core';
import { Formik, Form } from 'formik';
import base from '../APIs/airtable';

import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import FormSuccess from '../FormSuccess/FormSuccess';

import validationSchema from '../FormModel/validationSchema';
import checkoutFormModel from '../FormModel/checkoutFormModel';
import formInitialValues from '../FormModel/formInitialValues';

import useStyles from './styles';

const steps = ['Shipping address', 'Payment details', 'Review your order'];
const { formId, formField } = checkoutFormModel;

const renderStepContent = (step) => {
  switch (step) {
    case 0:
      return <StepOne formField={formField} />;
    case 1:
      return <StepTwo formField={formField} />;
    case 2:
      return <StepThree />;
    default:
      return <div>Not Found</div>;
  }
}

export default function Base() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [recordId, setRecordId] = useState();
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;

  const submitForm = (values, actions) => {
    actions.setSubmitting(false);
    setActiveStep(activeStep + 1);

    let payload = {};
    payload.fields = values;
    base('Table 1').create([payload], function(err, records) {
      if (err) {
        console.log(err);
        return;
      }
      records.forEach(function async (record) {
        console.log(record.getId());
        setRecordId(record.getId());
      });
    });
  }

  const handleSubmit = (values, actions) => {
    console.log(values);
    if (isLastStep) {
      submitForm(values, actions);
      actions.setSubmitting(true);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  }

  return (
    <React.Fragment>
      <Typography component="h1" variant="h4" align="center">
        Checkout
      </Typography>
      <Stepper activeStep={activeStep} className={classes.stepper}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <React.Fragment>
        {activeStep === steps.length ? (
          <FormSuccess airtable={recordId} />
        ) : (
          <Formik
            initialValues={formInitialValues}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form id={formId}>
                {renderStepContent(activeStep)}

                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <div className={classes.wrapper}>
                    <Button
                      disabled={isSubmitting}
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.button}
                    >
                      {isLastStep ? 'Place order' : 'Next'}
                    </Button>
                    {isSubmitting && (
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </React.Fragment>
    </React.Fragment>
  );
}

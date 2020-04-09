import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FormRenderer, {
  componentTypes,
  validatorTypes,
} from '@data-driven-forms/react-form-renderer';
import {
  formFieldsMapper,
  layoutMapper,
} from '@data-driven-forms/mui-component-mapper';

class FormComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 1,
      formData: {},
      activeStep: 0,
      steps: ['Personal Details', 'Your Choices'],
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  onSubmit(value) {
    {
      this.state.step == '1'
        ? this.setState({
            step: 2,
          })
        : alert(JSON.stringify(value));
    }
    this.handleNext();
  }
  schema = {
    fields: [
      {
        component: 'sub-form',
        title: 'Section - 1',
        description: 'This is the initial Part of Your Form',
        name: 'sub-form-1',
        fields: [
          {
            component: 'plain-text',
            name: 'plain-text',
            label: 'Personal Details',
          },
          {
            component: 'text-field',
            name: 'NameS',
            label: 'Name',
            isRequired: true,
            validate: [
              {
                type: 'required-validator',
                message: 'Name required',
              },
            ],
          },
          {
            component: 'date-picker',
            label: 'Date of Birth',
            name: 'dob',
            validate: [
              {
                type: 'required-validator',
                message: 'Date of Birth required',
              },
            ],
          },
          {
            component: 'text-field',
            label: 'e-mail ID',
            name: 'email',
            validate: [
              {
                type: 'required-validator',
                message: 'Email required',
              },
              {
                type: validatorTypes.PATTERN_VALIDATOR,
                pattern: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
                message: 'Enter a valid email ID',
              },
            ],
          },
        ],
      },
    ],
  };
  schema1 = {
    fields: [
      {
        component: 'sub-form',
        title: 'Section - 2',
        description:
          'This is the second section of the form Please choose your choices',
        name: 'sub-form-2',
        fields: [
          {
            component: 'tabs',
            name: 'tabs',
            fields: [
              {
                component: 'tab-item',
                name: 'Movies',
                title: 'Movies',
                fields: [
                  {
                    component: 'text-field',
                    label: 'Textfield 1',
                    name: 'Movie Details',
                  },
                  {
                    component: 'checkbox',
                    label: 'Categories',
                    name: 'checkbox',
                    options: [
                      {
                        label: 'Romance',
                        value: 'Romance',
                      },
                      {
                        label: 'Thriller',
                        value: 'Thriller',
                      },
                      {
                        label: 'Adventure',
                        value: 'Adventure',
                      },
                    ],
                  },
                ],
              },
              {
                component: 'tab-item',
                name: 'Games',
                title: 'Games',
                fields: [
                  {
                    component: 'text-field',
                    label: 'Games Details',
                    name: 'Games Details',
                  },
                  {
                    component: 'radio',
                    label: 'Category',
                    name: 'Category',
                    options: [
                      {
                        label: 'Indoor',
                        value: 'Indoor',
                      },
                      {
                        label: 'Outdoor',
                        value: 'Outdoor',
                      },
                      {
                        label: 'Netflix and Chill',
                        value: 'Netflix and Chill',
                      },
                    ],
                  },
                ],
              },
              {
                component: 'tab-item',
                name: 'Shopping Site',
                title: 'Shopping Site',
                fields: [
                  {
                    component: 'text-field',
                    label: 'Shopping Site',
                    name: 'Shopping Site',
                  },
                  {
                    component: 'select-field',
                    label: 'Site Name',
                    name: 'Site Name',
                    options: [
                      {
                        label: 'Google',
                        value: 'Google',
                      },
                      {
                        label: 'Amazon',
                        value: 'Amazon',
                      },
                      {
                        label: 'Facebook',
                        value: 'Facebook',
                      },
                      {
                        label: 'Microsoft',
                        value: 'Microsoft',
                      },
                      {
                        label: 'Tesla',
                        value: 'Tesla',
                      },
                    ],
                    isSearchable: true,
                  },
                  {
                    component: 'switch-field',
                    label: 'Make my choice Public',
                    name: 'Make my choice Public',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  render() {
    console.log(componentTypes);
    return (
      <div style={{ padding: '3%' }}>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {this.state.steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <FormRenderer
          schema={this.state.step == '1' ? this.schema : this.schema1}
          formFieldsMapper={formFieldsMapper}
          layoutMapper={layoutMapper}
          onSubmit={(value) => this.onSubmit(value)}
          onCancel={() => {
            this.setState({
              step: 1,
            });
            this.handleBack();
            this.handleReset();
          }}
        />
      </div>
    );
  }
}

export default FormComponent;

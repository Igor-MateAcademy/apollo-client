import * as yup from 'yup';

export const schema = yup.object().shape({
  firstName: yup.string().required('First name field is required'),
  lastName: yup.string().required('Last name field is required'),
  coords: yup.object().required('City field is required').nullable(),
});

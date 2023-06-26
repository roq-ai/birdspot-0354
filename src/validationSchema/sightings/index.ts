import * as yup from 'yup';

export const sightingValidationSchema = yup.object().shape({
  bird_name: yup.string().required(),
  location: yup.string().required(),
  date: yup.date().required(),
  status: yup.string().required(),
  user_id: yup.string().nullable().required(),
  club_id: yup.string().nullable().required(),
});

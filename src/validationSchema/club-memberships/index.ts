import * as yup from 'yup';

export const clubMembershipValidationSchema = yup.object().shape({
  user_id: yup.string().nullable().required(),
  club_id: yup.string().nullable().required(),
});

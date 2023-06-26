import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getClubMembershipById, updateClubMembershipById } from 'apiSdk/club-memberships';
import { Error } from 'components/error';
import { clubMembershipValidationSchema } from 'validationSchema/club-memberships';
import { ClubMembershipInterface } from 'interfaces/club-membership';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ClubInterface } from 'interfaces/club';
import { getUsers } from 'apiSdk/users';
import { getClubs } from 'apiSdk/clubs';

function ClubMembershipEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ClubMembershipInterface>(
    () => (id ? `/club-memberships/${id}` : null),
    () => getClubMembershipById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ClubMembershipInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateClubMembershipById(id, values);
      mutate(updated);
      resetForm();
      router.push('/club-memberships');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ClubMembershipInterface>({
    initialValues: data,
    validationSchema: clubMembershipValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Club Membership
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'user_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
            <AsyncSelect<ClubInterface>
              formik={formik}
              name={'club_id'}
              label={'Select Club'}
              placeholder={'Select Club'}
              fetcher={getClubs}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'club_membership',
  operation: AccessOperationEnum.UPDATE,
})(ClubMembershipEditPage);

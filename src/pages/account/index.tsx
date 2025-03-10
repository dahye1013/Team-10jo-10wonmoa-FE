import React, { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Tabs, TopNavBar } from '@components';
import type { TabItem } from '@components/Tabs';
import { AccountForm } from '@components/account';
import {
  fetchGetCategory,
  fetchPostExpenditures,
  fetchPostIncomes,
} from '@api';
import { CreateAccountForm } from '@models';

const ACCOUNT_TYPE: TabItem[] = [
  {
    value: 'income',
    title: '수입',
  },
  {
    value: 'expenditure',
    title: '지출',
  },
];

const Account = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE[0]);
  const [formValues, setFormValues] = useState<CreateAccountForm>({
    amount: '',
    userCategoryId: '',
    registerDate: '',
  });

  const { data: categories } = useQuery(
    ['categories', accountType.value],
    () => fetchGetCategory(accountType.value),
    {
      enabled: !!accountType,
    }
  );

  const createAccountMutation = useMutation(
    'AddAccount',
    (accountForm: CreateAccountForm) => {
      return accountType.value === 'income'
        ? fetchPostIncomes(accountForm)
        : fetchPostExpenditures(accountForm);
    },
    {
      onSuccess: (data, variable) => {
        alert('success' + data.id);
        console.log(data, variable);
      },
    }
  );

  const handleTabClick = (item: TabItem) => {
    setAccountType(item);
  };

  const handleSubmit = () => {
    console.log(formValues);
    createAccountMutation.mutate(formValues);
  };

  return (
    <>
      <TopNavBar title={accountType.title} isActiveGoBack />
      <Tabs tabItems={ACCOUNT_TYPE} onClick={handleTabClick}></Tabs>
      <AccountForm
        onSubmit={handleSubmit}
        onChangeForm={setFormValues}
        categories={categories}
      />
    </>
  );
};

export default Account;

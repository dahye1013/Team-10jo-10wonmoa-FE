import { Routes, Route, Navigate } from 'react-router-dom';
import {
  Login,
  SignUp,
  Account,
  AccountBook,
  AccountBookDaily,
  AccountBookCalendar,
  AccountBookMonthly,
  Statistics,
  Budget,
} from '@pages';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />

      <Route path="/account">
        <Route path={`create`} element={<Account />} />
        <Route path={`update/:id`} />
      </Route>

      <Route path="/account-book" element={<AccountBook />}>
        <Route path={`daily`} element={<AccountBookDaily />} />
        <Route path={`calendar`} element={<AccountBookCalendar />} />
        <Route path={`monthly`} element={<AccountBookMonthly />} />
      </Route>

      <Route path="/statistics" element={<Statistics />}></Route>
      <Route path="/budget" element={<Budget />}></Route>
    </Routes>
  );
};

export default AppRouter;

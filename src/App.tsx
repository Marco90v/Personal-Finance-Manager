// import IncomeExpenses from "@/components/common/IncomeExpenses"
// import Spending from "@/components/common/Spending"
// import CardBalance from "@/components/common/CardBalance"
// import Budgets from "@/components/common/Budgets"
// import Goals from "@/components/common/Goals"
import { lazy } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard"
// import Home from "@/pages/Home";
// import Income from "@/pages/Income";
// import Expenses from "@/pages/Expenses";
// import Accounts from "@/pages/Accounts";
// import Transactions from "@/pages/Transactions";
// import Settings from "@/pages/Settings";

const Home = lazy(() => import("@/pages/Home"));
const Income = lazy(() => import("@/pages/Income"));
const Expenses = lazy(() => import("@/pages/Expenses"));
const Accounts = lazy(() => import("@/pages/Accounts"));
const Transactions = lazy(() => import("@/pages/Transactions"));
const Settings = lazy(() => import("@/pages/Settings"));

const ValidatedRoute = ({type}:{type:"public"|"private"}) => {
  return (
    <Outlet />
  );
};

function App() {
  return (
    <>
      {/* <IncomeExpenses />
      <Spending />
      <CardBalance title="Total Balance" totalBalance={24750} porcentage="+2.5%" arrow="ArrowUpRight" />
      <CardBalance title="Monthly Income" totalBalance={4800} arrow="TrendingUp" textColorTitle="text-green-600" />
      <CardBalance title="Monthly Expenses" totalBalance={3400} arrow="TrendingDown" textColorTitle="text-red-600" />
      <Budgets />
      <Goals /> */}
      {/* <Dashboard /> */}
      {/* <Suspense fallback={<div>Loading...</div>}> */}
        <BrowserRouter>
          <Routes>
            <Route element={<ValidatedRoute type="public" />}>
              <Route path="/" element={<div>Landing Page</div>} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            <Route element={<ValidatedRoute type="private" />}>
              <Route path={"/dashboard"} element={<Dashboard />} >
                <Route index element={<Home />} />
                <Route path={"income"} element={<Income />} />
                <Route path={"expenses"} element={<Expenses />} />
                <Route path={"accounts"} element={<Accounts />} />
                <Route path={"transactions"} element={<Transactions />} />
                <Route path={"settings"} element={<Settings />} />
              </Route>
            </Route>
            
          </Routes>
        </BrowserRouter>
      {/* </Suspense> */}
    </>
  )
}

export default App

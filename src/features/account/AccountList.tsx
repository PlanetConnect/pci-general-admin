import ErrorIcon from "@mui/icons-material/Error";
import { CircularProgress, Typography } from "@mui/material";
import { Account } from "@pci/pci-services.types.account";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PaperContent, Title } from "~/app/templates/content/";
import { DataTable } from "~/app/templates/datatable";
import { useSnackBar } from "~/app/templates/snackbar";
import {
  useCreateAccountMutation,
  useGetAccountsQuery,
} from "~/services/queryApi";

import data from "./data/data";
import accountListColumns from "./data/datatable/accountListColumns";

const settings = {
  columnVisibility: { account_id: false },
  isCheckBoxEnabled: false,
  pageSize: 25,
  rowIdField: "account_id",
};

const AccountList = () => {
  const navigate = useNavigate();
  const { openSnackBar } = useSnackBar();
  const { data: accounts, isLoading, isError, error } = useGetAccountsQuery();
  const [createAccount, results] = useCreateAccountMutation();

  if (isError) {
    console.log("🚀 ~ file: AccountList.tsx:28 ~ AccountList ~ error", error);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <ErrorIcon color="error" />
        <Typography>Error Loading Accounts</Typography>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CircularProgress />
        <Typography>Loading...</Typography>
      </div>
    );
  }

  const filteredAccounts = accounts?.data?.filter((account: Account) => {
    if (account.account_id) {
      return account;
    }
  });

  //CREATE ACCOUNT ERRORING ON THE TYPE

  const onCreate = async () => {
    try {
      console.log("create new account");
      const createResult = await createAccount({
        name: "New Account",
        website: "planetconnect.com",
      }).unwrap();

      navigate(`/accounts/${createResult?.inserted_id}`);
    } catch (e: any) {
      openSnackBar({
        message: `Account cannot be created. ${e.data.error}`,
        position: {
          vertical: "top",
          horizontal: "center",
        },
        variant: "error",
      });
    }
  };

  return (
    <PaperContent>
      {/*</PaperContent> Title onCreate={onCreate}>Accounts</Title>*/}
      <Title onCreate={onCreate}>Accounts</Title>
      <DataTable
        columns={accountListColumns}
        rows={filteredAccounts as any[]}
        settings={settings}
      />
    </PaperContent>
  );
};

export default AccountList;

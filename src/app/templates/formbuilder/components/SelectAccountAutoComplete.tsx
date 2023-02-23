import Autocomplete from "@mui/lab/Autocomplete";
import { Stack, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Account, AccountProps } from "@pci/pci-services.types.account";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import Error from "./Error";

interface MultiSelectProps {
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  selected?: Account | undefined;
  options?: Account[];
  isDisabled?: boolean;
  error?: string;
}

const SelectAccountAutoComplete = ({
  label,
  name,
  variant = "outlined",
  selected,
  options,
  error,
}: MultiSelectProps) => {
  console.log(
    "🚀 ~ file: SelectAccountAutoComplete.tsx:43 ~ selected",
    selected
  );

  const [searchResults, setSearchResults] = useState({
    options: options || [],
    getOptionLabel: (option: Account) => option.name,
  });
  const { setValue, watch, control } = useFormContext();
  const selectedAccount = watch(name);

  const handleSearchTypeAhead = (text: string) => {
    const foundAccounts = options?.filter((account) => {
      if (account?.name?.toLowerCase()?.includes(text.toLowerCase())) {
        return account;
      }
    });

    setSearchResults({
      options: foundAccounts || [],
      getOptionLabel: (option) => option.name,
    });
  };

  const selectAttendeeSearch = async (value: AccountProps | null) => {
    setValue(name, value?.account_id || "");
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange }, formState: { errors } }) => (
            <Autocomplete
              filterOptions={(x) => x}
              {...searchResults}
              // defaultValue={selectedAccount}
              value={options?.find((option) => option.account_id === value)}
              renderOption={(props, option) => {
                return (
                  <li {...props}>
                    <Box
                      style={{
                        display: "flex",
                        flex: 1,
                        flexDirection: "row",
                        width: "100%",
                        borderBottom: `1px solid `,
                        cursor: "pointer",
                      }}
                    >
                      <Typography
                        noWrap
                        style={{
                          width: "100%",
                          lineClamp: 2,
                          textOverflow: "ellipsis",
                        }}
                      >
                        {option.name}
                      </Typography>
                    </Box>
                  </li>
                );
              }}
              onChange={(event, value) => {
                onChange(value?.account_id || "");
              }}
              onOpen={() => {
                handleSearchTypeAhead(selectedAccount?.name || "");
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    name={name}
                    onChange={(event) =>
                      handleSearchTypeAhead(event.target.value)
                    }
                    {...params}
                    label={label}
                    fullWidth
                  />
                );
              }}
            />
          )}
        />
        <Error name={name} error={error} />
      </Stack>
    </Box>
  );
};

export default SelectAccountAutoComplete;

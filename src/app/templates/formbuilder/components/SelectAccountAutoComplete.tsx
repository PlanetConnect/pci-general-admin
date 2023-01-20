import Autocomplete from "@mui/lab/Autocomplete";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Account } from "@pci/pci-services.types.account";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

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
  const { setValue, watch } = useFormContext();
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

  const selectAttendeeSearch = async (value: Account | null) => {
    setValue(name, value);
  };

  return (
    <Autocomplete
      filterOptions={(x) => x}
      {...searchResults}
      defaultValue={selectedAccount}
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
        if (!value) {
          setSearchResults({
            options: options || [],
            getOptionLabel: (option) => option.name,
          });
        }
        selectAttendeeSearch(value);
      }}
      onOpen={() => {
        handleSearchTypeAhead(selectedAccount?.name || "");
      }}
      renderInput={(params) => {
        return (
          <TextField
            name={name}
            onChange={(event) => handleSearchTypeAhead(event.target.value)}
            {...params}
            label={label}
            fullWidth
          />
        );
      }}
    />
  );
};

export default SelectAccountAutoComplete;

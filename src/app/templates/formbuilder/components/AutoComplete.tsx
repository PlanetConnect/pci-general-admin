import Autocomplete from "@mui/lab/Autocomplete";
import { TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { Contact, ContactProps } from "@pci/pci-services.types.contact";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useAppDispatch } from "~/app/hooks";
import { queryApi } from "~/services/queryApi";

import Error from "./Error";

interface Option {
  value: string;
  label: string | number;
}

interface MultiSelectProps {
  label: string;
  name: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  selected: ContactProps | undefined;
  options?: ContactProps[];
  isDisabled?: boolean;
  error?: string;
  manualOnChange?: (value: ContactProps | null) => void;
}

const AutoComplete = ({
  label,
  name,
  variant = "outlined",
  selected,
  options,
  error,
  manualOnChange,
}: MultiSelectProps) => {
  const dispatch = useAppDispatch();

  const [searchResults, setSearchResults] = useState({
    options: options || [],
    getOptionLabel: (option: ContactProps) => {
      console.log("🚀 ~ file: AutoComplete.tsx:47 ~ option", option);

      return option?.email;
    },
  });
  console.log("🚀 ~ file: AutoComplete.tsx:49 ~ options", options);
  const { setValue, watch, control } = useFormContext();
  const selectedContact = watch(name);

  const getAccountName = async (accountId: string) => {
    const account = await dispatch(
      queryApi.endpoints.getAccountById.initiate(accountId)
    );
    if (account) {
      setValue("attendeeAccountName", account?.data?.data?.name);
    }
  };

  const handleSearchTypeAhead = (text: string) => {
    const foundContacts = options?.filter((contact) => {
      if (
        contact?.first_name?.toLowerCase()?.includes(text.toLowerCase()) ||
        contact?.last_name?.toLowerCase()?.includes(text.toLowerCase()) ||
        contact?.email?.toLowerCase()?.includes(text.toLowerCase())
      ) {
        return contact;
      }
    });

    setSearchResults({
      options: foundContacts || [],
      getOptionLabel: (option) => option.email,
    });
  };

  const selectAttendeeSearch = async (value: any | null) => {
    if (manualOnChange) {
      manualOnChange(value);
      return;
    }

    // setValue(name, value as Contact);
    if (value) {
      if (value?.address?.facility) {
        delete value?.address?.facility;
      }
      setValue(name, new Contact(value));
      // await getAccountName(value?.account_id || "");
    }
  };

  return (
    <Box sx={{ flex: 1 }}>
      <Stack spacing={1}>
        <Controller
          name={name}
          control={control}
          render={({ fieldState: { error } }) => {
            // console.log("🚀 ~ file: AutoComplete.tsx:177 ~ error", error);

            return (
              <>
                <Autocomplete
                  filterOptions={(x) => x}
                  {...searchResults}
                  defaultValue={selectedContact}
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
                          <Box
                            sx={{
                              overflow: "hidden",
                              width: "100%",
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
                              {option.first_name} {option.last_name}
                            </Typography>
                            <Typography
                              noWrap
                              style={{
                                width: "100%",
                                lineClamp: 2,
                                textOverflow: "ellipsis",
                              }}
                            >
                              {option.email}
                            </Typography>
                          </Box>
                        </Box>
                      </li>
                    );
                  }}
                  onChange={(event, value) => {
                    if (!value) {
                      setSearchResults({
                        options: options || [],
                        getOptionLabel: (option) => option.email,
                      });
                    }
                    selectAttendeeSearch(value);
                  }}
                  onOpen={() => {
                    handleSearchTypeAhead(selectedContact?.email || "");
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
                <Error name={name} error={error?.message} />
              </>
            );
          }}
        />
      </Stack>
    </Box>
  );
};

export default AutoComplete;

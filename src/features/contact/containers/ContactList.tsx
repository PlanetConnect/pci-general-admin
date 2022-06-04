import Typography from "@mui/material/Typography";

import { PaperContent, Title } from "../../../app/templates/content/";

function ContactList() {
  return (
    <PaperContent>
      <Title>Contact List</Title>
      <Typography variant="body2">
        To address all issues (including breaking changes), run: npm audit fix
        --force Run `npm audit` for details. jamesh@Jameshs-MacBook-Pro
        pci-general-admin % npm install @mui/icons-material --save added 1
        package, and audited 1464 packages in 15s 189 packages are looking for
        funding run `npm fund` for details 6 moderate severity vulnerabilities
        To address all issues (including breaking changes), run: npm audit fix
        --force Run `npm audit` for details. jamesh@Jameshs-MacBook-Pro
        pci-general-admin % npm install --save react-helmet npm WARN ERESOLVE
        overriding peer dependency added 3 packages, and audited 1467 packages
        in 6s 189 packages are looking for funding run `npm fund` for details 6
        moderate severity vulnerabilities To address all issues (including
        breaking changes), run: npm audit fix --force Run `npm audit` for
        details. jamesh@Jameshs-MacBook-Pro pci-general-admin %{" "}
      </Typography>
    </PaperContent>
  );
}

export default ContactList;

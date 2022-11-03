import Link from "./Link";

interface Show {
  showId: string;
  name: string;
  year: number;
  start_date: string;
  end_date: string;
  links?: Link[];
  setup: string;
  isActive: boolean;
  accountId?: string;
  facility?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  description?: string;
  createdTime: string;
  modifiedTime: string;
  status?: string;
}

export default Show;

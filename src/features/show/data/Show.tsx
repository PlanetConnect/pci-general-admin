interface Show {
  showId: string;
  name: string;
  year: number;
  startDate: string;
  endDate: string;
  links?: string[];
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
}

export default Show;

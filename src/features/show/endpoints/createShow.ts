import Show from "~/features/show/data/types/Show";

const createShow = {
  query: (payload: Show) => ({ url: `/shows/`, method: "POST", body: payload }),
};
export default createShow;

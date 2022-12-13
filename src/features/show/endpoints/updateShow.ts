import Show from "~/features/show/data/types/Show";

const updateShow = {
  query: (payload: { show: Show; id: string }) => ({
    url: `/shows/${payload.id}`,
    method: "PUT",
    body: payload.show,
  }),
};
export default updateShow;

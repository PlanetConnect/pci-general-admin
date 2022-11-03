const deleteShow = {
  query: (id: string) => ({ url: `/shows/${id}`, method: "DELETE" }),
};
export default deleteShow;

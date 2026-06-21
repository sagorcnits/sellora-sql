export const responsePagination = (
  page: number,
  limit: number,
  total: number,
) => {
  return {
    page: page,
    limit: limit,
    total: total,
  };
};

export const CATEGORIES = ["Electronics", "Fashion", "Furniture"];

export const categoryDropdownOptions = CATEGORIES.map((category) => {
  return { value: category, label: category };
});

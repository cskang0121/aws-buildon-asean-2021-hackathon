export const CATEGORIES = ["Computers & Tech", "Furniture & Home Living", "Mobile Phones & Gadgets"];

export const categoryDropdownOptions = CATEGORIES.map((category) => {
  return { value: category, label: category };
});

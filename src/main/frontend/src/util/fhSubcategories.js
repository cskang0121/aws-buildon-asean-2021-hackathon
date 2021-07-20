export const FHSUBCATEGORIES = ["Furniture", "Chairs", "Dining", "Ergonomic", "Gaming", "Minimalist", "Modern", "Arm Chairs", "Office", "Industrial", "Black", "Mesh", "Tables and Sets", "Computer & Study Desks", "Dining Tables & Sets", "Wooden Table", ];

export const fhSubcategoryDropdownOptions = FHSUBCATEGORIES.map((subcategory) => {
  return { value: subcategory, label: subcategory };
});

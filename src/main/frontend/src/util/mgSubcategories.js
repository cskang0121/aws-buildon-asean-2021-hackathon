export const MGSUBCATEGORIES = ["Mobile Phones", "Android Phones", "iPhone", "Samsung", "Xiaomi", "OPPO", "Huawei", "Android Others", "iPhone 12 Series", "iPhone 11 Series", "iPhone X Series", "iPhone 8 Series", "iPhone 7 Series", "iPhone 6 Series" ];

export const mgSubcategoryDropdownOptions = MGSUBCATEGORIES.map((subcategory) => {
  return { value: subcategory, label: subcategory };
});

// package com.javawarriors.buyerside.entities.compositeKeys;

// import java.io.Serializable;
// import java.util.Objects;

// /*
//  * Java class that represents the composite primary key of History
//  */
// public class TagPK implements Serializable {
//     private String tagCategoryName;
//     private String tagValue;

//     /**
//      * No argument constructor
//      */
//     public TagPK() {

//     }

//     public TagPK(String tagCategoryName, String tagValue) {
//         this.tagCategoryName = tagCategoryName;
//         this.tagValue = tagValue;
//     }

//     /**
//      * Getters and setters
//      */

//     public String getTagCategoryName() {
//         return this.tagCategoryName;
//     }

//     public void setTagCategoryName(String tagCategoryName) {
//         this.tagCategoryName = tagCategoryName;
//     }

//     public String getTagValue() {
//         return this.tagValue;
//     }

//     public void setTagValue(String tagValue) {
//         this.tagValue = tagValue;
//     }

//     /**
//      * Implementation of the equals method
//      * 
//      * @param o object to compare to
//      */
//     @Override
//     public boolean equals(Object o) {
//         if (this == o)
//             return true;
//         if (o == null || getClass() != o.getClass())
//             return false;
//         TagPK tagKey = (TagPK) o;
//         return tagCategoryName.equals(tagKey.tagCategoryName) && tagValue.equals(tagKey.tagValue);
//     }

//     /**
//      * Implementation of the hashCode method
//      * 
//      * @return hash code
//      */
//     @Override
//     public int hashCode() {
//         return Objects.hash(tagCategoryName, tagValue);
//     }
// }
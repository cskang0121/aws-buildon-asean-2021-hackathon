# ASEAN BuildOn 2021 - Buylettin

## Team: Java Warriors
- JENNIFER POERNOMO
- KANG CHIN SHEN
- LYE JIAN YI
- MICHELLE LEONG HWEE-LING
- SHAUN TING

## About The Project 

### Challenge Statement
**Carousell Challenge Statement #2:** Buying and selling pre-owned items helps buyers save money and sellers generate spare cash. And more importantly, it helps to reduce waste and save the environment. How might we encourage more people to buy and sell pre-owned items?

### Our Solution
Current C2C e-commerce platform interactions are largely one-sided, in which sellers list the items they want to sell and buyers can only browse through that existing supply in order to find what they need. There is less opportunity for initiative on the seller’s side to source for buyers and less flexibility for the buyers to find what they really want.

Therefore, our solution for encouraging the sale of pre-owned items is to introduce a **Buyer’s Listing / Request Board** platform where users can list items they are looking to buy. That way, we are able to introduce a two-way interaction between buyers and sellers.

#### Features:
- The ability to post "Want to Buy" listings with the description of the item they want to buy
- The ability to post "Item for Sale" listings
- Negotiation: buyers can make price offers on "Item for Sale" listings, sellers can propose deals on "Want to Buy" listings
- **Recommendation system** powered by **Amazon Personalize** that matches sellers and buyers based on their posted listings
- **Public Q&A System**: For "Item for Sale" listings, interested buyers can post a question related to the item and sellers to answer that question. The question is open for public viewing. This eases the seller’s experience since it reduces the need to individually answer commonly asked questions through chat. For "Want to Buy" listings, buyers can specify questions that they would like to be answered.

## Deployment

Our project is deployed using AWS on Amazon Cloud with the help of **Elastic Beanstalk** to automatically provision resources such as EC2 instances and Elastic Load Balancer to host the REST API back-end (coded in Java using SpringBoot) and **Amazon S3 static website hosting** to host the React application front-end. Additionally, Amazon S3 is also used to store our media (such as images) to be displayed on the application and the training data for Amazon Personalize. **Amazon Personalize** is used for our recommendation system. **Amazon RDS** is used for our MySQL database.

**Link to our prototype**: http://javawarriors-buyerside-731098be-456e-4ed6-995e.s3-website-us-east-1.amazonaws.com/

#### Disclaimer
Some of our prototype's features may not be available 24/7 due to the limitations imposed on us by AWS Educate. When the session token expires, certain features such as image loading from S3 and Amazon Personalize recommendations may cease to function.

## Relevant Links
- **Prototype**: http://javawarriors-buyerside-731098be-456e-4ed6-995e.s3-website-us-east-1.amazonaws.com/
- **Demo Video**:
- **Slide Deck**:

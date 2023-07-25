
![255965173-bc96ba3b-efaa-4e32-b1db-957b8c1f5d59](https://github.com/cskang0121/aws-buildon-asean-2021-hackathon/assets/79074359/d55335a2-faec-4c12-8c6d-644a53eae332)

# Amazon Web Services – Build On, ASEAN 2021 

## Team Java Warriors Members
1. SMU Computer Science Year 2 – Kang Chin Shen
2. SMU Computer Science Year 2 – Jennifer Poernomo
3. SMU Computer Science Year 2 – Lye Jian Yi
4. SMU Computer Science Year 2 – Michelle Leong Hwee-Ling
5. SMU Computer Science Year 2 – Shaun Ting

## Carousell Challenge Statement
* Buying and selling pre-owned items helps buyers save money and sellers generate spare cash. And more importantly, it helps to reduce waste and save the environment. How might we encourage more people to buy and sell pre-owned items?

## Proposed Solution
<img width="1445" alt="Screenshot 2023-07-26 at 12 24 01 AM" src="https://github.com/cskang0121/aws-buildon-asean-2021-hackathon/assets/79074359/efaebe01-7f2d-408e-ba8d-80640ca9a910">

* Current C2C e-commerce platform interactions are largely one-sided, in which sellers list the items they want to sell and buyers can only browse through that existing supply in order to find what they need. There is less opportunity for initiative on the seller’s side to source for buyers and less flexibility for the buyers to find what they really want.

* Our solution for encouraging the sale of pre-owned items is to introduce a **Buyer’s Listing / Request Board** platform where users can list items they are looking to buy. That way, we are able to introduce a two-way interaction between buyers and sellers.

#### Main Features:
1. The ability to post **"Want to Buy"** listings with the description of the item they want to buy.
2. The ability to post **"Item for Sale"** listings.
3. **Negotiation**: buyers can make price offers on "Item for Sale" listings, sellers can propose deals on "Want to Buy" listings.
4. **Recommendation system** powered by **Amazon Personalize** that matches sellers and buyers based on their posted listings.
5. **Public Q&A System**: For "Item for Sale" listings, interested buyers can post a question related to the item and sellers to answer that question. The question is open for public viewing. This eases the seller’s experience since it reduces the need to individually answer commonly asked questions through chat. For "Want to Buy" listings, buyers can specify questions that they would like to be answered.

## Deployment
1. Our project is deployed using AWS on Amazon Cloud with the help of **Elastic Beanstalk** to automatically provision resources such as **EC2 instances** and **Elastic Load Balancer** to host the REST API back-end (coded in Java using **SpringBoot**) and **Amazon S3 static website hosting** to host the **React.js** front-end application. 
2. **Amazon S3** is used to store our media (such as images) to be displayed on the application and the training data for Amazon Personalize.
3. **Amazon Personalize** is used for our recommendation system.
4. **Amazon RDS** is used for our MySQL database.

## Credits
> Special thanks to **Amazon Web Service** for organising this amazing hackathon!

## References & Relevant Links
* [Programme Details](https://www.buildonasean2021.com)
* [Final MVP (Minimal Viable Product)](http://javawarriors-buyerside-731098be-456e-4ed6-995e.s3-website-us-east-1.amazonaws.com/)
* [Presentation Slides](https://drive.google.com/file/d/1Ribh03ELP6BpN_GcL1ktx5xv1h0Pn8Zz/view?usp=sharing)
* [Demo Video](https://youtu.be/Kw7XWziG3Dc)

## Certificate Of Achievement

![AWS_ Hackathon_finalist](https://user-images.githubusercontent.com/79074359/176238968-07c65b45-18a6-45b8-a3f1-8044c605eebc.png)

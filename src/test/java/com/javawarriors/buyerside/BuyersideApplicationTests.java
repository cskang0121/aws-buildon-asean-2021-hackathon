package com.javawarriors.buyerside;

import com.javawarriors.buyerside.repositories.*;
import com.javawarriors.buyerside.services.*;

import java.util.List;

import com.javawarriors.buyerside.entities.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BuyersideApplicationTests {
	// @Autowired 
	// IFSRepo ifsRepo;
	// @Autowired 
	// IFSService ifsService;

	// @Autowired
	// BuyerQnARepo buyerQnARepo;
	// @Autowired
	// BuyerQnAService buyerQnAService;

	// @Test
	// void contextLoads() {
	// }

	// @Test
	// public void testCustomQuery() {
	// 	String keyword = "";
	// 	String categoryName = "";
	// 	String itemCondition = "";
	// 	String[] conditionArr = itemCondition.split("\\|");
		
	// 	List<ItemForSaleListing> listings = ifsService.getSearchResults(keyword, categoryName, itemCondition);

	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println(conditionArr.length);
	// 	for (String string : conditionArr) {
	// 		System.out.println(string);
	// 	}
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println(listings);
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println();
	// }

	// @Test
	// public void testBuyerQnACustomQuery() {
	// 	Long wtbId = (long) 1;
	// 	List<BuyerQnA> list = buyerQnAService.findByWtbId(wtbId);
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println(list);
	// 	System.out.println();
	// 	System.out.println();
	// 	System.out.println();
	// }

}

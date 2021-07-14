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
	@Autowired 
	WTBRepo wtbRepo;
	@Autowired 
	WTBService wtbService;

	@Test
	void contextLoads() {
	}

	@Test
	public void testCustomQuery() {
		String keyword = "chair";
		String categoryName = "Electronics";
		List<WantToBuyListing> listings = wtbService.getSearchResults(keyword, categoryName);

		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println(listings);
		System.out.println();
		System.out.println();
		System.out.println();
	}

}

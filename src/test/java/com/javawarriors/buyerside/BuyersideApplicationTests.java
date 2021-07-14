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
	IFSRepo ifsRepo;
	@Autowired 
	IFSService ifsService;

	@Test
	void contextLoads() {
	}

	@Test
	public void testCustomQuery() {
		String keyword = "p";
		String categoryName = "Electronics";
		List<ItemForSaleListing> listings = ifsService.getSearchResults(keyword, categoryName);

		System.out.println();
		System.out.println();
		System.out.println();
		System.out.println(listings);
		System.out.println();
		System.out.println();
		System.out.println();
	}

}

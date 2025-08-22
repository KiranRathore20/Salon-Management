package com.controller;

import com.dto.SalonDTO;
import com.model.Category;
import com.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/categories/salon-owner")

public class SalonCategoryController {

    private final CategoryService categoryService;

    // Create a new category for a salon
    @PostMapping
    public ResponseEntity<Category> createCategory(
            @RequestBody Category category) {
        SalonDTO salonDTO = new SalonDTO();
       salonDTO.setSalonId(1L); //  Set correct salonId
        Category savedCategory = categoryService.saveCategory(category, salonDTO);
        return ResponseEntity.ok(savedCategory);
    }

    // Delete category by ID and salonId
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id) throws Exception {
        SalonDTO salonDTO = new SalonDTO();
        salonDTO.setSalonId(1L); // Set correct salonId

       categoryService.deleteCategoryById(id, salonDTO.getSalonId());
        return ResponseEntity.ok("Category deleted successfully");
    }
}

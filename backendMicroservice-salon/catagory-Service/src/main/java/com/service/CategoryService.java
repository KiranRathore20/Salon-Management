package com.service;

import com.dto.SalonDTO;
import com.model.Category;

import java.util.Set;

public interface CategoryService {

    Category saveCategory(Category category, SalonDTO salonDTO);

    Set<Category> getAllCategoriseBySalon(Long salonId);

    Category getCategoryById(Long categoryId) throws Exception;

    void deleteCategoryById(Long categoryId, Long salonId) throws Exception;
}

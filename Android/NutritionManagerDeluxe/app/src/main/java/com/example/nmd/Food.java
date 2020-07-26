package com.example.nmd;

public class Food {

    String foodName;
    int foodId;
    int energy = 0;
    int totalSugars = 0;
    int carbs = 0;
    int protein = 0;
    int saturates = 0;
    int totalFat = 0;
    int quantity = 1;
    int salt = 0;
    String databaseId;

    public Food(String foodName, int foodId)
    {
        this.foodId = foodId;
        this.foodName = foodName;
    }
}

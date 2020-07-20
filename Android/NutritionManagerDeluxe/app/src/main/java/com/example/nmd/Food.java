package com.example.nmd;

public class Food {

    String foodName;
    int foodId;
    int kcals = 0;
    int sugars = 0;
    int carbs = 0;
    int protein = 0;
    int saturates = 0;
    int fats = 0;
    int salt = 0;

    public Food(String foodName, int foodId)
    {
        this.foodId = foodId;
        this.foodName = foodName;
    }
}

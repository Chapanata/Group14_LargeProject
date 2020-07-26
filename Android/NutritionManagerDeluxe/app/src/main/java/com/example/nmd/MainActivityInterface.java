package com.example.nmd;

import androidx.fragment.app.Fragment;

import java.util.ArrayList;

public interface MainActivityInterface {

    public void changeFragment(int layoutID);

    public WebInterface getWebInterface();

    void updateFoodsSearch(ArrayList<Food> foods);

    void showFoodItem(Food food);

    User getUser();

    Fragment getFragment(int fragmentID);

    void processLogin(String email, String password);

    TinyDB getTinyDB();

    void logoutUser();

    void updateRecents(ArrayList<Food> recentFoods);

    void showAlreadyAdded(Food food);
}

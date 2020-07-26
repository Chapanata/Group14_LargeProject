package com.example.nmd;

import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.app.AlertDialog;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.ArrayList;
import java.util.Locale;

public class MainActivity extends FragmentActivity implements MainActivityInterface {

    LoginFragment loginFragment = new LoginFragment();
    RegisterFragment registerFragment = new RegisterFragment();
    HomeFragment homeFragment = new HomeFragment();

    TinyDB tinyDB;
    User user = new User();

    WebInterface webInterface;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction ft = fm.beginTransaction();
        ft.add(R.id.frame_main, loginFragment).commit();

        tinyDB = new TinyDB(this);
        webInterface = new WebInterface(this);
    }

    @Override
    public void changeFragment(int layoutID) {

        Fragment fragment = null;

        switch(layoutID)
        {
            case R.layout.fragment_login:
                loginFragment = new LoginFragment();
                fragment = loginFragment;
                break;
            case R.layout.fragment_register:
                registerFragment = new RegisterFragment();
                fragment = registerFragment;
                break;
            case R.layout.fragment_home:
                homeFragment = new HomeFragment();
                fragment = homeFragment;
                break;
        }

        if(fragment == null)
            return;

        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction()
                .replace(R.id.frame_main, fragment)
                .commit();

    }

    @Override
    public WebInterface getWebInterface() {
        return webInterface;
    }

    @Override
    public void updateFoodsSearch(ArrayList<Food> foods) {
        homeFragment.updateFoodsList(foods);
    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void showFoodItem(final Food food) {

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setView(R.layout.popup_food_item);
        final AlertDialog foodPopup = builder.create();
        foodPopup.show();

        final TextView numItems = foodPopup.findViewById(R.id.txt_num_items);

        Button addFood = foodPopup.findViewById(R.id.btn_add_food);
        addFood.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int quantity = Integer.parseInt(numItems.getText().toString());
                webInterface.addFood(food, quantity);
                foodPopup.dismiss();
            }
        });

        TextView calories = foodPopup.findViewById(R.id.txt_calorie_count);
        calories.setText(String.format(Locale.US, "Calories: %d calories", food.energy));

        TextView fats = foodPopup.findViewById(R.id.txt_total_fat);
        fats.setText(String.format(Locale.US, "Total Fat: %d g", food.totalFat));

        TextView sugar = foodPopup.findViewById(R.id.txt_sugars);
        sugar.setText(String.format(Locale.US, "Total Sugars: %d g", food.totalSugars));

        TextView salt = foodPopup.findViewById(R.id.txt_salt);
        salt.setText(String.format(Locale.US, "Sodium: %d mg", food.salt));

        TextView carbs = foodPopup.findViewById(R.id.txt_carbs);
        carbs.setText(String.format(Locale.US, "Carbohydrates: %d g", food.carbs));

        TextView protein = foodPopup.findViewById(R.id.txt_protein);
        protein.setText(String.format(Locale.US, "Protein: %d g", food.protein));

        TextView saturates = foodPopup.findViewById(R.id.txt_saturates);
        saturates.setText(String.format(Locale.US, "Saturates: %d g", food.saturates));

        TextView name = foodPopup.findViewById(R.id.food_name_txt);
        name.setText(food.foodName);

        ImageView back = foodPopup.findViewById(R.id.btn_back);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                foodPopup.dismiss();
            }
        });

        ImageButton subtract = foodPopup.findViewById(R.id.image_btn_subtract);
        subtract.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int curNum = Integer.parseInt(numItems.getText().toString()) - 1;
                if(curNum < 1)
                {
                    curNum = 1;
                }

                numItems.setText(String.valueOf(curNum));
            }
        });

        ImageButton add = foodPopup.findViewById(R.id.image_button_add);
        add.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int curNum = Integer.parseInt(numItems.getText().toString()) + 1;
                if(curNum > 100)
                {
                    curNum = 100;
                }

                numItems.setText(String.valueOf(curNum));
            }
        });


        foodPopup.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    }

    @Override
    public User getUser() {
        return user;
    }

    @Override
    public Fragment getFragment(int fragmentID) {

        switch(fragmentID)
        {
            case R.layout.fragment_home:
                return homeFragment;
            case R.layout.fragment_register:
                return registerFragment;
            case R.layout.fragment_login:
                return loginFragment;
        }
        return null;
    }

    @Override
    public void processLogin(String email, String password)
    {
        tinyDB.putString("email", email);
        tinyDB.putString("password", password);
        webInterface.getUserMetrics();
        webInterface.getFood();
        changeFragment(R.layout.fragment_home);
    }

    @Override
    public TinyDB getTinyDB() {
        return tinyDB;
    }

    @Override
    public void logoutUser() {
        changeFragment(R.layout.fragment_login);
    }

    @Override
    public void updateRecents(ArrayList<Food> recentFoods)
    {
        homeFragment.updateRecents(recentFoods);

    }

    @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
    @Override
    public void showAlreadyAdded(final Food food) {
        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setView(R.layout.popup_added_food_item);
        final AlertDialog foodPopup = builder.create();
        foodPopup.show();

        final TextView numItems = foodPopup.findViewById(R.id.txt_num_items);

        Button addFood = foodPopup.findViewById(R.id.btn_delete_food);
        addFood.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                webInterface.deleteFood(food);
                foodPopup.dismiss();
            }
        });

        TextView calories = foodPopup.findViewById(R.id.txt_calorie_count);
        calories.setText(String.format(Locale.US, "Calories: %d calories", food.energy));

        TextView fats = foodPopup.findViewById(R.id.txt_total_fat);
        fats.setText(String.format(Locale.US, "Total Fat: %d g", food.totalFat));

        TextView sugar = foodPopup.findViewById(R.id.txt_sugars);
        sugar.setText(String.format(Locale.US, "Total Sugars: %d g", food.totalSugars));

        TextView salt = foodPopup.findViewById(R.id.txt_salt);
        salt.setText(String.format(Locale.US, "Sodium: %d mg", food.salt));

        TextView carbs = foodPopup.findViewById(R.id.txt_carbs);
        carbs.setText(String.format(Locale.US, "Carbohydrates: %d g", food.carbs));

        TextView protein = foodPopup.findViewById(R.id.txt_protein);
        protein.setText(String.format(Locale.US, "Protein: %d g", food.protein));

        TextView saturates = foodPopup.findViewById(R.id.txt_saturates);
        saturates.setText(String.format(Locale.US, "Saturates: %d g", food.saturates));

        TextView name = foodPopup.findViewById(R.id.food_name_txt);
        name.setText(food.foodName);

        numItems.setText(String.valueOf(food.quantity));

        ImageView back = foodPopup.findViewById(R.id.btn_back);
        back.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                foodPopup.dismiss();
            }
        });


        foodPopup.getWindow().setLayout(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT);
    }
}
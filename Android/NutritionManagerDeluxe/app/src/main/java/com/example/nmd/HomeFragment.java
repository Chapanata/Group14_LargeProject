package com.example.nmd;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.os.Build;
import android.os.Bundle;
import android.text.InputType;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.fragment.app.Fragment;

import com.example.nmd.databinding.FragmentHomeBinding;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class HomeFragment extends Fragment {

    private MainActivityInterface mainInterface;
    private FragmentHomeBinding binding;

    private ArrayList<Food> recentFoodsSearch = new ArrayList<>();

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        mainInterface = (MainActivity) context;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        binding = FragmentHomeBinding.inflate(inflater, container, false);
        final View rootView = binding.getRoot();

        TextView todayTxt = rootView.findViewById(R.id.txt_today_date);

        Date date = Calendar.getInstance().getTime();
        SimpleDateFormat df = new SimpleDateFormat("EEEE, MMMM dd");
        todayTxt.setText(String.format("%s", df.format(date)));

        BottomNavigationView bottomNav = rootView.findViewById(R.id.bottom_nav_view);
        bottomNav.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {

                View homePage = rootView.findViewById(R.id.page_home);
                View foodPage = rootView.findViewById(R.id.page_food);
                View accountPage = rootView.findViewById(R.id.page_account);
                View settingsPage = rootView.findViewById(R.id.page_settings);

                homePage.setVisibility(View.GONE);
                foodPage.setVisibility(View.GONE);
                accountPage.setVisibility(View.GONE);
                settingsPage.setVisibility(View.GONE);


                switch(item.getItemId())
                {
                    case R.id.page_home:
                        homePage.setVisibility(View.VISIBLE);
                        break;
                    case R.id.page_food:
                        foodPage.setVisibility(View.VISIBLE);
                        break;
                    case R.id.page_account:
                        accountPage.setVisibility(View.VISIBLE);
                        break;
                    case R.id.page_settings:
                        settingsPage.setVisibility(View.VISIBLE);
                        break;

                }

                return true;
            }
        });

        setUpHomePage();
        setUpFoodPage();
        setUpAccountPage();
        setUpSettingsPage();

        return rootView;
    }

    private void setUpSettingsPage()
    {
        binding.pageSettings.btnChangeName.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
                builder.setView(R.layout.popup_change_name);

                final AlertDialog dialog = builder.show();

                final TextView enterField = dialog.findViewById(R.id.txt_field_enter);
                enterField.setText("Enter a Name:");
                final TextView confirmField = dialog.findViewById(R.id.txt_field_confirm);
                confirmField.setText("Confirm Name:");

                final EditText field = dialog.findViewById(R.id.edit_text_field);
                field.setHint("Name");
                final EditText confirm = dialog.findViewById(R.id.edit_text_confirm);
                confirm.setHint("Confirm Name");

                Button done = dialog.findViewById(R.id.btn_edit_done);
                done.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        String name = field.getText().toString();
                        String confirmName = confirm.getText().toString();

                        if(!name.equals("") && name.equals(confirmName))
                        {
                            mainInterface.getWebInterface().changeName(name);
                        }
                        else
                        {
                            Toast.makeText(requireContext(), "Names must match and not be empty", Toast.LENGTH_SHORT).show();
                        }
                        dialog.dismiss();
                    }
                });
                Button cancel = dialog.findViewById(R.id.btn_cancel_field);
                cancel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dialog.dismiss();
                    }
                });
            }
        });

        binding.pageSettings.btnChangePassword.setOnClickListener(new View.OnClickListener() {
            @RequiresApi(api = Build.VERSION_CODES.LOLLIPOP)
            @Override
            public void onClick(View v) {
                AlertDialog.Builder builder = new AlertDialog.Builder(requireContext());
                builder.setView(R.layout.popup_change_password);

                final AlertDialog dialog = builder.show();

                final TextView enterField = dialog.findViewById(R.id.txt_field_enter);
                enterField.setText("Enter a Password:");
                final TextView confirmField = dialog.findViewById(R.id.txt_field_confirm);
                confirmField.setText("Confirm Password:");

                final EditText field = dialog.findViewById(R.id.edit_text_field);
                field.setRawInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD);
                field.setHint("Password");
                final EditText confirm = dialog.findViewById(R.id.edit_text_confirm);
                confirm.setRawInputType(InputType.TYPE_TEXT_VARIATION_PASSWORD);
                confirm.setHint("Confirm Password");

                Button done = dialog.findViewById(R.id.btn_edit_done);
                done.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        String password = field.getText().toString();
                        String confirmPassword = confirm.getText().toString();

                        if(password.length() < 6 || !password.matches(".*[a-zA-Z].*") || !password.matches(".*[0-9].*"))
                        {
                            Toast.makeText(requireContext(), "Error: Password does not meet requirements", Toast.LENGTH_SHORT).show();
                            return;
                        }

                        if(confirmPassword.equals(password))
                        {
                            mainInterface.getWebInterface().changePassword(password);
                        }
                        else
                        {
                            Toast.makeText(requireContext(), "Error: Fields do not match", Toast.LENGTH_SHORT).show();
                            return;
                        }
                        dialog.dismiss();
                    }
                });
                Button cancel = dialog.findViewById(R.id.btn_cancel_field);
                cancel.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        dialog.dismiss();
                    }
                });
            }
        });

        Button logoutBtn = binding.pageSettings.btnLogout;
        logoutBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                TinyDB tinyDB = mainInterface.getTinyDB();

                tinyDB.clear();
                mainInterface.logoutUser();
                Toast.makeText(requireContext(), "Logged Out", Toast.LENGTH_SHORT).show();
            }
        });
    }

    public void updateBMI()
    {
        int heightFT = mainInterface.getUser().heightFt;
        int heightInches = mainInterface.getUser().heightIn;
        int weight = mainInterface.getUser().weight;
        double bmi = mainInterface.getUser().bmi;

        binding.pageAccount.txtWelcomeName.setText(String.format(Locale.US, "Welcome, %s", mainInterface.getUser().name));

        if(heightFT == -1)
        {
            binding.pageAccount.editTextHeightFeet.setHint("Not Set");
            binding.pageAccount.editTxtHeightInches.setHint("Not Set");
            binding.pageAccount.editTxtWeight.setHint("Not Set");
            binding.pageAccount.txtBMI.setHint("Not Set");
            binding.pageAccount.editTextGender.setHint("Not Set");
        }
        else
        {
            binding.pageAccount.editTextHeightFeet.setText(String.valueOf(heightFT));
            binding.pageAccount.editTxtHeightInches.setText(String.valueOf(heightInches));
            binding.pageAccount.editTxtWeight.setText(String.valueOf(weight));
            binding.pageAccount.txtBMI.setText(String.valueOf(bmi));
            binding.pageAccount.editTextGender.setText(mainInterface.getUser().gender);
        }
    }

    private void setUpAccountPage()
    {
        Button changeStats = binding.pageAccount.btnChangeStats;
        final TinyDB tinyDB = mainInterface.getTinyDB();

        updateBMI();

        String name = mainInterface.getUser().name;
        name = name.substring(0,1).toUpperCase() + name.substring(1);
        String welcomeMsg = String.format(Locale.US, "Welcome, %s", name);
        binding.pageAccount.txtWelcomeName.setText(welcomeMsg);

        changeStats.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(binding.pageAccount.editTxtHeightInches.getText().toString().equals("") ||
                        binding.pageAccount.editTextHeightFeet.getText().toString().equals("") ||
                        binding.pageAccount.editTextGender.getText().toString().equals("") ||
                        binding.pageAccount.editTxtWeight.getText().toString().equals(""))
                {
                    Toast.makeText(requireContext(), "Error: You are missing a field.", Toast.LENGTH_SHORT).show();
                    return;
                }

                int weight = Integer.parseInt(binding.pageAccount.editTxtWeight.getText().toString());
                int heightInches = Integer.parseInt(binding.pageAccount.editTxtHeightInches.getText().toString());
                int heightFt = Integer.parseInt(binding.pageAccount.editTextHeightFeet.getText().toString());
                String gender = binding.pageAccount.editTextGender.getText().toString();

                mainInterface.getUser().heightIn = heightInches;
                mainInterface.getUser().heightFt = heightFt;
                mainInterface.getUser().weight = weight;
                mainInterface.getUser().gender = gender;

                mainInterface.getWebInterface().updateMetrics();
            }
        });
    }

    private void setUpFoodPage()
    {
        ImageView search = binding.pageFood.btnSearchFood;
        search.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mainInterface.getWebInterface().searchFood(binding.pageFood.txtFoodSearch.getText().toString());
            }
        });

        binding.pageFood.listFoodsSearchResults.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Food food = recentFoodsSearch.get(position);
                mainInterface.showFoodItem(food);
            }
        });

    }

    private void setUpHomePage()
    {
        binding.pageHome.listRecentFoods.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Food food = recentFoodsSearch.get(position);
                mainInterface.showAlreadyAdded(food);
            }
        });
    }


    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }

    public void updateFoodsList(ArrayList<Food> recentFoods) {

        ListView searchResults = binding.pageHome.listRecentFoods;
        String[] foodStrings = new String[recentFoods.size()];

        recentFoodsSearch = recentFoods;

        for(int i=0; i < recentFoods.size(); i++)
        {
            foodStrings[i] = recentFoods.get(i).foodName;
        }

        FoodAdapter adapter = new FoodAdapter((Activity)requireContext(), foodStrings);
        searchResults.setAdapter(adapter);


    }

    public void updateRecents(ArrayList<Food> foods)
    {
        ListView searchResults = binding.pageFood.listFoodsSearchResults;
        String[] foodStrings = new String[foods.size()];

        int totalCalories = 0;
        int totalProtein = 0;
        int totalFat = 0;
        int totalCarbs = 0;

        recentFoodsSearch = foods;

        for(int i=0; i < foods.size(); i++)
        {
            Food food = foods.get(i);
            totalCalories += food.energy;
            totalFat += food.totalFat;
            totalProtein += food.protein;
            totalCarbs += food.carbs;
            foodStrings[i] = food.foodName;
        }

        binding.pageHome.txtTotalCalories.setText(String.format(Locale.US, "Calories: %d/2000", totalCalories));
        binding.pageHome.txtTotalCalories.setText(String.format(Locale.US, "Carbs: %d/260g Protein: %d/50g Fat: %d/70g", totalCarbs, totalProtein, totalFat));

        FoodAdapter adapter = new FoodAdapter((Activity)requireContext(), foodStrings);
        searchResults.setAdapter(adapter);
    }
}

package com.example.nmd;

import android.content.Context;
import android.os.Bundle;
import android.text.Layout;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class HomeFragment extends Fragment {

    private MainActivityInterface mainInterface;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        mainInterface = (MainActivity) context;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        final View rootView = inflater.inflate(R.layout.fragment_home, container, false);

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

        return rootView;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}

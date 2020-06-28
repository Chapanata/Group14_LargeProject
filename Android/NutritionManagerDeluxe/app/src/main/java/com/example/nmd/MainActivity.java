package com.example.nmd;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.util.LogWriter;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentActivity;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.content.Context;
import android.os.Bundle;
import android.util.AttributeSet;
import android.view.View;
import android.widget.FrameLayout;

public class MainActivity extends FragmentActivity implements MainActivityInterface {

    LoginFragment loginFragment = new LoginFragment();
    RegisterFragment registerFragment = new RegisterFragment();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        FragmentManager fm = getSupportFragmentManager();
        FragmentTransaction ft = fm.beginTransaction();

        ft.add(R.id.frame_main, loginFragment).commit();
    }

    @Override
    public void changeFragment(int layoutID) {

        Fragment fragment = null;

        switch(layoutID)
        {
            case R.layout.fragment_login:
                fragment = loginFragment;
                break;
            case R.layout.fragment_register:
                fragment = registerFragment;
                break;
        }

        if(fragment == null)
            return;

        FragmentManager fm = getSupportFragmentManager();
        fm.beginTransaction()
                .replace(R.id.frame_main, fragment)
                .commit();

    }
}

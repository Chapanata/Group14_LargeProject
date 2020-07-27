package com.example.nmd;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

public class LoginFragment extends Fragment {

    private MainActivityInterface mainInterface;
    private Context mContext;
    private View rootView;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        mContext = context;
        mainInterface = (MainActivity) context;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        rootView = inflater.inflate(R.layout.fragment_login, container, false);

        Button login = rootView.findViewById(R.id.btn_login);
        Button register = rootView.findViewById(R.id.btn_register);

        final TextView emailTxt = rootView.findViewById(R.id.txt_email);
        final TextView passwordTxt = rootView.findViewById(R.id.txt_password);

        TinyDB tinyDB = mainInterface.getTinyDB();

        emailTxt.setText(tinyDB.getString("email"));
        passwordTxt.setText(tinyDB.getString("password"));


        if(!tinyDB.getString("email").equals("") && !tinyDB.getString("password").equals(""))
        {
            mainInterface.getWebInterface().loginUser(emailTxt.getText().toString(), passwordTxt.getText().toString());
        }

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(emailTxt.getText().toString().equals(""))
                {
                    Toast.makeText(mContext, "Please input an email", Toast.LENGTH_SHORT).show();
                    return;
                }

                if(passwordTxt.getText().toString().equals(""))
                {
                    Toast.makeText(mContext, "Please input a password", Toast.LENGTH_SHORT).show();
                    return;
                }

                mainInterface.getWebInterface().loginUser(emailTxt.getText().toString(), passwordTxt.getText().toString());
            }
        });

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mainInterface.changeFragment(R.layout.fragment_register);
            }
        });
        return rootView;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }
}

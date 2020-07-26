package com.example.nmd;

import android.content.Context;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AbsListView;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.example.nmd.databinding.FragmentRegisterBinding;

import java.util.Locale;

public class RegisterFragment extends Fragment {

    private MainActivityInterface mainInterface;
    private FragmentRegisterBinding binding;

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        mainInterface = (MainActivity) context;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {

        binding = FragmentRegisterBinding.inflate(inflater,container, false);
        View rootView = binding.getRoot();

        Button register = binding.btnRegister;
        TextView login = binding.hyperlinkLogin;
        final TextView passwordHint = binding.txtPasswordHint;
        final TextView confirmPasswordHint = binding.txtConfirmPasswordHint;
        final EditText passwordConfirmTxt = binding.txtConfirmPassword;
        final EditText passwordTxt = binding.txtPassword;

        passwordTxt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {

                String[] requirements = {"Minimum 6 Characters\n", "At least one letter\n", "At least one number\n"};
                passwordHint.setText("");

                StringBuilder string = new StringBuilder();
                string.append("Password Requirements:\n");


                if(s.length() < 6)
                {
                    string.append(requirements[0]);
                }
                if(!s.toString().matches(".*[a-zA-Z].*"))
                {
                    string.append(requirements[1]);
                }
                if(!s.toString().matches(".*[0-9].*"))
                {
                    string.append(requirements[2]);
                }

                passwordHint.setVisibility(string.toString().equals("Password Requirements:\n") ? View.GONE : View.VISIBLE);
                passwordHint.append(string);
            }
        });

        passwordConfirmTxt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {

                confirmPasswordHint.setVisibility(s.toString().equals(passwordTxt.getText().toString()) ? View.GONE : View.VISIBLE);
            }
        });

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mainInterface.changeFragment(R.layout.fragment_login);
            }
        });

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if(binding.txtName.getText().toString().equals(""))
                {
                    Toast.makeText(requireContext(), "Error: No Name Provided", Toast.LENGTH_SHORT).show();
                    return;
                }

                if(!binding.txtEmail.getText().toString().matches("^(.+)@(.+)$"))
                {
                    Toast.makeText(requireContext(), "Error: Email address not valid", Toast.LENGTH_SHORT).show();
                    return;
                }

                String s = passwordTxt.getText().toString();

                if(s.length() < 6 || !s.matches(".*[a-zA-Z].*") || !s.matches(".*[0-9].*"))
                {
                    Toast.makeText(requireContext(), "Error: Passwords do not meet requirements", Toast.LENGTH_SHORT).show();
                    return;
                }
                if(!passwordConfirmTxt.getText().toString().equals(passwordTxt.getText().toString()))
                {
                    Toast.makeText(requireContext(), "Error: Passwords do not match", Toast.LENGTH_SHORT).show();
                    return;
                }

                //TODO: Submit registration
                String email = binding.txtEmail.getText().toString();
                String password = passwordTxt.getText().toString();
                String name = binding.txtName.getText().toString();
                mainInterface.getWebInterface().registerAccount(name, email, password);
            }
        });

        return rootView;
    }

    public void showSuccess(String email)
    {
        binding.txtRegisterSuccess.setVisibility(View.VISIBLE);
        binding.txtRegisterSuccess.setText(String.format(Locale.US, "Success! Confirm registration at %s.", email));
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
    }
}

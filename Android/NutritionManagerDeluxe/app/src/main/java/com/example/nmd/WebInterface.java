package com.example.nmd;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

public class WebInterface {

    public final int energyID = 1008;
    public final int sugarID = 2000;
    public final int carbID = 1005;
    public final int proteinID = 1003;
    public final int saturatesID = 1258;
    public final int fatsID = 1004;
    public final int saltID = 1093;

    private static final String API_KEY = "Uh00f59beCTOVOkHQvLjpO98kW6OL8aua0eiTqol";
    private RequestQueue requestQueue;
    private Context mContext;
    private MainActivityInterface mainActivityInterface;

    public WebInterface(MainActivity mainActivity) {
        mContext = (Context) mainActivity;
        requestQueue = Volley.newRequestQueue(mContext);
        mainActivityInterface = (MainActivityInterface) mainActivity;
    }

    private static Response.ErrorListener errorListener = new Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {

            if (error.getMessage() != null) {
                Log.w("WebInterface", error.getMessage());
            } else {
                Log.w("WebInterface", "Error: Undefined");
            }
        }
    };

    public void queryFoods() {
        //TODO: Query foods
    }

    public void changeName(final String name) {
        String url = "https://nutrition-heroku.herokuapp.com/editUser/name";

        try {
            JSONObject body = new JSONObject();
            body.put("name", name);
            body.put("nameConfirm", name);

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        } else {
                            Toast.makeText(mContext, "Success", Toast.LENGTH_SHORT).show();
                            mainActivityInterface.getUser().name = name;
                            ((HomeFragment) mainActivityInterface.getFragment(R.layout.fragment_home)).updateBMI();
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void changePassword(final String password) {
        String url = "https://nutrition-heroku.herokuapp.com/editUser/password";

        try {
            JSONObject body = new JSONObject();
            body.put("password", password);
            body.put("passwordConfirm", password);

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        } else {
                            Toast.makeText(mContext, "Success", Toast.LENGTH_SHORT).show();
                            mainActivityInterface.getTinyDB().putString("password", password);
                            ((HomeFragment) mainActivityInterface.getFragment(R.layout.fragment_home)).updateBMI();
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void getUserMetrics() {
        String url = "https://nutrition-heroku.herokuapp.com/getBio";

        try {
            final JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.GET, url, null, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        } else {
                            int heightFt = response.getInt("heightFeet");
                            int heightIn = response.getInt("heightInch");
                            int weight = response.getInt("weight");
                            double bmi = response.getDouble("bmi");
                            String gender = response.getString("gender");

                            mainActivityInterface.getUser().heightFt = heightFt;
                            mainActivityInterface.getUser().heightIn = heightIn;
                            mainActivityInterface.getUser().weight = weight;
                            mainActivityInterface.getUser().bmi = bmi;
                            mainActivityInterface.getUser().gender = gender;

                            ((HomeFragment) mainActivityInterface.getFragment(R.layout.fragment_home)).updateBMI();
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void updateMetrics() {
        User user = mainActivityInterface.getUser();
        String url = "https://nutrition-heroku.herokuapp.com/editUser/physical";


        try {
            JSONObject body = new JSONObject();
            body.put("gender", user.gender);
            body.put("heightFeet", user.heightFt);
            body.put("heightInch", user.heightIn);
            body.put("weight", user.weight);

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {

                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        } else {
                            mainActivityInterface.getUser().bmi = response.getDouble("bmi");
                            ((HomeFragment) mainActivityInterface.getFragment(R.layout.fragment_home)).updateBMI();
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void getFood() {
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/YYYY", Locale.US);
        String curTime = format.format(new Date());

        String url = "https://nutrition-heroku.herokuapp.com/getFoods";

        try {
            JSONObject body = new JSONObject();
            body.put("date", curTime);

            CustomJsonArrayRequest jsonRequest = new CustomJsonArrayRequest(JsonArrayRequest.Method.POST, url, body, new Response.Listener<JSONArray>() {
                @Override
                public void onResponse(JSONArray response) {

                    try {

                        ArrayList<Food> recentFoods = new ArrayList<>();

                        for (int i = response.length() - 1; i >= 0; i--) {
                            JSONObject jsonFood = response.getJSONObject(i);
                            Food newFood = new Food(jsonFood.getString("name"), jsonFood.getInt("foodId"));

                            newFood.protein = jsonFood.getInt("protein");
                            newFood.energy = jsonFood.getInt("energy");
                            newFood.totalFat = jsonFood.getInt("totalFat");
                            newFood.totalSugars = jsonFood.getInt("totalSugars");
                            newFood.saturates = jsonFood.getInt("saturates");
                            newFood.salt = jsonFood.getInt("salt");
                            newFood.carbs = jsonFood.getInt("carbs");
                            newFood.quantity = jsonFood.getInt("quantity");
                            newFood.databaseId = jsonFood.getString("_id");

                            recentFoods.add(newFood);

                            mainActivityInterface.updateRecents(recentFoods);
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {

                    Toast.makeText(mContext, error.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                }
            }){
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };


            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void deleteFood(Food food)
    {
        String url = "https://nutrition-heroku.herokuapp.com/removeFood";

        try {
            JSONObject body = new JSONObject();
            body.put("_id", food.databaseId);

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(Request.Method.POST, url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        } else {
                            Toast.makeText(mContext, "Success: Item Deleted", Toast.LENGTH_SHORT).show();
                            getFood();
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }


    public void addFood(Food food, int quantity) {
        SimpleDateFormat format = new SimpleDateFormat("MM/dd/YYYY hh:mm:ss", Locale.US);
        String curTime = format.format(new Date());

        String url = "https://nutrition-heroku.herokuapp.com/addFood";


        try {
            JSONObject body = new JSONObject();
            body.put("date", curTime);
            body.put("quantity", quantity);
            body.put("energy", food.energy);
            body.put("foodId", food.foodId);
            body.put("totalFat", food.totalFat);
            body.put("saturates", food.saturates);
            body.put("carbs", food.carbs);
            body.put("totalSugars", food.totalSugars);
            body.put("protein", food.protein);
            body.put("salt", food.salt);
            body.put("name", food.foodName);

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {

                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        } else {
                            Toast.makeText(mContext, "Added item", Toast.LENGTH_SHORT).show();
                            getFood();
                        }
                    } catch (Exception e) {
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }

                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            }) {
                @Override
                public Map<String, String> getHeaders() throws AuthFailureError {
                    HashMap<String, String> headers = new HashMap<String, String>();
                    headers.put("Content-Type", "application/json");
                    headers.put("auth-token", mainActivityInterface.getUser().token);
                    return headers;
                }
            };

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void searchFood(String foodName) {
        String url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY + "&query=" + foodName;

        Response.Listener<JSONObject> jsonCallback = new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                ArrayList<Food> foods = new ArrayList<>();
                try {
                    JSONArray jsonFoods = response.getJSONArray("foods");


                    for (int i = 0; i < jsonFoods.length(); i++) {
                        try {
                            JSONObject jsonFood = jsonFoods.getJSONObject(i);

                            String name = jsonFood.getString("description");
                            boolean alreadyFound = false;

                            for (int j = 0; j < foods.size(); j++) {
                                Food temp = foods.get(j);
                                if (temp.foodName.equals(name)) {
                                    alreadyFound = true;
                                }
                            }

                            if (!alreadyFound) {
                                Food newFood = new Food(name, jsonFood.getInt("fdcId"));

                                JSONArray nutritionInfo = jsonFood.getJSONArray("foodNutrients");

                                for (int j = 0; j < nutritionInfo.length(); j++) {
                                    JSONObject foodObj = nutritionInfo.getJSONObject(j);
                                    int nutrientID = foodObj.getInt("nutrientId");

                                    switch (nutrientID) {
                                        case carbID: {
                                            newFood.carbs = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                        case proteinID: {
                                            newFood.protein = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                        case fatsID: {
                                            newFood.totalFat = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                        case saturatesID: {
                                            newFood.saturates = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                        case sugarID: {
                                            newFood.totalSugars = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                        case saltID: {
                                            newFood.salt = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                        case energyID: {
                                            newFood.energy = (int) Math.round(foodObj.getDouble("value"));
                                            break;
                                        }
                                    }
                                }

                                foods.add(newFood);
                            }

                            mainActivityInterface.updateFoodsSearch(foods);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                } catch (Exception e) {
                    Toast.makeText(mContext, "JSON parsing error: Search food", Toast.LENGTH_SHORT).show();
                }
            }
        };

        addJSONRequest(url, jsonCallback);
    }

    public void loginUser(final String email, final String password) {
        Toast.makeText(mContext, "Logging in...", Toast.LENGTH_SHORT).show();
        String url = "https://nutrition-heroku.herokuapp.com/login";

        try {
            JSONObject body = new JSONObject();
            body.put("email", email);
            body.put("password", password);

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {

                    try {
                        if (response.has("Error")) {
                            Toast.makeText(mContext, response.getString("Error"), Toast.LENGTH_SHORT).show();
                            return;
                        }


                        User user = mainActivityInterface.getUser();

                        user.name = response.getString("Name");
                        user.token = response.getString("SessionToken");
                        user.userID = response.getString("UserID");

                        mainActivityInterface.processLogin(email, password);
                    } catch (Exception e) {
                        Toast.makeText(mContext, e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                        Log.e("VOLLEY", e.getLocalizedMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Toast.makeText(mContext, "Error: Unable to access site", Toast.LENGTH_SHORT).show();
                    Log.e("VOLLEY", error.toString());
                }
            });

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Log.e("VOLLEY", e.getLocalizedMessage());
        }
    }

    public void registerAccount(String name, final String email, String password) {
        String url = "https://nutrition-heroku.herokuapp.com/register";

        try {
            JSONObject body = new JSONObject();
            body.put("email", email);
            body.put("name", name);
            body.put("password", password);

            final String requestBody = body.toString();

            final JsonObjectRequest jsonRequest = new JsonObjectRequest(url, body, new Response.Listener<JSONObject>() {
                @Override
                public void onResponse(JSONObject response) {
                    try {
                        String msg = "";

                        if (response.has("Error")) {
                            msg = response.getString("Error");
                            Toast.makeText(mContext, msg, Toast.LENGTH_SHORT).show();

                        } else if (response.has("Success")) {
                            RegisterFragment fragment = (RegisterFragment) mainActivityInterface.getFragment(R.layout.fragment_register);
                            fragment.showSuccess(email);
                        }

                    } catch (Exception e) {
                        Log.e("Volley", e.getLocalizedMessage());
                    }
                }
            }, new Response.ErrorListener() {
                @Override
                public void onErrorResponse(VolleyError error) {
                    Log.e("VOLLEY", error.toString());
                }
            });

            requestQueue.add(jsonRequest);
        } catch (Exception e) {
            Toast.makeText(mContext, e.getMessage(), Toast.LENGTH_SHORT).show();
        }
    }

    private void addJSONRequest(String url, Response.Listener<JSONObject> callback) {
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, callback, errorListener);
        requestQueue.add(jsonObjectRequest);
    }
}

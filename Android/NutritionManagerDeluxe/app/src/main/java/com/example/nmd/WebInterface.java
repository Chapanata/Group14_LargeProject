package com.example.nmd;

import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

public class WebInterface {

    private static final String API_KEY = "Uh00f59beCTOVOkHQvLjpO98kW6OL8aua0eiTqol";
    private RequestQueue requestQueue;
    private Context mContext;
    private MainActivityInterface mainActivityInterface;

    public WebInterface(Context context, MainActivityInterface mainInterface) {
        requestQueue = Volley.newRequestQueue(context);
        mContext = context;
        mainActivityInterface = mainInterface;
    }

    private static Response.ErrorListener errorListener = new Response.ErrorListener() {
        @Override
        public void onErrorResponse(VolleyError error) {

            if(error.getMessage() != null)
            {
                Log.w("WebInterface", error.getMessage());
            }
            else
            {
                Log.w("WebInterface", "Error: Undefined");
            }
        }
    };

    public void searchFood(String foodName)
    {
        String url = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY + "&query=" + foodName;

        Response.Listener<JSONObject> jsonCallback = new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                ArrayList<Food> foods = new ArrayList<>();
                try
                {
                     JSONArray jsonFoods = response.getJSONArray("foods");


                    for(int i = 0 ; i < jsonFoods.length() ; i++)
                    {
                        try {
                            JSONObject food = jsonFoods.getJSONObject(i);
                            foods.add(new Food(food.getString("description"), food.getInt("fdcId")));


                            mainActivityInterface.updateFoodsSearch(foods);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }
                catch (Exception e)
                {
                    Toast.makeText(mContext, "JSON parsing error: Search food", Toast.LENGTH_SHORT).show();
                }
            }
        };

        addJSONRequest(url, jsonCallback);
    }

    private void addJSONRequest(String url, Response.Listener<JSONObject> callback) {


        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null, callback, errorListener);
        requestQueue.add(jsonObjectRequest);
    }

    public void queryFoodInfo(final Food food) {
        String url = "https://api.nal.usda.gov/fdc/v1/food/" + String.valueOf(food.foodId) + "?api_key=" + API_KEY;

        Response.Listener<JSONObject> jsonCallback = new Response.Listener<JSONObject>() {
            @Override
            public void onResponse(JSONObject response) {

                try
                {
                    JSONArray nutritionInfo = response.getJSONArray("foodNutrients");
                    food.protein = (int) Math.round(nutritionInfo.getJSONObject(0).getDouble("amount"));
                    food.fats = (int) Math.round(nutritionInfo.getJSONObject(1).getDouble("amount"));
                    food.carbs = (int) Math.round(nutritionInfo.getJSONObject(2).getDouble("amount"));
                    food.kcals = (int) Math.round(nutritionInfo.getJSONObject(3).getDouble("amount"));
                    food.sugars = (int) Math.round(nutritionInfo.getJSONObject(8).getDouble("amount"));
                    food.salt = (int) Math.round(nutritionInfo.getJSONObject(15).getDouble("amount"));
                    food.saturates = (int) Math.round(nutritionInfo.getJSONObject(43).getDouble("amount"));
                    mainActivityInterface.showFoodItem(food);

                }
                catch (Exception e)
                {
                    Toast.makeText(mContext, e.getLocalizedMessage(), Toast.LENGTH_SHORT).show();
                }
            }
        };

        addJSONRequest(url, jsonCallback);
    }
}

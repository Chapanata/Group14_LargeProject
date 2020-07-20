package com.example.nmd;

import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.provider.CalendarContract;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import androidx.annotation.NonNull;

public class FoodAdapter extends ArrayAdapter<String>
{
    private final String[] maintitle;

    private final Context mContext;

    public FoodAdapter(Activity context, String[] mainTitle) {
        super(context, R.layout.list_food, mainTitle);

        this.maintitle = mainTitle;
        this.mContext = context;
    }

    public View getView(int position, View view, ViewGroup parent) {

        LayoutInflater inflater= ((Activity)mContext).getLayoutInflater();
        View rowView=inflater.inflate(R.layout.list_food, null,true);

        TextView titleText = (TextView) rowView.findViewById(R.id.title);
        titleText.setTextColor(Color.BLACK);
        titleText.setText(maintitle[position]);
        return rowView;

    };
}

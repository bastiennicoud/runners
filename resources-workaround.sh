#!/bin/bash

# Created by Christophe Kalman & Sébastien Martin

android_resources='platforms/android/res'
ionic_android_resources='resources/android'
icon='/icon'
splash='/splash'
icon_name='icon.png'
screen_name='screen.png'

#Android
# ICON
cp $ionic_android_resources$icon/drawable-hdpi-icon.png $android_resources/mipmap-hdpi/$icon_name
cp $ionic_android_resources$icon/drawable-ldpi-icon.png $android_resources/mipmap-ldpi/$icon_name
cp $ionic_android_resources$icon/drawable-mdpi-icon.png $android_resources/mipmap-mdpi/$icon_name
cp $ionic_android_resources$icon/drawable-xhdpi-icon.png $android_resources/mipmap-xhdpi/$icon_name

# SPLASH
cp $ionic_android_resources$splash/drawable-land-hdpi-screen.png $android_resources/drawable-land-hdpi/$screen_name
cp $ionic_android_resources$splash/drawable-land-ldpi-screen.png $android_resources/drawable-land-ldpi/$screen_name
cp $ionic_android_resources$splash/drawable-land-mdpi-screen.png $android_resources/drawable-land-mdpi/$screen_name
cp $ionic_android_resources$splash/drawable-land-xhdpi-screen.png $android_resources/drawable-land-xhdpi/$screen_name
cp $ionic_android_resources$splash/drawable-port-hdpi-screen.png $android_resources/drawable-port-hdpi/$screen_name
cp $ionic_android_resources$splash/drawable-port-ldpi-screen.png $android_resources/drawable-port-ldpi/$screen_name
cp $ionic_android_resources$splash/drawable-port-mdpi-screen.png $android_resources/drawable-port-mdpi/$screen_name
cp $ionic_android_resources$splash/drawable-port-xhdpi-screen.png $android_resources/drawable-port-xhdpi/$screen_name

echo "Android fix resources done !"
sleep 1.5
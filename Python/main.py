#!/usr/bin/env python
#
# Copyright (c) 2020, Pycom Limited.
#
# This software is licensed under the GNU GPL version 3 or any
# later version, with permitted additional terms. For more information
# see the Pycom Licence v1.0 document supplied with this file, or
# available at https://www.pycom.io/opensource/licensing
#

# See https://docs.pycom.io for more information regarding library specifics

# from network import WLAN
from wifi import WiFi
import time
import pycom
from pysense import Pysense
import machine
import sys
from mqtt import MQTTClient

wifi = WiFi()
print(WiFi.connectwifi("mdr", "1234bmx22c"))

orgID = "09gwpk"
deviceType = "pycom"
deviceID = "2"
token = "XuJz)+go77MrUgq6uq"

# wlan = WLAN(mode=WLAN.STA)
# wlan.connect("Cri pénis pour le mot de passe", auth=(WLAN.WPA2, "1234bmx22c"), timeout=5000)
 
# while not wlan.isconnected():
#     machine.idle()
# print("Connected to Wifi\n")

def settimeout(duration):
    pass

def sub_cb(topic, msg):
   print(msg)

client = MQTTClient("d:"+orgID+":"+deviceType+":"+deviceID, orgID+".messaging.internetofthings.ibmcloud.com", user="use-token-auth", password=token, port=8883)
# client.settimeout = settimeout
try:
    print(client.connect())
    pass
except Exception as identifier:
    print(identifier.args)
    pass

client.set_callback(sub_cb)
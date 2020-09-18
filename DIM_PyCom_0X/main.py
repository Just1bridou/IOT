# See https://docs.pycom.io for more information regarding library specifics

from pysense import Pysense
# seule la librairie pour la température est importée pour ce modèle

from wifi import WiFi
from mqtt import MQTTClient
import time

from LIS2HH12 import LIS2HH12
from SI7006A20 import SI7006A20
from LTR329ALS01 import LTR329ALS01
from MPL3115A2 import MPL3115A2,ALTITUDE,PRESSURE

IBMorgID='09gwpk' # Identifiant de l'instance 'IoT PLatform' sur 6 caractères
deviceType='pycom' # Nom du 'Device Type' défini dans le IoT Platform
deviceID='2' # ID du device (4 dernieres caractères du SSID)
deviceToken='XuJz)+go77MrUgq6uq' # Token (mot de passe) défini pour le device dans le Iot Platform

# orgID = "09gwpk"
# deviceType = "pycom"
# deviceID = "2"
# token = "XuJz)+go77MrUgq6uq"

py = Pysense()
si = SI7006A20(py)
lt = LTR329ALS01(py)
# moy 15/20


wifi = WiFi()

print("Temperature: " + str(si.temperature())+ " deg C and Relative Humidity: " + str(si.humidity()) + " %RH")
print("Dew point: "+ str(si.dew_point()) + " deg C")
print("Light (channel Blue lux, channel Red lux): " + str(lt.light()))

while True:
    print(lt.light())


print (WiFi.connectwifi('bmx22c','1234bmx22c'))

# Syntaxe pour envoyer un paquet MQTT à IBM Cloud
client = MQTTClient("d:"+IBMorgID+":"+deviceType+":"+deviceID, IBMorgID +".messaging.internetofthings.ibmcloud.com", user="use-token-auth", password=deviceToken, port=1883)
print(client.connect())

while True:
    print("Sending")
    mqttMsg = '{'
    # mqttMsg = mqttMsg + '"t":' + str(si.temperature())
    # mqttMsg = mqttMsg + '"t":' + lt.light()
    print(type(lt.light()))
    mqttMsg = mqttMsg + '}'
    client.publish(topic="iot-2/evt/data/fmt/json", msg={"light":lt.light()})
    time.sleep(1)

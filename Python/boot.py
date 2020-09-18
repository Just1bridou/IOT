# import machine
# from network import WLAN

# # configure the WLAN subsystem in station mode (the default is AP)
# wlan = WLAN(mode=WLAN.STA)
# # go for fixed IP settings (IP, Subnet, Gateway, DNS)
# wlan.ifconfig(config=('192.168.0.107', '255.255.255.0', '192.168.0.1', '192.168.0.1'))
# wlan.scan()     # scan for available networks
# wlan.connect(ssid='bmx22c', auth=(WLAN.WPA2, '1234bmx22c'))
# while not wlan.isconnected():
#     pass
# print(wlan.ifconfig())
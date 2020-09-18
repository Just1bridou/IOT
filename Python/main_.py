import pycom
import time
import uos
# from upyduino import random

pycom.heartbeat(False)
# R = 1
# G = 50
# B = 100
r = 255
g = 0
b = 0

while True:
    # test = '0x%02x%02x%02x' % (uos.urandom(1)[0], uos.urandom(1)[0], uos.urandom(1)[0])
    time.sleep(0.0001)
    # print(test)
    # pycom.rgbled(int(test))

    

    if r<=255 and g>=0 and b==0:
        r = r-1
        g = g+1

    if g<=255 and b>=0 and r==0:
        g = g-1
        b = b+1

    if b<=255 and r>=0 and g==0:
        b = b-1
        r = r+1

    test = '0x%02x%02x%02x' % (r, g, b)
    pycom.rgbled(int(test))
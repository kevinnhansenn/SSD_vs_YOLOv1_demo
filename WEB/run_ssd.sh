#!/bin/bash

source ../SSD/ssd/bin/activate

cd ../SSD

python3 demo.py --config-file configs/vgg_ssd300_voc0712.yaml --images_dir demo --ckpt https://github.com/lufficc/SSD/releases/download/1.2/vgg_ssd300_voc0712.pth

# Object Detection
***
## Web Demo for SSD and YOLOv1 algorithm

![Alt Gif demo](./demo.gif "Gif demo")


## Credit
- SSD algorithm: [https://github.com/lufficc/SSD](https://github.com/lufficc/SSD)
- YOLOv1 algorithm: [https://github.com/lovish1234/YOLOv1](https://github.com/lovish1234/YOLOv1)
- Using React.js for Frontend

## Requirements

- Linux OS (preferably)
- Python installed
- Node, npm and yarn installed


## Installation

1. Clone this repository
```shell
git clone https://github.com/kevinnhansenn/SSD_vs_YOLOv1_demo
```
2. Go to SSD/
```shell
cd SSD/
```
3. Create Python venv with name **ssd**
```shell
python3 -m venv ssd
```
4. Using **ssd** venv, install requirements.txt
```shell
source ssd/bin/activate
pip install -r requirements.txt
```
5. Go to YOLOv1/
```shell
cd YOLOv1/
```
6. Create Python venv with name **yolo**
```shell
python3 -m venv yolo
```
7. Using **yolo** venv, install requirements.txt
```shell
source yolo/bin/activate
pip install -r requirements.txt
```
8. Download the weight [here](https://drive.google.com/file/d/0B2JbaJSrWLpza08yS2FSUnV2dlE/view)
9. Put the file inside /weights folder
10. Go to WEB/
```shell
cd WEB/
```
11. Run this command to allow executable files
```shell
chmod -x run_ssd.sh
chmod -x run_yolo.sh
```
12. Install dependencies 
```shell
yarn install
```
13. Run program 
```shell
yarn dev
```
14. Go to http://localhost:3000 in your local machine
15. Finish.
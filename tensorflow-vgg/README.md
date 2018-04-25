# Tensorflow-VGG
Re-implementation of VGG Network in tensorflow

>If you are using Python3, replace `pip` by `pip3` and `python` by `python3` below.

# Setup

```
pip install pyyaml skimage skdata tensorflow-gpu
```

For installing skdata with Python3, clone the repository from [here](https://github.com/jaberg/skdata) and install it :
```
python3 install setup.py
```

# training

```
python train_model_simple.py experiment.yaml
```

# training on multiple gpus

```
python train_model_parallel.py experiment.yaml
```

# prediction

```
python predict.py dog.jpg
```

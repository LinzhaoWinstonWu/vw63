import itertools as it
import numpy as np
import tensorflow as tf
import pickle
import os
from PIL import Image

archive_dir = os.getcwd() + "/data"
w, h = 200, 320 # 800, 1280

def unpickle(target):

    dataset_r = pickle.load(open(os.path.join(archive_dir, "dataset.data"), "rb"))

    # trn_pixels = dataset_r['data'].reshape(-1, 3, h, w).astype(np.uint8)
    # trn_pixels = trn_pixels.transpose(0, 2, 3, 1)
    # pictures = [Image.fromarray(trn_pixels[i]) for i in range(trn_pixels.shape[0])]
    #
    # for i, pic in enumerate(pictures):
    #     pic.save(str(i), "PNG")
    #     pic.show()

    data = dataset_r['data']
    labels = dataset_r['labels']

    test_num = int(data.shape[0] / 10)
    test_data = data[:test_num, :]
    test_labels = labels[:test_num, :]
    test_dataset = dict()
    test_dataset['data'] = test_data
    test_dataset['labels'] = test_labels

    train_data = data[test_num:, :]
    train_labels = labels[test_num:, :]
    train_dataset = dict()
    train_dataset['data'] = train_data
    train_dataset['labels'] = train_labels

    if target == 'test_batch':
        return test_dataset
    elif target == 'data_batch':
        return train_dataset

def get_cifar10(batch_size=16):
    # print("loading cifar10 data ... ")
    #
    # from skdata.cifar10.dataset import CIFAR10
    # cifar10 = CIFAR10()
    # cifar10.fetch(True)


    data = unpickle("data_batch")
    trn_pixels = data['data']
    trn_labels = data['labels']

    # trn_pixels = np.vstack(trn_pixels)
    trn_pixels = trn_pixels.reshape(-1, 3, h, w).astype(np.float32)

    tst_data = unpickle("test_batch")
    tst_labels = tst_data["labels"]
    tst_pixels = tst_data["data"]
    tst_pixels = tst_pixels.reshape(-1, 3, h, w).astype(np.float32)

    print("-- trn shape = %s" % list(trn_pixels.shape))
    print("-- tst shape = %s" % list(tst_pixels.shape))

    # transpose to tensorflow's bhwc order assuming bchw order
    trn_pixels = trn_pixels.transpose(0, 2, 3, 1)
    tst_pixels = tst_pixels.transpose(0, 2, 3, 1)

    trn_set = batch_iterator(it.cycle(zip(trn_pixels, trn_labels)), batch_size, cycle=True, batch_fn=lambda x: zip(*x))
    tst_set = (tst_pixels, np.array(tst_labels))

    return trn_set, tst_set

def batch_iterator(iterable, size, cycle=False, batch_fn=lambda x: x):
    """
    Iterate over a list or iterator in batches
    """
    batch = []

    # loop to begining upon reaching end of iterable, if cycle flag is set
    if cycle is True:
        iterable = it.cycle(iterable)

    for item in iterable:
        batch.append(item)
        if len(batch) >= size:
            yield batch_fn(batch)
            batch = []

    if len(batch) > 0:
        yield batch_fn(batch)


if __name__ == '__main__':
    trn, tst = get_cifar10()

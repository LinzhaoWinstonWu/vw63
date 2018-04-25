import json
import os
import numpy as np
import pickle
from PIL import Image

target_list = ["Button", "ImageButton", "CompoundButton", "ProgressBar", "SeekBar", "Chronometer", "View", "CheckBox", "RadioButton", "Switch", "EditText", "ToggleButton", "RatingBar", "Spinner"]

cwd = os.getcwd()
archive_dir = cwd + "/widget_clippings"

w, h = 200, 320 # 800, 1280

def restore():
    dataset_r = pickle.load(open(os.path.join(archive_dir, "dataset.data"), "rb"))
    trn_pixels = dataset_r['data'].reshape(-1, 3, h, w).astype(np.uint8)
    trn_pixels = trn_pixels.transpose(0, 2, 3, 1)
    pictures = [Image.fromarray(trn_pixels[i]) for i in range(trn_pixels.shape[0])]

    for i, pic in enumerate(pictures):
        pic.save(str(i), "PNG")

if __name__ == '__main__':
    pictures = dict()
    with open(os.path.join(archive_dir, "meta_dump.txt"), "r") as f:
        obj = json.load(f)
        for item in obj:
            pic_name = obj[item]['src'] + ".png"
            if pic_name in pictures:
                pictures[pic_name].add(obj[item]['widget_class'])
            else:
                pictures[pic_name] = {obj[item]['widget_class']}
            # pictures[pic_name] = obj[item]['widget_class']

    # print pictures

    pics_array = []
    label_array = []
    for pic in pictures:
        try:
            im = Image.open(pic).resize((w,h), resample=Image.LANCZOS)
        except Exception as e:
            print(e)
            continue
        # im.show()
        im_data = np.array(im)
        # print "%s :(%d, %d, %d)" \
        #             %(pic, im_data.shape[0], im_data.shape[1], im_data.shape[2])
        im_data = im_data.transpose(2, 0, 1)
        im_data_array = im_data.flatten()
        pics_array.append(im_data_array)
        label_index = {target_list.index(s) for s in pictures[pic]}
        # label_index = target_list.index(pictures[pic])
        label_array.append(label_index)
    data = np.vstack(pics_array)
    # print data
    # print label_array
    label = np.zeros(shape=(len(label_array), len(target_list)), dtype=int)
    for i in range(len(label_array)):
        for l in label_array[i]:
            label[i, l] = 1

    dataset = {'data': data, 'labels': label}
    print(dataset)
    pickle.dump(dataset, open(os.path.join(archive_dir, "dataset.data"), "wb"), True)

    # restore()

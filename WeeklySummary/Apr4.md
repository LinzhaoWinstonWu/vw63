 ### My work of this week:

1. Studied the training part of the project tf_faster_rcnn, found there is no training process for the pre-trained CNN layer.

2. Then, found another project of faster rcnn using tensorflow, and studied the source code of its training part, though it support not load pretrained weights in advance, I still didn't find the training part of CNN

3. At last, I downloaded an source code of VGG including training part, and studied its code, and it is using the data set of cifar. So, the problem left if we train VGG ourselves the size of pictures can be problemetic, and one picture using mutilple labels seems not realistic for me.

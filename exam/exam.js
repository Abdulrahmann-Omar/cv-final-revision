// CV Final-Revision Mock Exam.
// All questions live in QUESTIONS. Each entry has:
//   id, lecture ('L01'…'L12'), type (mcq|tf|img|short|scenario|long),
//   stem (HTML/KaTeX allowed), choices (mcq only), answer, explanation,
//   image (optional), keywords (short/scenario), points.

const QUESTIONS = [
/* ============================================================== L01 ============================================================== */
{ id:'q01', lecture:'L01', type:'mcq', points:1,
  stem:'Which of the following is a <strong>pixel-based</strong> enhancement (no neighbourhood involvement)?',
  choices:['3×3 average filter','Median filter','Gamma correction','Laplacian sharpening'],
  answer:2, explanation:'Gamma correction is $s=c r^{\\gamma}$ — depends only on the input pixel value, not on neighbours.'
},
{ id:'q02', lecture:'L01', type:'mcq', points:1,
  stem:'An 8-bit image pixel has value 60. The negative transformation produces:',
  choices:['60','195','255','205'], answer:1, explanation:'$s=255-r=255-60=195$.'
},
{ id:'q03', lecture:'L01', type:'mcq', points:1,
  stem:'Histogram equalisation maps a level r to:',
  choices:['$\\text{round}(N\\cdot p(r))$','$\\text{round}(N\\cdot \\sum_{i=0}^{r} p(i))$','$N - r$','$r/N$'],
  answer:1, explanation:'It is the rounded CDF scaled by the maximum gray level N.'
},
{ id:'q04', lecture:'L01', type:'tf', points:1,
  stem:'For an 8-bit image with histogram counts $[5,10,5,0,0,0,0,0]$ over 8 levels, level 1 is mapped to 5 after equalisation.',
  answer:true, explanation:'$p=[0.25,0.5,0.25,0,…]$, CDF$(1)=0.75$, $T(1)=\\text{round}(7\\cdot 0.75)=5$.'
},
/* ============================================================== L02 ============================================================== */
{ id:'q05', lecture:'L02', type:'mcq', points:1,
  stem:'The convolution theorem says spatial convolution corresponds to:',
  choices:['Addition in the frequency domain','Multiplication in the frequency domain','Subtraction in the frequency domain','Division in the frequency domain'],
  answer:1, explanation:'$f * h \\leftrightarrow F\\cdot H$.'
},
{ id:'q06', lecture:'L02', type:'mcq', points:1,
  stem:'Ideal low-pass filtering in the frequency domain typically produces what visual artifact?',
  choices:['Salt-and-pepper noise','Ringing (Gibbs) artifacts','Aliasing','Vignetting'],
  answer:1, explanation:'Sharp cutoff in frequency ↔ ringing in space.'
},
{ id:'q07', lecture:'L02', type:'mcq', points:1,
  stem:'The DC term $F(0,0)$ of an $M\\times N$ image $f(x,y)$ equals:',
  choices:['$\\max f$','$\\sum f / (MN)$','$\\sum f$','$\\sqrt{\\sum f^2}$'],
  answer:2, explanation:'$F(0,0)=\\sum_x\\sum_y f(x,y)$ — proportional to the average brightness.'
},
{ id:'q08', lecture:'L02', type:'tf', points:1,
  stem:'A high-pass filter in the frequency domain enhances edges and fine detail.',
  answer:true, explanation:'Edges are high-frequency content; suppressing low frequencies leaves edges intact.'
},
/* ============================================================== L03 ============================================================== */
{ id:'q09', lecture:'L03', type:'mcq', points:1,
  stem:'Opening of a binary image A by structuring element B equals:',
  choices:['$(A\\oplus B)\\ominus B$','$(A\\ominus B)\\oplus B$','$A\\oplus B$','$A\\ominus B$'],
  answer:1, explanation:'Opening = erosion then dilation.'
},
{ id:'q10', lecture:'L03', type:'mcq', points:1,
  stem:'Which morphological operation is best for filling small holes inside foreground objects?',
  choices:['Erosion','Dilation','Opening','Closing'], answer:3,
  explanation:'Closing = dilation then erosion — bridges small gaps and fills small interior holes.'
},
{ id:'q11', lecture:'L03', type:'mcq', points:1,
  stem:'Which is correct about erosion?',
  choices:['It enlarges foreground objects','It removes small foreground noise / shrinks objects','It is idempotent','It is undefined for binary images'],
  answer:1, explanation:'Erosion shrinks foreground; the SE must fully fit inside A.'
},
{ id:'q12', lecture:'L03', type:'tf', points:1,
  stem:'Opening is idempotent: applying it twice gives the same result as applying it once.',
  answer:true, explanation:'$(A\\circ B)\\circ B = A\\circ B$. Same is true for closing.'
},
{ id:'q13', lecture:'L03', type:'short', points:2,
  stem:'Write the formula for the morphological boundary $\\beta(A)$ of a binary set $A$ with structuring element $B$.',
  answer:'$\\beta(A) = A - (A\\ominus B)$',
  keywords:['A','-','erosion','A⊖B','A\\ominus B','A-','A -','minus'],
  explanation:'Subtract the eroded version from the original; the missing one-pixel-thick shell is the boundary.'
},
/* ============================================================== L04 ============================================================== */
{ id:'q14', lecture:'L04', type:'mcq', points:1,
  stem:'The SIFT descriptor is 128-dimensional because:',
  choices:['It has 128 keypoints','It is 16×8 = 128','It is 4×4 cells × 8 orientation bins = 128','It is the FFT magnitude at 128 frequencies'],
  answer:2, explanation:'16×16 window → 4×4 cells, each cell is an 8-bin orientation histogram → 4·4·8 = 128.'
},
{ id:'q15', lecture:'L04', type:'mcq', points:1,
  stem:'Why use Difference-of-Gaussians (DoG) instead of the Laplacian of Gaussian (LoG)?',
  choices:['DoG produces more keypoints','DoG approximates $\\sigma^2 \\nabla^2 G$ but is much cheaper to compute','DoG is rotation-invariant; LoG is not','LoG is differentiable; DoG is not'],
  answer:1, explanation:'$L(x,y,k\\sigma)-L(x,y,\\sigma) \\approx (k-1)\\sigma^2\\nabla^2 G$ — cheap subtraction replaces an expensive second-derivative filter.'
},
{ id:'q16', lecture:'L04', type:'mcq', points:1,
  stem:'How many neighbours does a SIFT candidate keypoint compare against when checking for a local extremum across the DoG scale space?',
  choices:['8','9','26','128'], answer:2, explanation:'8 in the same scale + 9 in the scale above + 9 in the scale below = 26.'
},
{ id:'q17', lecture:'L04', type:'tf', points:1,
  stem:'SIFT is fully invariant to projective (perspective) transformations.',
  answer:false, explanation:'SIFT is scale, rotation, illumination invariant and partially affine — it is NOT full projective invariant.'
},
/* ============================================================== L05 ============================================================== */
{ id:'q18', lecture:'L05', type:'mcq', points:1,
  stem:'A "classification + localisation" task outputs:',
  choices:['Just the class label','Just a bounding box','Class label and one bounding box','Multiple class labels and boxes'],
  answer:2, explanation:'Localisation = single object. Detection = multiple objects (multiple class+box pairs).'
},
{ id:'q19', lecture:'L05', type:'mcq', points:1,
  stem:'In the sliding-window detector, the main reason to use multiple window sizes is:',
  choices:['Speed','Handling objects at different scales','Handling rotation','Reducing false positives'],
  answer:1, explanation:'A single window only matches one scale; objects come in many sizes.'
},
{ id:'q20', lecture:'L05', type:'mcq', points:1,
  stem:'For an output vector $Y=[p_c, b_x, b_y, b_w, b_h, c_1, c_2, c_3]$, when $p_c=0$ the "don\'t-care" mechanism means:',
  choices:['All terms contribute equally to the loss','Only $p_c$ contributes to the loss; bx,by,bw,bh,c1..c3 are ignored','Only the class probs contribute','The example is discarded'],
  answer:1, explanation:'No object present → no penalty on box/class predictions, only on the indicator.'
},
{ id:'q21', lecture:'L05', type:'tf', points:1,
  stem:'Sliding window scales linearly with the number of windows, while YOLO is constant time per image (modulo CNN cost).',
  answer:true, explanation:'YOLO is a single forward pass; sliding window re-runs the classifier per window.'
},
/* ============================================================== L06 ============================================================== */
{ id:'q22', lecture:'L06', type:'mcq', points:1,
  stem:'Two boxes A=(50,50,150,150) and B=(100,100,200,200). The IoU is closest to:',
  choices:['0.05','0.14','0.25','0.50'], answer:1,
  explanation:'Intersection (100,100,150,150) area 2500; union 17500; IoU ≈ 0.143.'
},
{ id:'q23', lecture:'L06', type:'mcq', points:1,
  stem:'NMS picks the box with the highest score, removes any other box whose IoU with it exceeds a threshold $T$, and repeats. Typical $T$ is:',
  choices:['0.1','0.5','0.9','1.0'], answer:1, explanation:'Around 0.5 is standard for class-aware NMS.'
},
{ id:'q24', lecture:'L06', type:'mcq', points:1,
  stem:'MSE compared with MAE for bounding-box regression:',
  choices:['MSE is more robust to outliers','MAE is more sensitive to outliers','MSE penalises large errors quadratically; MAE linearly','MAE has no gradient at zero, so it is unused'],
  answer:2, explanation:'$(y-\\hat y)^2$ vs $|y-\\hat y|$.'
},
{ id:'q25', lecture:'L06', type:'tf', points:1,
  stem:'IoU loss has the form $L = \\mathrm{IoU}$ so that the loss is maximised when the boxes match.',
  answer:false, explanation:'IoU loss = $1 - \\mathrm{IoU}$, so it is minimised when boxes match.'
},
{ id:'q26', lecture:'L06', type:'scenario', points:3,
  stem:'Three boxes survive with scores [0.95, 0.85, 0.70] and pairwise IoU matrix (i,j):<br>I(1,2)=0.72, I(1,3)=0.10, I(2,3)=0.55. With NMS threshold 0.5, list the kept detections in order picked.',
  answer:'Pick box 1 (0.95). Suppress box 2 (IoU 0.72>0.5). Box 3 IoU with 1 = 0.10<0.5 → keep box 3. Final: [box 1, box 3].',
  keywords:['1','3','box 1','box 3'],
  explanation:'NMS picks max-score first, then suppresses overlaps above threshold.'
},
/* ============================================================== L07 ============================================================== */
{ id:'q27', lecture:'L07', type:'mcq', points:1,
  stem:'For a YOLO grid with $S=7$, anchors $M=2$, classes $N=20$, and per-anchor class probabilities, the output tensor has size:',
  choices:['7×7×25','7×7×30','7×7×50','7×7×70'], answer:2,
  explanation:'$S\\times S\\times M(5+N) = 7\\times 7 \\times 2\\cdot 25 = 7\\times 7\\times 50$.'
},
{ id:'q28', lecture:'L07', type:'mcq', points:1,
  stem:'In a YOLO grid, the "responsible" cell for an object is:',
  choices:['The cell with the largest IoU','The cell containing the object\'s centre','The top-left cell','Every cell the object overlaps'],
  answer:1, explanation:'Centre-based assignment — exactly one cell is responsible per ground-truth box.'
},
{ id:'q29', lecture:'L07', type:'mcq', points:1,
  stem:'Coordinates $b_x, b_y$ in YOLO are usually:',
  choices:['Pixel locations relative to the image origin','Floating-point offsets in [0,1] relative to the cell','Negative offsets from the cell centre','Always 0.5'],
  answer:1, explanation:'$b_x,b_y$ relative to cell (range 0–1); $b_w,b_h$ relative to the image (range 0–1).'
},
{ id:'q30', lecture:'L07', type:'tf', points:1,
  stem:'Anchor boxes allow multiple objects of different aspect ratios to be predicted from the same grid cell.',
  answer:true, explanation:'Each anchor predicts an independent box from the cell.'
},
{ id:'q31', lecture:'L07', type:'scenario', points:3,
  stem:'You set $S=13$, $M=6$ anchors, $N=100$ classes, per-anchor classes. Compute the output-tensor size.',
  answer:'13 × 13 × 6 × (5+100) = 13 × 13 × 630 = 106,470 numbers.',
  keywords:['630','106470','106,470','13','13×13','13 × 13'],
  explanation:'$M\\cdot(5+N) = 6\\cdot 105 = 630$ → tensor 13·13·630 = 106,470.'
},
/* ============================================================== L08 ============================================================== */
{ id:'q32', lecture:'L08', type:'mcq', points:1,
  stem:'In the YOLO v1 loss, the $\\sqrt{w},\\sqrt{h}$ trick is used to:',
  choices:['Make the loss convex','Penalise errors on small boxes more than on large boxes','Speed up training','Avoid negative widths'],
  answer:1, explanation:'A 5-px error on a 20-px box matters more than the same error on a 500-px box; the square-root compresses the scale.'
},
{ id:'q33', lecture:'L08', type:'mcq', points:1,
  stem:'$\\lambda_\\text{noobj}$ in YOLO v1 is typically set to:',
  choices:['5','0.5','1','0'], answer:1, explanation:'Down-weights no-object confidence (most cells contain no object → would otherwise dominate the loss).'
},
{ id:'q34', lecture:'L08', type:'mcq', points:1,
  stem:'$\\lambda_\\text{coord}$ in YOLO v1 is typically set to:',
  choices:['0.1','0.5','5','50'], answer:2, explanation:'Up-weights the localisation loss (we want sharp boxes).'
},
{ id:'q35', lecture:'L08', type:'tf', points:1,
  stem:'YOLO v3 introduced predictions at multiple scales (a feature pyramid).',
  answer:true, explanation:'YOLO v3 predicts at 3 scales for better small-object detection.'
},
{ id:'q36', lecture:'L08', type:'short', points:2,
  stem:'In one sentence, why does $\\mathbb{1}^{obj}_{ij}$ multiply the localisation and class-probability terms?',
  answer:'It zeroes the term whenever the cell/anchor is not responsible for an object — we only penalise box/class predictions when there is a ground-truth object to compare against.',
  keywords:['responsible','no object','only','indicator','don\'t','dont','zero'],
  explanation:'Indicator = 1 only for the responsible cell/anchor; otherwise loss term = 0.'
},
/* ============================================================== L09 ============================================================== */
{ id:'q37', lecture:'L09', type:'mcq', points:1,
  stem:'R-CNN runs the CNN feature extractor:',
  choices:['Once for the whole image','Once per region proposal (≈2000 times)','Once per pixel','Twice (forward + backward)'],
  answer:1, explanation:'That is exactly why R-CNN is slow; Fast R-CNN fixes it by running once over the whole image.'
},
{ id:'q38', lecture:'L09', type:'mcq', points:1,
  stem:'Selective Search produces:',
  choices:['Class scores','Region proposals (~2000)','Anchor boxes','Backbone features'],
  answer:1, explanation:'It is the classical, CPU-bound region-proposal algorithm used by R-CNN and Fast R-CNN.'
},
{ id:'q39', lecture:'L09', type:'mcq', points:1,
  stem:'The bottleneck that motivated Faster R-CNN was:',
  choices:['Bounding-box regression accuracy','The Selective Search step running on CPU','SVM training time','The softmax layer'],
  answer:1, explanation:'Region proposals were learned by an RPN sharing the conv backbone — done on GPU.'
},
{ id:'q40', lecture:'L09', type:'tf', points:1,
  stem:'Fast R-CNN replaced the per-class SVMs of R-CNN with a single softmax classifier and made bbox regression part of the network.',
  answer:true, explanation:'Yes — single-stage training of a multi-task head.'
},
/* ============================================================== L10 ============================================================== */
{ id:'q41', lecture:'L10', type:'mcq', points:1,
  stem:'For a feature map of size 38×50 with k=9 anchors, the total number of anchor boxes is:',
  choices:['1,900','9,500','17,100','171,000'], answer:2, explanation:'$38\\cdot 50\\cdot 9 = 17{,}100$.'
},
{ id:'q42', lecture:'L10', type:'mcq', points:1,
  stem:'The RPN classification head outputs:',
  choices:['Class probabilities for K object classes','Two scores per anchor (object vs background)','One score per pixel','Coordinates of proposals'],
  answer:1, explanation:'Binary cls head; "objectness". The K-class classifier is in the downstream detector head.'
},
{ id:'q43', lecture:'L10', type:'mcq', points:1,
  stem:'A positive anchor in RPN training has IoU with a ground-truth box:',
  choices:['< 0.3','> 0.5','> 0.7 OR highest IoU for that GT','exactly 0.5'],
  answer:2, explanation:'Either threshold or "max-IoU per GT" qualifies.'
},
{ id:'q44', lecture:'L10', type:'tf', points:1,
  stem:'In the RPN regression head, the predicted box width is encoded as $t_w = \\log(w/w_a)$.',
  answer:true, explanation:'Logarithm parameterisation makes scaling multiplicative.'
},
{ id:'q45', lecture:'L10', type:'short', points:2,
  stem:'Write the RPN multi-task loss in symbols, naming each piece.',
  answer:'$L = \\frac{1}{N_{cls}}\\sum_i L_{cls}(p_i,p_i^*) + \\lambda \\frac{1}{N_{reg}} \\sum_i p_i^* L_{reg}(t_i,t_i^*)$, with $L_{cls}$ = binary cross-entropy, $L_{reg}$ = Smooth-L1, and $p_i^*$ the ground-truth label (1 positive, 0 negative).',
  keywords:['cross-entropy','smooth-L1','p_i^*','N_{cls}','N_{reg}','lambda','cls','reg'],
  explanation:'Two terms; the $p_i^*$ multiplier ensures regression is only on positive anchors.'
},
/* ============================================================== L11 ============================================================== */
{ id:'q46', lecture:'L11', type:'mcq', points:1,
  stem:'The fundamental difference between RoI Pooling and RoI Align is:',
  choices:['RoI Align uses max instead of average','RoI Align removes the quantisation step (uses bilinear interpolation)','RoI Pool runs on GPU; RoI Align runs on CPU','RoI Align is for masks only'],
  answer:1, explanation:'No rounding of the proposal or bin coordinates → preserves spatial alignment.'
},
{ id:'q47', lecture:'L11', type:'mcq', points:1,
  stem:'RoI Pooling causes problems for pixel-precise tasks (e.g. segmentation) because:',
  choices:['It is too slow','The two quantisation steps mis-align features with the original RoI','It is non-differentiable','It uses average instead of max'],
  answer:1, explanation:'Quantising the proposal and the bin boundaries introduces sub-pixel mis-alignment, which masks expose.'
},
{ id:'q48', lecture:'L11', type:'mcq', points:1,
  stem:'Inside RoI Align, the bilinear interpolation samples typically:',
  choices:['1 point per bin','4 points per bin, then averaged','8 points per bin','The whole bin (sum)'],
  answer:1, explanation:'Four sub-sample points per bin, then average (or max).'
},
{ id:'q49', lecture:'L11', type:'tf', points:1,
  stem:'The detector head of Faster R-CNN outputs both a class label and a per-class bounding-box refinement.',
  answer:true, explanation:'Softmax over (K+1) classes (incl. background) + K-sets of 4 regression deltas.'
},
/* ============================================================== L12 ============================================================== */
{ id:'q50', lecture:'L12', type:'mcq', points:1,
  stem:'Mask R-CNN adds to Faster R-CNN:',
  choices:['A larger backbone','A parallel FCN branch that outputs K binary masks per RoI','An LSTM','A second RPN'],
  answer:1, explanation:'Instance-segmentation branch outputting K m×m masks per RoI.'
},
{ id:'q51', lecture:'L12', type:'mcq', points:1,
  stem:'During Mask R-CNN training, the mask loss is computed:',
  choices:['On all K mask channels','Only on the ground-truth class\'s mask channel','On the background channel','On the union of all masks'],
  answer:1, explanation:'Decoupling: classification chooses the class; only that channel contributes to $L_{mask}$.'
},
{ id:'q52', lecture:'L12', type:'mcq', points:1,
  stem:'The 4-step alternating training of Faster R-CNN starts with:',
  choices:['Training the detector head with random proposals','Training the RPN with the ImageNet-initialised backbone','Joint end-to-end training','Training the mask branch'],
  answer:1, explanation:'Step 1: train RPN; subsequent steps reuse and share the conv backbone.'
},
{ id:'q53', lecture:'L12', type:'tf', points:1,
  stem:'RoI Align (not RoI Pool) is needed for Mask R-CNN because the mask head is pixel-sensitive.',
  answer:true, explanation:'Sub-pixel mis-alignment from RoI Pool would corrupt masks.'
},
{ id:'q54', lecture:'L12', type:'short', points:2,
  stem:'Write the total Mask R-CNN loss in one line, naming each term.',
  answer:'$L = L_{cls} + L_{box} + L_{mask}$ — classification (softmax cross-entropy), box regression (Smooth-L1), and mask (per-pixel binary cross-entropy on the GT class).',
  keywords:['L_{cls}','L_{box}','L_{mask}','cross-entropy','smooth-l1','mask','cls','box'],
  explanation:'Three-way multi-task loss; the mask term is evaluated only on the GT class channel.'
},

/* ============================================================== Image-interpretation (8) ============================================================== */
{ id:'q55', lecture:'L01', type:'img', points:3,
  image:'../assets/slides/L01/page-022.png',
  stem:'The four panels on this slide each show an image and its histogram. Identify, in order from top to bottom: (a) the image type; (b) where in the gray-level axis the histogram mass sits; (c) which pixel-based transform you would apply.',
  answer:'(1) Dark image — mass at left → apply γ<1 or histogram-equalisation. (2) Bright image — mass at right → apply γ>1 or equalisation. (3) Low-contrast — mass in the middle → equalisation. (4) High-contrast — mass spread → no enhancement needed.',
  explanation:'A bright/dark image has a one-sided histogram; low-contrast has a narrow histogram; high-contrast spans the full range.'
},
{ id:'q56', lecture:'L03', type:'img', points:3,
  image:'../assets/slides/L03/page-040.png',
  stem:'Predict the result of applying a 3×3 square SE erosion to this binary image. What changes shape-wise?',
  answer:'Foreground regions shrink by ~1 pixel along every boundary; small/thin features disappear; gaps widen. The SE only retains a centre pixel when the entire SE fits inside the foreground.',
  explanation:'Erosion = "SE fits inside" — strips a layer off the boundary and removes anything smaller than the SE.'
},
{ id:'q57', lecture:'L04', type:'img', points:3,
  image:'../assets/slides/L04/page-020.png',
  stem:'Interpret the scale-space / DoG pyramid figure. What does each octave represent, and why are we taking differences between adjacent blurs?',
  answer:'Each octave is the image at a fixed resolution blurred progressively with increasing σ (a Gaussian cascade). Adjacent differences (DoG) approximate the scale-normalised LoG, whose extrema are blob-like keypoints stable across scale.',
  explanation:'Octaves halve the resolution between groups; within an octave we move along scale. DoG ≈ σ²∇²G gives multi-scale blob detection cheaply.'
},
{ id:'q58', lecture:'L06', type:'img', points:3,
  image:'../assets/slides/L06/page-020.png',
  stem:'Two predicted boxes overlap a ground-truth box. Visually estimate which has higher IoU and explain.',
  answer:'The box whose intersection with the GT is largest *relative to its union* has higher IoU. A tightly-fitting box (small union, intersection ≈ GT area) beats a loose, mis-aligned box (large union).',
  explanation:'IoU favours both tightness and alignment.'
},
{ id:'q59', lecture:'L07', type:'img', points:3,
  image:'../assets/slides/L07/page-010.png',
  stem:'In this YOLO grid figure, identify the "responsible" cell for the highlighted object and explain how its $b_x,b_y$ would be encoded.',
  answer:'The responsible cell is the one containing the object\'s centre. $b_x,b_y$ are computed as (centre_x mod cellsize / cellsize, centre_y mod cellsize / cellsize) — a value in [0,1] relative to that cell, not to the whole image. $b_w,b_h$ are the box\'s size divided by image width/height.',
  explanation:'Centre-based assignment is the YOLO rule.'
},
{ id:'q60', lecture:'L10', type:'img', points:3,
  image:'../assets/slides/L10/page-020.png',
  stem:'This figure shows anchor boxes at one anchor point. Count them and explain the (scales × aspect-ratios) construction.',
  answer:'k = 9 = 3 scales × 3 aspect ratios. Scales (e.g. 128², 256², 512²) × aspect ratios (1:1, 1:2, 2:1). Same set at every anchor point on the feature map.',
  explanation:'9 anchors is the canonical Faster R-CNN choice.'
},
{ id:'q61', lecture:'L11', type:'img', points:3,
  image:'../assets/slides/L11/page-030.png',
  stem:'Comparing RoI Pool and RoI Align in this figure: where exactly does RoI Pool introduce errors that RoI Align avoids?',
  answer:'(1) RoI Pool rounds the proposal coordinates to integer feature-map cells (e.g. 14.5→14). (2) It rounds each bin boundary inside the rounded RoI to integer cells. These two quantisations mis-align features with the original sub-pixel RoI. RoI Align skips both: it uses the float RoI and computes each bin\'s value by bilinearly interpolating four sub-sample points.',
  explanation:'Two rounding steps in RoI Pool; zero in RoI Align.'
},
{ id:'q62', lecture:'L12', type:'img', points:3,
  image:'../assets/slides/L12/page-020.png',
  stem:'Identify which branch of the Mask R-CNN architecture this figure highlights and describe its outputs.',
  answer:'The mask branch — a small FCN that takes the RoI-aligned feature (14×14×C) and outputs K binary masks of size m×m (e.g. 28×28). During inference, only the GT-class channel is read; during training, only that channel contributes to the loss.',
  explanation:'Decoupling classification from segmentation simplifies the mask head.'
},

/* ============================================================== Short-answer (rest to 6 total) ============================================================== */
{ id:'q63', lecture:'L02', type:'short', points:2,
  stem:'In one sentence, state the convolution theorem (with formula).',
  answer:'$f * h \\leftrightarrow F\\cdot H$ — spatial convolution corresponds to point-wise multiplication of Fourier transforms.',
  keywords:['F','H','convolution','frequency','multiplication','*','·','F·H','FH']
},
{ id:'q64', lecture:'L11', type:'short', points:2,
  stem:'Give the bilinear-interpolation formula used inside RoI Align (name $a,b$).',
  answer:'$f(x,y) \\approx (1-a)(1-b)f(x_1,y_1)+a(1-b)f(x_2,y_1)+(1-a)b\\,f(x_1,y_2)+ab\\,f(x_2,y_2)$ where $a=x-x_1$, $b=y-y_1$.',
  keywords:['(1-a)','(1-b)','bilinear','f(x_1','x_1','y_1','a=','b=','a =','b ='],
  explanation:'Linear interpolation in x then y — equivalent to the 4-corner weighted sum.'
},
/* ============================================================== Scenario / numerical (rest to 4) ============================================================== */
{ id:'q65', lecture:'L07', type:'scenario', points:3,
  stem:'An object centre falls at pixel (100, 80) of a 416×416 image. The YOLO grid is 13×13 (cell size 32). Which cell is responsible, and what are $b_x,b_y$?',
  answer:'Responsible cell = (⌊100/32⌋, ⌊80/32⌋) = (3, 2). $b_x=(100\\bmod 32)/32 = 4/32 = 0.125$, $b_y=(80\\bmod 32)/32 = 16/32 = 0.5$.',
  keywords:['(3','3,2','3, 2','0.125','0.5','cell (3','3,2)','(3,2)'],
  explanation:'Cell index from floor division; sub-cell offset in [0,1].'
},

/* ============================================================== Long-answer (2) ============================================================== */
{ id:'q66', lecture:'L11', type:'long', points:5,
  stem:'Explain the complete Faster R-CNN pipeline end-to-end, naming every module and what it outputs. Include the role of RoI Align, the RPN losses, and the detector head losses.',
  answer:'1. <em>Backbone CNN</em> (e.g. VGG/ResNet) takes the input image and produces a feature map. ' +
    '2. <em>RPN</em>: a 3×3 sliding conv over the feature map → two parallel 1×1 convs producing, for each of k anchors per anchor point: (i) two cls scores (object vs background) and (ii) four box-regression deltas $t_x,t_y,t_w,t_h$. ' +
    '3. <em>Proposal layer</em>: apply regression deltas to anchors → boxes; sort by objectness; per-class NMS; keep top-N (~300). ' +
    '4. <em>RoI Align</em>: for each proposal, sample features from the feature map by bilinear interpolation, producing a fixed (e.g. 7×7×C) RoI feature without quantisation. ' +
    '5. <em>Detector head</em>: FC layers → softmax over K+1 classes (background included) and per-class 4-vector for bbox refinement. ' +
    '6. <em>Post-processing</em>: filter by score, per-class NMS → final detections. ' +
    'Losses: RPN: binary cross-entropy ($L_{cls}$) + Smooth-L1 ($L_{reg}$, on positive anchors only). Detector: softmax cross-entropy + per-class Smooth-L1. Train with alternating 4-step procedure or end-to-end joint training (both backprop through the shared backbone).',
  explanation:'Faster R-CNN is two networks (RPN + detector) sharing the backbone, glued by RoI Align.'
},
{ id:'q67', lecture:'L04', type:'long', points:5,
  stem:'Explain the SIFT pipeline end-to-end. Cover: scale-space construction, keypoint candidate generation, refinement & filtering, orientation assignment, and 128-D descriptor formation.',
  answer:'1. <em>Scale-space</em>: build a Gaussian pyramid — for each octave (image at half the resolution), blur with σ, kσ, k²σ, … (k=2^(1/s), e.g. s=3). ' +
    '2. <em>DoG</em>: subtract adjacent blurred images → Difference-of-Gaussians (cheap approximation of σ²∇²G). ' +
    '3. <em>Candidate keypoints</em>: a pixel is a candidate if it is a local extremum among 26 neighbours (8 same scale + 9 above + 9 below). ' +
    '4. <em>Sub-pixel refinement</em>: fit a quadratic Taylor expansion of DoG around the candidate; refine (x,y,σ). ' +
    '5. <em>Filtering</em>: reject low-contrast extrema (|DoG|<threshold) and edge responses (Hessian eigenvalue ratio criterion). ' +
    '6. <em>Orientation</em>: build a 36-bin histogram of gradient orientations in a Gaussian-weighted window around the keypoint; the peak (and any >80% peaks) defines a canonical orientation — yielding rotation invariance. ' +
    '7. <em>Descriptor</em>: take a 16×16 window around the keypoint (rotated to canonical), divide into 4×4 cells, build an 8-bin orientation histogram per cell → 4·4·8 = 128 numbers. Normalise, clip large values, renormalise → robust to illumination. ' +
    'Matching: nearest-neighbour with ratio test (<0.8 between best and second-best).',
  explanation:'SIFT provides scale, rotation, illumination invariance (and partial affine) on hand-crafted features.'
},
];

/* ===================================================================
   Render + scoring engine.
   =================================================================== */

const examEl = document.getElementById('exam');
const resultEl = document.getElementById('result');
const STORAGE_KEY = 'cv-exam-state-v1';

let state = loadState();

function loadState(){
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { answers:{}, mode:'exam', startedAt:null, timerMin:180, order:null, selfGrade:{} };
  } catch(e){ return { answers:{}, mode:'exam', startedAt:null, timerMin:180, order:null, selfGrade:{} }; }
}
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

function questionOrder(){
  if(!state.order) return QUESTIONS.map(q => q.id);
  // keep current order if available; only include ids still present
  const known = new Set(QUESTIONS.map(q=>q.id));
  return state.order.filter(id => known.has(id));
}

function getQ(id){ return QUESTIONS.find(q => q.id === id); }

function render(){
  const ids = questionOrder();
  const html = ids.map((id, idx) => renderQ(getQ(id), idx+1)).join('');
  examEl.innerHTML = html;
  // re-render math
  if (window.renderMathInElement){
    window.renderMathInElement(examEl,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});
  }
  wireEvents();
}

function renderQ(q, n){
  const a = state.answers[q.id];
  const img = q.image ? `<figure class="slide-figure"><img src="${q.image}" alt="exam image for ${q.id}"></figure>` : '';
  const meta = `<div class="meta">Q${n} · ${q.lecture} · ${q.type.toUpperCase()} · ${q.points} pt</div>`;
  let body = '';
  if (q.type === 'mcq'){
    body = q.choices.map((c,i) => `
      <label class="choice ${a===i?'selected':''}" data-q="${q.id}" data-choice="${i}">
        <input type="radio" name="${q.id}" value="${i}" ${a===i?'checked':''} class="mr-2 align-middle"> ${c}
      </label>`).join('');
  } else if (q.type === 'tf'){
    body = `
      <label class="choice ${a&&a.tf===true?'selected':''}" data-q="${q.id}" data-tf="true">
        <input type="radio" name="${q.id}-tf" ${a&&a.tf===true?'checked':''} class="mr-2 align-middle"> True
      </label>
      <label class="choice ${a&&a.tf===false?'selected':''}" data-q="${q.id}" data-tf="false">
        <input type="radio" name="${q.id}-tf" ${a&&a.tf===false?'checked':''} class="mr-2 align-middle"> False
      </label>
      <div class="mt-2">
        <div class="text-xs text-slate-500 mb-1">Justification (self-graded):</div>
        <textarea data-q="${q.id}" data-just="1" placeholder="Explain your reasoning...">${(a&&a.just)||''}</textarea>
      </div>`;
  } else if (q.type === 'short' || q.type === 'scenario' || q.type === 'long' || q.type === 'img'){
    body = `<textarea data-q="${q.id}" placeholder="Type your answer...">${a||''}</textarea>`;
  }
  return `
    <div class="exam-q" id="qbox-${q.id}">
      ${meta}
      <div class="stem">${q.stem}</div>
      ${img}
      ${body}
      <div class="feedback hidden" id="fb-${q.id}"></div>
    </div>
  `;
}

function wireEvents(){
  examEl.querySelectorAll('label.choice').forEach(lbl => {
    lbl.addEventListener('click', () => {
      const id = lbl.dataset.q;
      const q = getQ(id);
      if (q.type === 'mcq'){
        state.answers[id] = parseInt(lbl.dataset.choice, 10);
      } else if (q.type === 'tf'){
        const cur = state.answers[id] || {};
        cur.tf = (lbl.dataset.tf === 'true');
        state.answers[id] = cur;
      }
      saveState();
      // re-paint selected state
      lbl.parentElement.querySelectorAll('label.choice').forEach(o => o.classList.remove('selected'));
      lbl.classList.add('selected');
      if (state.mode === 'practice') flashGrade(id);
    });
  });
  examEl.querySelectorAll('textarea').forEach(ta => {
    ta.addEventListener('input', () => {
      const id = ta.dataset.q;
      const q = getQ(id);
      if (q.type === 'tf' && ta.dataset.just){
        const cur = state.answers[id] || {};
        cur.just = ta.value;
        state.answers[id] = cur;
      } else {
        state.answers[id] = ta.value;
      }
      saveState();
    });
    ta.addEventListener('blur', () => {
      if (state.mode === 'practice') flashGrade(ta.dataset.q);
    });
  });
}

function flashGrade(id){
  const q = getQ(id);
  const fb = document.getElementById('fb-'+id);
  if (!fb) return;
  const a = state.answers[id];
  const {credit, msg} = gradeOne(q, a);
  fb.classList.remove('hidden');
  fb.innerHTML = `<strong>${credit>=q.points?'✓':credit>0?'~':'✗'} ${credit}/${q.points}</strong> — ${msg}<br><em>Answer:</em> ${q.answer||q.explanation||''}<br><em>Why:</em> ${q.explanation||''}`;
  if (window.renderMathInElement) window.renderMathInElement(fb,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});
}

function gradeOne(q, a){
  if (a === undefined || a === null || a === '' || (typeof a === 'object' && a.tf===undefined && !a.just)){
    return { credit:0, msg:'Unanswered.' };
  }
  if (q.type === 'mcq'){
    return a === q.answer ? { credit:q.points, msg:'Correct.' } : { credit:0, msg:'Incorrect.' };
  }
  if (q.type === 'tf'){
    const tf = (typeof a==='object') ? a.tf : a;
    return tf === q.answer ? { credit:q.points, msg:'Correct.' } : { credit:0, msg:'Incorrect.' };
  }
  if (q.type === 'short' || q.type === 'scenario'){
    const txt = String(a).toLowerCase();
    let hits = 0;
    const kw = (q.keywords||[]).map(k=>String(k).toLowerCase());
    for (const k of kw) if (txt.includes(k)) hits++;
    if (kw.length===0) return { credit:Math.round(q.points*0.5), msg:'Self-grade: compare to model answer.' };
    if (hits >= Math.max(2, Math.ceil(kw.length*0.4))) return { credit:q.points, msg:`Keyword match (${hits}/${kw.length}).` };
    if (hits >= 1) return { credit:Math.round(q.points*0.5), msg:`Partial keyword match (${hits}/${kw.length}).` };
    return { credit:0, msg:'No keyword match — compare to model answer.' };
  }
  // img and long: rely on self-grade
  const sg = state.selfGrade[q.id];
  if (sg === 'full') return { credit:q.points, msg:'Self-graded full.' };
  if (sg === 'partial') return { credit:Math.round(q.points/2), msg:'Self-graded partial.' };
  if (sg === 'wrong') return { credit:0, msg:'Self-graded wrong.' };
  return { credit:0, msg:'Compare to the model answer and self-grade above each question after submission.' };
}

function grade(){
  let total = 0, max = 0;
  const byLec = {};
  QUESTIONS.forEach(q => {
    const a = state.answers[q.id];
    const {credit} = gradeOne(q, a);
    total += credit; max += q.points;
    byLec[q.lecture] = byLec[q.lecture] || {got:0,max:0,n:0};
    byLec[q.lecture].got += credit;
    byLec[q.lecture].max += q.points;
    byLec[q.lecture].n += 1;
  });
  return { total, max, byLec };
}

function showResult(){
  const {total, max, byLec} = grade();
  const pct = max ? Math.round(total/max*1000)/10 : 0;
  const weakest = Object.entries(byLec).filter(([_,v])=>v.max>0).sort((a,b)=>(a[1].got/a[1].max)-(b[1].got/b[1].max)).slice(0,3);
  resultEl.innerHTML = `
    <div class="concept">
      <h3>Result</h3>
      <p class="text-3xl font-extrabold">${total} / ${max}  <span class="text-base font-normal opacity-70">(${pct}%)</span></p>
      <h4 class="mt-4 font-bold">By lecture</h4>
      <table class="text-sm w-full mt-2">
        <thead><tr><th class="text-left">Lecture</th><th class="text-left">Score</th><th class="text-left">%</th><th></th></tr></thead>
        <tbody>
          ${Object.entries(byLec).sort().map(([k,v]) => {
            const p = v.max ? Math.round(v.got/v.max*100) : 0;
            return `<tr><td>${k}</td><td>${v.got}/${v.max}</td><td>${p}%</td><td><a class="text-blue-600" href="../lectures/${k}.html">Revise →</a></td></tr>`;
          }).join('')}
        </tbody>
      </table>
      <h4 class="mt-4 font-bold">Weakest topics</h4>
      <ul class="list-disc ml-6">
        ${weakest.map(([k,v]) => `<li>${k}: ${v.got}/${v.max} → <a class="text-blue-600" href="../lectures/${k}.html">re-read</a></li>`).join('')}
      </ul>
      <p class="mt-3 text-sm opacity-70">Note: for short/scenario answers, scoring uses keyword detection — re-read the model answer above each question for nuance. Image / long-answer questions need your own honesty: use the "I got this" / "Partial" / "Wrong" buttons below each.</p>
    </div>`;
  // reveal per-question feedback
  QUESTIONS.forEach(q => {
    const fb = document.getElementById('fb-'+q.id);
    if (!fb) return;
    const {credit, msg} = gradeOne(q, state.answers[q.id]);
    fb.classList.remove('hidden');
    fb.innerHTML = `<strong>${credit>=q.points?'✓':credit>0?'~':'✗'} ${credit}/${q.points}</strong> — ${msg}<br><em>Model answer:</em> ${q.answer||''}<br><em>Why:</em> ${q.explanation||''}` +
      ((q.type==='img'||q.type==='long')
        ? `<div class="mt-2 flex gap-2"><button class="border rounded px-2 py-0.5 text-xs sgbtn" data-q="${q.id}" data-grade="full">I got this</button>
           <button class="border rounded px-2 py-0.5 text-xs sgbtn" data-q="${q.id}" data-grade="partial">Partial</button>
           <button class="border rounded px-2 py-0.5 text-xs sgbtn" data-q="${q.id}" data-grade="wrong">Wrong</button></div>` : '');
    if (window.renderMathInElement) window.renderMathInElement(fb,{delimiters:[{left:'$$',right:'$$',display:true},{left:'$',right:'$',display:false}]});
  });
  // wire self-grade buttons
  document.querySelectorAll('.sgbtn').forEach(b => {
    b.addEventListener('click', () => {
      state.selfGrade[b.dataset.q] = b.dataset.grade;
      saveState();
      showResult(); // recompute
    });
  });
  window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'});
}

/* ----- controls ----- */
document.getElementById('modeSel').value = state.mode;
document.getElementById('timerMin').value = state.timerMin;

document.getElementById('startBtn').addEventListener('click', () => {
  state.startedAt = Date.now();
  state.timerMin = parseInt(document.getElementById('timerMin').value, 10) || 180;
  state.mode = document.getElementById('modeSel').value;
  saveState();
  resultEl.innerHTML = '';
});
document.getElementById('shuffleBtn').addEventListener('click', () => {
  const arr = QUESTIONS.map(q => q.id);
  for (let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  state.order = arr;
  saveState();
  render();
});
document.getElementById('submitBtn').addEventListener('click', showResult);
document.getElementById('clearBtn').addEventListener('click', () => {
  if (confirm('Clear all your answers?')) {
    state = { answers:{}, mode:state.mode, startedAt:null, timerMin:state.timerMin, order:null, selfGrade:{} };
    saveState(); render();
    resultEl.innerHTML = '';
  }
});

/* ----- timer ----- */
function tickTimer(){
  const el = document.getElementById('timer');
  if (!state.startedAt || !state.timerMin){ el.textContent = '--:--:--'; return; }
  const remaining = state.startedAt + state.timerMin*60*1000 - Date.now();
  if (remaining <= 0){
    el.textContent = '00:00:00';
    if (!state.autoSubmitted){
      state.autoSubmitted = true; saveState();
      showResult();
    }
    return;
  }
  const h = Math.floor(remaining/3600000);
  const m = Math.floor((remaining%3600000)/60000);
  const s = Math.floor((remaining%60000)/1000);
  el.textContent = `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
setInterval(tickTimer, 1000); tickTimer();

/* ----- initial render ----- */
render();
